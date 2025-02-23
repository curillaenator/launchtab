import type { JSONContent } from '@tiptap/core';
import type { Editor } from '@tiptap/react';

interface RichtextChangeEvent {
  value: JSONContent;
  isSemiEmpty: boolean;
  // hasText: boolean;
  // isEditable: boolean;
  // hasOnlyImage: boolean;
}

interface RichTextExtensionsOptions {
  // toc?: {}; // TocConfig;
  // plantUml?: {}; // PlantUmlConfig;
  // uniqueIdCfg?: {}; // UniqueIdConfig;
  // image?: {
  //   onAddImage?: (file: File) => void;
  //   onAddFile?: (file: File) => void;
  //   imageList?: unknown[]; // ImageListItem[];
  // };
  // files?: {
  //   filesList?: unknown[]; // FileListItem[];
  // };
}

interface RichTextExtensionsConfig {
  editorContentRef: React.MutableRefObject<HTMLDivElement | null>;
  internalScrollContainerId: string;
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

  // tocCfg?: TocAsideConfig;
  // autoscrollCfg?: { autoscroll: () => void };
  // currentTocItem?: string | null;

  onChange?: (changeEvent: RichtextChangeEvent) => void;

  extensionsOptions?: RichTextExtensionsOptions;
}

export type { RichtextContainerProps, RichtextChangeEvent, RichTextExtensionsConfig, RichTextExtensionsOptions };
