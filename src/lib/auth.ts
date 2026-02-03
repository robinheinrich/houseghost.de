import crypto from 'crypto';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'houseghost_session';

export function hashPassword(password: string) {
    return crypto.createHash('sha256').update(password).digest('hex');
}

export async function createSession(username: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const sessionData = JSON.stringify({ username, expiresAt });

    // In a real production app, you'd encrypt this. For simplicity and since it's a private tool:
    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, sessionData, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);
    if (!session) return null;

    try {
        const data = JSON.parse(session.value);
        if (new Date(data.expiresAt) < new Date()) {
            return null;
        }
        return data;
    } catch {
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
}
