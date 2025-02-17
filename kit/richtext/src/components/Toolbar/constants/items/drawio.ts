import DrawIoIcon from '../../../../icons/DrawIoIcon';
import { selectionHasParent } from '../../../../shared/utils';

import type { DropdownItemProps } from '../../../Dropdown';
import type { DrawIoCommand } from '../../interfaces';

const NODES_WITH_FORBIDDEN_DRAWIO = ['table'];

const DRAW_IO_ITEMS: DropdownItemProps<DrawIoCommand>[] = [
  {
    id: 'insertDrawIo',
    Icon: DrawIoIcon,
    command: (chain) => chain.focus().insertDrawIo(null).run(),
    isActive: () => false,
    shouldBeDisabled: (editor) => selectionHasParent(editor, NODES_WITH_FORBIDDEN_DRAWIO),
  },
];

export { DRAW_IO_ITEMS };
