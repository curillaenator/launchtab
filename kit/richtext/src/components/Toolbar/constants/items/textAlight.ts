import IconTextAlignLeft from '../../../../icons/IconTextAlignLeft';
import IconTextAlignCenter from '../../../../icons/IconTextAlignCenter';
import IconTextAlignJustify from '../../../../icons/IconTextAlignJustify';
import IconTextAlignRight from '../../../../icons/IconTextAlignRight';

import type { ToolbarItemProps } from '../interfaces';

const TEXT_ALIGN_ITEMS: ToolbarItemProps[] = [
  {
    id: 'left',
    Icon: IconTextAlignLeft,
    command: (chain) => chain.focus().setTextAlign('left').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
  },
  {
    id: 'center',
    Icon: IconTextAlignCenter,
    command: (chain) => chain.focus().setTextAlign('center').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
  },
  {
    id: 'justify',
    Icon: IconTextAlignJustify,
    command: (chain) => chain.focus().setTextAlign('justify').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
  },
  {
    id: 'right',
    Icon: IconTextAlignRight,
    command: (chain) => chain.focus().setTextAlign('right').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
  },
];

export { TEXT_ALIGN_ITEMS };
