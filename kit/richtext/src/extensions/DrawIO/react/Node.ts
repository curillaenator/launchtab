import { mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react';

import { UIWidget } from './Widget';
import { DrawIoPlugin as DrawIoPluginCore } from '../core';

import { DRAWIO_DUMMY_IMG } from './constants';
import styles from './node.module.scss';

const DrawIO = DrawIoPluginCore.extend({
  addOptions() {
    return this.parent?.();
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: styles.htmlNode, 'data-drawio': true }),
      ['span', { class: styles.htmlFilename }, HTMLAttributes.drawIoName || 'N/A'],
      ['img', { class: styles.htmlImage, src: DRAWIO_DUMMY_IMG }],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(UIWidget as unknown as React.ComponentType<NodeViewProps>);
  },
});

export { DrawIO };
