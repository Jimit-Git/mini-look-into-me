import { useState } from 'react';
import { motion } from 'framer-motion';
import type { IconType } from 'react-icons';
import { SiGithub, SiInstagram } from 'react-icons/si';
import {
  RiLinkedinFill,
  RiMailSendLine,
  RiFileCopyLine,
  RiCheckLine,
  RiArrowRightUpLine,
  RiGlobalLine,
  RiFileTextLine,
} from 'react-icons/ri';
import { parseMarkdown } from '../utils/markdown';
import contactRaw from '../content/contact.md?raw';
import styles from './Contact.module.css';

const pageTransition = {
  initial: { opacity: 0, y: 12 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -12 },
  transition: { duration: 0.35, ease: 'easeInOut' as const },
};

interface SocialChannel {
  name: string;
  handle: string;
  url: string;
}

interface ContactData {
  title?: string;
  intro?: string;
  email: string;
  status?: string;
  location?: string;
  responseTime?: string;
  social: SocialChannel[];
}

const socialIconMap: Record<string, IconType> = {
  github: SiGithub,
  linkedin: RiLinkedinFill,
  instagram: SiInstagram,
};

function getSocialIcon(name: string): IconType {
  return socialIconMap[name.toLowerCase().trim()] || RiGlobalLine;
}

export function Contact() {
  const [copied, setCopied] = useState(false);
  const { data } = parseMarkdown<ContactData>(contactRaw);
  const email = data.email || 'jimitbhatt.w@gmail.com';
  const socialChannels = data.social || [];

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(email);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // Fallback
    }
  };

  return (
    <motion.section className={styles.contact} {...pageTransition}>
      <div className={styles.header}>
        <h2 className={styles.heading}>{data.title || 'contact'}</h2>
        {data.intro && <p className={styles.intro}>{data.intro}</p>}
      </div>

      {/* Primary Email Card */}
      <div className={styles.emailCard}>
        <div className={styles.emailInfo}>
          <div className={styles.emailLabelRow}>
            <RiMailSendLine className={styles.emailIcon} />
            <span className={styles.label}>primary email</span>
          </div>
          <span className={styles.emailAddress}>{email}</span>
        </div>

        <div className={styles.emailActions}>
          <button
            onClick={handleCopy}
            className={`${styles.actionBtn} ${copied ? styles.copied : ''}`}
            title="Copy email to clipboard"
          >
            {copied ? (
              <>
                <RiCheckLine className={styles.btnIcon} />
                <span>copied!</span>
              </>
            ) : (
              <>
                <RiFileCopyLine className={styles.btnIcon} />
                <span>copy</span>
              </>
            )}
          </button>

          <a
            href={`mailto:${email}`}
            className={styles.sendBtn}
            title="Open email client"
          >
            <span>send email</span>
            <RiArrowRightUpLine className={styles.btnIcon} />
          </a>
        </div>
      </div>

      {/* Dynamic Resume Card */}
      <div className={styles.resumeCard}>
        <div className={styles.resumeInfo}>
          <div className={styles.resumeLabelRow}>
            <RiFileTextLine className={styles.resumeIcon} />
            <span className={styles.label}>curriculum vitae</span>
          </div>
          <span className={styles.resumeTitle}>dynamic resume</span>
          <p className={styles.resumeDesc}>
            always synchronized with my latest agentic architectures & projects.
          </p>
        </div>

        <div className={styles.resumeActions}>
          <a
            href="/resume"
            target="_blank"
            rel="noopener noreferrer"
            className={styles.resumeBtn}
            title="Open dynamic resume in new tab"
          >
            <span>get my resume</span>
            <RiArrowRightUpLine className={styles.btnIcon} />
          </a>
        </div>
      </div>

      {/* Social Channels */}
      <div className={styles.socialGrid}>
        {socialChannels.map((channel) => {
          const Icon = getSocialIcon(channel.name);
          return (
            <a
              key={channel.name}
              href={channel.url}
              target="_blank"
              rel="noopener noreferrer"
              className={styles.channelCard}
            >
              <div className={styles.channelHeader}>
                <Icon className={styles.channelIcon} />
                <RiArrowRightUpLine className={styles.arrowIcon} />
              </div>
              <div className={styles.channelBody}>
                <span className={styles.channelName}>{channel.name}</span>
                <span className={styles.channelHandle}>{channel.handle}</span>
              </div>
            </a>
          );
        })}
      </div>

      {/* Meta / Availability Strip */}
      {(data.status || data.location || data.responseTime) && (
        <div className={styles.statusStrip}>
          {data.status && (
            <div className={styles.statusItem}>
              <span className={styles.pulseDot} />
              <span>{data.status}</span>
            </div>
          )}
          <div className={styles.metaRow}>
            {data.location && <span>location: {data.location}</span>}
            {data.location && data.responseTime && (
              <span className={styles.separator}>•</span>
            )}
            {data.responseTime && (
              <span>typical response: {data.responseTime}</span>
            )}
          </div>
        </div>
      )}
    </motion.section>
  );
}
