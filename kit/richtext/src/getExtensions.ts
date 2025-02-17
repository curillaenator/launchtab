import { Underline } from '@tiptap/extension-underline';
import { TextAlign } from '@tiptap/extension-text-align';
import { Link } from '@tiptap/extension-link';
import { TextStyle } from '@tiptap/extension-text-style';
import { TableRow } from '@tiptap/extension-table-row';
import { Highlight } from '@tiptap/extension-highlight';
import { Color } from '@tiptap/extension-color';
import { Blockquote } from '@tiptap/extension-blockquote';
import { Bold } from '@tiptap/extension-bold';
import { BulletList } from '@tiptap/extension-bullet-list';
import { Code } from '@tiptap/extension-code';
import { Document } from '@tiptap/extension-document';
import { Dropcursor } from '@tiptap/extension-dropcursor';
import { Gapcursor } from '@tiptap/extension-gapcursor';
import { HardBreak } from '@tiptap/extension-hard-break';
import { History } from '@tiptap/extension-history';
import { HorizontalRule } from '@tiptap/extension-horizontal-rule';
import { Italic } from '@tiptap/extension-italic';
import { ListItem } from '@tiptap/extension-list-item';
import { OrderedList } from '@tiptap/extension-ordered-list';
import { Paragraph } from '@tiptap/extension-paragraph';
import { Strike } from '@tiptap/extension-strike';
import { Text } from '@tiptap/extension-text';
import { TaskList } from '@tiptap/extension-task-list';
import { TaskItem } from '@tiptap/extension-task-item';
import { Superscript } from '@tiptap/extension-superscript';
import { Subscript } from '@tiptap/extension-subscript';

import { DrawIO } from './extensions/DrawIO';
import { BlocksGrid, BlocksGridColumn } from './extensions/BlocksGrid';
import { Draggable } from './extensions/Draggable';
// import { Indent } from './extensions/Indent';
// import { PaintableTableCell } from './extensions/FilterTable/core/TableCell';
// import { Emoji } from './extensions/Emoji';
// import { MediaGroup } from './extensions/MediaGroup';
// import { MediaSingle } from './extensions/MediaSingle';
// import { Media } from './extensions/Media';
// import { Panel } from './extensions/Panel';

import { RichTextExtensionsConfig, RichTextExtensionsOptions } from './interfaces';

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

  Highlight.configure({ multicolor: true }),

  Color,

  // PaintableTableCell,

  // Emoji,
  // Media,
  // MediaGroup,
  // MediaSingle,
  // Panel,

  Draggable.configure({ types: ['fileLink'] }),
];

interface GetExtensionsArgs {
  extensionsOptions: RichTextExtensionsOptions;
  config: RichTextExtensionsConfig;
}

function getExtensions(args: GetExtensionsArgs) {
  const { extensionsOptions, config } = args;

  const { drawio, blocksGrid } = extensionsOptions;

  const {
    dataTestId,
    // internalScrollContainerId,
    editorContentRef,
  } = config;

  const extensions = [...CORE_EXTENSIONS];

  if (drawio)
    extensions.push(
      DrawIO.configure({
        ...drawio,
        dataTestId: `${dataTestId}.DrawIO`,
      }),
    );

  if (blocksGrid) {
    extensions.push(
      BlocksGrid.configure({
        ...blocksGrid,
        dataTestId: `${dataTestId}.BlocksGrid`,
      }),
    );
    extensions.push(
      BlocksGridColumn.configure({
        dataTestId: `${dataTestId}.BlocksGridColumn`,
        editorContentRef,
      }),
    );
  }

  return extensions;
}

export { getExtensions };
