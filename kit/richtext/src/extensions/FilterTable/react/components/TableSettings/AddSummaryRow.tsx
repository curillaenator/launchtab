// import React, { FC } from 'react';
// import cn from 'classnames';
// import { fromPairs } from 'lodash';

// import { Dropable } from '@sbt_swtr/kit-base.dropable';
// import { Button } from '@sbt_swtr/kit-tracker.button';

// import { SelectItem } from '../../../../sharedComponents';

// import { useSelect } from '../../hooks/useSelect';
// import { useFilterTableCtx } from '../../context';
// import { formatCaption } from '../../utils';

// import { SelectIcon } from '../../icons';

// import type { SummaryRowOperator } from '../../../core/interfaces';

// import styles from './add.module.scss';
// import buttonStyles from '../../../../../shared/styles/button.module.scss';

// const SUMMARY_OPERATORS: [SummaryRowOperator, string][] = [
//   ['none', 'Не выбрано'],
//   ['sum', 'сумма'],
//   ['count', 'количество'],
//   ['mult', 'умножение'],
//   ['max', 'максимальное значение'],
//   ['avg', 'среднее значение'],
//   ['min', 'минимальное значение'],
// ];

// const SUMMARY_OPERATOR_NAME = fromPairs(SUMMARY_OPERATORS);

// interface AddSummaryRow {
//   operators: Record<string, SummaryRowOperator>;
//   setOperators: React.Dispatch<React.SetStateAction<Record<string, string>>>;
//   isEditable: boolean;
// }

// interface ColumnCellProps extends AddSummaryRow {
//   colName: string;
//   dataTestId?: string;
// }

// const ColumnCell: FC<ColumnCellProps> = (props) => {
//   const { dataTestId, colName, operators, setOperators, isEditable } = props;

//   const { isOpen: isSelectOpen = false, closeDropdown: closeSelect, ...selectRest } = useSelect();
//   const isCalcOperationDisabled = colName === '';

//   return !isCalcOperationDisabled ? (
//     <Dropable
//       dataTestId={`${dataTestId}.summaryRow-dropable`}
//       {...selectRest}
//       offset={[0, 4]}
//       className={styles.dropable}
//       openNodeClassName={styles.dropableOpenNode}
//       closeOnItemClick
//       placement="bottom-start"
//       closeDropdown={closeSelect}
//       disabled={!isEditable}
//       openNode={
//         <Button
//           dataTestId={`${dataTestId}.summaryRow-select-button`}
//           active={isSelectOpen}
//           fullWidth
//           onClick={(e) => e.stopPropagation()}
//           className={cn(buttonStyles.button_secondary, styles.dropableTrigger, styles.buttonWhite)}
//           IconRight={SelectIcon}
//         >
//           {formatCaption(SUMMARY_OPERATOR_NAME[operators[colName]] || 'нет')}
//         </Button>
//       }
//     >
//       {SUMMARY_OPERATORS.map(([operator, caption]) => (
//         <SelectItem
//           dataTestId={`${dataTestId}.summaryRow-select-selectItem`}
//           key={operator}
//           active={operator === operators[colName]}
//           disabled={!isEditable}
//           onClick={() => setOperators((prev) => ({ ...prev, [colName]: operator }))}
//         >
//           {formatCaption(caption)}
//         </SelectItem>
//       ))}
//     </Dropable>
//   ) : (
//     <Button
//       disabled
//       dataTestId={`${dataTestId}.summaryRow-select-button-disabled`}
//       active={false}
//       fullWidth
//       className={cn(buttonStyles.button_secondary, styles.dropableTrigger, styles.buttonWhite)}
//     >
//       {formatCaption('Введите название колонки')}
//     </Button>
//   );
// };

// const AddSummaryRow: FC<AddSummaryRow> = (props) => {
//   const { operators, setOperators, isEditable } = props;
//   const { dataTestId, headingNames } = useFilterTableCtx();

//   return (
//     <div className={cn(styles.addGrid, styles[`addGrid-${headingNames.length || 1}`])}>
//       {headingNames.map((hName) => (
//         <div key={hName} className={styles.column}>
//           <span data-testid={`${dataTestId}-summaryRow-${hName}-span`} className={styles.column_name}>
//             {formatCaption(hName)}
//           </span>

//           <div className={styles.column_operator}>
//             <ColumnCell
//               dataTestId={dataTestId}
//               colName={hName}
//               operators={operators}
//               setOperators={setOperators}
//               isEditable={isEditable}
//             />
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export { AddSummaryRow };
