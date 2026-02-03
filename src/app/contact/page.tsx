'use client';

import { useState } from 'react';
import { submitContactForm } from './actions';
import styles from './contact.module.css';

export default function Contact() {
    const [status, setStatus] = useState<{ success: boolean; message: string } | null>(null);
    const [isPending, setIsPending] = useState(false);

    const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        setIsPending(true);

        const formData = new FormData(event.currentTarget);
        const result = await submitContactForm(formData);

        setStatus(result);
        setIsPending(false);

        if (result.success) {
            (event.target as HTMLFormElement).reset();
        }
    };

    return (
        <div>
            <section className={styles.contactHeader}>
                <div className="container">
                    <h1>Kontakt</h1>
                    <p>Lassen Sie uns über Ihr nächstes Audio-Projekt sprechen.</p>
                </div>
            </section>

            <div className="container">
                <div className={`${styles.formContainer} glass`}>
                    <form onSubmit={handleSubmit} className={styles.form}>
                        <div className={styles.formGroup}>
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                id="name"
                                name="name"
                                required
                                className={styles.input}
                                placeholder="Ihr Name"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="email">E-Mail</label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                required
                                className={styles.input}
                                placeholder="ihre@email.de"
                            />
                        </div>

                        <div className={styles.formGroup}>
                            <label htmlFor="message">Nachricht</label>
                            <textarea
                                id="message"
                                name="message"
                                required
                                className={styles.textarea}
                                placeholder="Wie können wir Ihnen helfen?"
                            ></textarea>
                        </div>

                        <button
                            type="submit"
                            className={`btn ${styles.submitBtn}`}
                            disabled={isPending}
                        >
                            {isPending ? 'Wird gesendet...' : 'Nachricht senden'}
                        </button>
                    </form>

                    {status && (
                        <div className={`${styles.status} ${status.success ? styles.success : styles.error}`}>
                            {status.message}
                        </div>
                    )}

                    <p className={styles.legalNotice}>
                        Hinweis: Mit dem Abschicken des Kontaktformulars erklären Sie sich einverstanden,
                        dass Ihre Daten zur Kommunikation gespeichert werden.
                        Ihre Daten werden ausschließlich auf Servern in Deutschland gespeichert.
                    </p>
                </div>
            </div>
        </div>
    );
}
