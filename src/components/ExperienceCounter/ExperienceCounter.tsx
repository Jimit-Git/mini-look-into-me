import { useState, useEffect } from 'react';
import Counter from '../Counter/Counter';
import styles from './ExperienceCounter.module.css';

// Career start date: September 1, 2020 (Accenture — Walmart GLS NextGen)
const CAREER_START = new Date('2020-09-01T00:00:00');

interface ExperienceTime {
  years: number;
  months: number;
  days: number;
}

function calculateExperience(): ExperienceTime {
  const now = new Date();

  let years = now.getFullYear() - CAREER_START.getFullYear();
  let months = now.getMonth() - CAREER_START.getMonth();
  let days = now.getDate() - CAREER_START.getDate();

  if (days < 0) {
    // Borrow days from the previous month
    months--;
    const prevMonthLastDay = new Date(now.getFullYear(), now.getMonth(), 0).getDate();
    days += prevMonthLastDay;
  }

  if (months < 0) {
    years--;
    months += 12;
  }

  return { years, months, days };
}

export function ExperienceCounter() {
  const [time, setTime] = useState<ExperienceTime>(calculateExperience);

  useEffect(() => {
    const tick = () => {
      const next = calculateExperience();
      setTime(prev => {
        if (
          prev.years === next.years &&
          prev.months === next.months &&
          prev.days === next.days
        ) {
          return prev;
        }
        return next;
      });
    };

    // Check periodically for day rollover
    const interval = setInterval(tick, 30000);
    return () => clearInterval(interval);
  }, []);

  const fullTooltip = `${time.years} years, ${time.months} months, and ${time.days} days of engineering experience (Sep 2020 — Present)`;

  return (
    <div
      className={styles.counterWrapper}
      title={fullTooltip}
      role="status"
      aria-label={`Engineering experience: ${time.years} years, ${time.months} months, ${time.days} days`}
    >
      <span className={styles.liveIndicator} aria-hidden="true" />
      <span className={styles.prefix}>exp:</span>

      <div className={styles.metrics}>
        {/* Years */}
        <span className={styles.unitBlock}>
          <Counter
            value={time.years}
            fontSize="0.75rem"
            fontWeight={500}
            textColor="var(--text-primary)"
            duration={0.7}
            bounce={0.15}
            fade={0.2}
          />
          <span className={styles.unitLabel}>y</span>
        </span>

        <span className={styles.separator}>·</span>

        {/* Months */}
        <span className={styles.unitBlock}>
          <Counter
            value={time.months}
            fontSize="0.75rem"
            fontWeight={500}
            textColor="var(--text-primary)"
            duration={0.7}
            bounce={0.15}
            fade={0.2}
          />
          <span className={styles.unitLabel}>m</span>
        </span>

        <span className={styles.separator}>·</span>

        {/* Days */}
        <span className={styles.unitBlock}>
          <Counter
            value={time.days}
            fontSize="0.75rem"
            fontWeight={500}
            textColor="var(--text-primary)"
            duration={0.7}
            bounce={0.15}
            fade={0.2}
          />
          <span className={styles.unitLabel}>d</span>
        </span>
      </div>
    </div>
  );
}

export default ExperienceCounter;
