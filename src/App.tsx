import { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { Resume } from './pages/Resume/Resume';
import './index.css';

function getIsResumeView(): boolean {
  if (typeof window === 'undefined') return false;

  const basePath = import.meta.env.BASE_URL.replace(/\/$/, '');
  const resumePath = `${basePath}/resume`;

  return (
    window.location.pathname === resumePath ||
    window.location.pathname.startsWith(`${resumePath}/`) ||
    window.location.search.includes('view=resume')
  );
}

export default function App() {
  const [isResume, setIsResume] = useState(getIsResumeView);

  useEffect(() => {
    const handleLocationChange = () => {
      setIsResume(getIsResumeView());
    };

    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, []);

  if (isResume) {
    return <Resume />;
  }

  return <Layout />;
}

