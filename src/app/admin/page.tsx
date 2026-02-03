import fs from 'fs';
import path from 'path';
import { redirect } from 'next/navigation';
import { getSession } from '@/lib/auth';
import styles from './admin.module.css';
import AdminDashboardClient from './AdminDashboardClient';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    timestamp: string;
}

export default async function AdminPage() {
    const session = await getSession();

    if (!session) {
        redirect('/admin/login');
    }

    const filePath = path.join(process.cwd(), 'src', 'data', 'contacts.json');
    let contacts: Contact[] = [];

    try {
        if (fs.existsSync(filePath)) {
            const fileContent = fs.readFileSync(filePath, 'utf8');
            contacts = JSON.parse(fileContent);
            // Neueste zuerst
            contacts.sort((a, b) => b.id - a.id);
        }
    } catch (error) {
        console.error('Error reading contacts:', error);
    }

    return (
        <div className={styles.adminContainer}>
            <header className={styles.header}>
                <h1>Admin Dashboard</h1>
                <p>Eingegangene Kontaktanfragen — Willkommen, {session.username}</p>
            </header>

            <AdminDashboardClient
                initialContacts={contacts}
            />
        </div>
    );
}
