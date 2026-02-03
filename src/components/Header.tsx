'use client';

import { useState } from 'react';
import Link from 'next/link';
import styles from './Header.module.css';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <header className={`${styles.header} glass`}>
      <div className={`${styles.container} container`}>
        <Link href="/" className={styles.logo}>
          Houseghost Music
        </Link>

        <nav className={`${styles.nav} ${isMenuOpen ? styles.navOpen : ''}`}>
          <Link href="/" onClick={() => setIsMenuOpen(false)}>Main</Link>
          <Link href="/services" onClick={() => setIsMenuOpen(false)}>Services</Link>
          <Link href="/contact" onClick={() => setIsMenuOpen(false)}>Contact</Link>
        </nav>

        <button 
          className={styles.hamburger} 
          onClick={() => setIsMenuOpen(!isMenuOpen)}
          aria-label="Toggle menu"
        >
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar1 : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar2 : ''}`}></span>
          <span className={`${styles.bar} ${isMenuOpen ? styles.bar3 : ''}`}></span>
        </button>
      </div>
    </header>
  );
};

export default Header;
