import styles from './Footer.module.css';

const Footer = () => {
    return (
        <footer className={styles.footer}>
            <div className={`${styles.container} container`}>
                <div>Houseghost Music — Modern sound since 2011.</div>
                <div>&copy; {new Date().getFullYear()} | <a href="/impressum">Impressum & Datenschutz</a></div>
            </div>
        </footer>
    );
};

export default Footer;
