// import React, { FC, useId, memo, useState, useEffect } from 'react';

// import { ActionsSelect } from '../../../../sharedComponents';
// import { useSelect } from '../../hooks/useSelect';
// import { useFilterTableCtx } from '../../context';
// import { ResetIcon } from '../../icons';

// const Actions: FC = memo(() => {
//   const { dataTestId, filterControlsRef } = useFilterTableCtx();

//   const [isFiltersRssetable, setIsFiltersResetable] = useState<boolean>(false);
//   const [isSortRssetable, setIsSortResetable] = useState<boolean>(false);

//   const { isOpen: isActionsOpen = false, closeDropdown: closeActions, ...actionsRest } = useSelect();

//   const actionsId = useId();

//   useEffect(() => {
//     const { filters, sortBy } = filterControlsRef?.current || {};

//     setIsFiltersResetable(!!filters?.length);
//     setIsSortResetable(!!sortBy);
//   });

//   return (
//     <ActionsSelect
//       dataTestId={`${dataTestId}.ActionsSelect-button`}
//       {...actionsRest}
//       id={actionsId}
//       offset={[0, 4]}
//       maxWidth={320}
//       closeDropdown={closeActions}
//       isOpen={isActionsOpen}
//       openNodeIcon={ResetIcon}
//       groupedItems={[
//         [
//           {
//             dataTestId: `${dataTestId}.reset-filters`,
//             id: 'reset-filters',
//             children: 'Сбросить фильтры',
//             IconRight: ResetIcon,
//             onClick: () => filterControlsRef?.current?.removeAllFilters?.(),
//             disabled: !isFiltersRssetable,
//           },
//           {
//             dataTestId: `${dataTestId}.reset-sort`,
//             id: 'reset-sort',
//             children: 'Сбросить сортировку',
//             IconRight: ResetIcon,
//             onClick: () => filterControlsRef?.current?.removeSort(),
//             disabled: !isSortRssetable,
//           },
//         ],
//       ]}
//     />
//   );
// });

// export { Actions };
