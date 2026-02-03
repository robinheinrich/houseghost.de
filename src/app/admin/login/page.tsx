'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { login } from '../actions';
import styles from './login.module.css';

export default function LoginPage() {
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
        e.preventDefault();
        setLoading(true);
        setError('');

        const formData = new FormData(e.currentTarget);
        const result = await login(formData);

        if (result.success) {
            router.push('/admin');
            router.refresh();
        } else {
            setError(result.message || 'Login fehlgeschlagen');
            setLoading(false);
        }
    }

    return (
        <div className={styles.loginContainer}>
            <div className={`${styles.loginCard} glass`}>
                <h1 className={styles.title}>Admin Login</h1>
                <form className={styles.form} onSubmit={handleSubmit}>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Benutzername</label>
                        <input
                            type="text"
                            name="username"
                            className={styles.input}
                            required
                            autoFocus
                        />
                    </div>
                    <div className={styles.formGroup}>
                        <label className={styles.label}>Passwort</label>
                        <input
                            type="password"
                            name="password"
                            className={styles.input}
                            required
                        />
                    </div>

                    {error && <p className={styles.error}>{error}</p>}

                    <button type="submit" className={styles.btnLogin} disabled={loading}>
                        {loading ? 'Anmelden...' : 'Anmelden'}
                    </button>
                </form>
            </div>
        </div>
    );
}
