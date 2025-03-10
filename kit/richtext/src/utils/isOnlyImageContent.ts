import type { JSONContent } from '@tiptap/core';
import { isOnlyImageInParagraph } from './isOnlyImageInParagraph';

export const isOnlyImageContent = ({ content = [] }: JSONContent): boolean => {
  const firstNonEmptyParagraph = content[0] && isOnlyImageInParagraph(content[0]);
  return !!firstNonEmptyParagraph;
};
