import React, { FC, useCallback } from 'react';
import cn from 'classnames';
import { fromPairs, toPairs } from 'lodash';

import { ButtonAction } from '@launch-ui/button';

import { usePanZoom } from '../../../../hooks/usePanZoom';
import { useDrawioContext } from '../../context';
import { DRAWIO_FILE_TYPE } from '../../constants';

// import { Viewer } from '../ImageViewer';

import {
  WidgetIconEdit,
  WidgetIconDownload,
  WidgetIconDelete,
  WidgetFullscreenIcon,
  ZoomOutIcon,
  ZoomInIcon,
  ResetIcon,
} from '../../icons';

import type { WithActionsProps } from './interfaces';
import type { DrawIoAttributes } from '../../../core/interfaces';

import styles from './withactions.module.scss';

const handleAttrs = (nodeAttrs: DrawIoAttributes) =>
  fromPairs(toPairs(nodeAttrs).map(([k, v]) => [`data-${k.toLowerCase()}`, String(v)]));

export const WithActions: FC<WithActionsProps> = (props) => {
  const { isDrawioEditorAvailable = false, isSrcDownloadable = false, hasPreview = false, children } = props;

  const {
    src,
    toggleDrawIo,
    deleteNode,
    dataTestId,
    node: { attrs: nodeAttrs },
    editor,
  } = useDrawioContext();

  const editorOptions = editor.options;

  const { editable } = editorOptions;
  const { drawIoName } = nodeAttrs as DrawIoAttributes;

  // const [isViewer, setIsViewer] = useState<boolean>(false);

  const downloadDrawio = useCallback(
    (fileSrc: string | null) => {
      if (!fileSrc) return;

      const link = document.createElement('a');
      const file = new File([fileSrc], nodeAttrs.drawIoName!, { type: DRAWIO_FILE_TYPE });

      link.setAttribute('href', URL.createObjectURL(file));
      link.setAttribute('download', nodeAttrs.drawIoName!.trim());
      link.setAttribute('type', DRAWIO_FILE_TYPE);

      link.click();

      URL.revokeObjectURL(link.href);
    },
    [nodeAttrs],
  );

  const {
    isTouched: isPanZoomTouched,
    imageContainerRef,
    onPanStart,
    onPanEnd,
    onPanZoomReset,
    zoomOut,
    zoomIn,
  } = usePanZoom({ enabled: hasPreview });

  return (
    <>
      <div
        {...handleAttrs(nodeAttrs as DrawIoAttributes)}
        ref={imageContainerRef}
        onMouseDown={onPanStart}
        onMouseUp={onPanEnd}
        onMouseLeave={onPanEnd}
        data-testid={`${dataTestId}.Container`}
        contentEditable={false}
        className={cn(styles.container, {
          [styles.container_withFilename]: !!drawIoName,
        })}
      >
        {children}

        {!!drawIoName && (
          <div className={styles.fileName} data-testid={`${dataTestId}.Filename`}>
            <span>{`${drawIoName}`}</span>
          </div>
        )}

        <div className={styles.actions} data-testid={`${dataTestId}.Controls`}>
          {editable && (
            <ButtonAction
              LeftIcon={WidgetIconEdit}
              onClick={() => toggleDrawIo()}
              disabled={!isDrawioEditorAvailable}
            />
          )}

          {hasPreview && (
            <>
              <ButtonAction
                LeftIcon={ZoomOutIcon}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  zoomOut?.();
                }}
              />

              <ButtonAction
                LeftIcon={ZoomInIcon}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  zoomIn?.();
                }}
              />

              <ButtonAction
                disabled={!isPanZoomTouched}
                LeftIcon={ResetIcon}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  onPanZoomReset?.();
                }}
              />
            </>
          )}

          {isSrcDownloadable && <ButtonAction LeftIcon={WidgetIconDownload} onClick={() => downloadDrawio(src)} />}

          {hasPreview && (
            <ButtonAction
              LeftIcon={WidgetFullscreenIcon}
              onClick={() => {
                if (!src) return;
                // setIsViewer(true);
              }}
            />
          )}

          {editable && <ButtonAction LeftIcon={WidgetIconDelete} onClick={deleteNode} />}
        </div>
      </div>

      {/* {!!src && (
        <Viewer open={isViewer} close={() => setIsViewer(false)} />
      )} */}
    </>
  );
};
