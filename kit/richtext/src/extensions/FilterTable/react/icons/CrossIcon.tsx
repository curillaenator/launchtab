import React, { FC } from 'react';

const CrossIcon: FC<{ size?: string }> = (props) => {
  const { size = '32' } = props;

  return (
    <svg width={size} height={size} viewBox="0 0 32 32" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M10 22L22 10M10 10L22 22"
        stroke="currentColor"
        fill="none"
        strokeWidth="1.4"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
};

const LocalCrossIcon = () => <CrossIcon />;

export { CrossIcon, LocalCrossIcon };
