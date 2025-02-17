import { PropsWithChildren } from 'react';

export interface WithActionsProps extends PropsWithChildren {
  hasPreview?: boolean;
  isSrcDownloadable?: boolean;
  isDrawioEditorAvailable?: boolean;
}
