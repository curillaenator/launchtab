import IconTogglerInline from '../../../../icons/IconTogglerInline';
import IconBold from '../../../../icons/IconMarkBold';
import IconItalic from '../../../../icons/IconMarkItalic';
import IconStrikeThrough from '../../../../icons/IconMarkStrikeThrough';
import IconUnderline from '../../../../icons/IconMarkUnderline';

import type { ToolbarItemProps } from '../interfaces';

const TEXT_FORMAT_ITEMS: ToolbarItemProps[] = [
  {
    id: 'bold',
    Icon: IconBold,
    command: (chain) => chain.focus().toggleBold().run(),
  },
  {
    id: 'code',
    Icon: IconTogglerInline,
    command: (chain) => chain.focus().toggleCode().run(),
  },
  {
    id: 'italic',
    Icon: IconItalic,
    command: (chain) => chain.focus().toggleItalic().run(),
  },
  {
    id: 'strike',
    Icon: IconStrikeThrough,
    command: (chain) => chain.focus().toggleStrike().run(),
  },
  {
    id: 'underline',
    Icon: IconUnderline,
    command: (chain) => chain.focus().toggleUnderline().run(),
  },
];

export { TEXT_FORMAT_ITEMS };
