// import React, { FC, useState, useCallback, useEffect } from 'react';
// import { createPortal } from 'react-dom';
// import { omitBy, fromPairs } from 'lodash';
// import cn from 'classnames';

// import { Button } from '@sbt_swtr/kit-tracker.button';
// import { AddSummaryRow } from './AddSummaryRow';
// import { AddCalcColumn } from './AddCalcColumn';
// import { LocalCrossIcon } from '../../icons';

// import { useFilterTableCtx } from '../../context';

// import type { SummaryRowOperator, CalcColumnType } from '../../../core/interfaces';
// import type { TabulatorRef } from '../../interfaces';

// import styles from './settings.module.scss';
// import parentStyles from '../../../../../styles.module.scss';
// import buttonStyles from '../../../../../shared/styles/button.module.scss';

// interface TableSettingsProps {
//   tabultorRef: React.MutableRefObject<TabulatorRef | null>;
//   open: boolean;
//   close: () => void;
//   isEditable: boolean;
// }

// const TableSettings: FC<TableSettingsProps> = (props) => {
//   const { open, close, isEditable } = props;

//   const { dataTestId, headingNames, submitButtonRef, updateAttributes, nodeAttrs } = useFilterTableCtx();

//   const [calcColumn, setCalcColumn] = useState<CalcColumnType | null>(nodeAttrs.calcColumn);

//   const computeRowCalcFields = useCallback(() => {
//     const validHeadingNames = headingNames.filter((hName) => hName.trim() !== '');
//     return fromPairs(validHeadingNames.map((hName) => [hName, nodeAttrs.summaryRow[hName] || 'none']));
//   }, [headingNames, nodeAttrs.summaryRow]);

//   const [rowCalcFields, setRowCalcFields] = useState<Record<string, SummaryRowOperator>>(computeRowCalcFields());

//   useEffect(() => {
//     setRowCalcFields(computeRowCalcFields());
//   }, [computeRowCalcFields]);

//   const saveCalcColcRows = useCallback(() => {
//     const rowCalcKeys = Object.keys(rowCalcFields);

//     if ((!calcColumn?.heading.length && (calcColumn?.columns?.length || 0) >= 2) || rowCalcKeys.includes('')) {
//       alert('Не указан заголовок');
//       return;
//     }

//     if (!!calcColumn?.heading.length && (calcColumn?.columns?.length || 0) < 2) {
//       alert('Должно быть выбрано более одного столбца для вычислений');
//       return;
//     }

//     new Promise((resolve) => {
//       updateAttributes({
//         ...nodeAttrs,

//         summaryRow: omitBy(rowCalcFields, (v) => {
//           if (calcColumn?.operator === 'none') return v === 'none' && v === calcColumn.heading;
//           return v === 'none';
//         }),
//         calcColumn: calcColumn?.operator === 'none' ? null : calcColumn,
//       });

//       setTimeout(() => resolve(submitButtonRef?.current), 200);
//     }).then((saveButton?: HTMLButtonElement) => {
//       close();
//       saveButton?.click();
//     });
//   }, [nodeAttrs, rowCalcFields, calcColumn, close]);

//   if (!open) return null;

//   return createPortal(
//     <div className={cn(styles.dialog, parentStyles._theme_eds)}>
//       <div className={styles.settings}>
//         <div className={styles.header}>
//           <h1 className={styles.title}>Настройки filter table</h1>

//           <Button
//             dataTestId={`${dataTestId}.settings-close-button`}
//             IconLeft={LocalCrossIcon}
//             className={cn(buttonStyles.button_secondary, buttonStyles.button_size_40)}
//             onClick={close}
//           />
//         </div>

//         <div className={styles.body}>
//           <div className={styles.bodyBlock}>
//             <span>Вычисляемые колонки:</span>

//             <AddCalcColumn calcColumn={calcColumn} setCalcColumn={setCalcColumn} isEditable={isEditable} />
//           </div>

//           <div className={styles.bodyBlock}>
//             <span>Вычисляемая строка:</span>

//             <AddSummaryRow operators={rowCalcFields} setOperators={setRowCalcFields} isEditable={isEditable} />
//           </div>
//         </div>

//         {isEditable && (
//           <div className={styles.footer}>
//             <div className={styles.block}>
//               <Button
//                 dataTestId={`${dataTestId}.settings-save-button`}
//                 className={cn(buttonStyles.button_primary, buttonStyles.button_size_40)}
//                 onClick={saveCalcColcRows}
//               >
//                 Сохранить
//               </Button>

//               <Button
//                 dataTestId={`${dataTestId}.settings-cancel-button`}
//                 className={cn(buttonStyles.button_secondary, buttonStyles.button_size_40)}
//                 onClick={close}
//               >
//                 Отменить
//               </Button>
//             </div>
//           </div>
//         )}
//       </div>
//     </div>,

//     document.body,
//   );
// };

// export { TableSettings, TableSettingsProps };
