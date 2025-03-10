import type { JSONContent } from '@tiptap/core';
import type { Editor } from '@tiptap/react';

interface RichtextChangeEvent {
  value: JSONContent;
  isSemiEmpty: boolean;
}

interface RichTextExtensionsOptions {
  // toc?: {}; // TocConfig;
  // plantUml?: {}; // PlantUmlConfig;
  // image?: {
  //   onAddImage?: (file: File) => void;
  //   onAddFile?: (file: File) => void;
  //   imageList?: unknown[]; // ImageListItem[];
  // };
}

interface RichTextExtensionsOptions {
  extensionsOptions?: RichTextExtensionsOptions;
  editorContentRef: React.MutableRefObject<HTMLDivElement | null>;
  internalScrollContainerId: string;
  enableEditorOnChangeFn: (enabled?: boolean) => void;
}

interface RichtextContainerProps {
  disabled?: boolean;
  editable?: boolean;

  initialValue?: string;
  placeholder?: string;

  maxHeight?: number | 'auto';
  className?: string;

  onEditorInstanceChange?: (editor: Editor) => void;
  onEditorContentWidthChange?: (widthHeigth: [number, number]) => void;

  onChange?: (changeEvent: RichtextChangeEvent) => void;

  extensionsOptions?: RichTextExtensionsOptions;

  // autoscrollCfg?: { autoscroll: () => void };
}

export type { RichtextContainerProps, RichtextChangeEvent, RichTextExtensionsOptions };
