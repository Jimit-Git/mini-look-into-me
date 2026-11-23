import { useState, useEffect } from 'react';
import { Layout } from './components/Layout/Layout';
import { Resume } from './pages/Resume/Resume';
import './index.css';

function getIsResumeView(): boolean {
  if (typeof window === 'undefined') return false;
  return (
    window.location.pathname === '/resume' ||
    window.location.pathname.startsWith('/resume/') ||
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

