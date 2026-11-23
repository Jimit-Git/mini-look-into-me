import { useState } from 'react';
import { AnimatePresence } from 'framer-motion';
import { ContentBox } from '../ContentBox/ContentBox';
import { BottomNav } from '../BottomNav/BottomNav';
import { ThemeToggle } from '../ThemeToggle/ThemeToggle';
import { useTheme } from '../../hooks/useTheme';
import { Home } from '../../sections/Home';
import { Skill } from '../../sections/Skill';
import { Career } from '../../sections/Career';
import { Personal } from '../../sections/Personal';
import { Contact } from '../../sections/Contact';
import styles from './Layout.module.css';

const tabs = ['Home', 'Skill', 'Career', 'Personal', 'Contact'] as const;
export type Tab = (typeof tabs)[number];

const sections: Record<Tab, React.FC> = {
  Home,
  Skill,
  Career,
  Personal,
  Contact,
};

export function Layout() {
  const [activeTab, setActiveTab] = useState<Tab>('Home');
  const { theme, toggleTheme } = useTheme();

  const ActiveSection = sections[activeTab];

  return (
    <div className={styles.layout}>
      <ThemeToggle theme={theme} onToggle={toggleTheme} />
      <ContentBox>
        <AnimatePresence mode="wait">
          <ActiveSection key={activeTab} />
        </AnimatePresence>
      </ContentBox>
      <BottomNav
        tabs={[...tabs]}
        activeTab={activeTab}
        onTabChange={(tab) => setActiveTab(tab as Tab)}
      />
    </div>
  );
}
