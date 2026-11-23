import styles from './BottomNav.module.css';

interface BottomNavProps {
  tabs: string[];
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export function BottomNav({ tabs, activeTab, onTabChange }: BottomNavProps) {
  return (
    <nav className={styles.nav}>
      {tabs.map((tab) => (
        <button
          key={tab}
          className={`${styles.tab} ${activeTab === tab ? styles.active : ''}`}
          onClick={() => onTabChange(tab)}
        >
          {tab}
        </button>
      ))}
    </nav>
  );
}
