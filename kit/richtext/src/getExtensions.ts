import { Document } from '@tiptap/extension-document';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { History } from '@tiptap/extension-history';

import { TextStyle } from '@tiptap/extension-text-style';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Text } from '@tiptap/extension-text';
import { Strike } from '@tiptap/extension-strike';
import { Bold } from '@tiptap/extension-bold';
import { Code } from '@tiptap/extension-code';
import { Underline } from '@tiptap/extension-underline';
import { Italic } from '@tiptap/extension-italic';
import { CodeBlockLowlight } from '@tiptap/extension-code-block-lowlight';

import { TextAlign } from '@tiptap/extension-text-align';
import { Blockquote } from '@tiptap/extension-blockquote';
import { HardBreak } from '@tiptap/extension-hard-break';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';

import { FilterTable, TableHeader, TableCell } from './extensions/FilterTable';
import { TableRow } from '@tiptap/extension-table-row';

import { Link } from '@tiptap/extension-link';
import { Highlight } from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';

import { BulletList } from '@tiptap/extension-bullet-list';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';

import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';

import { DrawIO } from './extensions/DrawIO';
import { BlocksGrid, BlocksGridColumn } from './extensions/BlocksGrid';
import { Heading } from './extensions/Heading';
import { Draggable } from './extensions/Draggable';
// import { Indent } from './extensions/Indent';

import { all, createLowlight } from 'lowlight';

import { RichTextExtensionsConfig, RichTextExtensionsOptions } from './interfaces';

// create a lowlight instance with all languages loaded
const lowlight = createLowlight(all);

const CORE_EXTENSIONS = [
  Document,

  Dropcursor,
  Gapcursor,
  History,

  HardBreak,
  Blockquote,
  HorizontalRule,
  Code.extend({ excludes: 'link italic bold strike underline highlight textStyle' }).configure({
    HTMLAttributes: { 'data-set': 'inline' },
  }),

  BulletList,
  OrderedList,
  ListItem,

  Text,
  Paragraph,

  Superscript,
  Subscript,

  Bold,
  Italic,
  Strike,
  Underline,

  TaskList,
  TaskItem,

  // Indent,

  TextAlign.configure({
    types: ['heading', 'paragraph', 'taskList'],
    defaultAlignment: 'justify',
  }),

  Link.configure({
    openOnClick: true,
    autolink: true,
  }),

  TextStyle,

  TableRow,
  TableHeader,
  TableCell,

  Highlight.configure({ multicolor: true }),

  CodeBlockLowlight.configure({
    lowlight,
  }),

  Color,

  Draggable.configure({ types: ['fileLink'] }),
];

interface GetExtensionsArgs {
  config: RichTextExtensionsConfig;
  extensionsOptions?: RichTextExtensionsOptions;
}

function getExtensions(args: GetExtensionsArgs) {
  const { extensionsOptions, config } = args;

  const {
    dataTestId,
    // internalScrollContainerId,
    editorContentRef,
  } = config;

  const extensions = [...CORE_EXTENSIONS];

  if (extensionsOptions?.drawio) {
    extensions.push(DrawIO.configure({ ...extensionsOptions.drawio, dataTestId: `${dataTestId}.DrawIO` }));
  }

  extensions.push(FilterTable.configure(extensionsOptions?.table));
  extensions.push(Heading.configure(extensionsOptions?.heading));
  extensions.push(BlocksGrid.configure({ dataTestId: `${dataTestId}.BlocksGrid` }));
  extensions.push(BlocksGridColumn.configure({ dataTestId: `${dataTestId}.BlocksGridColumn`, editorContentRef }));

  return extensions;
}

export { getExtensions };
