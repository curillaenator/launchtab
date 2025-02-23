import IconTogglerBlockquote from '../../../../icons/IconTogglerBlockquote';
import IconTogglerCodeblock from '../../../../icons/IconTogglerCodeblock';
import IconDivider from '../../../../icons/IconDivider';
// import IconExpand from '../../../../icons/IconExpand';

import type { ToolbarItemProps } from '../interfaces';

const ADDITIONAL_TEXT_ITEMS: ToolbarItemProps[] = [
  {
    id: 'hr',
    Icon: IconDivider,
    command: (chain) => chain.focus().setHorizontalRule().run(),
    isActive: () => false,
  },
  {
    id: 'blockquote',
    Icon: IconTogglerBlockquote,
    command: (chain) => chain.focus().toggleBlockquote().run(),
  },
  {
    id: 'codeBlock',
    Icon: IconTogglerCodeblock,
    command: (chain) => chain.focus().toggleCodeBlock().run(),
  },
  // {
  //   id: 'expand',
  //   Icon: IconExpand,
  //   command: (chain) => chain.focus().setDetails().run(),
  //   isActive: () => false,
  //   dataTestId: `${DEFAULT_TEST_ID}.Toolbar.Expand`,
  // },
];

export { ADDITIONAL_TEXT_ITEMS };
