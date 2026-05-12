import React, { useState } from 'react';
import { MapPin, Calendar, Building } from 'lucide-react';
import { experienceData } from '../data/content';

export default function Experience() {
  const [hoveredId, setHoveredId] = useState<number | null>(null);

  return (
    <section id="experience" style={{ background: 'var(--bg-experience)', padding: '80px 32px' }}>
      <div style={{ maxWidth: '900px', margin: '0 auto' }}>

        {/* Header */}
        <div className="text-center mb-14 reveal">
          <span className="pill-label">🍋 Experience</span>
          <h2
            className="font-display mt-3 mb-2"
            style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 800, color: 'var(--text-dark)' }}
          >
            The ingredients that made me.
          </h2>
          <p style={{ color: 'var(--text-light)', fontSize: '0.88rem' }}>
            Hover the pitcher on the timeline — watch it stir!
          </p>
        </div>

        {/* Timeline */}
        <div className="relative" style={{ paddingLeft: '58px' }}>

          {/* Vertical line */}
          <div className="timeline-line" />

          {experienceData.map((exp, i) => (
            <div
              key={exp.id}
              className="reveal"
              style={{
                position: 'relative',
                marginBottom: i < experienceData.length - 1 ? '38px' : '0',
                transitionDelay: `${i * 0.08}s`,
              }}
            >
              {/*
                STIR MARKER
                This is the pitcher on the timeline.
                SWAP: replace the emoji below with your 3-frame Procreate pitcher images.

                How the 3-frame animation works:
                  - Frame 1 (default): still pitcher icon
                  - On hover, CSS @keyframes stirSpin rotates the icon back/forth
                  - For full 3-frame sprite swap, use:
                    hoveredId === exp.id ? "jug-stir2.png" : "jug-still.png"
                    and add a third frame via animation steps
              */}
              <div
                className="stir-marker absolute"
                style={{ left: '-44px', top: '8px' }}
                onMouseEnter={() => setHoveredId(exp.id)}
                onMouseLeave={() => setHoveredId(null)}
                aria-hidden="true"
              >
                {/* SWAP: <img src={hoveredId === exp.id ? './jug2.png' : './jug1.png'} style={{width:'28px'}} alt="" /> */}
                <span className="stir-icon">
                  {hoveredId === exp.id ? '🌀' : '🫙'}
                </span>
              </div>

              {/* Experience card */}
              <div
                className="reveal"
                style={{
                  background: 'white',
                  borderRadius: 'var(--radius-md)',
                  padding: '20px 24px',
                  border: '1.5px solid var(--lemon-bright)',
                  boxShadow: hoveredId === exp.id ? '0 8px 28px var(--lemon-shadow)' : '0 2px 12px rgba(0,0,0,0.06)',
                  transition: 'box-shadow 0.25s ease, transform 0.25s ease',
                  transform: hoveredId === exp.id ? 'translateX(4px)' : 'none',
                }}
              >
                <h3
                  className="font-display mb-2"
                  style={{ fontSize: '1.2rem', fontWeight: 700, color: 'var(--text-dark)' }}
                >
                  {exp.title}
                </h3>

                <div className="flex flex-wrap gap-3 mb-3" style={{ fontSize: '0.83rem', color: 'var(--text-mid)' }}>
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

                <p style={{ fontSize: '0.95rem', color: 'var(--text-mid)', lineHeight: 1.75 }}>
                  {exp.description}
                </p>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
