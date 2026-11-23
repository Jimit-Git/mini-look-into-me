import { useEffect } from 'react';
import {
  RiArrowLeftLine,
  RiDownloadLine,
  RiMailLine,
  RiPhoneLine,
  RiLinkedinBoxLine,
  RiGithubLine,
  RiMapPinLine,
} from 'react-icons/ri';
import { parseMarkdown } from '../../utils/markdown';
import homeRaw from '../../content/home.md?raw';
import careerRaw from '../../content/career.md?raw';
import skillsRaw from '../../content/skills.md?raw';
import contactRaw from '../../content/contact.md?raw';
import styles from './Resume.module.css';

interface HomeData {
  name: string;
  title: string;
  status: string;
}

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
  experiences: Experience[];
  education?: Experience[];
}

interface SkillGroup {
  category: string;
  items: string[];
}

interface SkillsData {
  groups: SkillGroup[];
}

interface SocialChannel {
  name: string;
  handle: string;
  url: string;
}

interface ContactData {
  email: string;
  location?: string;
  social: SocialChannel[];
}

export function Resume() {
  const { data: homeData } = parseMarkdown<HomeData>(homeRaw);
  const { data: careerData } = parseMarkdown<CareerData>(careerRaw);
  const { data: skillsData } = parseMarkdown<SkillsData>(skillsRaw);
  const { data: contactData } = parseMarkdown<ContactData>(contactRaw);

  const experiences = careerData.experiences || [];
  const skillGroups = skillsData.groups || [];

  // Separate Work Experiences and Education
  const workExperiences = experiences.filter(
    (exp) =>
      !exp.role.toLowerCase().includes('b.e.') &&
      !exp.role.toLowerCase().includes('b.tech')
  );
  const educationExperiences =
    careerData.education && careerData.education.length > 0
      ? careerData.education
      : experiences.filter(
          (exp) =>
            exp.role.toLowerCase().includes('b.e.') ||
            exp.role.toLowerCase().includes('b.tech')
        );

  const linkedin = contactData.social?.find(
    (s) => s.name.toLowerCase() === 'linkedin'
  );
  const github = contactData.social?.find(
    (s) => s.name.toLowerCase() === 'github'
  );

  const handlePrint = () => {
    window.print();
  };

  useEffect(() => {
    document.title = `${homeData.name || 'Jimit Bhatt'} — Resume`;

    // Ensure page-level scrolling is enabled while viewing the resume
    const origHtmlOverflow = document.documentElement.style.overflow;
    const origBodyOverflow = document.body.style.overflow;
    document.documentElement.style.overflow = 'auto';
    document.body.style.overflow = 'auto';

    return () => {
      document.documentElement.style.overflow = origHtmlOverflow;
      document.body.style.overflow = origBodyOverflow;
    };
  }, [homeData.name]);

  return (
    <div className={styles.container}>
      {/* Floating Download Bar (Fixed top-middle, hidden on print) */}
      <header className={styles.floatingNav}>
        <a
          href={import.meta.env.BASE_URL}
          className={styles.backBtn}
          title="Back to portfolio"
        >
          <RiArrowLeftLine className={styles.btnIcon} />
          <span>portfolio</span>
        </a>
        <span className={styles.divider} aria-hidden="true" />
        <button onClick={handlePrint} className={styles.downloadBtn}>
          <RiDownloadLine className={styles.btnIcon} />
          <span>download pdf</span>
        </button>
      </header>

      {/* Printable Resume Canvas */}
      <main className={styles.resumePaper}>
        {/* Header */}
        <section className={styles.header}>
          <h1 className={styles.name}>{homeData.name || 'Jimit Bhatt'}</h1>
          <p className={styles.title}>
            {homeData.title || 'AI Agent Developer & Co-Lead'}
          </p>

          <div className={styles.contactBar}>
            <a
              href={`mailto:${contactData.email}`}
              className={styles.contactItem}
            >
              <RiMailLine className={styles.itemIcon} />
              <span>{contactData.email}</span>
            </a>
            <span className={styles.contactItem}>
              <RiPhoneLine className={styles.itemIcon} />
              <span>+91 915-6455-966</span>
            </span>
            {linkedin && (
              <a
                href={linkedin.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <RiLinkedinBoxLine className={styles.itemIcon} />
                <span>linkedin.com/in/{linkedin.handle}</span>
              </a>
            )}
            {github && (
              <a
                href={github.url}
                target="_blank"
                rel="noopener noreferrer"
                className={styles.contactItem}
              >
                <RiGithubLine className={styles.itemIcon} />
                <span>github.com/{github.handle}</span>
              </a>
            )}
            <span className={styles.contactItem}>
              <RiMapPinLine className={styles.itemIcon} />
              <span>Pune, India</span>
            </span>
          </div>
        </section>

        {/* Executive Summary */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>executive summary</h2>
          <p className={styles.summaryText}>
            AI Agent Developer with 6+ years of software engineering experience
            across Python and Java, specializing in Generative AI and Agentic
            Systems for financial services platforms. Currently at Capgemini,
            co-leading autonomous multi-agent architectures for the Orchestrate AI
            platform.
          </p>
        </section>

        {/* Work Experience */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>work experience</h2>
          <div className={styles.timeline}>
            {workExperiences.map((exp) => (
              <div
                key={`${exp.period}-${exp.role}`}
                className={styles.timelineEntry}
              >
                <span
                  className={`${styles.nodeDot} ${
                    exp.current ? styles.nodeDotCurrent : ''
                  }`}
                  aria-hidden="true"
                />
                <div className={styles.entryHeader}>
                  <div className={styles.roleOrg}>
                    <h3 className={styles.role}>{exp.role}</h3>
                    <span className={styles.org}>{exp.org}</span>
                  </div>
                  <div className={styles.periodLocation}>
                    <span className={styles.period}>{exp.period}</span>
                    {exp.location && (
                      <span className={styles.location}>{exp.location}</span>
                    )}
                  </div>
                </div>

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
              </div>
            ))}
          </div>
        </section>

        {/* Technical Skills */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>technical skills</h2>
          <div className={styles.skillsGrid}>
            {skillGroups.map((group) => (
              <div key={group.category} className={styles.skillCategory}>
                <span className={styles.categoryName}>
                  {group.category}:
                </span>
                <span className={styles.categoryItems}>
                  {group.items.join(', ')}
                </span>
              </div>
            ))}
          </div>
        </section>

        {/* Education & Certifications */}
        <section className={styles.section}>
          <h2 className={styles.sectionTitle}>education & certifications</h2>
          <div className={styles.educationBlock}>
            {educationExperiences.map((edu) => (
              <div key={edu.role} className={styles.eduEntry}>
                <div className={styles.eduHeader}>
                  <div className={styles.eduRoleOrg}>
                    <h3 className={styles.eduRole}>{edu.role}</h3>
                    <span className={styles.eduOrg}>{edu.org}</span>
                  </div>
                  <span className={styles.eduPeriod}>{edu.period}</span>
                </div>
                <p className={styles.eduDesc}>{edu.description}</p>
              </div>
            ))}

            <div className={styles.certBlock}>
              <span className={styles.certLabel}>certifications:</span>
              <ul className={styles.certList}>
                <li>AWS Certified AI Practitioner (AIF-C01)</li>
                <li>AWS Cloud Practitioner (CLF-C02)</li>
              </ul>
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
