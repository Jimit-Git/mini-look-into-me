import { motion } from 'framer-motion';
import { parseMarkdown } from '../utils/markdown';
import homeRaw from '../content/home.md?raw';
import styles from './Home.module.css';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' as const },
};

interface HomeData {
  name: string;
  title: string;
  status: string;
}

export function Home() {
  const { data, content } = parseMarkdown<HomeData>(homeRaw);

  return (
    <motion.section className={styles.home} {...pageTransition}>
      {data.status && (
        <div className={styles.status}>
          <span className={styles.statusDot} />
          <span>{data.status}</span>
        </div>
      )}
      <h1 className={styles.name}>{data.name}</h1>
      <p className={styles.title}>{data.title}</p>
      {content && (
        <p className={styles.intro}>
          {content.split('\n').map((line, i) => (
            <span key={i}>
              {line}
              {i < content.split('\n').length - 1 && <br />}
            </span>
          ))}
        </p>
      )}
    </motion.section>
  );
}
