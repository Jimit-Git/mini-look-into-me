import { motion } from 'framer-motion';
import { parseMarkdown } from '../utils/markdown';
import { resolveSkillIcon } from '../utils/iconResolver';
import skillsRaw from '../content/skills.md?raw';
import styles from './Skill.module.css';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' as const },
};

interface SkillGroup {
  category: string;
  items: string[];
}

interface SkillsData {
  title?: string;
  groups: SkillGroup[];
}

export function Skill() {
  const { data } = parseMarkdown<SkillsData>(skillsRaw);
  const groups = data.groups || [];

  return (
    <motion.section className={styles.skill} {...pageTransition}>
      <h2 className={styles.heading}>{data.title || 'skills'}</h2>
      <div className={styles.groups}>
        {groups.map((group) => (
          <div key={group.category} className={styles.group}>
            <h3 className={styles.category}>{group.category}</h3>
            <div className={styles.grid}>
              {group.items.map((itemName) => {
                const Icon = resolveSkillIcon(itemName);
                return (
                  <div key={itemName} className={styles.skillCard}>
                    <Icon className={styles.icon} />
                    <span className={styles.name}>{itemName}</span>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>
    </motion.section>
  );
}
