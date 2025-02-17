import type { MutableRefObject } from 'react';

export interface BlocksGridConfig {
  disableOverlap?: boolean;
}

export interface BlocksGridOptions extends BlocksGridConfig {
  dataTestId?: string;
  blocksCount?: number;
  fatBlockIdx?: number | null;
  timestamp?: number | null;
}

export interface BlocksGridColumnConfig {
  blocksGridId: string | null;
  dataTestId?: string;
  submitButtonRef?: MutableRefObject<HTMLButtonElement | null>;
  editorContentRef?: React.MutableRefObject<HTMLDivElement | null>;
}
