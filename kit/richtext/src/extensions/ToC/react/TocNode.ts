import { ReactNodeViewRenderer } from '@tiptap/react';
import { mergeAttributes, type NodeViewProps } from '@tiptap/core';

import { TocNodeWidget } from './NodeWidget';
import { TocCore } from '../core/TocNode';
import { TOC_EXTENSION_NAME } from '../core/constants';
import { getHtmlRenderMessage } from '../core/utils';

import htmlStyles from './html.module.scss';

const TocNode = TocCore.extend({
  renderHTML({ node, HTMLAttributes }) {
    const tocTitle = node.attrs['title'] || this.options.title;

    return [
      'nav',
      mergeAttributes(HTMLAttributes, { class: htmlStyles.toctainer, 'data-type': TOC_EXTENSION_NAME }),
      ['span', { class: htmlStyles.toctitle }, tocTitle],
      ['span', { class: htmlStyles.tocmessage }, getHtmlRenderMessage(tocTitle)],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(TocNodeWidget as unknown as React.ComponentType<NodeViewProps>);
  },
});

export { TocNode };
