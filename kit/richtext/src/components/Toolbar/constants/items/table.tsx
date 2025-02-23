import IconTableDelete from '../../../../icons/IconTableDelete';
import IconTableInsert from '../../../../icons/IconTableInsert';

import type { ToolbarItemProps } from '../interfaces';

const TABLE_ITEMS: ToolbarItemProps[] = [
  {
    id: 'tableInsert',
    Icon: IconTableInsert,
    command: (chain) => chain.focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    shouldBeDisabled: (editor) => editor.isActive('table'),
  },
  {
    id: 'tableDelete',
    Icon: IconTableDelete,
    command: (chain) => chain.focus().deleteTable().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
];

export { TABLE_ITEMS };
