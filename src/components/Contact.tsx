import React, { useState, useRef } from 'react';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';
import { personalInfo } from '../data/content';

interface ContactProps {
  isPinkMode: boolean;
  onTogglePink: () => void;
}

// Lemon joke / fun fact for the hidden easter egg
const LEMON_JOKE = {
  setup: "Why did the lemon stop halfway across the road?",
  punchline: "It ran out of juice. 🍋",
  funFact: "Fun fact: A single lemon tree can produce up to 600 lbs of lemons per year. That's a LOT of lemonade.",
};

export default function Contact({ isPinkMode, onTogglePink }: ContactProps) {
  const [jokeVisible, setJokeVisible] = useState(false);
  const pitcherClickCount = useRef(0);
  const pitcherTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Double-click pitcher → toggle pink mode
  const handlePitcherClick = () => {
    pitcherClickCount.current += 1;
    if (pitcherTimer.current) clearTimeout(pitcherTimer.current);

    if (pitcherClickCount.current >= 2) {
      pitcherClickCount.current = 0;
      onTogglePink();
    } else {
      pitcherTimer.current = setTimeout(() => {
        pitcherClickCount.current = 0;
      }, 400);
    }
  };

  // Listen for secret joke reveal from Nav triple-click
  React.useEffect(() => {
    const handler = (e: Event) => {
      const ce = e as CustomEvent<boolean>;
      setJokeVisible(ce.detail);
    };
    window.addEventListener('jokeToggle', handler);
    return () => window.removeEventListener('jokeToggle', handler);
  }, []);

  return (
    <>
      <section
        id="contact"
        style={{ background: 'var(--bg-contact)', padding: '80px 32px', textAlign: 'center' }}
      >
        <div style={{ maxWidth: '700px', margin: '0 auto' }}>

          {/* Tagline */}
          <span className="pill-label reveal">🍋 Let's Connect</span>
          <h2
            className="font-display reveal delay-1 mt-4 mb-3"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text-dark)' }}
          >
            The lemonade is ready.
          </h2>
          <p className="reveal delay-2 mb-10" style={{ color: 'var(--text-mid)', fontSize: '1.02rem', lineHeight: 1.75, maxWidth: '440px', margin: '0 auto 40px' }}>
            I'm always open to new opportunities, collaborations, and fun engineering conversations. Let's make something great together!
          </p>

          {/*
            PITCHER
            Double-click to toggle pink lemonade mode!
            SWAP: replace this SVG pitcher with your Procreate pitcher PNG:
              <img
                src={isPinkMode ? "./pitcher-pink.png" : "./pitcher.png"}
                alt="Lemonade pitcher"
                className="pitcher-img"
                style={{ width: '160px', cursor: 'pointer', margin: '0 auto 40px', display: 'block' }}
                onClick={handlePitcherClick}
              />
          */}
          <div className="reveal delay-2 mb-10">
            <div
              onClick={handlePitcherClick}
              title="Double-click me for a surprise! 🍋"
              style={{ cursor: 'pointer', display: 'inline-block' }}
            >
              <svg
                width="140"
                height="180"
                viewBox="0 0 140 180"
                xmlns="http://www.w3.org/2000/svg"
                className="pitcher-img"
                aria-label="Lemonade pitcher — double-click for a surprise"
              >
                {/* Pitcher body */}
                <path
                  d="M30,40 L25,160 Q25,170 35,170 L105,170 Q115,170 115,160 L110,40 Z"
                  fill={isPinkMode ? '#FFB3D1' : '#FFE135'}
                  stroke={isPinkMode ? '#C85A88' : 'var(--lemon-zest)'}
                  strokeWidth="3"
                />
                {/* Liquid fill */}
                <path
                  d="M32,80 L28,160 Q28,167 36,167 L104,167 Q112,167 112,160 L108,80 Z"
                  fill={isPinkMode ? '#FF80B5' : '#FFD000'}
                  opacity="0.7"
                />
                {/* Lemon slice in liquid */}
                <circle cx="70" cy="130" r="18" fill={isPinkMode ? '#FFB3D1' : '#FFE135'} stroke={isPinkMode ? '#C85A88' : '#C8A000'} strokeWidth="1.5" opacity="0.9"/>
                <line x1="70" y1="112" x2="70" y2="148" stroke={isPinkMode ? '#C85A88' : '#C8A000'} strokeWidth="1" opacity="0.7"/>
                <line x1="52" y1="130" x2="88" y2="130" stroke={isPinkMode ? '#C85A88' : '#C8A000'} strokeWidth="1" opacity="0.7"/>
                <line x1="57" y1="117" x2="83" y2="143" stroke={isPinkMode ? '#C85A88' : '#C8A000'} strokeWidth="1" opacity="0.5"/>
                <line x1="83" y1="117" x2="57" y2="143" stroke={isPinkMode ? '#C85A88' : '#C8A000'} strokeWidth="1" opacity="0.5"/>
                {/* Pitcher opening / rim */}
                <ellipse cx="70" cy="40" rx="40" ry="10" fill={isPinkMode ? '#FFB3D1' : '#FFE135'} stroke={isPinkMode ? '#C85A88' : 'var(--lemon-zest)'} strokeWidth="3"/>
                {/* Handle */}
                <path
                  d="M110,60 Q140,60 140,90 Q140,120 110,120"
                  fill="none"
                  stroke={isPinkMode ? '#C85A88' : 'var(--lemon-zest)'}
                  strokeWidth="6"
                  strokeLinecap="round"
                />
                {/* Spout */}
                <path
                  d="M30,55 Q5,50 8,35 Q14,25 30,42"
                  fill={isPinkMode ? '#FFB3D1' : '#FFE135'}
                  stroke={isPinkMode ? '#C85A88' : 'var(--lemon-zest)'}
                  strokeWidth="3"
                />
                {/* Straw */}
                <line x1="85" y1="15" x2="75" y2="75" stroke={isPinkMode ? '#C85A88' : 'var(--accent)'} strokeWidth="4" strokeLinecap="round"/>
                <ellipse cx="84" cy="16" rx="5" ry="3" fill={isPinkMode ? '#FF80B5' : 'var(--accent-lt)'}/>
              </svg>
            </div>
            <p style={{ fontSize: '0.75rem', color: 'var(--text-light)', marginTop: '6px' }}>
              {isPinkMode ? '🩷 Pink lemonade mode!' : 'Double-click for a surprise 🍋'}
            </p>
          </div>

          {/* Contact buttons */}
          <div className="reveal delay-3 flex flex-wrap gap-4 justify-center">
            <a
              href={`mailto:${personalInfo.email}`}
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-1"
              style={{ background: 'var(--text-dark)', color: 'white', boxShadow: '0 4px 18px rgba(0,0,0,0.2)' }}
            >
              <Mail size={16} /> Email Me
            </a>
            <a
              href={personalInfo.linkedin}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-1 hover:bg-white"
              style={{ borderColor: 'var(--text-dark)', color: 'var(--text-dark)' }}
            >
              <Linkedin size={16} /> LinkedIn
            </a>
            <a
              href={personalInfo.github}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-1 hover:bg-white"
              style={{ borderColor: 'var(--text-dark)', color: 'var(--text-dark)' }}
            >
              <Github size={16} /> GitHub
            </a>
            <a
              href={personalInfo.resumeUrl}
              target="_blank"
              rel="noreferrer"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-1"
              style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 4px 18px rgba(107,158,42,0.35)' }}
            >
              <FileText size={16} /> Resume
            </a>
          </div>

        </div>
      </section>

      {/*
        ══════════════════════════════════════════
        SECRET JOKE SECTION
        Hidden until wordmark is triple-clicked.
        Revealed via CSS max-height transition.
        ══════════════════════════════════════════
      */}
      <div
        id="secret-joke"
        className={jokeVisible ? 'revealed' : ''}
        style={{ background: 'var(--lemon-pale)', borderTop: '2px dashed var(--lemon-bright)' }}
      >
        <div style={{ maxWidth: '600px', margin: '0 auto', padding: '32px', textAlign: 'center' }}>
          <p style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--text-light)', marginBottom: '10px' }}>
            🤫 You found the secret!
          </p>
          <h3 className="font-display mb-2" style={{ fontSize: '1.4rem', fontWeight: 700, color: 'var(--text-dark)' }}>
            {LEMON_JOKE.setup}
          </h3>
          <p className="font-display italic" style={{ fontSize: '1.2rem', color: 'var(--accent)', marginBottom: '12px' }}>
            {LEMON_JOKE.punchline}
          </p>
          <p style={{ fontSize: '0.85rem', color: 'var(--text-mid)', lineHeight: 1.7 }}>
            {LEMON_JOKE.funFact}
          </p>
        </div>
      </div>

      {/* Footer */}
      <footer style={{ background: 'var(--text-dark)', color: 'rgba(255,255,255,0.5)', textAlign: 'center', padding: '20px', fontSize: '0.82rem' }}>
        <p>© 2025 <span style={{ color: 'var(--lemon-bright)' }}>Catherine Boss</span> · Made with 🍋 and a lot of engineering</p>
      </footer>
    </>
  );
}
