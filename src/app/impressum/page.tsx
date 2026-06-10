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
                        <address>
                            <p>
                                <strong>Robin Heinrich</strong><br />
                                Lotzbeckstraße 28/1<br />
                                77933 Lahr, Deutschland<br />
                                <br />
                                Telefon: <a href="tel:+491714751217">+49 171 4751217</a><br />
                                E-Mail: <a href="mailto:info@houseghost.de">info@houseghost.de</a>
                            </p>
                        </address>
                        <p>
                            Steuerliche Informationen:<br />
                            Kleinunternehmer gemäß § 19 Abs. 1 UStG – es wird keine Umsatzsteuer ausgewiesen.
                        </p>
                        <p>
                            <strong>Haftung für Inhalte:</strong><br />
                            Als Diensteanbieter sind wir gemäß § 7 Abs. 1 TMG für eigene Inhalte auf dieser Website nach den allgemeinen Gesetzen verantwortlich. Nach §§ 8 bis 10 TMG sind wir als Diensteanbieter jedoch nicht verpflichtet, übermittelte oder gespeicherte fremde Informationen zu überwachen oder nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit hinweisen.
                            Verpflichtungen zur Entfernung oder Sperrung der Nutzung von Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt. Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend entfernen.
                        </p>

                        <p>
                            <strong>Haftung für Links</strong><br />
                            Unsere Website kann Links zu externen Websites Dritter enthalten, auf deren Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten verantwortlich.
                            Die verlinkten Seiten wurden zum Zeitpunkt der Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte waren zum Zeitpunkt der Verlinkung nicht erkennbar. Eine permanente inhaltliche Kontrolle der verlinkten Seiten ist jedoch ohne konkrete Anhaltspunkte einer Rechtsverletzung nicht zumutbar. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Links umgehend entfernen.
                        </p>

                        <p>
                            <strong>Urheberrecht</strong><br />
                            Die durch den Seitenbetreiber erstellten Inhalte und Werke auf dieser Website unterliegen dem deutschen Urheberrecht. Die Vervielfältigung, Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der Grenzen des Urheberrechts bedürfen der schriftlichen Zustimmung des jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind nur für den privaten, nicht kommerziellen Gebrauch gestattet.
                            Soweit die Inhalte auf dieser Seite nicht vom Betreiber erstellt wurden, werden die Urheberrechte Dritter beachtet. Insbesondere werden Inhalte Dritter als solche gekennzeichnet. Sollten Sie trotzdem auf eine Urheberrechtsverletzung aufmerksam werden, bitten wir um einen entsprechenden Hinweis. Bei Bekanntwerden von Rechtsverletzungen werden wir derartige Inhalte umgehend entfernen.
                        </p>

                    </section>

                    <section className={styles.section}>
                        <h2>Datenschutz</h2>
                        <p>
                            Wir nehmen den Schutz Ihrer persönlichen Daten sehr ernst.
                            Diese Website verwendet <strong>keine Cookies</strong> und
                            führt kein Tracking Ihrer Webseitenbesuche durch.
                        </p>
                        <h3>Kontaktformular</h3>
                        <p>
                            Wenn Sie uns über das Kontaktformular auf dieser Website eine Nachricht senden, werden die von Ihnen eingegebenen Daten (z.B. Name, E-Mail-Adresse, Nachricht) ausschließlich zum Zweck der Bearbeitung Ihrer Anfrage und zur Kontaktaufnahme mit Ihnen verarbeitet.
                            Rechtsgrundlage für die Verarbeitung ist Art. 6 Abs. 1 lit. b DSGVO (vorvertragliche Maßnahmen) bzw. Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse an der Beantwortung von Anfragen).
                            Die übermittelten Daten werden ausschließlich auf Servern in Deutschland gespeichert und nicht an Dritte weitergegeben, es sei denn, dies ist zur Bearbeitung Ihrer Anfrage erforderlich oder gesetzlich vorgeschrieben.
                            Ihre Daten werden gelöscht, sobald die Anfrage abschließend bearbeitet wurde und kein berechtigtes Interesse an einer weiteren Speicherung besteht, spätestens jedoch nach 3 Jahren.

                        </p>
                        <h3>Ihre Rechte</h3>
                        <p>
                            Sie haben jederzeit das Recht auf unentgeltliche Auskunft über Ihre gespeicherten personenbezogenen Daten,
                            deren Herkunft und Empfänger und den Zweck der Datenverarbeitung sowie ein Recht auf Berichtigung,
                            Sperrung oder Löschung dieser Daten.
                        </p>

                        <h3>Serverlog-Dateien</h3>
                        <p>
                            Der Hosting-Anbieter dieser Website erhebt und speichert automatisch Informationen in sogenannten Server-Log-Dateien, die Ihr Browser automatisch übermittelt. Dies sind: Browsertyp und Browserversion, verwendetes Betriebssystem, Referrer-URL, Hostname des zugreifenden Rechners, Uhrzeit der Serveranfrage sowie IP-Adresse. Diese Daten werden nicht mit anderen Datenquellen zusammengeführt und dienen ausschließlich der technischen Bereitstellung der Website, der Gewährleistung der Systemsicherheit und der Erkennung und Abwehr von Angriffen.
                        </p>
                        <p>
                            Die Datenverarbeitung erfolgt gemäß Art. 6 Abs. 1 lit. f DSGVO auf Grundlage unseres berechtigten Interesses an der technischen Bereitstellung und Sicherheit dieser Website. Die IP-Adressen werden beim Hosting-Anbieter gespeichert und in der Regel für 7 bis 30 Tage aufbewahrt, bevor sie gelöscht oder anonymisiert werden.
                        </p>

                        <h3>Betroffenenrechte und Kontakt</h3>
                        <p>
                            Sie haben das Recht auf Auskunft, Berichtigung, Löschung und Einschränkung der Verarbeitung Ihrer personenbezogenen Daten sowie das Recht auf Datenübertragbarkeit und Widerspruch. Wenden Sie sich dazu an:<br />
                        </p>
                        <dl>
                            <dt>Kontakt</dt>
                            <dd>Robin Heinrich / Houseghost Music</dd>
                            <dt>E-Mail</dt>
                            <dd><a href="mailto:robin.heinrich@mac.com">Robin.heinrich@mac.com</a></dd>
                            <dt>Telefon</dt>
                            <dd><a href="tel:+491714751217">+49 171 4751217</a></dd>
                        </dl>

                        <h3>Beschwerderecht</h3>
                        <p>
                            Sie haben das Recht, sich bei der zuständigen Datenschutz-Aufsichtsbehörde zu beschweren:<br />

                            Der Landesbeauftragte für den Datenschutz und die Informationsfreiheit Baden-Württemberg<br />
                            <address>
                                <strong>Datenschutzbeauftragte Baden-Württemberg</strong><br />
                                Postfach 10 29 32<br />
                                70025 Stuttgart<br />
                                <a href="https://www.baden-wuerttemberg.datenschutz.de" target="_blank" rel="noopener noreferrer">
                                    www.baden-wuerttemberg.datenschutz.de
                                </a>
                             </address>
                        </p>

                        <h3>Online-Streitbeilegung (OS-Plattform)</h3>
                        <p>
                            Die Europäische Kommission stellt eine Plattform zur Online-Streitbeilegung (OS) bereit:<br />
                            <a href="https://ec.europa.eu/consumers/odr" target="_blank" rel="noopener noreferrer">
                                https://ec.europa.eu/consumers/odr
                            </a><br />
                            Unsere E-Mail-Adresse finden Sie oben im Impressum. Wir sind nicht verpflichtet und nicht bereit, an einem Streitbeilegungsverfahren vor einer Verbraucherschlichtungsstelle teilzunehmen.
                        </p>
                    </section>
                </div>
            </div>
        </div>
    );
}
