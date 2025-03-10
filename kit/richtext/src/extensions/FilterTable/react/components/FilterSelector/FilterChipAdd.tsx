// import React, { FC } from 'react';
// import cn from 'classnames';

// import { Dropable } from '@sbt_swtr/kit-base.dropable';
// import { Button } from '@sbt_swtr/kit-tracker.button';

// import { SelectItem } from '../../../../sharedComponents';
// import { useSelect } from '../../hooks/useSelect';
// import { LocalCrossIcon, CheckIcon, SelectIcon } from '../../icons';
// import { formatCaption } from '../../utils';

// import { useFilterTableCtx } from '../../context';

// import { TABULATOR_FILTERS, FILTER_KEYS_ASSOC } from './constants';
// import type { FilterChipAddProps } from './interfaces';

// import styles from './filterchip.module.scss';
// import buttonStyles from '../../../../../shared/styles/button.module.scss';

// const FilterChipAdd: FC<FilterChipAddProps> = (props) => {
//   const { dataTestId, headingNames, filterControlsRef } = useFilterTableCtx();

//   const {
//     setIsAdd,

//     selectedCol,
//     setSelectedCol,

//     selectedFilterType,
//     setSelectedFilterType,

//     valueSelectorItems,

//     inputValue,
//     setInputValue,

//     isValueSelector,
//   } = props.controls;

//   const { isOpen: isSelectColOpen = false, closeDropdown: closeSelectCol, ...selectColRest } = useSelect();
//   const { isOpen: isFilterTypeOpen = false, closeDropdown: closeFilterType, ...filterTypeRest } = useSelect();
//   const { isOpen: isValueSelectOpen = false, closeDropdown: closeValueSelect, ...valueSelectRest } = useSelect();

//   return (
//     <div className={styles.chipAdd}>
//       <div className={styles.titled}>
//         <span>Колонка:</span>

//         <Dropable
//           {...selectColRest}
//           dataTestId={`${dataTestId}.column-dropable`}
//           offset={[0, 4]}
//           className={styles.dropable}
//           closeOnItemClick
//           placement="bottom-start"
//           closeDropdown={closeSelectCol}
//           openNode={
//             <Button
//               dataTestId={`${dataTestId}.column-button`}
//               active={isSelectColOpen}
//               onClick={(e) => e.stopPropagation()}
//               className={cn(buttonStyles.button_secondary, styles.dropableTrigger)}
//               IconRight={SelectIcon}
//             >
//               {formatCaption(selectedCol) || 'Не выбрано'}
//             </Button>
//           }
//         >
//           {headingNames.map((colName) => (
//             <SelectItem
//               dataTestId={`${dataTestId}.column-selectItem-${colName}`}
//               key={colName}
//               active={colName === selectedCol}
//               onClick={() => setSelectedCol(colName)}
//             >
//               {formatCaption(colName)}
//             </SelectItem>
//           ))}
//         </Dropable>
//       </div>

//       <div className={styles.titled}>
//         <span>Тип фильтра:</span>

//         <Dropable
//           dataTestId={`${dataTestId}.filter-type-dropable`}
//           {...filterTypeRest}
//           offset={[0, 4]}
//           className={styles.dropable}
//           closeOnItemClick
//           placement="bottom-start"
//           closeDropdown={closeFilterType}
//           openNode={
//             <Button
//               dataTestId={`${dataTestId}.filter-type-button`}
//               active={isFilterTypeOpen}
//               onClick={(e) => e.stopPropagation()}
//               className={cn(buttonStyles.button_secondary, styles.dropableTrigger)}
//               IconRight={SelectIcon}
//             >
//               {formatCaption(FILTER_KEYS_ASSOC[selectedFilterType?.tabulatorKey || 'none'])}
//             </Button>
//           }
//         >
//           {TABULATOR_FILTERS.map((filterItem) => (
//             <SelectItem
//               dataTestId={`${dataTestId}.filter-type-selectItem-${filterItem.key}`}
//               key={filterItem.key}
//               active={filterItem.key === selectedFilterType?.key}
//               onClick={() => setSelectedFilterType(filterItem)}
//             >
//               {formatCaption(FILTER_KEYS_ASSOC[filterItem.tabulatorKey])}
//             </SelectItem>
//           ))}
//         </Dropable>
//       </div>

//       <div className={styles.titled}>
//         <span>Значение:</span>

//         {isValueSelector ? (
//           <Dropable
//             dataTestId={`${dataTestId}.valueSelector-dropable`}
//             {...valueSelectRest}
//             offset={[0, 4]}
//             className={styles.dropable}
//             closeOnItemClick
//             placement="bottom-end"
//             closeDropdown={closeValueSelect}
//             openNode={
//               <Button
//                 dataTestId={`${dataTestId}.valueSelector-button`}
//                 active={isValueSelectOpen}
//                 onClick={(e) => e.stopPropagation()}
//                 className={cn(buttonStyles.button_secondary, styles.dropableTrigger)}
//                 IconRight={SelectIcon}
//               >
//                 {formatCaption(inputValue)}
//               </Button>
//             }
//           >
//             {valueSelectorItems.map((valueSelector, i) => (
//               <SelectItem
//                 dataTestId={`${dataTestId}.valueSelector-selectItem-${i}`}
//                 key={valueSelector}
//                 active={valueSelector === inputValue}
//                 onClick={() => {
//                   setInputValue(valueSelector);
//                 }}
//               >
//                 {formatCaption(valueSelector)}
//               </SelectItem>
//             ))}
//           </Dropable>
//         ) : (
//           <input
//             className={styles.targetValueInput}
//             value={inputValue}
//             onChange={(e) => setInputValue(e.target.value)}
//           />
//         )}
//       </div>

//       <Button
//         dataTestId={`${dataTestId}.check-button`}
//         className={cn(buttonStyles.button_secondary, styles.addChipButton)}
//         IconLeft={CheckIcon}
//         onClick={(e) => {
//           e.stopPropagation();

//           const foundWithSameParams = filterControlsRef?.current?.filters.find(
//             (el) => el.col === selectedCol && el.type === selectedFilterType.tabulatorKey && el.value === inputValue,
//           );

//           if (!selectedCol || !selectedFilterType?.tabulatorKey || !!foundWithSameParams) {
//             alert('Пожалуйста, выберите колонку для фильтрации');
//             return;
//           }

//           // set to state for chip renders
//           filterControlsRef?.current?.setFilters((prev) => {
//             const updatedFilters = [
//               ...prev,
//               {
//                 col: selectedCol,
//                 type: selectedFilterType.tabulatorKey,
//                 value: inputValue,
//               },
//             ];

//             // set tabulator to filter accroding to provided filters
//             filterControlsRef.current?.applyFilters(updatedFilters);

//             return updatedFilters;
//           });

//           setIsAdd(false);
//         }}
//       />

//       <Button
//         dataTestId={`${dataTestId}.cross-dropable`}
//         className={cn(buttonStyles.button_secondary, styles.addChipButton)}
//         IconLeft={LocalCrossIcon}
//         onClick={(e) => {
//           e.stopPropagation();
//           setIsAdd(false);
//         }}
//       />
//     </div>
//   );
// };

// export { FilterChipAdd };
