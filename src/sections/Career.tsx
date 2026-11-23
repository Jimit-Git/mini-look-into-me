import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RiArrowDownSLine } from 'react-icons/ri';
import { parseMarkdown } from '../utils/markdown';
import careerRaw from '../content/career.md?raw';
import styles from './Career.module.css';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' as const },
};

interface Experience {
  period: string;
  role: string;
  org: string;
  location?: string;
  description: string;
  current?: boolean;
  tags?: string[];
}

interface CareerData {
  title?: string;
  experiences: Experience[];
  education?: Experience[];
}

export function Career() {
  const { data } = parseMarkdown<CareerData>(careerRaw);
  const allExperiences = data.experiences || [];

  // Separate work experiences and education
  const workExperiences = allExperiences.filter(
    (exp) =>
      !exp.role.toLowerCase().includes('b.e.') &&
      !exp.role.toLowerCase().includes('b.tech')
  );

  const educationList =
    data.education && data.education.length > 0
      ? data.education
      : allExperiences.filter(
          (exp) =>
            exp.role.toLowerCase().includes('b.e.') ||
            exp.role.toLowerCase().includes('b.tech')
        );

  // Latest career role (index 0) is expanded by default; older ones are collapsed
  const [expandedIndex, setExpandedIndex] = useState<number | null>(0);
  const [expandedEduIndex, setExpandedEduIndex] = useState<number | null>(null);

  const handleToggleWork = (index: number) => {
    setExpandedIndex((prev) => (prev === index ? null : index));
  };

  const handleToggleEdu = (index: number) => {
    setExpandedEduIndex((prev) => (prev === index ? null : index));
  };

  return (
    <motion.section className={styles.career} {...pageTransition}>
      <h2 className={styles.heading}>{data.title || 'career'}</h2>

      {/* Work Experiences Timeline */}
      <div className={styles.timeline}>
        {workExperiences.map((exp, index) => {
          const isExpanded = expandedIndex === index;
          return (
            <div
              key={`${exp.period}-${exp.role}`}
              className={`${styles.entry} ${
                isExpanded ? styles.entryExpanded : styles.entryCollapsed
              }`}
              onClick={() => handleToggleWork(index)}
              role="button"
              tabIndex={0}
              onKeyDown={(e) => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault();
                  handleToggleWork(index);
                }
              }}
              aria-expanded={isExpanded}
            >
              <span
                className={`${styles.nodeDot} ${
                  exp.current ? styles.nodeDotCurrent : ''
                } ${isExpanded ? styles.nodeDotActive : ''}`}
                aria-hidden="true"
              />

              <div className={styles.headerRow}>
                <span className={styles.period}>{exp.period}</span>
                {exp.current && (
                  <span className={styles.currentBadge}>
                    <span className={styles.currentPulse} />
                    present
                  </span>
                )}
                {exp.location && (
                  <span className={styles.location}>/ {exp.location}</span>
                )}
                <div className={styles.expandTrigger}>
                  <RiArrowDownSLine
                    className={`${styles.expandIcon} ${
                      isExpanded ? styles.expandIconRotated : ''
                    }`}
                    aria-label={isExpanded ? 'Collapse' : 'Expand'}
                  />
                </div>
              </div>

              <div className={styles.details}>
                <div className={styles.roleOrgRow}>
                  <h3 className={styles.role}>{exp.role}</h3>
                  <span className={styles.org}>{exp.org}</span>
                </div>

                <AnimatePresence initial={false}>
                  {isExpanded && (
                    <motion.div
                      key="content"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: 'auto' }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.25, ease: 'easeInOut' as const }}
                      className={styles.expandedContent}
                    >
                      <p className={styles.description}>{exp.description}</p>
                      {exp.tags && exp.tags.length > 0 && (
                        <div className={styles.tags}>
                          {exp.tags.map((tag) => (
                            <span key={tag} className={styles.tag}>
                              {tag}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
          );
        })}
      </div>

      {/* Separate Education Section */}
      {educationList.length > 0 && (
        <div className={styles.educationSection}>
          <div className={styles.subHeadingRow}>
            <span className={styles.subHeadingPrefix}>//</span>
            <h3 className={styles.subHeading}>education</h3>
          </div>

          <div className={styles.timeline}>
            {educationList.map((edu, index) => {
              const isExpanded = expandedEduIndex === index;
              return (
                <div
                  key={`${edu.period}-${edu.role}`}
                  className={`${styles.entry} ${
                    isExpanded ? styles.entryExpanded : styles.entryCollapsed
                  }`}
                  onClick={() => handleToggleEdu(index)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      e.preventDefault();
                      handleToggleEdu(index);
                    }
                  }}
                  aria-expanded={isExpanded}
                >
                  <span
                    className={`${styles.nodeDot} ${
                      isExpanded ? styles.nodeDotActive : ''
                    }`}
                    aria-hidden="true"
                  />

                  <div className={styles.headerRow}>
                    <span className={styles.period}>{edu.period}</span>
                    {edu.location && (
                      <span className={styles.location}>/ {edu.location}</span>
                    )}
                    <div className={styles.expandTrigger}>
                      <RiArrowDownSLine
                        className={`${styles.expandIcon} ${
                          isExpanded ? styles.expandIconRotated : ''
                        }`}
                        aria-label={isExpanded ? 'Collapse' : 'Expand'}
                      />
                    </div>
                  </div>

                  <div className={styles.details}>
                    <div className={styles.roleOrgRow}>
                      <h3 className={styles.role}>{edu.role}</h3>
                      <span className={styles.org}>{edu.org}</span>
                    </div>

                    <AnimatePresence initial={false}>
                      {isExpanded && (
                        <motion.div
                          key="content"
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: 'auto' }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{
                            duration: 0.25,
                            ease: 'easeInOut' as const,
                          }}
                          className={styles.expandedContent}
                        >
                          <p className={styles.description}>
                            {edu.description}
                          </p>
                          {edu.tags && edu.tags.length > 0 && (
                            <div className={styles.tags}>
                              {edu.tags.map((tag) => (
                                <span key={tag} className={styles.tag}>
                                  {tag}
                                </span>
                              ))}
                            </div>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </motion.section>
  );
}
