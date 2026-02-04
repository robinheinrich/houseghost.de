'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { hashPassword, verifyPassword, createSession, getSession, deleteSession } from '@/lib/auth';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    timestamp: string;
}

export async function login(formData: FormData) {
    const username = (formData.get('username') as string || '').trim();
    const password = (formData.get('password') as string || '').trim();

    const validUsername = process.env.ADMIN_USERNAME;
    const validHash = process.env.ADMIN_PASSWORD_HASH;

    console.log('--- Login Attempt Debug ---');
    console.log('Username provided:', username);
    console.log('Username expected:', validUsername ? 'SET' : 'NOT SET');
    if (validHash) {
        console.log(`Hash expected: SET (Length: ${validHash.length}, Starts with: ${validHash.substring(0, 7)}, Ends with: ${validHash.substring(validHash.length - 3)})`);
    } else {
        console.log('Hash expected: NOT SET');
    }

    // Rate Limiting Logic via IP
    const { headers } = await import('next/headers');
    const fs = await import('fs');
    const path = await import('path');

    const clientHeader = await headers();
    const ip = clientHeader.get('x-forwarded-for')?.split(',')[0] || '127.0.0.1';

    const attemptsFilePath = path.join(process.cwd(), 'src', 'data', 'login_attempts.json');

    let attemptsData: Record<string, { count: number; lastAttempt: number }> = {};
    try {
        if (fs.existsSync(attemptsFilePath)) {
            const content = fs.readFileSync(attemptsFilePath, 'utf8');
            attemptsData = JSON.parse(content || '{}');
        }
    } catch { /* ignore */ }

    const userAttempts = attemptsData[ip] || { count: 0, lastAttempt: 0 };
    const now = Date.now();
    const LOCK_TIME = 2.5 * 60 * 1000; // 2.5 minutes
    const MAX_ATTEMPTS = 5;

    // Check if locked
    if (userAttempts.count >= MAX_ATTEMPTS && (now - userAttempts.lastAttempt) < LOCK_TIME) {
        console.log('Login attempt blocked: IP locked', ip);
        // RENEWABLE LOCKOUT: Reset the timer on every attempt while locked
        userAttempts.lastAttempt = now;
        attemptsData[ip] = userAttempts;
        try { fs.writeFileSync(attemptsFilePath, JSON.stringify(attemptsData, null, 2)); } catch { }

        return { success: false, message: 'Login nicht erfolgreich.' };
    }

    // Success check
    if (username === validUsername && validHash && verifyPassword(password, validHash)) {
        console.log('Login successful for user:', username);
        // Reset attempts for this IP on success
        delete attemptsData[ip];
        try { fs.writeFileSync(attemptsFilePath, JSON.stringify(attemptsData, null, 2)); } catch { }

        await createSession(username);
        return { success: true };
    }

    console.log('Login failed: Password mismatch or invalid user');
    // Failure: Record attempt for this IP
    // If they were locked but time passed, reset to 1. Otherwise increment.
    userAttempts.count = (userAttempts.count >= MAX_ATTEMPTS && (now - userAttempts.lastAttempt) >= LOCK_TIME)
        ? 1
        : userAttempts.count + 1;
    userAttempts.lastAttempt = now;
    attemptsData[ip] = userAttempts;

    try { fs.writeFileSync(attemptsFilePath, JSON.stringify(attemptsData, null, 2)); } catch { }

    return { success: false, message: 'Login nicht erfolgreich.' };
}

export async function logout() {
    await deleteSession();
    revalidatePath('/admin');
    redirect('/admin/login');
}

export async function deleteContacts(ids: number[]) {
    const session = await getSession();
    if (!session) {
        return { success: false, message: 'Nicht autorisiert.' };
    }

    // Dynamic import to avoid client bundling errors
    const fs = await import('fs');
    const path = await import('path');
    const filePath = path.join(process.cwd(), 'src', 'data', 'contacts.json');

    try {
        if (!fs.existsSync(filePath)) {
            return { success: false, message: 'Datei nicht gefunden.' };
        }

        const fileContent = fs.readFileSync(filePath, 'utf8');
        const contacts: Contact[] = JSON.parse(fileContent);

        // Filtern: Behalte alles, was NICHT in der Liste der zu löschenden IDs ist
        const newContacts = contacts.filter((c: Contact) => !ids.includes(c.id));

        fs.writeFileSync(filePath, JSON.stringify(newContacts, null, 2));

        revalidatePath('/admin');
        return { success: true, message: `${ids.length} Einträge gelöscht.` };
    } catch (error) {
        console.error('Error deleting contacts:', error);
        return { success: false, message: 'Fehler beim Löschen.' };
    }
}
