import IconTextAlignLeft from '../../../../icons/IconTextAlignLeft';
import IconTextAlignCenter from '../../../../icons/IconTextAlignCenter';
import IconTextAlignJustify from '../../../../icons/IconTextAlignJustify';
import IconTextAlignRight from '../../../../icons/IconTextAlignRight';

import type { DropdownItemProps } from '../../../Dropdown';
import type { TextAlignCommand } from '../../interfaces';
import { appIntl } from '../../../../i18n/messages';

const TEXT_ALIGN_ITEMS: DropdownItemProps<TextAlignCommand>[] = [
  {
    id: 'left',
    Icon: IconTextAlignLeft,
    command: (chain) => chain.focus().setTextAlign('left').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'left' }),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_align_left' }),
  },
  {
    id: 'center',
    Icon: IconTextAlignCenter,
    command: (chain) => chain.focus().setTextAlign('center').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'center' }),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_align_center' }),
  },
  {
    id: 'justify',
    Icon: IconTextAlignJustify,
    command: (chain) => chain.focus().setTextAlign('justify').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'justify' }),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_align_justify' }),
  },
  {
    id: 'right',
    Icon: IconTextAlignRight,
    command: (chain) => chain.focus().setTextAlign('right').run(),
    isActive: (editor) => editor.isActive({ textAlign: 'right' }),
    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_align_right' }),
  },
];

export { TEXT_ALIGN_ITEMS };
