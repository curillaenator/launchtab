// import type { ReactNode } from 'react';
import type {
  // AnyExtension,
  JSONContent,
} from '@tiptap/core';
import type { Editor } from '@tiptap/react';

// import type {
//   ControlCaption,
//   OnAddImageReturnType,
//   TableCommand,
// ToolbarComponentStruct,
//   ToolbarProps,
// } from './components/Toolbar';

import type { DrawIOConfig } from './extensions/DrawIO';
// import type { PlantUmlConfig } from './extensions/PlantUML/core/interfaces';
// import type { FilterTableExternalConfig } from './extensions/FilterTable/core/interfaces';
// import type { MentionLinkConfig } from './extensions/MentionLink/core/interfaces';
// import type { TocNodeConfig } from './extensions/ToC/core/interfaces';
// import type { TocAsideConfig } from './components/TocAside/interfaces';
import type { ReactHeadingConfig } from './extensions/Heading';
import type { BlocksGridConfig } from './extensions/BlocksGrid';
// import type { UniqueIdConfig } from './extensions/UniqueId';

interface RichtextChangeEvent {
  value: JSONContent;
  // isEditable: boolean;
  // hasText: boolean;
  // hasOnlyImage: boolean;
  isSemiEmpty: boolean;
}

interface RichTextExtensionsOptions {
  drawio?: DrawIOConfig;
  blocksGrid?: BlocksGridConfig;
  heading?: ReactHeadingConfig;
  // uniqueIdCfg?: {}; // UniqueIdConfig;
  // toc?: {}; // TocConfig;
  // plantUml?: {}; // PlantUmlConfig;
  // table?: {}; // FilterTableConfig;
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
  dataTestId: string;
  editorContentRef: React.MutableRefObject<HTMLDivElement | null>;
  internalScrollContainerId: string;
}

interface RichtextContainerProps {
  dataTestId?: string;

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

  toolStruct?: unknown;

  extensionsOptions?: RichTextExtensionsOptions;
}

export type { RichtextContainerProps, RichtextChangeEvent, RichTextExtensionsConfig, RichTextExtensionsOptions };
