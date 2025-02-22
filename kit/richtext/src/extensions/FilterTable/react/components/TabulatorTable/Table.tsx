import React, { useRef, useEffect, useCallback, memo, forwardRef, useImperativeHandle } from 'react';
import { parse as parseDateStr, isValid as isDateStrValid, isBefore as isDateBefore } from 'date-fns';
import { TabulatorFull, ColumnDefinition } from 'tabulator-tables';
import { fromPairs, toPairs } from 'lodash';

import { remapObject } from '../../../../../utils';

import { useFilterTableCtx } from '../../context';
import { FILTRATORS, SUMMARY_ROW_OPERATORS, CALC_COLUMN_OPERATORS } from './operators';
import { htmlToText } from '../../utils';

import { MIN_CELL_WIDTH } from '../../constants';
import { FILTER_HADNLERS_OR_LOGIC, FilterItemType, FilterType } from '../FilterSelector';

import type { TableInitData, RowContent, SummaryRowOperator } from '../../../core/interfaces';
import type { TabulatorRef } from '../../interfaces';

import tabulatorStyles from './table.module.scss';

interface TabulatorTableProps {
  tableSize: { width: number; height: number } | null;
}

const TabulatorTable = memo(
  forwardRef<TabulatorRef, TabulatorTableProps>(({ tableSize }, ref) => {
    const { nodeAttrs, initTableData, filterControlsRef, setIsTableReady, setHeadingNames, headingNames } =
      useFilterTableCtx();

    const tableRef: TabulatorRef = useRef(null);
    useImperativeHandle(ref, () => tableRef);

    const tableContainerRef = useRef<HTMLDivElement | null>(null);

    const initiateTable = useCallback(
      (initData: TableInitData) => {
        if (!tableContainerRef.current || !!tableRef.current) return;

        const { columns: initC, data: initD } = initData;

        const tabulator = new TabulatorFull(tableContainerRef.current, {
          layout: 'fitData',
          columns: initC,
          data: initD,

          movableColumns: false,
          resizableRows: false,
          selectableRows: false,

          autoResize: false,
        });

        tabulator.on('tableBuilt', () => {
          setIsTableReady(true);

          // группировка фильтров
          const groupedFilters: { [key: string]: FilterItemType[] } = {};

          (filterControlsRef?.current?.filters || []).forEach(({ col, type, value }) => {
            const groupedKey = `${col}-${type}`;

            if (groupedKey in groupedFilters) {
              groupedFilters[groupedKey].push({ col, type, value });
            } else {
              groupedFilters[groupedKey] = [{ col, type, value }];
            }
          });

          // применение фильров по строкам
          tabulator.setFilter((data: Record<string, string>) => {
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
          });

          // добавление вычисляемых столбцов
          if (!!nodeAttrs.calcColumn) {
            tabulator.redraw();

            const calcColumnDef: ColumnDefinition = {
              title: `<p>${nodeAttrs.calcColumn.heading}</p>`,
              field: nodeAttrs.calcColumn.heading,

              formatter: 'html',
              resizable: false,

              variableHeight: true,
              minWidth: MIN_CELL_WIDTH,

              sorter: (a, b, aRow, bRow) => {
                const [cellA, cellB] = [htmlToText(a).trim(), htmlToText(b).trim()];
                const [dateA, dateB] = [
                  parseDateStr(cellA, 'd/M/yyyy', new Date()),
                  parseDateStr(cellB, 'd/M/yyyy', new Date()),
                ];

                if (aRow.getData().isCalculatedSummary || bRow.getData().isCalculatedSummary) return 0;

                if (isDateStrValid(dateA) && isDateStrValid(dateB)) return isDateBefore(dateA, dateB) ? -1 : 1;
                if (!isNaN(+cellA) && !isNaN(+cellB)) return +cellA - +cellB;

                return cellA.slice(0, 10).localeCompare(cellB.slice(0, 10));
              },
            };

            tabulator.addColumn(calcColumnDef, false);

            tabulator.getData().forEach((row) => {
              tabulator.updateRow(row.id, {
                [calcColumnDef.field!]: CALC_COLUMN_OPERATORS[nodeAttrs.calcColumn?.operator || 'none'](
                  nodeAttrs.calcColumn?.columns || [],
                  row,
                ),
              });
            });
          }

          // применение сортировки
          if (!!filterControlsRef?.current?.sortBy) {
            tabulator.setSort(filterControlsRef.current.sortBy.column, filterControlsRef.current.sortBy.dir);
          }

          // добавление вычисляемых строк
          // делаем ремап nodeAttrs.summaryRow чтобы порядок следования заголовков был правильный
          const summaryArr = headingNames?.length
            ? (toPairs(remapObject(headingNames, nodeAttrs.summaryRow)) as [string, SummaryRowOperator][])
            : toPairs(nodeAttrs.summaryRow);

          if (summaryArr.length && !summaryArr.every(([_, value]) => value === 'none')) {
            tabulator.redraw();

            const visibleRows = tabulator.getData('visible') as RowContent[];

            const colFields = tabulator.getColumnDefinitions().map((col) => col.field) as string[];

            const summaryRow = fromPairs(
              // summaryArr.map(([colName, operatorName], index) => {
              summaryArr.map(([_, operatorName], index) => {
                const field = colFields[index];

                return [field, SUMMARY_ROW_OPERATORS[operatorName](visibleRows, field)];
              }),
            );

            setTimeout(
              () =>
                tabulator
                  .addRow({ ...summaryRow, isCalculatedSummary: true }, false)
                  .then((row) => row.getElement().classList.add(tabulatorStyles.summaryRow)),
              0,
            );
          }

          tabulator.redraw();
          setHeadingNames(tabulator.getColumnDefinitions().map((col) => htmlToText(col.title, false)));

          tabulator.off('tableBuilt');
        });

        tabulator.on('dataSorted', (sorters) => {
          const { column, dir } = sorters[0] || {};

          filterControlsRef?.current?.setSortBy(!!sorters[0] ? { column: column.getField(), dir } : null);
        });

        tabulator.on('renderComplete', () => {
          tableContainerRef.current?.style.removeProperty('width');
          tableContainerRef.current?.style.removeProperty('height');
        });

        tabulator.on('tableDestroyed', () => {
          tabulator.off('dataSorted');
          tabulator.off('tableDestroyed');
        });

        tableRef.current = tabulator;
      },
      [nodeAttrs],
    );

    useEffect(() => {
      const { columns, data } = initTableData;
      if (!columns?.length || !data?.length) return;
      initiateTable(initTableData);
    }, [initTableData, initiateTable]);

    return (
      <div ref={tableContainerRef} contentEditable={false} className={tabulatorStyles.table} style={{ ...tableSize }} />
    );
  }),
);

export { TabulatorTable };
