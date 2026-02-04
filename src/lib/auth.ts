import crypto from 'crypto';
import bcrypt from 'bcryptjs';
import { cookies } from 'next/headers';

const AUTH_COOKIE_NAME = 'houseghost_session';
const ALGORITHM = 'aes-256-gcm';
const IV_LENGTH = 12; // Standard for GCM
const AUTH_TAG_LENGTH = 16;

function getSecretKey() {
    const secret = process.env.AUTH_SECRET || 'fallback-secret-at-least-32-chars-long-12345';
    // Ensure we have exactly 32 bytes for aes-256
    return crypto.createHash('sha256').update(secret).digest();
}

export function hashPassword(password: string) {
    const salt = bcrypt.genSaltSync(12);
    return bcrypt.hashSync(password, salt);
}

export function verifyPassword(password: string, hash: string) {
    try {
        return bcrypt.compareSync(password, hash);
    } catch (error) {
        console.error('Password verification failed:', error);
        return false;
    }
}

/**
 * Encrypts session data into a secure string
 */
function encrypt(text: string) {
    const iv = crypto.randomBytes(IV_LENGTH);
    const cipher = crypto.createCipheriv(ALGORITHM, getSecretKey(), iv);

    let encrypted = cipher.update(text, 'utf8', 'hex');
    encrypted += cipher.final('hex');

    const authTag = cipher.getAuthTag().toString('hex');

    // Format: iv:authTag:encryptedData
    return `${iv.toString('hex')}:${authTag}:${encrypted}`;
}

/**
 * Decrypts a secure session string
 */
function decrypt(ciphertext: string) {
    try {
        const [ivHex, authTagHex, encryptedData] = ciphertext.split(':');
        if (!ivHex || !authTagHex || !encryptedData) return null;

        const iv = Buffer.from(ivHex, 'hex');
        const authTag = Buffer.from(authTagHex, 'hex');
        const decipher = crypto.createDecipheriv(ALGORITHM, getSecretKey(), iv);

        decipher.setAuthTag(authTag);

        let decrypted = decipher.update(encryptedData, 'hex', 'utf8');
        decrypted += decipher.final('utf8');

        return decrypted;
    } catch (err) {
        console.error('Session decryption failed:', err);
        return null;
    }
}

export async function createSession(username: string) {
    const expiresAt = new Date(Date.now() + 7 * 24 * 60 * 60 * 1000); // 7 days
    const sessionData = JSON.stringify({ username, expiresAt: expiresAt.toISOString() });

    const token = encrypt(sessionData);

    const isProd = process.env.NODE_ENV === 'production';
    console.log(`Creating session for: ${username}, secure: ${isProd}`);

    const cookieStore = await cookies();
    cookieStore.set(AUTH_COOKIE_NAME, token, {
        httpOnly: true,
        secure: isProd,
        sameSite: 'lax',
        expires: expiresAt,
        path: '/',
    });
}

export async function getSession() {
    const cookieStore = await cookies();
    const session = cookieStore.get(AUTH_COOKIE_NAME);

    if (!session) {
        console.log('getSession: No session cookie found');
        return null;
    }

    const decrypted = decrypt(session.value);
    if (!decrypted) {
        console.log('getSession: Decryption failed or empty');
        return null;
    }

    try {
        const data = JSON.parse(decrypted);
        if (new Date(data.expiresAt) < new Date()) {
            console.log('getSession: Session expired');
            return null;
        }
        return data;
    } catch (e) {
        console.log('getSession: JSON parse failed', e);
        return null;
    }
}

export async function deleteSession() {
    const cookieStore = await cookies();
    cookieStore.delete(AUTH_COOKIE_NAME);
}
