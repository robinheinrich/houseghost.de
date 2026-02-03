'use client';

import { useState } from 'react';
import { deleteContacts, logout } from './actions';
import styles from './admin.module.css';

interface Contact {
    id: number;
    name: string;
    email: string;
    message: string;
    timestamp: string;
}

export default function AdminDashboardClient({
    initialContacts,
}: {
    initialContacts: Contact[];
}) {
    const [selectedIds, setSelectedIds] = useState<number[]>([]);
    const [isDeleting, setIsDeleting] = useState(false);

    const toggleSelect = (id: number) => {
        setSelectedIds((prev) =>
            prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
        );
    };

    const selectAll = () => {
        if (selectedIds.length === initialContacts.length) {
            setSelectedIds([]);
        } else {
            setSelectedIds(initialContacts.map((c) => c.id));
        }
    };

    const handleDelete = async () => {
        if (!confirm(`Möchten Sie ${selectedIds.length} Einträge wirklich löschen?`)) return;

        setIsDeleting(true);
        const result = await deleteContacts(selectedIds);
        setIsDeleting(false);

        if (result.success) {
            alert(result.message);
            setSelectedIds([]);
        } else {
            alert(result.message);
        }
    };

    const handleExportCSV = () => {
        if (initialContacts.length === 0) return;

        const headers = ['Datum', 'Name', 'Email', 'Nachricht'];
        const csvContent = [
            headers.join(';'),
            ...initialContacts.map((c) => [
                new Date(c.timestamp).toLocaleString('de-DE'),
                `"${c.name.replace(/"/g, '""')}"`,
                `"${c.email.replace(/"/g, '""')}"`,
                `"${c.message.replace(/"/g, '""').replace(/\n/g, ' ')}"`
            ].join(';'))
        ].join('\n');

        const blob = new Blob(["\ufeff" + csvContent], { type: 'text/csv;charset=utf-8;' });
        const url = URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.setAttribute('href', url);
        link.setAttribute('download', `houseghost_kontakte_${new Date().toISOString().split('T')[0]}.csv`);
        link.style.visibility = 'hidden';
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
    };

    return (
        <>
            <div className={styles.actionBar}>
                <button
                    className={styles.btnDelete}
                    onClick={handleDelete}
                    disabled={selectedIds.length === 0 || isDeleting}
                >
                    {isDeleting ? 'Löschen...' : `Markierte löschen (${selectedIds.length})`}
                </button>
                <button
                    className={styles.btnExport}
                    onClick={handleExportCSV}
                    disabled={initialContacts.length === 0}
                >
                    CSV Export
                </button>
                <button
                    className={styles.btnLogout}
                    onClick={() => logout()}
                >
                    Logout
                </button>
            </div>

            <div className={`${styles.tableWrapper} glass`}>
                {initialContacts.length === 0 ? (
                    <p style={{ textAlign: 'center', padding: '2rem' }}>Noch keine Nachrichten vorhanden.</p>
                ) : (
                    <table className={styles.table}>
                        <thead>
                            <tr>
                                <th>
                                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                                        <input
                                            type="checkbox"
                                            className={styles.checkbox}
                                            checked={selectedIds.length === initialContacts.length && initialContacts.length > 0}
                                            onChange={selectAll}
                                        />
                                        <span>Auswählen</span>
                                    </div>
                                </th>
                                <th>Datum</th>
                                <th>Name</th>
                                <th>E-Mail</th>
                                <th>Nachricht</th>
                            </tr>
                        </thead>
                        <tbody>
                            {initialContacts.map((contact) => (
                                <tr key={contact.id}>
                                    <td>
                                        <input
                                            type="checkbox"
                                            className={styles.checkbox}
                                            checked={selectedIds.includes(contact.id)}
                                            onChange={() => toggleSelect(contact.id)}
                                        />
                                    </td>
                                    <td className={styles.timestamp}>
                                        {new Date(contact.timestamp).toLocaleString('de-DE')}
                                    </td>
                                    <td><strong>{contact.name}</strong></td>
                                    <td>{contact.email}</td>
                                    <td className={styles.messageCell}>{contact.message}</td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}
