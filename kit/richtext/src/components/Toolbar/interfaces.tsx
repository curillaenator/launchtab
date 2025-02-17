import type { Editor as CoreEditor } from '@tiptap/core';
import type { Transaction } from '@tiptap/pm/state';
// import type { DropdownProps } from 'components/Dropdown';
// import type { TocAsideConfig } from 'components/TocAside';
// import { FC } from 'react';
// import * as React from 'react';

export type TocCommand = 'insertTableOfContent';
export type DrawIoCommand = 'insertDrawIo';
export type PlantUMLCommand = 'insertPlantUML';
export type BlocksGridCommand = 'insertBlocksGrid' | 'deleteBlocksGrid';
export type HeadingCommand = 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
export type ParagraphCommand = 'paragraph' | 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6' | 'bulletList' | 'orderedList';
export type EditorCommand = 'blockquote' | 'codeBlock' | 'hr' | 'expand' | 'checkbox';
export type TextAlignCommand = 'left' | 'center' | 'right' | 'justify';
export type TextFormatCommand = 'code' | 'bold' | 'italic' | 'strike' | 'underline';
export type HistoryCommand = 'undo' | 'redo';

export type TextColorAndHighlightClear = 'textColorClear' | 'textHighlightClear' | 'textColorAndHighlightClear';

export type TextColorCommand =
  | 'redColor'
  | 'greenColor'
  | 'lightBlueColor'
  | 'blackColor'
  | 'lightGreyColor'
  | 'blueColor'
  | 'darkOrangeColor'
  | 'lightOrangeColor'
  | 'purpleColor'
  | 'defaultColor'
  | 'redColorBackground'
  | 'greenColorBackground'
  | 'lightBlueColorBackground'
  | 'blackColorBackground'
  | 'lightGreyColorBackground'
  | 'blueColorBackground'
  | 'darkOrangeColorBackground'
  | 'lightOrangeColorBackground'
  | 'purpleColorBackground';

export type TableCommand =
  | 'tableInsert'
  | 'tableDelete'
  | 'addColumnBefore'
  | 'addColumnAfter'
  | 'deleteColumn'
  | 'addRowBefore'
  | 'addRowAfter'
  | 'deleteRow'
  | 'mergeCells'
  | 'splitCell'
  | 'toggleHeaderColumn'
  | 'toggleHeaderRow';

export type TableColorCommand =
  | 'colorFill'
  | 'colorFillLightGreen'
  | 'colorFillLightYellow'
  | 'colorFillLightRed'
  | 'colorFillLightTurquoise'
  | 'colorFillLightBlue'
  | 'colorFillModerateGray'
  | 'colorFillLightGray'
  | 'colorFillNoFill';

export type AttachmentCommand = 'chooseAttachment';
export type CommentCommand = 'inlineComment';

export type OnAddImageReturnType = Promise<{ urlForDownload: string } | undefined>;

export type ControlCaption =
  | TocCommand
  | HeadingCommand
  | ParagraphCommand
  | EditorCommand
  | TextAlignCommand
  | TextFormatCommand
  | TableCommand
  | TableColorCommand
  | TextColorCommand
  | TextColorAndHighlightClear
  | AttachmentCommand
  | DrawIoCommand
  | PlantUMLCommand
  | BlocksGridCommand
  | CommentCommand
  | HistoryCommand;

export interface ToolbarProps {
  captions?: Record<ControlCaption, string>;
  disabled?: boolean;
  // tocCfg?: Partial<Pick<TocAsideConfig, 'view' | 'setView'>>;
}

export interface UpdatePayload {
  editor: CoreEditor;
  transaction: Transaction;
}

export type ToolbarCompositionTypeName = 'full' | 'medium' | 'compact' | 'small' | 'minimal';

export type ToolbarSections = 'left' | 'right';

// export interface ToolbarActiveComponentDropdownProps extends Omit<DropdownProps<string>, 'value' | 'onChange'> {
//   defaultValue?: string;
//   button?: React.ReactElement<React.HTMLAttributes<HTMLElement>>;
//   // tocCfg?: Partial<Pick<TocAsideConfig, 'view' | 'setView'>>;
//   tooltip?: string;
// }

// export interface ToolbarComponentStruct
//   extends Record<ToolbarCompositionTypeName, Record<ToolbarSections, FC<ToolbarActiveComponentDropdownProps>[]>> {}
