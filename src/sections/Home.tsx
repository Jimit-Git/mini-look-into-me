import { motion } from 'framer-motion';
import { parseMarkdown } from '../utils/markdown';
import homeRaw from '../content/home.md?raw';
import TechText from '../components/TechText/TechText';
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
      <div className={styles.nameContainer}>
        <h1 className={styles.srOnly}>{data.name || 'Jimit Bhatt'}</h1>
        <TechText
          text={data.name || 'Jimit Bhatt'}
          fontFamily="var(--font-mono)"
          fontWeight={600}
          fontSize={52}
          letterSpacing={-0.03}
          align="left"
          color="var(--text-primary)"
          accentColor="var(--accent)"
          reveal="letter"
          selection={true}
          labels={true}
          specks={14}
          sweep={true}
          speed={0.8}
          clickKick={true}
          draggable={true}
          lineStyle="dashed"
          dashLength={4}
          dashGap={2}
          strokeWidth={1.5}
        />
      </div>
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
