"use client"
import { useState, useEffect } from 'react';
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

  useEffect(() => {
    const img = new window.Image();
    img.src = src;
    img.onload = () => {
      //console.log('Image loaded');
      setIsLoading(false);
    };
  }, [src]);

  return (
    <div className={styles.imageWrapper}>
      {isLoading && (
        <div className={styles.placeholder}>
          <div className={styles.spinner}></div>
      </div>
      )}

      {/*<img src={src} 
        alt={alt} 
        style={{ width: '100%', maxWidth: '100%', height: '100%'}}  
        className={`${isLoading ? styles.hidden : ''} ${styles.image} fadeIn group-hover:scale-110 duration-300`}
        />*/}
      
      <Image
        src={src}
        alt={alt}
        layout={layout}
        width={500} 
        height={300}
        objectFit={objectFit}
        style={{ width: '100%', maxWidth: '100%', height: '100%'}} 
        className={`${isLoading ? styles.hidden : ''} ${styles.image} fadeIn group-hover:scale-110 duration-300`}
      />
    </div>
  );
};

export default LazyImage;

