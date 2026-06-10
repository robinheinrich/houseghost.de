import styles from "./services.module.css";

const services = [
    {
        title: "Live Events & Corporate",
        description: "Professionelle Betreuung von Live-Events und Corporate Events. Wir sorgen für den perfekten Sound vor Ort.",
        icon: "🎤"
    },
    {
        title: "Jingles & Soundeffects",
        description: "Individuelle Audio-Lösungen für Werbung, Programme und Spiele. Einzigartige Sounds, die im Gedächtnis bleiben.",
        icon: "🎵"
    },
    {
        title: "Aufnahme vor Ort",
        description: "Mobile Recording-Lösungen für Bands, Orchester und Solisten direkt an Ihrem Wunschort.",
        icon: "💿"
    },
    {
        title: "Lautstärkeüberwachung",
        description: "Präzise Überwachung von Konzertlautstärken nach DIN 15905-5 zum Schutz des Publikums.",
        icon: "📊"
    },
    {
        title: "Konzertmitschnitte",
        description: "Hochwertige Mehrspur-Aufnahmen Ihrer Konzerte für spätere Mixe oder Veröffentlichungen.",
        icon: "⏺️"
    },
    {
        title: "Event-Tontechnik",
        description: "Ausstattung kleinerer Events mit erstklassiger Tontechnik – kompakt und leistungsstark.",
        icon: "🔊"
    }
];

export default function Services() {
    return (
        <div>
            <section className={styles.servicesHeader}>
                <div className="container">
                    <h1 className={styles.servicesTitle}>Unsere Services</h1>
                    <p className={styles.servicesIntro}>
                        Maßgeschneiderte Audio-Lösungen für Ihre Projekte.
                        Von der ersten Planung bis zur finalen Umsetzung.
                    </p>
                </div>
            </section>

            <div className="container">
                <div className={styles.grid}>
                    {services.map((service, idx) => (
                        <div key={idx} className={`${styles.card} glass`}>
                            <div className={styles.cardIcon}>{service.icon}</div>
                            <h3>{service.title}</h3>
                            <p>{service.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}
