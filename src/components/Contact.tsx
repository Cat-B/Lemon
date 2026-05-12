import React, { useRef } from 'react';
import { Mail, Linkedin, Github, FileText } from 'lucide-react';
import { personalInfo } from '../data/content';

interface ContactProps {
  isPinkMode: boolean;
  onTogglePink: () => void;
}

export default function Contact({ isPinkMode, onTogglePink }: ContactProps) {
  const pitcherClicks = useRef(0);
  const pitcherTimer  = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handlePitcherClick = () => {
    pitcherClicks.current += 1;
    if (pitcherTimer.current) clearTimeout(pitcherTimer.current);
    if (pitcherClicks.current >= 2) {
      pitcherClicks.current = 0;
      onTogglePink();
    } else {
      pitcherTimer.current = setTimeout(() => { pitcherClicks.current = 0; }, 400);
    }
  };

  return (
    <>
      <section id="contact" style={{ background: 'var(--bg-contact)', padding: '64px 32px', textAlign: 'center' }}>
        <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

          {/* Single header */}
          <h2 className="font-display reveal"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: 'var(--text-dark)', marginBottom: '8px' }}>
            The lemonade is ready.
          </h2>
          <p className="reveal delay-1 mb-10"
            style={{ color: 'var(--text-mid)', fontSize: '1.02rem', lineHeight: 1.75, maxWidth: '400px', margin: '0 auto 44px' }}>
            Always open to new opportunities and fun engineering conversations.
          </p>

          {/*
            ════════════════════════════════════════
            PITCHER + FLANKING BUTTONS LAYOUT

            Left group: Email, LinkedIn
            Center: Pitcher (double-click for pink mode)
            Right group: GitHub, Resume
            ════════════════════════════════════════
          */}
          <div className="contact-pitcher-layout reveal delay-1">

            {/* Left buttons */}
            <div className="contact-btn-group">
              <a href={`mailto:${personalInfo.email}`} className="contact-btn"
                style={{ background: 'var(--text-dark)', color: 'white', boxShadow: '0 6px 20px rgba(0,0,0,.22)' }}>
                <Mail size={20} /> Email Me
              </a>
              <a href={personalInfo.linkedin} target="_blank" rel="noreferrer" className="contact-btn"
                style={{ background: 'white', color: 'var(--text-dark)', border: '2.5px solid var(--text-dark)', boxShadow: '0 4px 14px rgba(0,0,0,.1)' }}>
                <Linkedin size={20} /> LinkedIn
              </a>
            </div>

            {/* Center: pitcher SVG */}
            <div>
              {/*
                PITCHER
                Double-click to toggle pink mode!

                SWAP: replace this SVG with your Procreate pitcher art:
                  <img
                    src={isPinkMode ? "./pitcher-pink.png" : "./pitcher.png"}
                    alt="Lemonade pitcher — double-click for pink mode"
                    onClick={handlePitcherClick}
                    style={{ width:'160px', cursor:'pointer', filter:'drop-shadow(0 12px 28px rgba(0,0,0,.15))' }}
                  />
              */}
              <svg
                onClick={handlePitcherClick}
                width="150" height="190"
                viewBox="0 0 150 190"
                xmlns="http://www.w3.org/2000/svg"
                style={{ cursor: 'pointer', filter: 'drop-shadow(0 10px 24px rgba(0,0,0,.15))', transition: 'transform .3s ease', display: 'block', margin: '0 auto' }}
                onMouseEnter={e => (e.currentTarget.style.transform = 'scale(1.04) rotate(-1deg)')}
                onMouseLeave={e => (e.currentTarget.style.transform = 'scale(1) rotate(0deg)')}
                aria-label="Lemonade pitcher — double-click for pink mode"
                role="button"
                tabIndex={0}
                onKeyDown={e => { if (e.key === 'Enter') handlePitcherClick(); }}
              >
                {/* Body */}
                <path d="M32,44 L27,166 Q27,176 38,176 L112,176 Q122,176 122,166 L117,44 Z"
                  fill="var(--lemon-bright)" stroke="var(--lemon-zest)" strokeWidth="3"/>
                {/* Liquid */}
                <path d="M34,85 L29,164 Q29,173 38,173 L112,173 Q121,173 121,164 L116,85 Z"
                  fill="var(--lemon-zest)" opacity=".55"/>
                {/* Lemon slice in liquid */}
                <circle cx="75" cy="136" r="20" fill="var(--lemon-bright)" stroke="var(--lemon-zest)" strokeWidth="1.5" opacity=".9"/>
                <line x1="75" y1="116" x2="75" y2="156" stroke="var(--lemon-zest)" strokeWidth="1" opacity=".6"/>
                <line x1="55" y1="136" x2="95" y2="136" stroke="var(--lemon-zest)" strokeWidth="1" opacity=".6"/>
                <line x1="61" y1="122" x2="89" y2="150" stroke="var(--lemon-zest)" strokeWidth="1" opacity=".4"/>
                <line x1="89" y1="122" x2="61" y2="150" stroke="var(--lemon-zest)" strokeWidth="1" opacity=".4"/>
                {/* Rim */}
                <ellipse cx="75" cy="44" rx="43" ry="11" fill="var(--lemon-bright)" stroke="var(--lemon-zest)" strokeWidth="3"/>
                {/* Handle */}
                <path d="M117,64 Q148,64 148,96 Q148,128 117,128"
                  fill="none" stroke="var(--lemon-zest)" strokeWidth="7" strokeLinecap="round"/>
                {/* Spout */}
                <path d="M32,59 Q6,54 8,38 Q14,26 32,46"
                  fill="var(--lemon-bright)" stroke="var(--lemon-zest)" strokeWidth="3"/>
                {/* Straw */}
                <line x1="92" y1="14" x2="80" y2="72" stroke="var(--accent)" strokeWidth="5" strokeLinecap="round"/>
                <ellipse cx="91" cy="15" rx="6" ry="4" fill="var(--accent-lt)"/>
              </svg>
              <p style={{ fontSize: '.75rem', color: isPinkMode ? 'var(--lemon-rind)' : 'var(--text-mid)', marginTop: '8px', fontStyle: 'italic' }}>
                {isPinkMode ? '🩷 Pink lemonade mode!' : 'Double-click for a surprise 🍋'}
              </p>
            </div>

            {/* Right buttons */}
            <div className="contact-btn-group">
              <a href={personalInfo.github} target="_blank" rel="noreferrer" className="contact-btn"
                style={{ background: 'white', color: 'var(--text-dark)', border: '2.5px solid var(--text-dark)', boxShadow: '0 4px 14px rgba(0,0,0,.1)' }}>
                <Github size={20} /> GitHub
              </a>
              <a href={personalInfo.resumeUrl} target="_blank" rel="noreferrer" className="contact-btn"
                style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 6px 20px rgba(107,158,42,.35)' }}>
                <FileText size={20} /> Resume
              </a>
            </div>

          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{ background: 'var(--text-dark)', color: 'rgba(255,255,255,.5)', textAlign: 'center', padding: '18px', fontSize: '.82rem' }}>
        <p>© 2025 <span style={{ color: 'var(--lemon-bright)' }}>Catherine Boss</span> · Made with 🍋 and a lot of engineering</p>
      </footer>
    </>
  );
}
