import React from 'react';
import { personalInfo } from '../data/content';

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg-about)', padding: '80px 32px' }}>
      <div style={{ maxWidth: '1100px', margin: '0 auto' }}>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* ── LEFT: text + skills ── */}
          <div>
            <span className="pill-label reveal">🍋 About Me</span>
            <h2
              className="font-display reveal delay-1 mt-3 mb-6"
              style={{ fontSize: 'clamp(1.9rem, 3.5vw, 2.8rem)', fontWeight: 800, lineHeight: 1.15, color: 'var(--text-dark)' }}
            >
              When life gives you lemons,<br />
              <span style={{ color: 'var(--accent)' }}>build something with them.</span>
            </h2>

            <div className="reveal delay-2 space-y-4 mb-8" style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem' }}>
              <p>{personalInfo.bio}</p>
            </div>

            {/* Group photo */}
            <div className="reveal delay-3 mb-8 rounded-2xl overflow-hidden" style={{ boxShadow: '0 8px 28px var(--lemon-shadow)' }}>
              {/*
                GROUP PHOTO — swap with your Procreate or updated group photo
                Current: pulled from original site
              */}
              <img
                src={personalInfo.groupPhoto}
                alt="Catherine with her team"
                className="w-full object-cover"
                style={{ maxHeight: '260px', objectPosition: 'center top' }}
              />
            </div>

            {/* Skills */}
            <div className="reveal delay-4">
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-light)' }}>What I Do</p>
              <div className="flex flex-wrap gap-2 mb-4">
                {personalInfo.skills.whatIDo.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
              <p className="text-xs font-bold uppercase tracking-widest mb-3" style={{ color: 'var(--text-light)' }}>Who I Am</p>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.whoIAm.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          </div>

          {/* ── RIGHT: cutting board fun fact cards ── */}
          <div className="flex flex-col gap-5 reveal delay-2">
            <p
              className="font-display italic text-center mb-1"
              style={{ fontSize: '0.95rem', color: 'var(--text-light)' }}
            >
              — a few fresh facts —
            </p>

            {personalInfo.funFacts.map((fact, i) => (
              <div key={i} className="board-card p-5 pr-16">
                {/*
                  CUTTING BOARD LEMON
                  SWAP: replace the span below with:
                  <img src="./lemon-slice.png" alt="" style={{ position:'absolute', right:'14px', top:'50%', transform:'translateY(-50%)', width:'48px' }} />
                */}
                <span
                  aria-hidden="true"
                  style={{
                    position: 'absolute',
                    right: '14px',
                    top: '50%',
                    transform: 'translateY(-50%)',
                    fontSize: '2rem',
                    lineHeight: 1,
                  }}
                >
                  🍋
                </span>

                <p
                  className="font-display"
                  style={{ fontSize: '0.62rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,0.6)', marginBottom: '4px' }}
                >
                  {fact.label}
                </p>
                <h4
                  className="font-display mb-1"
                  style={{ color: 'white', fontSize: '1rem', fontWeight: 700 }}
                >
                  {fact.title}
                </h4>
                <p style={{ fontSize: '0.85rem', color: 'rgba(255,255,255,0.88)', lineHeight: 1.6 }}>
                  {fact.body}
                </p>
              </div>
            ))}
          </div>

        </div>
      </div>
    </section>
  );
}
