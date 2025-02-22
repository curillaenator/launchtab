// https://tabler.io/icons/icon/row-insert-top

import React, { FC } from 'react';

const AddRowAfter: FC = () => {
  return (
    <div style={{ padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-row-insert-top"
        width={24}
        height={24}
        viewBox="0 0 24 24"
        strokeWidth={1.4}
        stroke="currentColor"
        fill="none"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path stroke="none" d="M0 0h24v24H0z" fill="none" />
        <path d="M4 18v-4a1 1 0 0 1 1 -1h14a1 1 0 0 1 1 1v4a1 1 0 0 1 -1 1h-14a1 1 0 0 1 -1 -1z" />
        <path d="M12 9v-4" />
        <path d="M10 7l4 0" />
      </svg>
    </div>
  );
};

export { AddRowAfter };
