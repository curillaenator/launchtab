import { Node } from '@tiptap/core';

import { DRAWIO_EXTENSION_NAME } from './constants';
import type { DrawIoConfig, DrawIoStorage, DrawIoAttributes } from './interfaces';

const NULL_ATTRS: DrawIoAttributes = {
  drawIoCode: null,
  drawIoName: null,
};

const DrawIoPlugin = Node.create<DrawIoConfig, DrawIoStorage>({
  name: DRAWIO_EXTENSION_NAME,
  group: 'block',
  draggable: true,
  atom: true, // required to represent node as specific content

  addOptions() {
    return {
      dataTestId: 'DrawioExtension',
      drawIoLink: null,
      prefetched: {},
      viewFile: () => new Promise((resolve) => resolve('')),
      uploadFile: () => new Promise((resolve) => resolve({ drawIoCode: null, drawIoName: null })),
      updateFile: () => new Promise((resolve) => resolve({ drawIoCode: null, drawIoName: null })),
      viewVersions: () => new Promise((resolve) => resolve([])),
    };
  },

  addAttributes() {
    return {
      drawIoCode: {
        default: null,
      },

      drawIoName: {
        default: null,
      },

      drawIoVersion: {
        default: null,
      },

      drawIoXmlPngHref: {
        default: null,
        rendered: false,
      },
    };
  },

  addStorage() {
    return {
      includedFiles: [],
    };
  },

  addCommands() {
    return {
      insertDrawIo:
        (fileAttrs: DrawIoAttributes = NULL_ATTRS) =>
        ({ commands }) =>
          commands.insertContent([
            { type: 'paragraph' },
            {
              type: this.name,
              attrs: fileAttrs,
            },
            { type: 'paragraph' },
          ]),
    };
  },

  parseHTML() {
    return [{ tag: 'div[data-drawio="true"]' }];
  },

  renderText({ node }) {
    return `${node.attrs.drawIoName || node.attrs.drawIoCode || 'FileName N/A'}`;
  },
});

export { DrawIoPlugin, NULL_ATTRS };
