import { useEffect, useState } from 'react';
import Sidebar from './components/Sidebar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Projects from './components/Projects';
import LeetCodeStats from './components/LeetCodeStats';
import Certificates from './components/Certificates';
import Achievements from './components/Achievements';
import Contact from './components/Contact';
import CursorEffect from './components/CursorEffect';

function useActiveSection() {
  const [active, setActive] = useState('hero');
  useEffect(() => {
    const sections = ['hero', 'about', 'skills', 'projects', 'leetcode', 'certificates', 'achievements', 'contact'];
    const observers = [];
    sections.forEach(id => {
      const el = document.getElementById(id);
      if (!el) return;
      const observer = new IntersectionObserver(
        ([entry]) => { if (entry.isIntersecting) setActive(id); },
        { rootMargin: '-40% 0px -55% 0px' }
      );
      observer.observe(el);
      observers.push(observer);
    });
    return () => observers.forEach(o => o.disconnect());
  }, []);
  return active;
}

export default function App() {
  const activeSection = useActiveSection();
  return (
    <div className="min-h-screen" style={{ background: '#020408' }}>
      <CursorEffect />
      <div className="scan-line" />
      <Sidebar activeSection={activeSection} />
      <main className="lg:ml-56">
        <Hero />
        <About />
        <Skills />
        <Projects />
        <LeetCodeStats />
        <Certificates />
        <Achievements />
        <Contact />
      </main>
    </div>
  );
}
