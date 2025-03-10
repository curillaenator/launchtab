// import React, { FC } from 'react';
// import cn from 'classnames';
// import { Button } from '@sbt_swtr/kit-tracker.button';

// import { FilterChip } from './FilterChip';
// import { FilterChipAdd } from './FilterChipAdd';

// import { useFilterSelector } from './useFilterSelector';
// import { getFiltersChipsData } from '../../utils';

// import { useFilters } from '../../hooks/useFilters';
// import { useFilterTableCtx } from '../../context';

// import type { FilterSelectorProps } from './interfaces';

// import styles from './filterselector.module.scss';
// import buttonStyles from '../../../../../shared/styles/button.module.scss';

// const FilterSelector: FC<FilterSelectorProps> = (props) => {
//   const { filters } = useFilters(props);
//   const chipAddControls = useFilterSelector(props);

//   const { dataTestId } = useFilterTableCtx();

//   return (
//     <div className={styles.selectorContainer}>
//       {getFiltersChipsData(filters).map((chip) => (
//         <FilterChip {...chip} key={`${chip.col}-${chip.type}`} tabultorRef={props.tabultorRef} />
//       ))}

//       {!chipAddControls.isAdd ? (
//         <Button
//           dataTestId={`${dataTestId}.add-filter`}
//           className={cn(buttonStyles.button_secondary, buttonStyles.button_size_40)}
//           onClick={(e) => {
//             e.stopPropagation();
//             chipAddControls.setIsAdd(true);
//           }}
//         >
//           Добавить фильтр
//         </Button>
//       ) : (
//         <FilterChipAdd controls={chipAddControls} />
//       )}
//     </div>
//   );
// };

// export { FilterSelector };
