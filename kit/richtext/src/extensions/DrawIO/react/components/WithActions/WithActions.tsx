import React, { FC } from 'react';
import { fromPairs, toPairs } from 'lodash';

import { ButtonGhost } from '@launch-ui/button';

import { usePanZoom } from '../../../../hooks/usePanZoom';
import { useDrawioContext } from '../../context';

import { WidgetIconEdit, WidgetIconDelete, ZoomOutIcon, ZoomInIcon, ResetIcon } from '../../icons';

import type { WithActionsProps } from './interfaces';
import type { DrawIoAttributes } from '../../interfaces';

import styles from './withactions.module.scss';

const handleAttrs = (nodeAttrs: DrawIoAttributes) =>
  fromPairs(toPairs(nodeAttrs).map(([k, v]) => [`data-${k.toLowerCase()}`, String(v)]));

export const WithActions: FC<WithActionsProps> = (props) => {
  const { isDrawioEditorAvailable = false, hasPreview = false, children } = props;

  const {
    toggleDrawIo,
    deleteNode,
    node: { attrs: nodeAttrs },
    editor,
  } = useDrawioContext();

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
        contentEditable={false}
        className={styles.container}
      >
        {children}

        {/* {!!drawIoName && (
          <div className={styles.fileName} >
            <span>{`${drawIoName}`}</span>
          </div>
        )} */}

        <div className={styles.actions}>
          {editor.options.editable && (
            <ButtonGhost LeftIcon={WidgetIconEdit} onClick={() => toggleDrawIo()} disabled={!isDrawioEditorAvailable} />
          )}

          {hasPreview && (
            <>
              <ButtonGhost
                LeftIcon={ZoomOutIcon}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  zoomOut?.();
                }}
              />

              <ButtonGhost
                LeftIcon={ZoomInIcon}
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();

                  zoomIn?.();
                }}
              />

              <ButtonGhost
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

          {editor.options.editable && <ButtonGhost LeftIcon={WidgetIconDelete} onClick={deleteNode} />}
        </div>
      </div>
    </>
  );
};
