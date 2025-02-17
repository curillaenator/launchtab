import { DEFAULT_TEST_ID } from '../../../../constants';
import CheckboxEnablerIcon from '../../../../icons/CheckboxEnablerIcon';

import type { DropdownItemProps } from '../../../Dropdown';
import type { EditorCommand } from '../../interfaces';
import { appIntl } from '../../../../i18n/messages';

const TASK_LIST_ITEMS: DropdownItemProps<EditorCommand>[] = [
  {
    id: 'checkbox',
    Icon: CheckboxEnablerIcon,
    command: (chain) => chain.focus().toggleTaskList().run(),
    isActive: (editor) => editor.isActive('taskList'),
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.TaskList`,
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_task_list' }),
  },
];

export { TASK_LIST_ITEMS };
