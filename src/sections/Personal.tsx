import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseMarkdown } from '../utils/markdown';
import personalRaw from '../content/personal.md?raw';
import styles from './Personal.module.css';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' as const },
};

interface Photo {
  src: string;
  alt: string;
  caption: string;
}

interface PersonalData {
  title?: string;
  photos: Photo[];
}

function resolveAssetPath(src: string): string {
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
}

export function Personal() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { data, content } = parseMarkdown<PersonalData>(personalRaw);
  const photos = data.photos || [];

  return (
    <motion.section className={styles.personal} {...pageTransition}>
      <h2 className={styles.heading}>{data.title || 'personal'}</h2>

      {content && <p className={styles.bio}>{content}</p>}

      <div className={styles.gallery}>
        {photos.map((photo) => (
          <figure
            key={photo.src}
            className={styles.photoCard}
            onClick={() => setSelectedPhoto(photo)}
          >
            <div className={styles.imageFrame}>
              <img
                src={resolveAssetPath(photo.src)}
                alt={photo.alt}
                className={styles.photo}
                loading="lazy"
              />
            </div>
            <figcaption className={styles.caption}>{photo.caption}</figcaption>
          </figure>
        ))}
      </div>

      {/* Lightbox Preview */}
      <AnimatePresence>
        {selectedPhoto && (
          <motion.div
            className={styles.lightbox}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelectedPhoto(null)}
          >
            <div
              className={styles.lightboxContent}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className={styles.closeButton}
                onClick={() => setSelectedPhoto(null)}
                aria-label="Close"
              >
                ✕
              </button>
              <img
                src={resolveAssetPath(selectedPhoto.src)}
                alt={selectedPhoto.alt}
                className={styles.lightboxImage}
              />
              <span className={styles.lightboxCaption}>
                {selectedPhoto.caption}
              </span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.section>
  );
}
