import Image from "next/image";
import styles from "./page.module.css";
import CustomerCarousel from "@/components/CustomerCarousel";
import fs from "fs";
import path from "path";

export default function Home() {
  // Dynamically load images from public/img/Kunden
  const kundenDir = path.join(process.cwd(), "public", "img", "Kunden");
  let kundenImages: { src: string; name: string }[] = [];

  try {
    const files = fs.readdirSync(kundenDir);
    kundenImages = files
      .filter(file => /\.(jpg|jpeg|png|webp)$/i.test(file))
      .map(file => ({
        src: `/img/Kunden/${file}`,
        name: file.split(".")[0].replace(/_/g, " "),
      }));
  } catch (error) {
    console.error("Error reading Kunden directory:", error);
  }

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <Image
          src="/img/Header_Microphone_Studio.jpg"
          alt="Studio Mic"
          fill
          className={styles.heroImage}
          priority
        />
        <div className={`${styles.heroContent} glass`}>
          <h1 className={styles.heroTitle}>Houseghost Music</h1>
          <p className={styles.heroSubtitle}>Sound Design & Live Audio Engineering Experts.</p>
          <a href="/contact" className="btn">Projekt anfragen</a>
        </div>
      </section>

      <div className="container">
        {/* History Section */}
        <section className="section-padding">
          <div className={styles.history}>
            <div className={`${styles.historyContent} glass`} style={{ padding: '3rem', borderRadius: '30px' }}>
              <h2>Unsere Geschichte</h2>
              <p>
                Houseghost Music wurde im Jahr 2011 von Robin Heinrich gegründet.
                Seit über einem Jahrzehnt begleiten wir professionelle Audioprojekte in den verschiedensten Genres –
                von Pop und Rock bis hin zu Klassik und Jazz.
              </p>
              <p>
                Unsere Leidenschaft gilt dem perfekten Klang, egal ob im Studio oder bei Live-Events.
                Mit modernster Technik und langjähriger Erfahrung setzen wir Ihre Vision akustisch um.
              </p>
            </div>
            <div className={styles.founderImage}>
              <Image
                src="/img/Microphone_Jonathan_Willmann_aboutpixel.de.jpg"
                alt="Founder Work"
                fill
                className={styles.image}
                style={{ objectFit: 'cover' }}
              />
            </div>
          </div>
        </section>

        {/* Dynamic Carousel Section */}
        <section className="section-padding">
          <CustomerCarousel images={kundenImages} />
        </section>

        {/* Services Call to Action */}
        <section className={`${styles.cta} glass section-padding`} style={{ textAlign: 'center', borderRadius: '40px', marginBottom: '6rem' }}>
          <h2>Was wir für Sie tun können</h2>
          <p style={{ margin: '1.5rem 0 2.5rem', fontSize: '1.2rem' }}>
            Von Live-Events bis hin zu High-End Studioaufnahmen.
          </p>
          <a href="/services" className="btn">Unsere Services entdecken</a>
        </section>
      </div>
    </div>
  );
}
