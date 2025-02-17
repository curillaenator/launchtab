import { TocIcon } from '../../../../icons/TocIcon';

import type { DropdownItemProps } from '../../../Dropdown';
import type { TocCommand } from '../../interfaces';

const TOC_ITEMS: DropdownItemProps<TocCommand>[] = [
  {
    id: 'insertTableOfContent',
    Icon: TocIcon,
    command: (chain) => chain.focus().insertToc().run(),
    isActive: () => false,
  },
];

export { TOC_ITEMS };
