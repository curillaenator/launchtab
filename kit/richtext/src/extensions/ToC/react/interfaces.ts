import type { Node as ProseMirrorNode } from 'prosemirror-model';
import type { Node as ExtensionNode, Editor as CoreEditor } from '@tiptap/core';
import type { TocNodeAttributes, TocNodeConfig } from '../core/interfaces';

interface ProseMirrorTocNode extends ProseMirrorNode {
  attrs: TocNodeAttributes;
}

interface TocReactNodeViewProps {
  extension: ExtensionNode<TocNodeConfig, {}>;
  node: ProseMirrorTocNode;
  editor: CoreEditor;
  selected: boolean;
  deleteNode: () => void;
  updateAttributes: (attrs: TocNodeAttributes) => void;
  getPos: () => number;
}

export type { TocReactNodeViewProps };
