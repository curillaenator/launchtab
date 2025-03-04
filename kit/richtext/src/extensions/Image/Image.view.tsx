import React, { FC } from 'react';
import { NodeViewWrapper, type NodeViewProps } from '@tiptap/react';
import cn from 'classnames';

import { ButtonGhost } from '@launch-ui/button';
import { Dropable } from '@launch-ui/dropable';

import { usePanZoom } from '../hooks/usePanZoom';
import { useDropable } from '../hooks/useDropable';

import { DeleteIcon, ZoomOutIcon, ZoomInIcon } from './icons';

import type { ImageAttributes } from './interfaces';
import styles from './image.module.scss';

const ImageView: FC<NodeViewProps> = (props) => {
  const { editor, node, deleteNode, updateAttributes } = props;
  const { src, pos, scale, height } = node.attrs as ImageAttributes;

  console.log('ImageView', node.attrs);

  const { isOpen: isHeightOpen } = useDropable();

  const {
    imageContainerRef,

    onPanStart,
    onPanEnd,

    zoomOut,
    zoomIn,
  } = usePanZoom({
    enabled: editor.isEditable,
    init: { scale, xPos: pos[0], yPos: pos[1] },
    updateAttributes: ({ x, y, scale }: { x?: number; y?: number; scale?: number }) => {
      if (x !== undefined && y !== undefined) updateAttributes({ ...node.attrs, pos: [x, y] });
      if (scale !== undefined) updateAttributes({ ...node.attrs, scale });
    },
  });

  return (
    <NodeViewWrapper
      as='div'
      ref={imageContainerRef}
      onMouseDown={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onPanStart(e)}
      onMouseUp={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onPanEnd(e)}
      // onMouseLeave={(e: React.MouseEvent<HTMLDivElement, MouseEvent>) => onPanEnd(e)}
      className={cn(styles.image, { [styles.image_editable]: editor.isEditable })}
      style={{ height }}
    >
      <img contentEditable={false} src={src || undefined} />

      {editor.isEditable && (
        <div className={styles.toolbar}>
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

          <Dropable
            maxWidth={128}
            minWidth={128}
            offset={[0, 4]}
            openNode={<ButtonGhost title={`${height}px`} active={isHeightOpen} appearance='secondary' />}
          >
            {[320, 512, 768, 1024].map((selH) => (
              <ButtonGhost
                key={`height-${selH}`}
                height={32}
                title={`${selH}px`}
                onClick={() => updateAttributes({ ...node.attrs, height: selH })}
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
