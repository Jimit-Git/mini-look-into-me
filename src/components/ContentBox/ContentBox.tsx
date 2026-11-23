import type { ReactNode } from 'react';
import styles from './ContentBox.module.css';

interface ContentBoxProps {
  children: ReactNode;
}

export function ContentBox({ children }: ContentBoxProps) {
  return <main className={styles.contentBox}>{children}</main>;
}
