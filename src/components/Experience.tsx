import React, { useState, useRef } from 'react';
import { MapPin, Calendar, Building } from 'lucide-react';
import { experienceData } from '../data/content';

// ─────────────────────────────────────────────────────────────────
// 3-FRAME STIR ANIMATION
//
// Hovering the experience CARD (not just the marker) starts an
// interval cycling through frames 1 → 2 → 3 → 1 → ...
// Each frame is an <img> tag. When only one frame is "visible"
// (opacity 1), the others are opacity 0.
//
// TO SWAP WITH YOUR PROCREATE ART:
//   Frame 1 (still):    replace src in frame index 0 with "./stir-frame-1.png"
//   Frame 2 (mid-stir): replace src in frame index 1 with "./stir-frame-2.png"
//   Frame 3 (full swirl): replace src in frame index 2 with "./stir-frame-3.png"
//
// The SVG placeholders below show three different pitcher orientations
// so you can visualize what each frame should look like.
// ─────────────────────────────────────────────────────────────────

// Inline SVG pitcher — 3 frames as separate SVG strings
// Frame 1: upright still
const Frame1 = () => (
  <svg width="32" height="38" viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <rect x="6" y="8" width="18" height="24" rx="4" fill="white" stroke="var(--accent-dark)" strokeWidth="2"/>
    <path d="M24,14 Q31,14 31,20 Q31,26 24,26" fill="none" stroke="var(--accent-dark)" strokeWidth="2.5" strokeLinecap="round"/>
    <path d="M6,12 Q3,10 3,8 Q3,5 6,7" fill="none" stroke="var(--accent-dark)" strokeWidth="2" strokeLinecap="round"/>
    <rect x="10" y="16" width="10" height="10" rx="3" fill="var(--lemon-bright)" opacity="0.7"/>
  </svg>
);
// Frame 2: slightly tilted, stir line
const Frame2 = () => (
  <svg width="32" height="38" viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g transform="rotate(-12 16 20)">
      <rect x="6" y="8" width="18" height="24" rx="4" fill="white" stroke="var(--accent)" strokeWidth="2"/>
      <path d="M24,14 Q31,14 31,20 Q31,26 24,26" fill="none" stroke="var(--accent)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M6,12 Q3,10 3,8 Q3,5 6,7" fill="none" stroke="var(--accent)" strokeWidth="2" strokeLinecap="round"/>
      <rect x="10" y="16" width="10" height="10" rx="3" fill="var(--lemon-bright)" opacity="0.8"/>
    </g>
    <path d="M18,28 Q22,24 18,20 Q14,16 18,12" fill="none" stroke="var(--lemon-zest)" strokeWidth="1.5" strokeLinecap="round" opacity="0.7"/>
  </svg>
);
// Frame 3: more tilted, swirl
const Frame3 = () => (
  <svg width="32" height="38" viewBox="0 0 32 38" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g transform="rotate(-22 16 20)">
      <rect x="6" y="8" width="18" height="24" rx="4" fill="white" stroke="var(--accent-dark)" strokeWidth="2"/>
      <path d="M24,14 Q31,14 31,20 Q31,26 24,26" fill="none" stroke="var(--accent-dark)" strokeWidth="2.5" strokeLinecap="round"/>
      <path d="M6,12 Q3,10 3,8 Q3,5 6,7" fill="none" stroke="var(--accent-dark)" strokeWidth="2" strokeLinecap="round"/>
      <rect x="10" y="16" width="10" height="10" rx="3" fill="var(--lemon-bright)"/>
    </g>
    <path d="M20,30 Q26,24 20,18 Q14,12 20,6" fill="none" stroke="var(--lemon-zest)" strokeWidth="2" strokeLinecap="round" opacity="0.8"/>
    <path d="M14,28 Q8,22 14,16" fill="none" stroke="var(--accent)" strokeWidth="1.5" strokeLinecap="round" opacity="0.6"/>
  </svg>
);

const FRAMES = [Frame1, Frame2, Frame3];

export default function Experience() {
  const [frames, setFrames] = useState<Record<number, number>>({});
  const intervals = useRef<Record<number, ReturnType<typeof setInterval>>>({});

  const startStir = (id: number) => {
    if (intervals.current[id]) return;
    setFrames(prev => ({ ...prev, [id]: 0 }));
    let f = 0;
    intervals.current[id] = setInterval(() => {
      f = (f + 1) % 3;
      setFrames(prev => ({ ...prev, [id]: f }));
    }, 160);
  };

  const stopStir = (id: number) => {
    if (intervals.current[id]) {
      clearInterval(intervals.current[id]);
      delete intervals.current[id];
    }
    setFrames(prev => ({ ...prev, [id]: -1 })); // -1 = resting (show frame 0 at low opacity)
  };

  return (
    <section id="experience" style={{ background: 'var(--bg-experience)', padding: '56px 32px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>

        {/* Single header */}
        <div className="text-center mb-12 reveal">
          <h2 className="font-display"
            style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, color: 'var(--text-dark)' }}>
            The ingredients that made me.
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '.88rem', marginTop: '6px' }}>
            Hover any role to see it stir.
          </p>
        </div>

        {/* Timeline */}
        <div style={{ maxWidth: '860px', margin: '0 auto' }}>
          <div className="relative" style={{ paddingLeft: '72px' }}>
            <div className="timeline-line" />

            {experienceData.map((exp, i) => {
              const currentFrame = frames[exp.id] ?? -1;
              const isActive = currentFrame >= 0;

              return (
                <div
                  key={exp.id}
                  className="reveal"
                  style={{ position: 'relative', marginBottom: i < experienceData.length - 1 ? '32px' : 0, transitionDelay: `${i * 0.05}s` }}
                  onMouseEnter={() => startStir(exp.id)}
                  onMouseLeave={() => stopStir(exp.id)}
                >
                  {/* Stir marker — positioned on the timeline line */}
                  <div
                    className={`stir-marker absolute${isActive ? ' active' : ''}`}
                    style={{ left: '-58px', top: '14px' }}
                    aria-hidden="true"
                  >
                    {/*
                      3-FRAME STIR IMAGES
                      SWAP each FrameN component with:
                        <img src="./stir-frame-N.png" style={{width:'36px',height:'36px',objectFit:'contain'}} alt="" />
                    */}
                    {FRAMES.map((FrameComp, fi) => (
                      <div
                        key={fi}
                        className={`stir-frame${(isActive ? currentFrame : 0) === fi ? ' visible' : ''}`}
                      >
                        <FrameComp />
                      </div>
                    ))}
                  </div>

                  {/* Experience card */}
                  <div style={{
                    background: 'white',
                    borderRadius: 'var(--radius-md)',
                    padding: '20px 24px',
                    border: '1.5px solid var(--lemon-bright)',
                    boxShadow: isActive ? '0 8px 28px var(--lemon-shadow)' : '0 2px 10px rgba(0,0,0,.05)',
                    transition: 'box-shadow .25s ease, transform .25s ease',
                    transform: isActive ? 'translateX(5px)' : 'none',
                    cursor: 'default',
                  }}>
                    <h3 className="font-display mb-2"
                      style={{ fontSize: '1.22rem', fontWeight: 700, color: 'var(--text-dark)' }}>
                      {exp.title}
                    </h3>
                    <div className="flex flex-wrap gap-3 mb-3"
                      style={{ fontSize: '.83rem', color: 'var(--text-mid)' }}>
                      <span className="flex items-center gap-1.5">
                        <Building size={14} style={{ color: 'var(--accent)' }} />
                        <span style={{ fontWeight: 600 }}>{exp.company}</span>
                      </span>
                      <span className="flex items-center gap-1.5">
                        <MapPin size={14} style={{ color: 'var(--accent)' }} />
                        {exp.location}
                      </span>
                      <span className="flex items-center gap-1.5">
                        <Calendar size={14} style={{ color: 'var(--accent)' }} />
                        {exp.duration}
                      </span>
                    </div>
                    <p style={{ fontSize: '.96rem', color: 'var(--text-mid)', lineHeight: 1.75 }}>
                      {exp.description}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
}
