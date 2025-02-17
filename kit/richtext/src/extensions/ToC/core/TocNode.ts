import { Node, mergeAttributes } from '@tiptap/core';
import { getHtmlRenderMessage } from './utils';
import type { TocNodeConfig } from './interfaces';

import { DEFAULT_RANGE, TOC_EXTENSION_NAME, SCROLL_DEFAULT_DURATION, SCROLL_DEFAULT_OFFSET } from './constants';

const TocCore = Node.create<TocNodeConfig>({
  name: TOC_EXTENSION_NAME,
  group: 'block',
  draggable: true,

  addOptions() {
    return { scrollDuration: SCROLL_DEFAULT_DURATION, scrollOffset: SCROLL_DEFAULT_OFFSET };
  },

  addAttributes() {
    return {
      title: { default: this.options['title'] || 'Содержание' },
      minLevel: { default: 1 },
      maxLevel: { default: 6 },
      // аттрибут, изменения которого триггерит ререндер узла ProseMirror
      timestamp: { default: Date.now(), rendered: false },
    };
  },

  renderText({ node }) {
    return `${node.attrs['title'] || ''}`;
  },

  renderHTML({ node, HTMLAttributes }) {
    const tocTitle = node.attrs['title'] || this.options.title;

    return [
      'nav',
      mergeAttributes(HTMLAttributes, { 'data-type': TOC_EXTENSION_NAME }),
      ['span', tocTitle],
      ['span', getHtmlRenderMessage(tocTitle)],
    ];
  },

  parseHTML() {
    return [{ tag: `nav[data-type="${TOC_EXTENSION_NAME}"]` }];
  },

  addCommands() {
    return {
      insertToc:
        (range) =>
        ({ commands }) => {
          const { minLevel, maxLevel } = range || DEFAULT_RANGE;

          return commands.insertContent([
            { type: 'paragraph' },
            {
              type: TOC_EXTENSION_NAME,
              attrs: { minLevel, maxLevel, timestamp: Date.now() },
            },
            { type: 'paragraph' },
          ]);
        },
    };
  },
});

export { TocCore };
