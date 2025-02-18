// import React, { useCallback } from 'react';
// import { createPortal } from 'react-dom';

// import { ButtonAction } from '@launch-ui/button';

// import { useDrawioContext } from '../../context';
// import { usePanZoom } from '../../../../hooks/usePanZoom';

// import { WidgetIconEdit, ZoomInIcon, ZoomOutIcon, ResetIcon, CrossIcon } from '../../icons';

// import type { ViewerProps } from './interfaces';

// import styles from './viewer.module.scss';

// const Viewer = (props: ViewerProps) => {
//   const { open, close } = props;

//   const {
//     src,
//     dataTestId,
//     node: { attrs: nodeAttrs },
//     editor: { options: editorOptions },
//     toggleDrawIo,
//   } = useDrawioContext();

//   const { editable } = editorOptions;
//   const { drawIoName } = nodeAttrs;

//   const {
//     scale,
//     xPos,
//     yPos,

//     imageContainerRef,

//     onPanZoomReset,
//     onPanStart,
//     onPanEnd,
//     onZoomByWheel,

//     zoomIn,
//     zoomOut,
//   } = usePanZoom({ enabled: open, close });

//   const onClose = useCallback(() => {
//     onPanZoomReset();
//     close();
//   }, [onPanZoomReset, close]);

//   if (!open) return null;

//   return createPortal(
//     <div className={styles.dialog}>
//       <div className={styles.viewer} data-testid={`${dataTestId}.Viewer`}>
//         <div className={styles.toolbar} data-testid={`${dataTestId}.Viewer.Toolbar`}>
//           <div className={styles.block}>
//             <span className={styles.title} data-testid={`${dataTestId}.Viewer.Toolbar.Filename`}>
//               {drawIoName}
//             </span>

//             {editable && (
//               <ButtonAction
//                 LeftIcon={WidgetIconEdit}
//                 onClick={() => {
//                   onClose();
//                   toggleDrawIo(src || undefined);
//                 }}
//               />
//             )}
//           </div>

//           <div className={styles.block}>
//             <div className={styles.block}>
//               <ButtonAction LeftIcon={ZoomOutIcon} onClick={zoomOut} />

//               <div className={styles.badge} data-testid={`${dataTestId}.Viewer.Toolbar.ValueZoom`}>
//                 <span>{scale.toFixed(1)}</span>
//               </div>

//               <ButtonAction LeftIcon={ZoomInIcon} onClick={zoomIn} />

//               <div className={styles.badge} data-testid={`${dataTestId}.Viewer.Toolbar.ValueX`}>
//                 <span>{`X: ${xPos}`}</span>
//               </div>

//               <div className={styles.badge} data-testid={`${dataTestId}.Viewer.Toolbar.ValueY`}>
//                 <span>{`Y: ${yPos}`}</span>
//               </div>

//               <ButtonAction LeftIcon={ResetIcon} onClick={onPanZoomReset} />
//             </div>

//             <ButtonAction LeftIcon={CrossIcon} onClick={() => onClose()} />
//           </div>
//         </div>

//         <div
//           ref={imageContainerRef}
//           data-testid={`${dataTestId}.Viewer.FilePNGWrapper`}
//           className={styles.image}
//           onMouseDown={onPanStart}
//           onMouseUp={onPanEnd}
//           onWheel={onZoomByWheel}
//         >
//           <img src={src || undefined} alt={nodeAttrs?.drawIoName || ''} data-testid={`${dataTestId}.Viewer.FilePNG`} />
//         </div>
//       </div>
//     </div>,

//     document.body,
//   );
// };

// export { Viewer };
