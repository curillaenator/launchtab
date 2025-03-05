import React, { FC, useCallback, useRef } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import resizeImage, { type typeOptions as ResizeImageOptions } from 'image-resize';
import { isEqual } from 'lodash';
import cn from 'classnames';

import { ButtonGhost } from '@launch-ui/button';
import { Dropable } from '@launch-ui/dropable';

import { usePanZoom } from '../hooks/usePanZoom';
import { useDropable } from '../hooks/useDropable';

import { DeleteIcon, ZoomOutIcon, ZoomInIcon, ImageLoad } from './icons';

import type { ImageAttributes } from './interfaces';
import styles from './image.module.scss';

/**
 * @description resizeImage https://github.com/kode-team/image-resize
 */
const IMAGE_RESIZE_SETUP: ResizeImageOptions = {
  format: 'jpg',
  height: 720,
  quality: 0.7,
  sharpen: 0.9,
  reSample: 3,
};

const ImageView: FC<NodeViewProps> = (props) => {
  const { editor, node, deleteNode, updateAttributes } = props;
  const attrs = node.attrs as ImageAttributes;
  const { src, pos, scale, height } = attrs;

  const { isOpen: isHeightOpen, closeDropdown: closeHeight, ...restHeight } = useDropable();

  const onPanZoomEnd = useCallback(
    ({ x, y, scale }: { x?: number; y?: number; scale?: number }) => {
      if (!attrs.src) return;

      const newAttrs = { ...attrs };

      if (x !== undefined && y !== undefined) attrs.pos = [x, y];
      if (scale !== undefined) attrs.scale = scale;

      if (!isEqual(attrs, newAttrs)) updateAttributes(newAttrs);
    },
    [attrs, updateAttributes],
  );

  const {
    imageContainerRef,

    onPanStart,
    onPanEnd,

    zoomOut,
    zoomIn,
  } = usePanZoom({
    enabled: editor.isEditable && !!src,
    init: { scale, xPos: pos[0], yPos: pos[1] },
    onPanZoomEnd,
  });

  const loadImageInputRef = useRef<HTMLInputElement | null>(null);

  const updateSrcAttribute = useCallback(
    async (imageFile: File) => {
      const resizedImageFile = (await resizeImage(imageFile, IMAGE_RESIZE_SETUP)) as string;

      updateAttributes({ ...attrs, src: resizedImageFile });
    },
    [attrs, updateAttributes],
  );

  return (
    <NodeViewWrapper
      as='div'
      ref={imageContainerRef}
      style={{ height }}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onPanStart(e)}
      onMouseUp={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onPanEnd(e)}
      className={cn(styles.container, {
        [styles.container_withToolbar]: editor.isEditable,
        [styles.container_withLocalSrc]: !!src && !/^https?:\/\/.*/.test(src),
      })}
    >
      <img contentEditable={false} src={src || undefined} />

      {editor.isEditable && (
        <div className={styles.toolbar} contentEditable={false}>
          {!!src ? (
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
            </>
          ) : (
            <>
              <input
                type='file'
                accept='image/*'
                ref={loadImageInputRef}
                style={{ display: 'none' }}
                onChange={(e) => {
                  const file = e.target.files?.[0];
                  if (file) updateSrcAttribute(file);
                }}
              />
              <ButtonGhost LeftIcon={ImageLoad} onClick={() => loadImageInputRef.current?.click()} />
            </>
          )}

          <Dropable
            {...restHeight}
            maxWidth={128}
            minWidth={128}
            offset={[0, 4]}
            openNode={
              <ButtonGhost
                title={`${height}px`}
                active={isHeightOpen}
                appearance='secondary'
                onClick={(e) => {
                  e.preventDefault();
                  e.stopPropagation();
                }}
              />
            }
          >
            {[320, 512, 768, 1024].map((selH) => (
              <ButtonGhost
                key={`height-${selH}`}
                height={32}
                title={`${selH}px`}
                onClick={() => {
                  updateAttributes({ ...node.attrs, height: selH });
                  closeHeight?.();
                }}
              />
            ))}
          </Dropable>

          <ButtonGhost LeftIcon={DeleteIcon} onClick={deleteNode} />
        </div>
      )}
    </NodeViewWrapper>
  );
};

export { ImageView };
