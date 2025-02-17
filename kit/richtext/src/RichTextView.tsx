import React, { FC, useEffect } from 'react';
import cn from 'classnames';
import { useCurrentEditor, EditorContent } from '@tiptap/react';
import { debounce } from 'lodash';

import { Toolbar } from './components/Toolbar';
// import { TocAside, useAsideToc } from './components/TocAside';

import { DEFAULT_TEST_ID, TOOLBAR_HEIGHT } from './constants';

import type { RichtextContainerProps } from './interfaces';

import styles from './styles.module.scss';

interface RichTextViewProps extends RichtextContainerProps {
  internalScrollContainerId: string;
  editorContentRef: React.MutableRefObject<HTMLDivElement | null>;
}

export const RichTextView: FC<RichTextViewProps> = (props) => {
  const {
    internalScrollContainerId,
    editorContentRef,

    dataTestId = DEFAULT_TEST_ID,

    disabled = false,
    editable = true,

    // initialValue,
    placeholder,

    maxHeight = 'auto',
    className,

    onEditorInstanceChange,
    onEditorContentWidthChange,

    // onChange,

    // toolStruct,
  } = props;

  const { editor } = useCurrentEditor();
  // const { editorContentRef } = useCustomEditorContext();

  // Resize observer
  useEffect(() => {
    const editorContent = editorContentRef?.current;

    if (!editorContent) {
      return;
    }

    const resizeObs = new ResizeObserver(
      debounce(([entry]: ResizeObserverEntry[]) => {
        onEditorContentWidthChange?.([entry?.contentRect.width || 0, entry?.contentRect.height || 0]);
        // autoscrollCfg?.autoscroll?.();
      }, 200),
    );

    resizeObs.observe(editorContent);

    return () => {
      resizeObs.unobserve(editorContent);
    };
  }, [editorContentRef, onEditorContentWidthChange]);

  useEffect(() => {
    if (editor) onEditorInstanceChange?.(editor);
  }, [editor, onEditorInstanceChange]);

  // ToC
  // const { tableOfContent } = useAsideToc(editor, {
  //   ...tocCfg,
  //   updateTocOnChange: [...(tocCfg?.updateTocOnChange || []), initialValue],
  // });
  // const { view: tocView, setView: setTocView } = tocCfg || {};
  // const hasToc = !!tocCfg?.scrollContainerId && (tocView === 'aside' || tocView === 'popup');

  // Toolbar
  const maxHeightWithToolbar = typeof maxHeight === 'number' ? maxHeight - TOOLBAR_HEIGHT : maxHeight;

  return (
    <div
      data-testid={dataTestId}
      className={cn(styles.editor, styles._theme_eds, styles.editor_toolbarTop, className, {
        [styles._disabled]: disabled,
        [styles.editor_isFocused]: editor?.isEditable && editor?.isFocused,
      })}
    >
      <div
        id={internalScrollContainerId}
        style={{ maxHeight: editable ? maxHeightWithToolbar : maxHeight }}
        className={cn(styles.scrollbar)}
      >
        <EditorContent placeholder={placeholder} editor={editor} className={styles.content} ref={editorContentRef} />
      </div>

      {editable && <Toolbar disabled={disabled} />}
    </div>
  );
};
