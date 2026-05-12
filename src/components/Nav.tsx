import React, { useState, useRef } from 'react';
import { FileText, Github, Linkedin, Mail } from 'lucide-react';
import { personalInfo } from '../data/content';

interface NavProps {
  activeSection: string;
  isPinkMode: boolean;
  onScrollTo: (id: string) => void;
  onJokeReveal: () => void;
}

const navItems = [
  { id: 'about',      label: 'About' },
  { id: 'projects',   label: 'Projects' },
  { id: 'experience', label: 'Experience' },
  { id: 'contact',    label: 'Contact' },
];

export default function Nav({ activeSection, isPinkMode, onScrollTo, onJokeReveal }: NavProps) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const clickCount = useRef(0);
  const clickTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleLogoClick = () => {
    clickCount.current += 1;
    if (clickTimer.current) clearTimeout(clickTimer.current);

    if (clickCount.current >= 3) {
      clickCount.current = 0;
      onJokeReveal();
    } else {
      clickTimer.current = setTimeout(() => {
        clickCount.current = 0;
        onScrollTo('hero');
      }, 380);
    }
  };

  const navBg = isPinkMode ? 'rgba(253,232,243,0.93)' : 'rgba(255,253,240,0.93)';

  return (
    <>
      <nav
        className="sticky top-0 z-50 flex items-center justify-between px-8 py-3"
        style={{ background: navBg, backdropFilter: 'blur(14px)', borderBottom: '2px dashed var(--lemon-bright)' }}
      >
        <button
          onClick={handleLogoClick}
          style={{ fontFamily: 'var(--font-display)', fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)', background: 'none', border: 'none', cursor: 'pointer' }}
          title="Click 3× for a surprise"
        >
          🍋 Catherine Boss
        </button>

        <ul className="hidden md:flex gap-2 list-none">
          {navItems.map(({ id, label }) => (
            <li key={id}>
              <button
                onClick={() => onScrollTo(id)}
                className={`text-sm font-medium px-4 py-1.5 rounded-full transition-all duration-200 ${activeSection === id ? 'nav-active' : 'hover:bg-yellow-100'}`}
                style={{ color: activeSection === id ? 'var(--text-dark)' : 'var(--text-mid)', background: 'none', border: 'none', cursor: 'pointer' }}
              >
                {label}
              </button>
            </li>
          ))}
        </ul>

        <button
          className="md:hidden p-2"
          onClick={() => setMobileOpen(!mobileOpen)}
          aria-label="Toggle menu"
        >
          <span className="block w-5 h-0.5 bg-current mb-1" style={{ color: 'var(--text-dark)', transition: 'transform .2s', transform: mobileOpen ? 'rotate(45deg) translate(2px,4px)' : '' }} />
          <span className="block w-5 h-0.5 mb-1" style={{ background: 'var(--text-dark)', opacity: mobileOpen ? 0 : 1, transition: 'opacity .2s' }} />
          <span className="block w-5 h-0.5" style={{ background: 'var(--text-dark)', transition: 'transform .2s', transform: mobileOpen ? 'rotate(-45deg) translate(2px,-4px)' : '' }} />
        </button>
      </nav>

      {mobileOpen && (
        <div className="md:hidden sticky top-[57px] z-40 py-3 px-6 flex flex-col gap-2"
          style={{ background: 'rgba(255,253,240,.97)', borderBottom: '2px dashed var(--lemon-bright)' }}>
          {navItems.map(({ id, label }) => (
            <button key={id} onClick={() => { onScrollTo(id); setMobileOpen(false); }}
              className="text-left py-2 text-sm font-medium px-3 rounded-lg"
              style={{ color: activeSection === id ? 'var(--accent-dark)' : 'var(--text-mid)', background: 'none', border: 'none', cursor: 'pointer' }}>
              {label}
            </button>
          ))}
          <div className="flex gap-3 mt-2 pt-2" style={{ borderTop: '1px dashed var(--lemon-bright)' }}>
            <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer"
              className="inline-flex items-center gap-1.5 text-xs font-semibold px-3 py-1.5 rounded-full"
              style={{ background: 'var(--lemon-bright)', color: 'var(--text-dark)' }}>
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
