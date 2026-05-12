import React, { useState, useRef, useEffect } from 'react';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/content';

interface NavProps {
  activeSection: string;
  isPinkMode: boolean;
  onScrollTo: (id: string) => void;
}

export default function Nav({ activeSection, isPinkMode, onScrollTo }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [jokeVisible, setJokeVisible] = useState(false);
  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const navItems = [
    { id: 'about',      label: 'About' },
    { id: 'projects',   label: 'Projects' },
    { id: 'experience', label: 'Experience' },
    { id: 'contact',    label: 'Contact' },
  ];

  // Triple-click on wordmark reveals secret joke section
  const handleLogoClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      setJokeVisible(true);
      // Scroll to the joke section
      setTimeout(() => {
        document.getElementById('secret-joke')?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 100);
    } else {
      clickTimerRef.current = setTimeout(() => {
        clickCountRef.current = 0;
        // single/double click = scroll to top
        onScrollTo('hero');
      }, 400);
    }
  };

  // Expose jokeVisible to parent via custom event so footer can react
  useEffect(() => {
    window.dispatchEvent(new CustomEvent('jokeToggle', { detail: jokeVisible }));
  }, [jokeVisible]);

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-3 dashed-border-bottom"
        style={{ background: isPinkMode ? 'rgba(253,232,243,0.92)' : 'rgba(255,253,240,0.92)', backdropFilter: 'blur(14px)' }}
      >
        {/* Wordmark */}
        <button
          onClick={handleLogoClick}
          className="font-display text-lg font-bold tracking-tight select-none"
          style={{ color: 'var(--text-dark)', background: 'none', border: 'none', cursor: 'pointer' }}
          aria-label="Catherine Boss – click 3× for a surprise"
        >
          🍋 Catherine Boss
        </button>

        {/* Desktop links */}
        <ul className="hidden md:flex gap-2 list-none">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => onScrollTo(id)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${
                  activeSection === id ? 'nav-active' : 'hover:bg-yellow-100'
                }`}
                style={{ color: activeSection === id ? 'var(--text-dark)' : 'var(--text-mid)' }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        {/* Mobile hamburger */}
        <button
          className="md:hidden p-2 rounded-lg"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
          style={{ color: 'var(--text-dark)' }}
        >
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" style={{ transform: mobileOpen ? 'rotate(45deg) translate(2px,4px)' : '' }} />
          <span className="block w-5 h-0.5 bg-current mb-1 transition-all" style={{ opacity: mobileOpen ? 0 : 1 }} />
          <span className="block w-5 h-0.5 bg-current transition-all" style={{ transform: mobileOpen ? 'rotate(-45deg) translate(2px,-4px)' : '' }} />
        </button>
      </nav>

      {/* Mobile dropdown */}
      {mobileOpen && (
        <div
          className="md:hidden sticky top-[57px] z-40 py-3 px-6 flex flex-col gap-2 dashed-border-bottom"
          style={{ background: 'rgba(255,253,240,0.97)' }}
        >
          {navItems.map(({ id, label }) => (
            <button
              key={id}
              onClick={() => { onScrollTo(id); setMobileOpen(false); }}
              className="text-left py-2 text-sm font-medium rounded-lg px-3"
              style={{ color: activeSection === id ? 'var(--accent-dark)' : 'var(--text-mid)' }}
            >
              {label}
            </button>
          ))}
          <div className="flex gap-3 mt-2 pt-2" style={{ borderTop: '1px dashed var(--lemon-bright)' }}>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full" style={{ background: 'var(--lemon-bright)', color: 'var(--text-dark)' }}>
              <FileText size={13} /> Resume
            </a>
            <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" style={{ color: 'var(--accent)' }}><Linkedin size={20} /></a>
            <a href={personalInfo.github} target="_blank" rel="noreferrer" style={{ color: 'var(--text-mid)' }}><Github size={20} /></a>
            <a href={`mailto:${personalInfo.email}`} style={{ color: 'var(--accent)' }}><Mail size={20} /></a>
          </div>
        </div>
      )}
    </>
  );
}
