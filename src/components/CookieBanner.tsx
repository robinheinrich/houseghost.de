'use client';

import { useState, useEffect } from 'react';
import styles from './CookieBanner.module.css';

const CookieBanner = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const consent = localStorage.getItem('no-cookie-notice-dismissed');
            if (!consent) {
                setIsVisible(true);
            }
        }
    }, []);

    const dismiss = () => {
        localStorage.setItem('no-cookie-notice-dismissed', 'true');
        setIsVisible(false);
    };

    if (!isVisible) return null;

    return (
        <div className={`${styles.banner} glass`}>
            <p>Wir verwenden keine Cookies. Alle Daten werden ausschließlich in Deutschland verarbeitet.</p>
            <button onClick={dismiss} className={styles.close}>&times;</button>
        </div>
    );
};

export default CookieBanner;
