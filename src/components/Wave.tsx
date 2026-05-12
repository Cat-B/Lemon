import React from 'react';

interface WaveProps {
  fromColor: string;
  toColor: string;
  flip?: boolean;
}

export default function Wave({ fromColor, toColor, flip = false }: WaveProps) {
  return (
    <div
      className="wave-divider"
      style={{ background: fromColor, transform: flip ? 'scaleX(-1)' : 'none', position: 'relative' }}
    >
      <svg viewBox="0 0 1440 52" preserveAspectRatio="none" height="52" xmlns="http://www.w3.org/2000/svg">
        <path d="M0,0 C360,52 1080,0 1440,36 L1440,52 L0,52 Z" fill={toColor} />
        {/* Decorative lemon dots sitting on the wave crest — these scroll away with the page */}
        <circle cx="320"  cy="26" r="5" fill="var(--lemon-bright)" opacity="0.7"/>
        <circle cx="320"  cy="26" r="2.5" fill="var(--lemon-zest)" opacity="0.6"/>
        <circle cx="720"  cy="14" r="6" fill="var(--lemon-bright)" opacity="0.65"/>
        <circle cx="720"  cy="14" r="3" fill="var(--lemon-zest)" opacity="0.55"/>
        <circle cx="1100" cy="30" r="5" fill="var(--lemon-bright)" opacity="0.7"/>
        <circle cx="1100" cy="30" r="2.5" fill="var(--lemon-zest)" opacity="0.6"/>
      </svg>
    </div>
  );
}
