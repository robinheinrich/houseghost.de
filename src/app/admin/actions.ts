'use server';

import { revalidatePath } from 'next/cache';
import { redirect } from 'next/navigation';
import { hashPassword, createSession, getSession, deleteSession } from '@/lib/auth';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    timestamp: string;
}

export async function login(formData: FormData) {
    const username = formData.get('username') as string;
    const password = formData.get('password') as string;

    const validUsername = process.env.ADMIN_USERNAME;
    const validHash = process.env.ADMIN_PASSWORD_HASH;

    if (username === validUsername && hashPassword(password) === validHash) {
        await createSession(username);
        return { success: true };
    }

    return { success: false, message: 'Ungültige Anmeldedaten.' };
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
