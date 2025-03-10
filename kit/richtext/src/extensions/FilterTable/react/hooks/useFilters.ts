import { useState, useCallback, useEffect } from 'react';
import { keys, fromPairs, toPairs } from 'lodash';

import { useFilterTableCtx } from '../context';
import { checkFilters } from '../utils';

import { FILTRATORS, SUMMARY_ROW_OPERATORS } from '../components/TabulatorTable/operators';
import { FILTER_HADNLERS_OR_LOGIC } from '../components/FilterSelector/constants';

import type { FilterSelectorProps, FilterItemType, SortItemType, FilterType } from '../components';
import type { RowContent } from '../../core/interfaces';

import tabulatorStyles from '../components/TabulatorTable/table.module.scss';

const useFilters = (props: FilterSelectorProps) => {
  const { tabultorRef, setIsSaveFiltersSortBtn } = props;

  const { nodeAttrs, filterControlsRef, updateAttributes } = useFilterTableCtx();

  const [filters, setFilters] = useState<FilterItemType[]>(nodeAttrs.filters);
  const [sortBy, setSortBy] = useState<SortItemType | null>(nodeAttrs.sort);

  const applyFilters = useCallback(
    (filtersToSet: FilterItemType[]) => {
      const groupedFilters: { [key: string]: FilterItemType[] } = {};

      filtersToSet.forEach(({ col, type, value }) => {
        const groupedKey = `${col}-${type}`;

        if (groupedKey in groupedFilters) {
          groupedFilters[groupedKey].push({ col, type, value });
        } else {
          groupedFilters[groupedKey] = [{ col, type, value }];
        }
      });

      tabultorRef.current?.current?.setFilter((data: Record<string, string>) => {
        if (!toPairs(groupedFilters).length) return true;

        return toPairs(groupedFilters)
          .map(([groupKey, filterItems]) => {
            const groupFilterType = groupKey.split('-')[1] as FilterType;

            if (FILTER_HADNLERS_OR_LOGIC.includes(groupFilterType)) {
              return filterItems.some(({ col, type, value }) => FILTRATORS[type](data[col], value));
            } else {
              return filterItems.every(({ col, type, value }) => FILTRATORS[type](data[col], value));
            }
          })
          .every(Boolean);
      }, 0);

      if (!!keys(nodeAttrs.summaryRow).length) {
        tabultorRef.current?.current?.redraw();

        // Удаляем предыдущие вычисляемые строки
        const prevCalcRows = tabultorRef.current?.current?.getRows().filter((r) => r.getData().isCalculatedSummary);

        if (!!prevCalcRows?.length) {
          prevCalcRows.forEach((rowComp) => rowComp.delete());
          tabultorRef.current?.current?.redraw();
        }

        // добавление новой саммари строки
        const visibleRows = (tabultorRef.current?.current?.getData('visible') || []) as RowContent[];

        const summaryRow = fromPairs(
          toPairs(nodeAttrs.summaryRow).map(([colName, operatorName]) => [
            colName,
            SUMMARY_ROW_OPERATORS[operatorName](visibleRows, colName),
          ]),
        );

        setTimeout(
          () =>
            tabultorRef.current?.current
              ?.addRow({ ...summaryRow, isCalculatedSummary: true }, false)
              .then((row) => row.getElement().classList.add(tabulatorStyles.summaryRow)),
          0,
        );
      }
    },
    [nodeAttrs],
  );

  const applySort = useCallback((sortItem: SortItemType | null) => {
    if (!sortItem) return;
    tabultorRef.current?.current?.setSort(sortItem.column, sortItem.dir);
  }, []);

  const removeFilter = useCallback(
    (filterItemToRemove: FilterItemType) => {
      const { col, type, value } = filterItemToRemove;

      setFilters((prev) => {
        const foundFilterItemIdx = prev.findIndex((el) => el.col === col && el.type === type && el.value === value);
        const updated = [...prev];
        updated.splice(foundFilterItemIdx, 1);

        applyFilters(updated);

        return updated;
      });
    },
    [applyFilters],
  );

  const removeAllFilters = useCallback(() => {
    setFilters([]);
    applyFilters([]);
  }, [applyFilters]);

  const removeSort = useCallback(() => {
    setSortBy(null);
    tabultorRef.current?.current?.clearSort();
  }, []);

  const saveSortFiltersToNodeAttrs = useCallback(() => {
    new Promise(() => {
      updateAttributes({ ...nodeAttrs, filters, sort: sortBy });
      // setTimeout(() => resolve(submitButtonRef?.current), 200);
    }).then((saveButton?: HTMLButtonElement) => saveButton?.click());
  }, [nodeAttrs, sortBy, filters]);

  useEffect(() => {
    filterControlsRef!.current = {
      filters,
      sortBy,

      applyFilters,
      applySort,

      setFilters,
      setSortBy,
      removeFilter,
      removeSort,
      removeAllFilters,

      saveSortFiltersToNodeAttrs,
    };
  }, [
    filters,
    sortBy,

    applyFilters,
    applySort,

    setFilters,
    setSortBy,
    removeFilter,
    removeSort,
    removeAllFilters,

    saveSortFiltersToNodeAttrs,
  ]);

  useEffect(() => {
    const isSaveFilters = filters.length < nodeAttrs.filters.length || !checkFilters(filters, nodeAttrs.filters);
    const isSaveSort = nodeAttrs.sort?.column !== sortBy?.column || nodeAttrs.sort?.dir !== sortBy?.dir;

    setIsSaveFiltersSortBtn(isSaveFilters || isSaveSort);
  }, [sortBy, filters, nodeAttrs, setIsSaveFiltersSortBtn]);

  return { filters };
};

export { useFilters };
