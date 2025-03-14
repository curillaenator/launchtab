import React from 'react';

const CharIcon = ({ color }: { color: string }) => (
  <svg
    width={32}
    height={32}
    viewBox='0 0 32 32'
    fill='none'
    xmlns='http://www.w3.org/2000/svg'
    xmlnsXlink='http://www.w3.org/1999/xlink'
  >
    <defs />
    <mask id='mask2_2257' mask-type='alpha' maskUnits='userSpaceOnUse' x={0} y={0} width={32} height={32}>
      <rect id='Rectangle 1' x={8.501953} y={8.497009} rx={4} width={15} height={15} stroke='#000000' />
    </mask>
    <g mask='url(#mask2_2257)'>
      <rect id='icon-color' width={32} height={32} fill='#C2C2C2' />
    </g>
    <mask id='mask2_2263' mask-type='alpha' maskUnits='userSpaceOnUse' x={0} y={0} width={32} height={32}>
      <path
        id='button-label'
        d='M18.668 20.6L17.8269 18.2868L14.068 18.2868L13.24 20.6L11.7549 20.6L15.1852 11.4L16.7755 11.4L20.2451 20.6L18.668 20.6ZM15.9475 13.0823L14.5281 17.0251L17.3669 17.0251L15.9475 13.0823Z'
        fillRule='nonzero'
        fill='#FFFFFF'
      />
    </mask>

    <g mask='url(#mask2_2263)'>
      <rect id='icon-color' width={32} height={32} fill={color} />
    </g>
  </svg>
);

const BlackCharIcon = () => <CharIcon color='#101010' />;
const BlueCharIcon = () => <CharIcon color='#0747A6' />;
const RedCharIcon = () => <CharIcon color='#DE350B' />;
const LightGreyCharIcon = () => <CharIcon color='#C1C7D0' />;
const LightBlueCharIcon = () => <CharIcon color='#4C9AFF' />;
const GreenCharIcon = () => <CharIcon color='#00875A' />;
const DarkOrangeCharIcon = () => <CharIcon color='#FF8B00' />;
const LightOrangeCharIcon = () => <CharIcon color='#FFAB00' />;
const PurpleCharIcon = () => <CharIcon color='#403294' />;

export {
  BlackCharIcon,
  BlueCharIcon,
  RedCharIcon,
  LightGreyCharIcon,
  LightBlueCharIcon,
  GreenCharIcon,
  DarkOrangeCharIcon,
  LightOrangeCharIcon,
  PurpleCharIcon,
};
