import type { Editor } from '@tiptap/core';

import type { DrawIoConfig, DrawIoStorage, DrawIoAttributes } from '../core/interfaces';

interface DrawIoPostPata {
  action: string;
  autosave: 1 | 0;
  title: string;
  xml?: string;
  xmlpng?: string;
}

interface DrawIoEvent {
  data?: string;
}

interface DrawIoMessage {
  event?: 'init' | 'save' | 'export' | 'exit' | 'autosave' | 'prompt' | 'spinner';
  xml?: string;

  data?: string; // appears on export event

  message?: {
    data: string;
  }; // appears on prompt
  value?: string; // appears on prompt
}

interface UiWidgetProps {
  extension: {
    name: string;
    options: DrawIoConfig;
    storage: DrawIoStorage;
  };

  node: {
    attrs: DrawIoAttributes;
  };

  editor: Editor;
  selected: boolean;
  deleteNode: () => void;

  updateAttributes: (attrs: DrawIoAttributes) => void;
  getPos: () => number;
}

export type { DrawIoPostPata, DrawIoEvent, DrawIoMessage, UiWidgetProps };
