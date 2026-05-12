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
      style={{ background: fromColor, transform: flip ? 'scaleX(-1)' : 'none' }}
    >
      <svg viewBox="0 0 1440 56" preserveAspectRatio="none" height="56">
        <path
          d="M0,0 C360,56 1080,0 1440,40 L1440,56 L0,56 Z"
          fill={toColor}
        />
      </svg>
    </div>
  );
}
