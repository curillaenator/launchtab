import type { ToolbarCompositionTypeName, ToolbarActiveComponentDropdownProps } from '../components/Toolbar/interfaces';
import {
  TASK_LIST_ITEMS,
  HISTORY_ITEMS,
  TAB_ITEMS,
  TEXT_ALIGN_ITEMS,
  TABLE_ITEMS,
  TABLE_COLOR_ITEMS,
  BACKGROUND_COLOR_ITEMS,
  COLOR_ITEMS,
  TEXT_FORMAT_ITEMS,
  getCommentItems,
} from '../components/Toolbar/constants';
import { EditorStructProps } from '../interfaces';
import { getMacrosesExtensions } from './getMacrosesExtensions';

export const getExtensionsFor = (
  composition: ToolbarCompositionTypeName,
  options: EditorStructProps,
  props: ToolbarActiveComponentDropdownProps,
) => {
  const { hasTable, hasHighlight, hasComments } = options;

  const { tocCfg } = props;

  if (composition === 'small') {
    return [
      TASK_LIST_ITEMS,
      HISTORY_ITEMS,
      TAB_ITEMS,
      ...(hasComments ? [getCommentItems({ tocCfg })] : []),
      TEXT_ALIGN_ITEMS,
      ...(hasTable ? [TABLE_ITEMS, TABLE_COLOR_ITEMS.slice(1)] : []),
      ...(hasHighlight ? [BACKGROUND_COLOR_ITEMS, COLOR_ITEMS] : []),
    ];
  }

  const macroses = getMacrosesExtensions(options, props);

  return [
    HISTORY_ITEMS,
    TASK_LIST_ITEMS,
    TAB_ITEMS,
    ...(hasComments ? [getCommentItems({ tocCfg })] : []),
    TEXT_ALIGN_ITEMS,
    TEXT_FORMAT_ITEMS,
    ...(hasTable ? [TABLE_ITEMS, TABLE_COLOR_ITEMS.slice(1)] : []),
    ...(hasHighlight ? [BACKGROUND_COLOR_ITEMS, COLOR_ITEMS] : []),
    ...(macroses ? macroses : []),
  ];
};
