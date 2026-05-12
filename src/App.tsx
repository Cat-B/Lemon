import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Nav from './components/Nav';
import Hero from './components/Hero';
import About from './components/About';
import Projects from './components/Projects';
import Experience from './components/Experience';
import Contact from './components/Contact';
import Wave from './components/Wave';
import ProjectDetail from './components/ProjectDetail';
import ProjectsGallery from './components/ProjectsGallery';

const JOKE = {
  setup: 'Why did the lemon stop halfway across the road?',
  punchline: 'It ran out of juice. 🍋',
};

function createJuiceSplash(x: number, y: number, isPink: boolean) {
  for (let i = 0; i < 7; i++) {
    const el = document.createElement('div');
    el.className = 'juice-drop';
    const angle = (360 / 7) * i + Math.random() * 18;
    const dist = 26 + Math.random() * 32;
    const rad = (angle * Math.PI) / 180;
    const size = 6 + Math.random() * 8;
    const colors = isPink
      ? ['#F472B6','#FBCFE8','#EC4899','#FCE7F3']
      : ['#FFE135','#FFD000','#FFF8C5','#F0A500'];
    el.style.cssText = `left:${x}px;top:${y}px;width:${size}px;height:${size}px;background:${colors[Math.floor(Math.random()*colors.length)]};--dx:${Math.cos(rad)*dist}px;--dy:${Math.sin(rad)*dist}px`;
    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) e.target.classList.add('visible'); }),
      { threshold: 0.04, rootMargin: '0px 0px -16px 0px' }
    );
    document.querySelectorAll('.reveal').forEach(el => observer.observe(el));
    return () => observer.disconnect();
  });
}

function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isPinkMode, setIsPinkMode] = useState(false);
  const [jokeVisible, setJokeVisible] = useState(false);

  useScrollReveal();

  useEffect(() => {
    const bar = document.getElementById('scroll-bar');
    const onScroll = () => {
      if (!bar) return;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(window.scrollY / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const sections = ['hero','about','projects','experience','contact'];
    const onScroll = () => {
      const y = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && y >= el.offsetTop && y < el.offsetTop + el.offsetHeight) { setActiveSection(id); break; }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (['a','button','input','textarea'].includes(tag)) return;
      createJuiceSplash(e.clientX, e.clientY, isPinkMode);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [isPinkMode]);

  useEffect(() => {
    document.documentElement.classList.toggle('pink-mode', isPinkMode);
  }, [isPinkMode]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div style={{ background: 'var(--bg-hero)' }}>
      <div id="scroll-bar" />

      <Nav
        activeSection={activeSection}
        isPinkMode={isPinkMode}
        onScrollTo={scrollTo}
        onJokeReveal={() => setJokeVisible(v => !v)}
      />

      {/* SECRET JOKE BANNER — slides down from top after triple-click */}
      <div className={`joke-banner${jokeVisible ? ' revealed' : ''}`}
        style={{ background: 'var(--lemon-bright)', borderBottom: '2px dashed var(--accent)' }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto', padding: '20px 32px', textAlign: 'center' }}>
          <p style={{ fontSize: '.7rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'var(--lemon-rind)', marginBottom: '6px' }}>
            🤫 you found the secret
          </p>
          <p className="font-display" style={{ fontSize: '1.15rem', fontWeight: 700, color: 'var(--text-dark)', marginBottom: '4px' }}>
            {JOKE.setup}
          </p>
          <p className="font-display" style={{ fontSize: '1.05rem', fontStyle: 'italic', color: 'var(--accent-dark)' }}>
            {JOKE.punchline}
          </p>
        </div>
      </div>

      <main>
        <Hero onScrollTo={scrollTo} />
        <Wave fromColor="var(--bg-hero)" toColor="var(--bg-about)" />
        <About />
        <Wave fromColor="var(--bg-about)" toColor="var(--bg-projects)" flip />
        <Projects />
        <Wave fromColor="var(--bg-projects)" toColor="var(--bg-experience)" />
        <Experience />
        <Wave fromColor="var(--bg-experience)" toColor="var(--bg-contact)" flip />
        <Contact isPinkMode={isPinkMode} onTogglePink={() => setIsPinkMode(p => !p)} />
      </main>
    </div>
  );
}

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Portfolio />} />
        <Route path="/projects" element={<ProjectsGallery />} />
        <Route path="/project/:id" element={<ProjectDetail />} />
      </Routes>
    </Router>
  );
}
