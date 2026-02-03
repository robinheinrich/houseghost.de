import styles from "./impressum.module.css";

export default function Impressum() {
    return (
        <div>
            <section className={styles.header}>
                <div className="container">
                    <h1>Impressum & Datenschutz</h1>
                </div>
            </section>

            <div className="container">
                <div className={`${styles.content} glass`}>
                    <section className={styles.section}>
                        <h2>Impressum</h2>
                        <p><strong>Houseghost Music</strong> (Angaben gemäß § 5 TMG)</p>
                        <p>
                            Robin Heinrich<br />
                            Lotzbeckstraße 28/1<br />
                            77933 Lahr<br />
                            Deutschland
                        </p>
                        <p>
                            <strong>Kontakt:</strong><br />
                            Telefon: +49 171 4751217<br />
                            E-Mail: info@houseghost.de
                        </p>
                    </section>

                    <section className={styles.section}>
                        <h2>Datenschutz</h2>
                        <p>
                            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                            Diese Website verwendet <strong>keine Cookies</strong> und
                            führt kein Tracking Ihrer Webseitenbesuche durch.
                        </p>
                        <h3>Speicherung von Daten</h3>
                        <p>
                            Daten, die Sie uns über das Kontaktformular senden, werden ausschließlich zum Zweck der
                            Kommunikation mit Ihnen gespeichert. Eine Weitergabe an Dritte erfolgt nicht.
                            Sämtliche Daten werden auf Servern in <strong>Deutschland</strong> gespeichert und verarbeitet.
                        </p>
                        <h3>Ihre Rechte</h3>
                        <p>
                            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
                            deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
                            Sperrung oder Löschung dieser Daten.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
