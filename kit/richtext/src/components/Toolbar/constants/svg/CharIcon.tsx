import React from 'react';

const CharIcon = ({ color }: { color: string }) => (
  <svg xmlns='http://www.w3.org/2000/svg' width='24' height='24' viewBox='0 0 24 24'>
    <path
      fill='none'
      stroke={color}
      strokeLinecap='round'
      strokeLinejoin='round'
      strokeWidth='1.5'
      d='M3 21h18m-2-3l-3.375-8.842C14.057 5.053 13.274 3 12 3S9.943 5.053 8.375 9.158L5 18m3-7h8'
    />
  </svg>
);

export { CharIcon };
