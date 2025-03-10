import { JSONContent } from '@tiptap/core';

export const isImageContent = (v: JSONContent): boolean => v.type === 'image';
