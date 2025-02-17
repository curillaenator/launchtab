import UndoIcon from '../../../../icons/UndoIcon';
import RedoIcon from '../../../../icons/RedoIcon';

import { DEFAULT_TEST_ID } from '../../../../constants';
import type { DropdownItemProps } from '../../../Dropdown';
import type { HistoryCommand } from '../../interfaces';
import { appIntl } from '../../../../i18n/messages';

const HISTORY_ITEMS: DropdownItemProps<HistoryCommand>[] = [
  {
    id: 'undo',
    Icon: UndoIcon,
    command: (chain) => chain.undo().run(),
    shouldBeDisabled: (editor) => !editor.can().undo(),
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.Undo`,
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_undo' }),
  },
  {
    id: 'redo',
    Icon: RedoIcon,
    command: (chain) => chain.redo().run(),
    shouldBeDisabled: (editor) => !editor.can().redo(),
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.Redo`,
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_redo' }),
  },
];

export { HISTORY_ITEMS };
