import React, { FC, useMemo } from 'react';
import cn from 'classnames';
import { NodeViewWrapper } from '@tiptap/react';

import { useWidget } from './hooks/useWidget';
import { WithActions } from './components';
import { $drawioContext as Context } from './context';

// import type { DrawIoAttributes } from '../core/interfaces';
import { WidgetDrawioIcon } from './icons/WidgetDrawioIcon';

import type { UiWidgetProps } from './interfaces';
import styles from './widget.module.scss';
import editorCssv from '../../../styles.module.scss';

const UIWidget: FC<UiWidgetProps> = (props) => {
  const { selected, editor, extension, node } = props;
  const { attrs: widgetAttrs } = node;
  const { options: editorOptions } = editor;
  const { src, isSrcLoading, toggleDrawIo } = useWidget(props);

  const widgetCn = cn(styles.widget, editorCssv._theme_eds, {
    [styles.widget_editable]: editorOptions.editable,
    [styles.widget_isSelected]: selected && editorOptions.editable,
  });

  const isDrawioEditorAvailable =
    !!extension.options.drawIoLink && !!extension.options.uploadFile && !!extension.options.updateFile;

  const dataTestId = `${extension.options.dataTestId}.DrawIO`;

  const contextValue = useMemo(
    () => ({
      ...props,
      src,
      toggleDrawIo,
      dataTestId,
    }),
    [props, src, dataTestId, toggleDrawIo],
  );

  if (isSrcLoading)
    return (
      <Context.Provider value={contextValue}>
        <NodeViewWrapper className={widgetCn}>
          <span>Loading...</span>
        </NodeViewWrapper>
      </Context.Provider>
    );

  return (
    <Context.Provider value={contextValue}>
      {!src && (
        <NodeViewWrapper className={cn(widgetCn, styles.widget_normal)}>
          <WithActions isDrawioEditorAvailable={isDrawioEditorAvailable}>
            <div className={styles.badge} data-fileid={widgetAttrs.drawIoCode} data-filename={widgetAttrs.drawIoName}>
              <WidgetDrawioIcon />
              <span>Схема еще не опубликована</span>
            </div>
          </WithActions>
        </NodeViewWrapper>
      )}

      {!!src && (
        <NodeViewWrapper className={cn(widgetCn, styles.widget_normal)}>
          <WithActions isSrcDownloadable hasPreview isDrawioEditorAvailable={isDrawioEditorAvailable}>
            <img
              data-filetype='xmlpng'
              data-testid={`${dataTestId}.FilePNG`}
              src={src as string}
              className={styles.image}
              alt={widgetAttrs.drawIoName as string}
            />
          </WithActions>
        </NodeViewWrapper>
      )}
    </Context.Provider>
  );
};

export default UIWidget;
