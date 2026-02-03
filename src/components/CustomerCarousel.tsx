'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import styles from './CustomerCarousel.module.css';

interface CustomerImage {
    src: string;
    name: string;
}

const CustomerCarousel = ({ images }: { images: CustomerImage[] }) => {
    const [currentIndex, setCurrentIndex] = useState(0);

    useEffect(() => {
        if (images.length === 0) return;
        const interval = setInterval(() => {
            setCurrentIndex((prev) => (prev + 1) % images.length);
        }, 5000);
        return () => clearInterval(interval);
    }, [images.length]);

    if (images.length === 0) return null;

    return (
        <div className={styles.carouselContainer}>
            <h2 className={styles.title}>Unsere Kunden</h2>
            <div className={`${styles.carousel} glass`}>
                <div
                    className={styles.track}
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {images.map((img, idx) => (
                        <div key={idx} className={styles.slide}>
                            <div className={styles.imageWrapper}>
                                <Image
                                    src={img.src}
                                    alt={img.name}
                                    fill
                                    className={styles.image}
                                    sizes="(max-width: 768px) 100vw, 800px"
                                />
                            </div>
                            <div className={styles.caption}>
                                <span>{img.name}</span>
                            </div>
                        </div>
                    ))}
                </div>

                <button
                    className={`${styles.navBtn} ${styles.prev}`}
                    onClick={() => setCurrentIndex((prev) => (prev - 1 + images.length) % images.length)}
                >
                    &#10094;
                </button>
                <button
                    className={`${styles.navBtn} ${styles.next}`}
                    onClick={() => setCurrentIndex((prev) => (prev + 1) % images.length)}
                >
                    &#10095;
                </button>

                <div className={styles.dots}>
                    {images.map((_, idx) => (
                        <span
                            key={idx}
                            className={`${styles.dot} ${idx === currentIndex ? styles.activeDot : ''}`}
                            onClick={() => setCurrentIndex(idx)}
                        ></span>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default CustomerCarousel;
