import IconH1 from '../../../../icons/IconH1';
import IconH2 from '../../../../icons/IconH2';
import IconH3 from '../../../../icons/IconH3';
import IconH4 from '../../../../icons/IconH4';
import IconH5 from '../../../../icons/IconH5';
import IconH6 from '../../../../icons/IconH6';
import IconParagraph from '../../../../icons/IconParagraph';
import IconBulletedList from '../../../../icons/IconListBulleted';
import IconNumberedList from '../../../../icons/IconListNumbered';

import type { DropdownItemProps } from '../../../Dropdown';
import type { ParagraphCommand } from '../../interfaces';

const TEXT_ITEMS: DropdownItemProps<ParagraphCommand>[][] = [
  [
    {
      id: 'h1',
      Icon: IconH1,
      command: (chain) => chain.focus().toggleHeading({ level: 1 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 1 }),
    },
    {
      id: 'h2',
      Icon: IconH2,
      command: (chain) => chain.focus().toggleHeading({ level: 2 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 2 }),
    },
    {
      id: 'h3',
      Icon: IconH3,
      command: (chain) => chain.focus().toggleHeading({ level: 3 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 3 }),
    },
    {
      id: 'h4',
      Icon: IconH4,
      command: (chain) => chain.focus().toggleHeading({ level: 4 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 4 }),
    },
    {
      id: 'h5',
      Icon: IconH5,
      command: (chain) => chain.focus().toggleHeading({ level: 5 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 5 }),
    },
    {
      id: 'h6',
      Icon: IconH6,
      command: (chain) => chain.focus().toggleHeading({ level: 6 }).run(),
      isActive: (editor) => editor.isActive('heading', { level: 6 }),
    },
  ],
  [
    {
      id: 'paragraph',
      Icon: IconParagraph,
      command: (chain) => chain.focus().setParagraph().run(),
    },
  ],
  [
    {
      id: 'bulletList',
      Icon: IconBulletedList,
      command: (chain) => chain.focus().toggleBulletList().run(),
    },
    {
      id: 'orderedList',
      Icon: IconNumberedList,
      command: (chain) => chain.focus().toggleOrderedList().run(),
    },
  ],
];

export { TEXT_ITEMS };
