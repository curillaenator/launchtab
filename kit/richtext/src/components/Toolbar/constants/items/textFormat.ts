import IconTogglerInline from '../../../../icons/IconTogglerInline';
import IconBold from '../../../../icons/IconMarkBold';
import IconItalic from '../../../../icons/IconMarkItalic';
import IconStrikeThrough from '../../../../icons/IconMarkStrikeThrough';
import IconUnderline from '../../../../icons/IconMarkUnderline';

import type { DropdownItemProps } from '../../../Dropdown';
import type { TextFormatCommand } from '../../interfaces';
import { appIntl } from '../../../../i18n/messages';

const TEXT_FORMAT_ITEMS: DropdownItemProps<TextFormatCommand>[] = [
  {
    id: 'bold',
    Icon: IconBold,
    command: (chain) => chain.focus().toggleBold().run(),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_bold' }),
  },
  {
    id: 'code',
    Icon: IconTogglerInline,
    command: (chain) => chain.focus().toggleCode().run(),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_code' }),
  },
  {
    id: 'italic',
    Icon: IconItalic,
    command: (chain) => chain.focus().toggleItalic().run(),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_italic' }),
  },
  {
    id: 'strike',
    Icon: IconStrikeThrough,
    command: (chain) => chain.focus().toggleStrike().run(),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_strike' }),
  },
  {
    id: 'underline',
    Icon: IconUnderline,
    command: (chain) => chain.focus().toggleUnderline().run(),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_underline' }),
  },
];

export { TEXT_FORMAT_ITEMS };
