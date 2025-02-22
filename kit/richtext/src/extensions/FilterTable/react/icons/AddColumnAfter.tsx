import React, { FC } from 'react';

const AddColumnAfter: FC = () => {
  return (
    <div style={{ padding: '4px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="icon icon-tabler icon-tabler-column-insert-left"
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
        <path d="M14 4h4a1 1 0 0 1 1 1v14a1 1 0 0 1 -1 1h-4a1 1 0 0 1 -1 -1v-14a1 1 0 0 1 1 -1z" />
        <path d="M5 12l4 0" />
        <path d="M7 10l0 4" />
      </svg>
    </div>
  );
};

export { AddColumnAfter };
