import { ReactNodeViewRenderer } from '@tiptap/react';
import { Node, mergeAttributes, nodeInputRule } from '@tiptap/core';

import { ImageView } from './Image.view';

import { ImageConfig } from './interfaces';

import styles from './image.module.scss';

const IMAGE_EXTENSION = 'image';
const INPUT_REGEXP = /^(https?:\/\/.*\.(?:jpe?g|png)(?:\?.*)?)\s$/;

const Image = Node.create<ImageConfig>({
  name: IMAGE_EXTENSION,
  group: 'block',
  draggable: true,

  addOptions() {
    return {};
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },

      scale: {
        default: 1,
      },

      pos: {
        default: [0, 0],
      },

      height: {
        default: 512,
      },
    };
  },

  renderText({ node }) {
    return node.attrs['src'];
  },

  parseHTML() {
    return [{ tag: `nav[data-extension="${this.name}"]` }];
  },

  renderHTML({ node, HTMLAttributes }) {
    return [
      'div',
      mergeAttributes(HTMLAttributes, { class: styles.imageContainer, 'data-extension': this.name }),
      ['img', { src: node.attrs['src'], alt: node.attrs['src'], title: node.attrs['src'] }],
    ];
  },

  addNodeView() {
    return ReactNodeViewRenderer(ImageView);
  },

  addCommands() {
    return {
      setImage:
        ({ src }) =>
        ({ commands }) => {
          return commands.insertContent([
            { type: 'paragraph' },
            { type: this.name, attrs: { src } },
            { type: 'paragraph' },
          ]);
        },
    };
  },

  addInputRules() {
    return [
      nodeInputRule({
        find: INPUT_REGEXP,
        type: this.type,
        getAttributes: (match) => {
          // const [, , alt, src, title] = match;

          console.log('Fires', match[1]);

          return { src: match[1] };
        },
      }),
    ];
  },
});

export { Image };
