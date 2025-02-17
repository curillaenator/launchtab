import AddTabIcon from '../../../../icons/AddTabIcon';
import RemoveTabIcon from '../../../../icons/RemoveTabIcon';

import { DEFAULT_TEST_ID } from '../../../../constants';
import type { DropdownItemProps } from '../../../Dropdown';
import type { TabCommand } from '../../interfaces';
import { appIntl } from '../../../../i18n/messages';

const TAB_ITEMS: DropdownItemProps<TabCommand>[] = [
  {
    id: 'addTab',
    Icon: AddTabIcon,
    command: (chain) => chain.indent().run(),
    shouldBeDisabled: (editor) => !editor.can().indent() || editor.isActive('table'),
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.Indent`,
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_add_indent' }),
  },
  {
    id: 'removeTab',
    Icon: RemoveTabIcon,
    command: (chain) => chain.outdent().run(),
    shouldBeDisabled: (editor) => !editor.can().outdent() || editor.isActive('table'),
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.Outdent`,
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_remove_indent' }),
  },
];

export { TAB_ITEMS };
