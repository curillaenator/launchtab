import IconTogglerBlockquote from '../../../../icons/IconTogglerBlockquote';
import IconTogglerCodeblock from '../../../../icons/IconTogglerCodeblock';
import IconDivider from '../../../../icons/IconDivider';
import IconExpand from '../../../../icons/IconExpand';

import type { DropdownItemProps } from '../../../Dropdown';
import type { EditorCommand } from '../../interfaces';
import { DEFAULT_TEST_ID } from '../../../../constants';
import { appIntl } from '../../../../i18n/messages';

const ADDITIONAL_TEXT_ITEMS: DropdownItemProps<EditorCommand>[] = [
  {
    id: 'hr',
    Icon: IconDivider,
    command: (chain) => chain.focus().setHorizontalRule().run(),
    isActive: () => false,
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_separator' }),
  },
  {
    id: 'blockquote',
    Icon: IconTogglerBlockquote,
    command: (chain) => chain.focus().toggleBlockquote().run(),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_quote' }),
  },
  {
    id: 'codeBlock',
    Icon: IconTogglerCodeblock,
    command: (chain) => chain.focus().toggleCodeBlock().run(),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_codeBlock' }),
  },
  {
    id: 'expand',
    Icon: IconExpand,
    command: (chain) => chain.focus().setDetails().run(),
    isActive: () => false,
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.Expand`,
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_expand' }),
  },
];

export { ADDITIONAL_TEXT_ITEMS };
