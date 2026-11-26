import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { parseMarkdown } from '../utils/markdown';
import personalRaw from '../content/personal.md?raw';
import BounceCards from '../components/BounceCards/BounceCards';
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
  if (src.startsWith('http://') || src.startsWith('https://')) return src;
  return `${import.meta.env.BASE_URL}${src.replace(/^\//, '')}`;
}

export function Personal() {
  const [selectedPhoto, setSelectedPhoto] = useState<Photo | null>(null);
  const { data, content } = parseMarkdown<PersonalData>(personalRaw);
  const photos = data.photos || [];

  const bounceImages = photos.map((photo) => ({
    src: resolveAssetPath(photo.src),
    alt: photo.alt || photo.caption,
  }));

  const handleCardClick = (index: number) => {
    if (photos[index]) {
      setSelectedPhoto(photos[index]);
    }
  };

  return (
    <motion.section className={styles.personal} {...pageTransition}>
      <h2 className={styles.heading}>{data.title || 'personal'}</h2>

      {content && <p className={styles.bio}>{content}</p>}

      {/* BounceCards Fan Layout */}
      <div className={styles.bounceCardsWrapper}>
        <BounceCards
          images={bounceImages}
          containerWidth={480}
          containerHeight={280}
          cardSize={165}
          spread={90}
          rotation={8}
          pushDistance={115}
          hoverScale={1.1}
          borderWidth={4}
          borderColor="var(--card-border, #ffffff)"
          radius={12}
          onCardClick={handleCardClick}
        />
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
