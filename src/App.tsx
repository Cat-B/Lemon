import React, { useState, useEffect, useCallback, useRef } from 'react';
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

// ─────────────────────────────────────────────────────────────────
// JUICE SPLASH EASTER EGG
// On every click anywhere, a small burst of lemon drops radiates
// outward from the click point.
// ─────────────────────────────────────────────────────────────────
function createJuiceSplash(x: number, y: number, isPink: boolean) {
  const N = 6;
  for (let i = 0; i < N; i++) {
    const el = document.createElement('div');
    el.className = 'juice-drop';

    const angle = (360 / N) * i + Math.random() * 20;
    const dist = 28 + Math.random() * 30;
    const rad = (angle * Math.PI) / 180;
    const dx = Math.cos(rad) * dist;
    const dy = Math.sin(rad) * dist;
    const size = 6 + Math.random() * 8;

    const colors = isPink
      ? ['#FFB3D1', '#FF80B5', '#FFE4F0', '#C85A88']
      : ['#FFE135', '#FFD000', '#FFF8C5', '#F0A500'];

    const col = colors[Math.floor(Math.random() * colors.length)];

    el.style.cssText = `
      left: ${x}px;
      top: ${y}px;
      width: ${size}px;
      height: ${size}px;
      background: ${col};
      --dx: ${dx}px;
      --dy: ${dy}px;
    `;

    document.body.appendChild(el);
    el.addEventListener('animationend', () => el.remove());
  }
}

// ─────────────────────────────────────────────────────────────────
// SCROLL REVEAL
// Watches all .reveal elements and adds .visible when in viewport.
// ─────────────────────────────────────────────────────────────────
function useScrollReveal() {
  useEffect(() => {
    const observer = new IntersectionObserver(
      entries => {
        entries.forEach(e => {
          if (e.isIntersecting) {
            e.target.classList.add('visible');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    const els = document.querySelectorAll('.reveal');
    els.forEach(el => observer.observe(el));

    return () => observer.disconnect();
  });
}

// ─────────────────────────────────────────────────────────────────
// MAIN PORTFOLIO PAGE
// ─────────────────────────────────────────────────────────────────
function Portfolio() {
  const [activeSection, setActiveSection] = useState('hero');
  const [isPinkMode, setIsPinkMode] = useState(false);

  useScrollReveal();

  // ── Scroll progress bar ──
  useEffect(() => {
    const bar = document.getElementById('scroll-bar');
    const onScroll = () => {
      if (!bar) return;
      const scrolled = window.scrollY;
      const total = document.documentElement.scrollHeight - window.innerHeight;
      bar.style.width = total > 0 ? `${(scrolled / total) * 100}%` : '0%';
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Active section tracker ──
  useEffect(() => {
    const sections = ['hero', 'about', 'projects', 'experience', 'contact'];
    const onScroll = () => {
      const scrollY = window.scrollY + 120;
      for (const id of sections) {
        const el = document.getElementById(id);
        if (el && scrollY >= el.offsetTop && scrollY < el.offsetTop + el.offsetHeight) {
          setActiveSection(id);
          break;
        }
      }
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // ── Juice splash on click ──
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      // Don't splash on interactive elements to avoid visual noise on buttons
      const tag = (e.target as HTMLElement).tagName.toLowerCase();
      if (['a', 'button', 'input', 'textarea'].includes(tag)) return;
      createJuiceSplash(e.clientX, e.clientY, isPinkMode);
    };
    window.addEventListener('click', onClick);
    return () => window.removeEventListener('click', onClick);
  }, [isPinkMode]);

  // ── Pink mode toggle (applied to html element for CSS variable overrides) ──
  useEffect(() => {
    if (isPinkMode) {
      document.documentElement.classList.add('pink-mode');
    } else {
      document.documentElement.classList.remove('pink-mode');
    }
  }, [isPinkMode]);

  const scrollTo = useCallback((id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: 'smooth' });
  }, []);

  return (
    <div style={{ background: 'var(--bg-hero)' }}>
      {/* Fixed scroll progress bar */}
      <div id="scroll-bar" />

      <Nav
        activeSection={activeSection}
        isPinkMode={isPinkMode}
        onScrollTo={scrollTo}
      />

      <main>
        <Hero onScrollTo={scrollTo} />

        <Wave
          fromColor="var(--bg-hero)"
          toColor="var(--bg-about)"
        />

        <About />

        <Wave
          fromColor="var(--bg-about)"
          toColor="var(--bg-projects)"
          flip
        />

        <Projects />

        <Wave
          fromColor="var(--bg-projects)"
          toColor="var(--bg-experience)"
        />

        <Experience />

        <Wave
          fromColor="var(--bg-experience)"
          toColor="var(--bg-contact)"
          flip
        />

        <Contact
          isPinkMode={isPinkMode}
          onTogglePink={() => setIsPinkMode(p => !p)}
        />
      </main>
    </div>
  );
}

// ─────────────────────────────────────────────────────────────────
// APP ROOT — React Router
// ─────────────────────────────────────────────────────────────────
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
