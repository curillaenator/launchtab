// import React, { FC, useEffect, useState } from 'react';
// import cn from 'classnames';

// import { Dropable } from '@sbt_swtr/kit-base.dropable';
// import { Button } from '@sbt_swtr/kit-tracker.button';
// import { SelectItem } from '../../../../sharedComponents';

// import { CrossIcon, SelectIcon } from '../../icons';
// import { formatCaption, htmlToText } from '../../utils';
// import { useSelect } from '../../hooks/useSelect';

// import { SELECT_FILTER_TYPE_RE, FILTER_KEYS_ASSOC } from './constants';
// import type { FilterChipProps, FilterItemType } from './interfaces';

// import { useFilterTableCtx } from '../../context';

// import styles from './filterchip.module.scss';
// import buttonStyles from '../../../../../shared/styles/button.module.scss';

// const ChipValueSelector: FC<FilterChipProps> = (props) => {
//   const { col, type, values, tabultorRef } = props;
//   const { isOpen: isValueSelectOpen = false, closeDropdown: closeValueSelect, ...valueSelectRest } = useSelect();

//   const { filterControlsRef } = useFilterTableCtx();

//   const [valueSelectorItems, setValueSelectorItems] = useState<string[]>([]);

//   useEffect(() => {
//     if (!isValueSelectOpen) return;

//     const uniqueColValues = [
//       ...new Set(
//         tabultorRef?.current?.current?.getData('all').map((row) => htmlToText(row[col] || '', false).slice(0, 40)) ||
//           [],
//       ),
//     ];

//     if (!!uniqueColValues.length) setValueSelectorItems(uniqueColValues);
//   }, [isValueSelectOpen]);

//   return (
//     <div className={styles.chipSelector}>
//       <Dropable
//         {...valueSelectRest}
//         offset={[0, 4]}
//         className={styles.dropable}
//         closeOnItemClick
//         placement="bottom-end"
//         closeDropdown={closeValueSelect}
//         openNode={
//           <Button
//             active={isValueSelectOpen}
//             onClick={(e) => e.stopPropagation()}
//             className={cn(buttonStyles.button_secondary, styles.addChipButton)}
//             IconRight={SelectIcon}
//           />
//         }
//       >
//         {valueSelectorItems.map((rowValue) => (
//           <SelectItem
//             key={`${type}-${rowValue}`}
//             active={values.includes(rowValue)}
//             onClick={() =>
//               filterControlsRef?.current?.setFilters?.((prev) => {
//                 const filterItemIdx = prev.findIndex(
//                   (el) => el.col === col && el.type === type && el.value === rowValue,
//                 );

//                 let filtersToApply: FilterItemType[] = [];

//                 if (filterItemIdx >= 0) {
//                   const updated = [...prev];
//                   updated.splice(filterItemIdx, 1);
//                   filtersToApply = updated;
//                 } else {
//                   filtersToApply = [...prev, { col, type, value: rowValue }];
//                 }

//                 filterControlsRef.current?.applyFilters(filtersToApply);
//                 return filtersToApply;
//               })
//             }
//           >
//             {formatCaption(rowValue)}
//           </SelectItem>
//         ))}
//       </Dropable>
//     </div>
//   );
// };

// const FilterChip: FC<FilterChipProps> = (props) => {
//   const { tabultorRef, col, type, values } = props;
//   const isSelector = SELECT_FILTER_TYPE_RE.test(type.toLowerCase());

//   const { filterControlsRef } = useFilterTableCtx();

//   return (
//     <div className={styles.chip}>
//       <span className={styles.label}>{formatCaption(col)}</span>
//       <span className={styles.filterType}>{FILTER_KEYS_ASSOC[type]}</span>

//       <div className={styles.applied}>
//         {values.map((value) => (
//           <div key={`${col}-${value}`} className={styles.chipBadge}>
//             <span>{`${value}`}</span>

//             <button
//               type="button"
//               onClick={() => filterControlsRef?.current?.removeFilter?.({ col, type, value })}
//               className={styles.removeFilterBtn}
//             >
//               <CrossIcon size={'32'} />
//             </button>
//           </div>
//         ))}
//       </div>

//       {isSelector && <ChipValueSelector tabultorRef={tabultorRef} col={col} type={type} values={values} />}
//     </div>
//   );
// };

// export { FilterChip };
