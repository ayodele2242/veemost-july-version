"use client";
import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import styles from './LazyImage.module.css';

interface LazyImageProps {
  src: string;
  alt: string;
  layout: 'fill' | 'fixed' | 'intrinsic' | 'responsive';
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const LazyImage: React.FC<LazyImageProps> = ({ src, alt, layout, objectFit }) => {
  const [isLoading, setIsLoading] = useState(true);
  const imageRef = useRef<HTMLImageElement | null>(null);

  useEffect(() => {
    const handleImageLoad = () => {
      setIsLoading(false);
    };

    const img = new window.Image();
    img.src = src;
    img.onload = handleImageLoad;

    return () => {
      img.onload = null; // Clean up
    };
  }, [src]);

  useEffect(() => {
    const observer = new IntersectionObserver((entries) => {
      const entry = entries[0];
      if (entry.isIntersecting) {
        setIsLoading(false); // Image is visible
        observer.disconnect(); // Stop observing once the image is in view
      }
    });

    if (imageRef.current) {
      observer.observe(imageRef.current);
    }

    return () => {
      if (imageRef.current) {
        observer.unobserve(imageRef.current); // Clean up observer
      }
    };
  }, [imageRef]);

  return (
    <div className={styles.imageWrapper}>
      {isLoading && (
        <div className={styles.placeholder}>
          <div className={styles.spinner}></div>
        </div>
      )}
      <Image
        ref={imageRef}
        src={src}
        alt={alt}
        layout={layout}
        width={500}
        height={300}
        objectFit={objectFit}
        style={{ width: '100%', maxWidth: '100%', height: '100%' }}
        className={`${isLoading ? styles.hidden : ''} ${styles.image} fadeIn group-hover:scale-130 duration-300`}
      />
    </div>
  );
};

export default LazyImage;
