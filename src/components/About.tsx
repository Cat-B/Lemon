import React from 'react';
import { personalInfo } from '../data/content';

export default function About() {
  return (
    <section id="about" style={{ background: 'var(--bg-about)', padding: '56px 32px' }}>
      <div style={{ maxWidth: '1320px', margin: '0 auto' }}>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-14 items-start">

          {/* LEFT: text + skills */}
          <div>
            <h2
              className="font-display reveal mb-5"
              style={{ fontSize: 'clamp(2rem, 3.8vw, 3rem)', fontWeight: 800, lineHeight: 1.12, color: 'var(--text-dark)' }}
            >
              When life gives you lemons,{' '}
              <span style={{ color: 'var(--accent)' }}>build something with them.</span>
            </h2>

            <div className="reveal delay-1 space-y-4 mb-8"
              style={{ color: 'var(--text-mid)', lineHeight: 1.85, fontSize: '1.02rem' }}>
              <p>{personalInfo.bio}</p>
            </div>

            <div className="reveal delay-2">
              <p className="mb-2" style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                What I Do
              </p>
              <div className="flex flex-wrap gap-2 mb-5">
                {personalInfo.skills.whatIDo.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
              <p className="mb-2" style={{ fontSize: '.72rem', fontWeight: 700, letterSpacing: '.1em', textTransform: 'uppercase', color: 'var(--text-light)' }}>
                Who I Am
              </p>
              <div className="flex flex-wrap gap-2">
                {personalInfo.skills.whoIAm.map(s => <span key={s} className="skill-chip">{s}</span>)}
              </div>
            </div>
          </div>

          {/* RIGHT: cutting board fun fact cards */}
          <div className="flex flex-col gap-5 reveal delay-1">
            <p className="font-display italic text-center mb-1"
              style={{ fontSize: '.92rem', color: 'var(--text-light)' }}>
              — a few fresh facts —
            </p>

            {personalInfo.funFacts.map((fact, i) => (
              <div key={i} className="board-card p-5 pr-16">
                {/*
                  SWAP: replace this span with your Procreate lemon slice:
                  <img src="./lemon-slice.png" alt="" style={{ position:'absolute', right:'14px',
                    top:'50%', transform:'translateY(-50%)', width:'48px' }} />
                */}
                <span aria-hidden="true" style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', fontSize: '2rem', lineHeight: 1 }}>
                  🍋
                </span>
                <p style={{ fontSize: '.62rem', fontWeight: 700, letterSpacing: '.12em', textTransform: 'uppercase', color: 'rgba(255,255,255,.6)', marginBottom: '4px' }}>
                  {fact.label}
                </p>
                <h4 className="font-display mb-1" style={{ color: 'white', fontSize: '1rem', fontWeight: 700 }}>
                  {fact.title}
                </h4>
                <p style={{ fontSize: '.85rem', color: 'rgba(255,255,255,.88)', lineHeight: 1.6 }}>
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
