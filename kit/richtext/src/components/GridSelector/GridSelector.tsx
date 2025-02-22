import React, { FC, useCallback } from 'react';
import { useCurrentEditor } from '@tiptap/react';
// import cn from 'classnames';

import { Dropable } from '@launch-ui/dropable';
import { ToolbarButton } from '../ToolbarButton';

import { EXTENSION_NAME as BLOCKS_GRID_NODE_NAME } from '../../extensions/BlocksGrid/core/constants';

import { getInsertBlocksGridVariants, checkIsCarretInside } from './utils';
import { useDropdown } from './hooks/useDropdown';

import { BinIcon } from '../../icons/BinIcon';
import { DryTwoIcon } from '../../icons/DryTwoIcon';

import { DEFAULT_CAPTIONS } from '../constants';
import { DEFAULT_TEST_ID } from '../../constants';
import type { GridSelectorProps } from './interfaces';
import styles from './gridselector.module.scss';

export const GridSelector: FC<GridSelectorProps> = (props) => {
  const { editor } = useCurrentEditor();

  const {
    id,
    disabled,
    offset = [0, 4],
    isOpen,
    closeDropdown,
    editorContentRef,

    //guard
    onSelectionUpdateHandlers,

    ...rest
  } = useDropdown(props);

  const clearBlocksGridCssv = useCallback(() => {
    if (!editor || !editorContentRef?.current) return;
    const targetNode = editor.state.selection.$from.node(1);

    if (targetNode?.type?.name === 'blocksGrid') {
      [0, 1, 2].forEach((num) =>
        editorContentRef.current?.style.removeProperty(`--blocksgrid-${targetNode.attrs['blocksGridId']}-${num}-bdc`),
      );
    }
  }, [editor, editorContentRef]);

  const highlightFocusedBlocksGridWithCssv = useCallback(() => {
    if (!editor || !editorContentRef?.current) return;
    const targetNode = editor.state.selection.$from.node(1);

    if (targetNode?.type?.name === 'blocksGrid') {
      [0, 1, 2].forEach((num) =>
        editorContentRef.current?.style.setProperty(
          `--blocksgrid-${targetNode.attrs['blocksGridId']}-${num}-bdc`,
          'var(--editor-error)',
        ),
      );
    }
  }, [editor, editorContentRef]);

  if (!editor) return null;

  // not hooks
  const isCarretInsideAvoidedNodes = checkIsCarretInside(editor, [BLOCKS_GRID_NODE_NAME, 'table']);
  const isBlocksGridDisabled = isCarretInsideAvoidedNodes || disabled;

  return (
    <Dropable
      {...rest}
      offset={offset}
      closeDropdown={closeDropdown}
      closeOnItemClick
      openNode={
        <div>
          <ToolbarButton
            data-testid={rest.dataTestId ? `${rest.dataTestId}.Trigger` : `${DEFAULT_TEST_ID}.Dropdown.Trigger`}
            id={!!id ? `${id}-opennode` : undefined}
            active={isOpen}
            onClick={() => setTimeout(() => editor.commands.focus(), 20)}
          >
            <DryTwoIcon />
          </ToolbarButton>
        </div>
      }
    >
      <div className={styles.inserts}>
        {getInsertBlocksGridVariants(editor.commands).map(({ id, icon: Icon, onClick }) => (
          <ToolbarButton
            key={id}
            disabled={isBlocksGridDisabled}
            onClick={(e) => {
              onClick?.(e);
              closeDropdown?.();
            }}
          >
            <Icon />
          </ToolbarButton>
        ))}
      </div>

      <ToolbarButton
        disabled={!checkIsCarretInside(editor, ['blocksGrid'])}
        onMouseEnter={highlightFocusedBlocksGridWithCssv}
        onMouseLeave={clearBlocksGridCssv}
        data-testid={
          rest.dataTestId ? `${rest.dataTestId}.DeleteBlocksGrid` : `${DEFAULT_TEST_ID}.Dropdown.DeleteBlocksGrid`
        }
        onClick={() => {
          editor.commands.deleteBlocksGrid(clearBlocksGridCssv);
          closeDropdown?.();
        }}
      >
        <BinIcon />
        {DEFAULT_CAPTIONS.deleteBlocksGrid}
      </ToolbarButton>
    </Dropable>
  );
};
