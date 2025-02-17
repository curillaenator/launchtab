import type { ToolbarActiveComponentDropdownProps } from '../components/Toolbar/interfaces';
import { PLANT_ITEMS, DRAW_IO_ITEMS, FRAGMENT_ITEMS, INCLUDE_ITEMS, TOC_ITEMS } from '../components/Toolbar/constants';
import { EditorStructProps } from '../interfaces';

export const getMacrosesExtensions = (options: EditorStructProps, props: ToolbarActiveComponentDropdownProps) => {
  const { canHandlePlantUml, canUploadDrawIo, canHandleInclude } = options;
  const { tocCfg } = props;

  const items = [];

  if (canHandlePlantUml) items.push(PLANT_ITEMS);
  if (canUploadDrawIo) items.push(DRAW_IO_ITEMS);
  if (canHandleInclude) {
    items.push(FRAGMENT_ITEMS);
    items.push(INCLUDE_ITEMS);
  }
  if (tocCfg) items.push(TOC_ITEMS);

  if (!items.length) {
    return null;
  }

  return items;
};
