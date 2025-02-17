import IconInlineComment from '../../../../icons/IconInlineComment';
import { selectionHasParent } from '../../../../shared/utils';

import type { DropdownItemProps } from '../../../Dropdown';
import type { CommentCommand, ToolbarActiveComponentDropdownProps } from '../../interfaces';
import { DEFAULT_TEST_ID } from '../../../../constants';
import { appIntl } from '../../../../i18n/messages';

const NODES_WITH_FORBIDDEN_INLINES = ['plantuml', 'codeBlock'];

const COMMENT_ITEMS: DropdownItemProps<CommentCommand>[] = [
  {
    id: 'inlineComment',
    Icon: IconInlineComment,
    command: (chain) => chain.focus().setThread().run(),
    shouldBeDisabled: (editor) =>
      editor.storage.comments.disabled ||
      editor.state.selection.empty ||
      selectionHasParent(editor, NODES_WITH_FORBIDDEN_INLINES),
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.InlineComments`,
  },
];

const getCommentItems = ({ tocCfg }: ToolbarActiveComponentDropdownProps): DropdownItemProps<CommentCommand>[] => [
  {
    id: 'inlineComment',
    Icon: IconInlineComment,
    command: (chain) => {
      if (tocCfg?.view === 'aside') tocCfg.setView?.('popup');
      return chain.focus().setThread().run();
    },
    shouldBeDisabled: (editor) =>
      editor.storage.comments.disabled ||
      editor.state.selection.empty ||
      selectionHasParent(editor, NODES_WITH_FORBIDDEN_INLINES),
    dataTestId: `${DEFAULT_TEST_ID}.Toolbar.InlineComments`,

    tooltip: appIntl.formatMessage({ id: 'tooltip__toolbar_comments' }),
  },
];

export { COMMENT_ITEMS, getCommentItems };
