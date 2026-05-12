import React from 'react';
import { FileText, Linkedin, Mail, Github } from 'lucide-react';
import { personalInfo } from '../data/content';

interface HeroProps {
  onScrollTo: (id: string) => void;
}

export default function Hero({ onScrollTo }: HeroProps) {
  return (
    <section id="hero" style={{ background: 'var(--bg-hero)', paddingTop: 0, minHeight: '92vh', display: 'flex', flexDirection: 'column' }}>

      {/*
        ══════════════════════════════════════════
        LEMON TREE BRANCHES
        These sit at the top of the page and scroll away normally.
        They are an <img> tag — swap src="branches.png" with your Procreate art.
        The SVG below is a placeholder that mimics lemon branches.
        ══════════════════════════════════════════
      */}
      <div
        aria-hidden="true"
        style={{ width: '100%', height: '140px', flexShrink: 0, overflow: 'visible', position: 'relative' }}
      >
        {/*
          SWAP POINT: replace this entire <svg> with:
          <img src="./branches.png" alt="" style={{ width:'100%', height:'140px', objectFit:'cover', objectPosition:'top' }} />
        */}
        <svg
          viewBox="0 0 1440 140"
          xmlns="http://www.w3.org/2000/svg"
          preserveAspectRatio="xMidYMax slice"
          style={{ width: '100%', height: '140px' }}
        >
          {/* LEFT branch */}
          <path d="M-10,0 Q70,20 145,65 Q195,90 175,130" fill="none" stroke="#3D6010" strokeWidth="9" strokeLinecap="round"/>
          <path d="M60,25 Q90,55 68,95" fill="none" stroke="#3D6010" strokeWidth="5" strokeLinecap="round"/>
          <path d="M110,50 Q132,78 112,108" fill="none" stroke="#3D6010" strokeWidth="4" strokeLinecap="round"/>
          {/* Leaves left */}
          <ellipse cx="64" cy="100" rx="22" ry="12" fill="#7AB82A" transform="rotate(-30 64 100)" opacity="0.9"/>
          <ellipse cx="102" cy="40" rx="16" ry="9" fill="#8DC832" transform="rotate(16 102 40)" opacity="0.85"/>
          <ellipse cx="152" cy="72" rx="18" ry="10" fill="#5E9820" transform="rotate(-10 152 72)" opacity="0.9"/>
          <ellipse cx="178" cy="130" rx="14" ry="8" fill="#7AB82A" transform="rotate(6 178 130)" opacity="0.82"/>
          {/* Lemons left */}
          <ellipse cx="74" cy="116" rx="13" ry="11" fill="#FFE135" stroke="#C8A000" strokeWidth="1.5"/>
          <ellipse cx="118" cy="120" rx="14" ry="12" fill="#FFD700" stroke="#C8A000" strokeWidth="1.5"/>
          <ellipse cx="182" cy="134" rx="12" ry="10" fill="#FFE135" stroke="#C8A000" strokeWidth="1.5"/>
          <line x1="74" y1="105" x2="70" y2="92" stroke="#3D6010" strokeWidth="2"/>
          <line x1="118" y1="108" x2="114" y2="96" stroke="#3D6010" strokeWidth="2"/>
          <line x1="182" y1="124" x2="179" y2="112" stroke="#3D6010" strokeWidth="2"/>

          {/* RIGHT branch (mirror) */}
          <path d="M1450,0 Q1370,20 1295,65 Q1245,90 1265,130" fill="none" stroke="#3D6010" strokeWidth="9" strokeLinecap="round"/>
          <path d="M1380,25 Q1350,55 1372,95" fill="none" stroke="#3D6010" strokeWidth="5" strokeLinecap="round"/>
          <path d="M1330,50 Q1308,78 1328,108" fill="none" stroke="#3D6010" strokeWidth="4" strokeLinecap="round"/>
          {/* Leaves right */}
          <ellipse cx="1376" cy="100" rx="22" ry="12" fill="#7AB82A" transform="rotate(30 1376 100)" opacity="0.9"/>
          <ellipse cx="1338" cy="40" rx="16" ry="9" fill="#8DC832" transform="rotate(-16 1338 40)" opacity="0.85"/>
          <ellipse cx="1288" cy="72" rx="18" ry="10" fill="#5E9820" transform="rotate(10 1288 72)" opacity="0.9"/>
          <ellipse cx="1262" cy="130" rx="14" ry="8" fill="#7AB82A" transform="rotate(-6 1262 130)" opacity="0.82"/>
          {/* Lemons right */}
          <ellipse cx="1366" cy="116" rx="13" ry="11" fill="#FFE135" stroke="#C8A000" strokeWidth="1.5"/>
          <ellipse cx="1322" cy="120" rx="14" ry="12" fill="#FFD700" stroke="#C8A000" strokeWidth="1.5"/>
          <ellipse cx="1258" cy="134" rx="12" ry="10" fill="#FFE135" stroke="#C8A000" strokeWidth="1.5"/>
          <line x1="1366" y1="105" x2="1370" y2="92" stroke="#3D6010" strokeWidth="2"/>
          <line x1="1322" y1="108" x2="1326" y2="96" stroke="#3D6010" strokeWidth="2"/>
          <line x1="1258" y1="124" x2="1261" y2="112" stroke="#3D6010" strokeWidth="2"/>

          {/* Centre cluster */}
          <path d="M720,0 Q726,32 720,60" fill="none" stroke="#3D6010" strokeWidth="5" strokeLinecap="round"/>
          <ellipse cx="720" cy="74" rx="16" ry="14" fill="#FFE135" stroke="#C8A000" strokeWidth="1.5"/>
          <line x1="720" y1="60" x2="720" y2="50" stroke="#3D6010" strokeWidth="2"/>
          <ellipse cx="692" cy="34" rx="14" ry="8" fill="#8DC832" transform="rotate(20 692 34)" opacity="0.88"/>
          <ellipse cx="750" cy="32" rx="14" ry="8" fill="#7AB82A" transform="rotate(-20 750 32)" opacity="0.85"/>
        </svg>
      </div>

      {/* ── HERO BODY ── */}
      <div className="flex-1 flex items-center px-8 pb-16" style={{ paddingTop: '24px' }}>
        <div className="max-w-5xl mx-auto w-full grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">

          {/* Photo column */}
          <div className="flex justify-center reveal">
            <div className="relative" style={{ width: '280px', height: '280px' }}>
              {/* Yellow blob behind photo */}
              <div
                className="absolute inset-0"
                style={{
                  background: 'var(--lemon-bright)',
                  borderRadius: '60% 40% 55% 45% / 50% 60% 40% 55%',
                  transform: 'scale(1.12)',
                  zIndex: 0,
                }}
              />
              {/*
                HEADSHOT — swap src with your updated photo
                Current: pulled from your original site
              */}
              <img
                src={personalInfo.headshot}
                alt="Catherine Boss"
                className="absolute inset-0 w-full h-full object-cover rounded-full border-4 border-white"
                style={{ zIndex: 1 }}
              />
            </div>
          </div>

          {/* Text column */}
          <div className="reveal delay-1 text-center lg:text-left">
            <span className="pill-label mb-4 inline-block">✨ Open to Opportunities</span>

            <h1
              className="font-display mb-3"
              style={{ fontSize: 'clamp(2.4rem, 5vw, 3.8rem)', fontWeight: 900, lineHeight: 1.08, color: 'var(--text-dark)' }}
            >
              Hi, I'm{' '}
              <span style={{ background: 'linear-gradient(180deg, transparent 55%, var(--lemon-bright) 55%)', padding: '0 4px' }}>
                {personalInfo.name}
              </span>
            </h1>

            <p
              className="font-display italic mb-2"
              style={{ fontSize: '1.15rem', color: 'var(--accent)', fontWeight: 600 }}
            >
              Engineering student. Problem squeezer. Lemonade enthusiast.
            </p>

            <p className="mb-6 text-sm" style={{ color: 'var(--text-light)' }}>
              {personalInfo.degree} · {personalInfo.minor} · {personalInfo.school} · {personalInfo.classYear}
            </p>

            <div className="flex gap-3 flex-wrap justify-center lg:justify-start">
              <a
                href={personalInfo.resumeUrl}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-1"
                style={{ background: 'var(--lemon-bright)', color: 'var(--text-dark)', boxShadow: '0 4px 14px var(--lemon-shadow)' }}
              >
                <FileText size={16} /> Resume
              </a>
              <a
                href={personalInfo.linkedin}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-1 hover:bg-yellow-50"
                style={{ borderColor: 'var(--lemon-bright)', color: 'var(--text-dark)' }}
              >
                <Linkedin size={16} /> LinkedIn
              </a>
              <a
                href={`mailto:${personalInfo.email}`}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm transition-all duration-200 hover:-translate-y-1"
                style={{ background: 'var(--accent)', color: 'white', boxShadow: '0 4px 14px rgba(107,158,42,0.3)' }}
              >
                <Mail size={16} /> Email Me
              </a>
              <a
                href={personalInfo.github}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold text-sm border-2 transition-all duration-200 hover:-translate-y-1 hover:bg-yellow-50"
                style={{ borderColor: 'var(--accent)', color: 'var(--accent-dark)' }}
              >
                <Github size={16} /> GitHub
              </a>
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
