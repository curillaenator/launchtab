// import type { ReactNode } from 'react';
import type { AnyExtension, JSONContent } from '@tiptap/core';
import type { Editor } from '@tiptap/react';

// import type {
//   ControlCaption,
//   OnAddImageReturnType,
//   TableCommand,
//   ToolbarComponentStruct,
//   ToolbarProps,
// } from './components/Toolbar';

// import type { DrawIoConfig } from './extensions/DrawIO/core/interfaces';
// import type { PlantUmlConfig } from './extensions/PlantUML/core/interfaces';
// import type { IncludeConfig } from './extensions/Include/core/interfaces';
// import type { FilterTableExternalConfig } from './extensions/FilterTable/core/interfaces';
// import type { MentionLinkConfig } from './extensions/MentionLink/core/interfaces';
// import type { TocNodeConfig } from './extensions/ToC/core/interfaces';
// import type { TocAsideConfig } from './components/TocAside/interfaces';
// import type { ReactHeadingConfig } from './extensions/Heading/react/interfaces';
// import type { BlocksGridConfig } from './extensions/BlocksGrid/core/interfaces';
// import type { UniqueIdConfig } from './extensions/UniqueId';

interface RichtextChangeEvent {
  value: JSONContent;
  isEditable: boolean;
  hasText: boolean;
  hasOnlyImage: boolean;
  isSemiEmpty: boolean;
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

  // aside?: ReactNode;
  // view?: 'default' | 'minimalistic';

  // renderAside?: boolean;
  // tocCfg?: TocAsideConfig;
  // autoscrollCfg?: { autoscroll: () => void };
  // currentTocItem?: string | null;

  ///

  onChange?: (changeEvent: RichtextChangeEvent) => void;

  toolStruct?: any;

  extensionsOptions: {
    uniqueIdCfg?: {}; // UniqueIdConfig;
    toc?: {}; // TocConfig;
    blocksGrid?: {}; // BlocksGridConfig;
    drawio?: {}; // DrawIoConfig;
    plantUml?: {}; // PlantUmlConfig;
    table?: {}; // FilterTableConfig;
    heading?: {}; // HeadingConfig;
    image: {
      onAddImage?: (file: File) => void;
      onAddFile?: (file: File) => void;
      imageList?: any[]; // ImageListItem[];
    };
    files: {
      filesList?: any[]; // FileListItem[];
    };
  };
}

interface ExtensionsConfig extends RichtextContainerProps {
  editorContentRef?: React.MutableRefObject<HTMLDivElement | null>;
}

export type { RichtextContainerProps, RichtextChangeEvent, ExtensionsConfig };
