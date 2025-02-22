// import React, { FC } from 'react';
// import cn from 'classnames';
// import { fromPairs } from 'lodash';

// import { Dropable } from '@sbt_swtr/kit-base.dropable';
// import { Button } from '@sbt_swtr/kit-tracker.button';

// import { SelectItem } from '../../../../sharedComponents';

// import { useSelect } from '../../hooks/useSelect';
// import { useFilterTableCtx } from '../../context';
// import { formatCaption } from '../../utils';

// import { SelectIcon, CheckIcon } from '../../icons';

// import type { CalcColumnOperator, CalcColumnType } from '../../../core/interfaces';

// import styles from './add.module.scss';
// import buttonStyles from '../../../../../shared/styles/button.module.scss';

// const CALC_COLS_OPERATORS: [CalcColumnOperator, string][] = [
//   ['none', 'Не выбрано'],
//   ['sum', 'сумма'],
//   ['mult', 'умножение'],
//   ['max', 'максимальное значение'],
//   ['avg', 'среднее значение'],
//   ['min', 'минимальное значение'],
// ];

// const CAPTIONS_ASSOC = fromPairs(CALC_COLS_OPERATORS);

// interface AddCalcColumn {
//   calcColumn: CalcColumnType | null;
//   setCalcColumn: React.Dispatch<React.SetStateAction<CalcColumnType | null>>;
//   isEditable: boolean;
// }

// const AddCalcColumn: FC<AddCalcColumn> = ({ calcColumn, setCalcColumn, isEditable }) => {
//   const { dataTestId, headingNames, nodeAttrs } = useFilterTableCtx();

//   const { isOpen: isSelectOpen = false, closeDropdown: closeSelect, ...selectRest } = useSelect();

//   const localHeadingNames = headingNames.filter((hName) => nodeAttrs.calcColumn?.heading !== hName);

//   return (
//     <div className={cn(styles.addGrid, styles[`addGrid-${localHeadingNames.length + 1}`])}>
//       {localHeadingNames.map((headingName) => (
//         <div key={headingName} className={styles.column}>
//           <span data-testid={`${dataTestId}-calcColumn-${headingName}-span`} className={styles.column_name}>
//             {formatCaption(headingName)}
//           </span>

//           <div className={styles.column_selector}>
//             <Button
//               dataTestId={`${dataTestId}.calcColumn-${headingName}`}
//               IconLeft={calcColumn?.columns?.includes(headingName) ? CheckIcon : undefined}
//               active={calcColumn?.columns?.includes(headingName)}
//               justify="center"
//               fullWidth
//               className={cn(buttonStyles.button_secondary, styles.buttonWhite)}
//               disabled={!isEditable}
//               onClick={() => {
//                 setCalcColumn((prev) => {
//                   if (!prev)
//                     return {
//                       heading: '',
//                       columns: [headingName],
//                       operator: 'none',
//                     };

//                   if (calcColumn?.columns?.includes(headingName)) {
//                     const hNameIdx = calcColumn.columns.findIndex((name) => name === headingName);

//                     const updColumns = [...calcColumn.columns];
//                     updColumns.splice(hNameIdx, 1);

//                     return { ...prev, columns: updColumns };
//                   }

//                   return { ...prev, columns: [...(prev?.columns || []), headingName] };
//                 });
//               }}
//             >
//               {calcColumn?.columns?.includes(headingName) ? 'Выбрано' : 'Выбрать'}
//             </Button>
//           </div>
//         </div>
//       ))}

//       <div className={styles.column}>
//         <div className={styles.column_input}>
//           <input
//             data-testid={`${dataTestId}-calcColumn-title-input`}
//             value={calcColumn?.heading || ''}
//             disabled={!isEditable}
//             onChange={(e) =>
//               setCalcColumn((prev) => {
//                 if (prev) return { ...prev, heading: e.target.value };
//                 return { heading: e.target.value, columns: [], operator: 'none' };
//               })
//             }
//           />
//         </div>

//         <div className={styles.column_operator}>
//           <Dropable
//             dataTestId={`${dataTestId}.calcColumn-dropable`}
//             {...selectRest}
//             offset={[0, 4]}
//             className={styles.dropable}
//             openNodeClassName={styles.dropableOpenNode}
//             closeOnItemClick
//             placement="bottom-end"
//             closeDropdown={closeSelect}
//             disabled={!isEditable}
//             openNode={
//               <Button
//                 dataTestId={`${dataTestId}.calcColumn-select-button`}
//                 active={isSelectOpen}
//                 fullWidth
//                 onClick={(e) => e.stopPropagation()}
//                 className={cn(buttonStyles.button_secondary, styles.dropableTrigger, styles.buttonWhite)}
//                 IconRight={SelectIcon}
//               >
//                 {formatCaption(CAPTIONS_ASSOC[calcColumn?.operator || 'none'])}
//               </Button>
//             }
//           >
//             {CALC_COLS_OPERATORS.map(([operator, caption]) => (
//               <SelectItem
//                 dataTestId={`${dataTestId}.calcColumn-select-selectItem`}
//                 key={operator}
//                 active={operator === calcColumn?.operator}
//                 disabled={!isEditable}
//                 onClick={() => {
//                   setCalcColumn((prev) => {
//                     if (prev) return { ...prev, operator };

//                     return { heading: '', columns: [], operator };
//                   });
//                 }}
//               >
//                 {formatCaption(caption)}
//               </SelectItem>
//             ))}
//           </Dropable>
//         </div>
//       </div>
//     </div>
//   );
// };

// export { AddCalcColumn };
