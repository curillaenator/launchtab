import type { JSONContent } from '@tiptap/core';
import { isImageContent } from './isImageContent';

export const isOnlyImageInParagraph = (v: JSONContent): boolean => {
  //?? if a paragraph has a image
  if (v.type === 'paragraph' && v.content) {
    return Boolean(v.content.find(isImageContent));
  }

  //?? it's an empty paragraph, alright
  return false;
};
