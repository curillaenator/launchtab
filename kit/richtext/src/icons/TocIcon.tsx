import React, { FC } from 'react';

export const TocIcon: FC = () => (
  <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
    <rect x='5.49609' y='5.5' width='21' height='21' rx='2' fill='#FF4040' />

    <mask
      id='mask0_1991_125189'
      style={{ maskType: 'alpha' }}
      maskUnits='userSpaceOnUse'
      x='5'
      y='5'
      width='22'
      height='22'
    >
      <rect x='5.49609' y='5.5' width='21' height='21' rx='2' fill='#6060FF' />
    </mask>

    <g mask='url(#mask0_1991_125189)'>
      <path opacity='0.1' d='M34.1087 24.3438L21.9941 13H9.99414V20L22.2051 30.9582L34.1087 24.3438Z' fill='#0A0A0A' />

      <path
        d='M10.9941 13H20.9941M10.9941 16.5H15.9941M10.9941 20H20.9941'
        stroke='white'
        strokeWidth='1.4'
        strokeLinecap='round'
        strokeLinejoin='round'
      />
    </g>
  </svg>
);
