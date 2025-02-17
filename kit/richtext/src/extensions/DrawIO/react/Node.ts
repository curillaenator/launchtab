import { mergeAttributes } from '@tiptap/core';
import { ReactNodeViewRenderer, NodeViewProps } from '@tiptap/react';

import type { DrawIoAttributes } from '../core/interfaces';
import { DrawIoPlugin as DrawIoPluginCore } from '../core';

import UiWidget from './Widget';

import styles from './node.module.scss';

import drawioIcon from './icons/drawioFileIcon.png';

const DrawIoPlugin = DrawIoPluginCore.extend({
  addOptions() {
    return this.parent?.();
  },

  renderHTML({ HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: styles.htmlNode, 'data-drawio': true }),
      ['span', { class: styles.htmlFilename }, HTMLAttributes.drawIoName || 'N/A'],
      ['img', { class: styles.htmlImage, src: drawioIcon }],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(UiWidget as unknown as React.ComponentType<NodeViewProps>);
  },
});

export { DrawIoPlugin };
