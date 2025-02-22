import React, { FC, memo, useCallback, useEffect, useRef } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import cn from 'classnames';
import { v4 as getKey } from 'uuid';

import type { ToolbarProps } from './interfaces';
// import { useToolbarObserver } from './hooks/useToolbarObserver';

import { DEFAULT_STRUCT } from './constants';
import styles from './Toolbar.module.scss';

const Toolbar: FC<ToolbarProps> = memo((props) => {
  const { disabled, editorContentRef } = props;

  const { editor } = useCurrentEditor();

  // const {
  // containerRef,
  // composition
  // } = useToolbarObserver({});

  const { left } = DEFAULT_STRUCT.full;

  const onSelectionUpdateHandlers = useRef<(() => void)[]>([]);

  const onSelectionUpdate = useCallback(() => {
    onSelectionUpdateHandlers.current.forEach((handler) => handler());
  }, []);

  useEffect(() => {
    console.log('onSelectionUpdateHandlers', onSelectionUpdateHandlers);

    if (editor) {
      editor.on('selectionUpdate', onSelectionUpdate).on('update', onSelectionUpdate);
      onSelectionUpdate();
    }

    return () => {
      editor?.off('selectionUpdate', onSelectionUpdate).off('update', onSelectionUpdate);
    };
  }, [editor, onSelectionUpdate]);

  return (
    <div
      // ref={containerRef}
      id={'rich-text-toolbar'}
      className={cn(
        styles.toolbar,
        // styles[`_${composition}`],
        styles[`_full`],
        styles.toolbar_top,
      )}
    >
      <div
        className={cn(
          styles.toolbarBlock,
          // styles[`_${composition}`],
          styles[`_full`],
        )}
      >
        {left.map((Component) => (
          <Component
            key={getKey()}
            disabled={disabled}
            editorContentRef={editorContentRef}
            onSelectionUpdateHandlers={onSelectionUpdateHandlers}
          />
        ))}
      </div>

      <div className={cn(styles.toolbarBlock, styles[`_full`])}>
        {/* {right.map((Component, i) => {
          const key = UNIQUE_KEYS.right[i];
          return <Component key={key} disabled={props.disabled} tocCfg={props.tocCfg} />;
        })} */}
      </div>
    </div>
  );
});

export { Toolbar };
