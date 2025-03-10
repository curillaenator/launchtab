import React, { FC } from 'react';

const TableColorFillSquareIcon: FC<React.HTMLProps<HTMLDivElement>> = (props) => {
  return (
    <div {...props} style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', ...props.style }}>
      <svg width='32' height='32' viewBox='0 0 32 32' fill='none' xmlns='http://www.w3.org/2000/svg'>
        <rect x='8' y='8' width='16' height='16' rx='4' fill='currentColor' />
      </svg>
    </div>
  );
};

export default TableColorFillSquareIcon;
