import { getHTMLFromFragment } from '@tiptap/react';
import { Node as ProseMirroNode } from '@tiptap/pm/model';
import { ColumnDefinition } from 'tabulator-tables';
import { v4 as getUniqCode } from 'uuid';
import { fromPairs } from 'lodash';

import { htmlToText, tabulatorCellFormatter, tabulatorCellSorter } from '../utils';
import { MIN_CELL_WIDTH, TABLE_COL_CSSV_PREFIX } from '../constants';

import type { UiWidgetProps } from '../interfaces';
import type { RowContent, TableCellAttributes } from '../../core/interfaces';

const DEFAULT_HEAD_CELL_ATTRS: TableCellAttributes = {
  colspan: 1,
  rowspan: 1,
  colwidth: 200,
  backgroundColor: 'var(--editor-highlight-bgc)',
};

const FIXED_COLUMN_DEFINITION: Partial<ColumnDefinition> = {
  resizable: false,
  variableHeight: true,

  minWidth: MIN_CELL_WIDTH,

  formatter: tabulatorCellFormatter,
  sorter: tabulatorCellSorter,
};

const wrapHtmlWithBgc = (html: string, bgc: string) => `<div data-wrapper="true" data-bgc="${bgc}">${html}</div>`;

/**
 * @description
 * - генерирует набор данных для инстанса tabulator-tables
 * - генерирует набор данных для мапинга элементов col в colgroup в таблице редакторирования
 * (требуется для управления шириной колонок)
 */
const useTable = (props: UiWidgetProps) => {
  const { editor, node } = props;
  const { content } = node;
  const { schema: editorSchema } = editor;

  const isTableContentExists = !!htmlToText(getHTMLFromFragment(content, editorSchema), false).trim().length;

  const tableAllRows: ProseMirroNode[] = [];
  const tableHeadingRows: ProseMirroNode[] = [];

  // вычленение строк с заголовками
  content.forEach((rNode) => {
    tableAllRows.push(rNode);

    const rNodeCells: ProseMirroNode[] = [];
    rNode.content.forEach((cNode) => rNodeCells.push(cNode));

    const isHeadingRow = rNodeCells.every((rCellNode) => rCellNode.type.name === 'tableHeader');
    if (isHeadingRow) tableHeadingRows.push(rNode);
  });

  // COLWIDTHS START
  const expectedColWidthCount = tableAllRows.reduce(
    (colsCnt, row) => (row.content.childCount > colsCnt ? row.content.childCount : colsCnt),
    0,
  );

  const colgroup = [...new Array(expectedColWidthCount).fill(null)].map((_, colIdx) => ({
    colWidthCssv: `${TABLE_COL_CSSV_PREFIX}-${colIdx}`,
  }));
  // COLWIDTHS END

  // skip filters - мультихедер-строки
  if (tableHeadingRows.length > 1) {
    return {
      colgroup,

      canBeFiltered: false,
      initHeadingNames: [],
      initTableData: { columns: [], data: [] },
    };
  }

  let isSyntheticHeaders: boolean = false;

  const initHeadingNames: string[] = [];
  const headNodesAttrs: (TableCellAttributes & { textContent: string })[] = [];

  if (tableHeadingRows.length) {
    tableHeadingRows[0].content?.forEach((headRowCell, cellIdx) => {
      const headColName = headRowCell.textContent || `Column_${cellIdx}`;

      initHeadingNames.push(headColName);
      headNodesAttrs.push({ ...(headRowCell.attrs as TableCellAttributes), textContent: headColName });
    });

    isSyntheticHeaders = false;
  } else {
    tableAllRows[0]?.forEach((_, syntHeadIdx) => {
      const syntColName = `Column_${syntHeadIdx}`;

      initHeadingNames.push(syntColName);
      headNodesAttrs.push({ ...DEFAULT_HEAD_CELL_ATTRS, textContent: syntColName });
    });

    isSyntheticHeaders = true;
  }

  // skip filters - у ячеек хедера есть колспаны
  if (!headNodesAttrs.every(({ colspan }) => colspan === 1)) {
    return {
      colgroup,

      canBeFiltered: false,
      initHeadingNames: [],
      initTableData: { columns: [], data: [] },
    };
  }

  const maxHeadRowspanIdx = headNodesAttrs[0].rowspan - 1;

  const columns: ColumnDefinition[] = headNodesAttrs.map((headCellAttr, headCellIdx) => ({
    ...FIXED_COLUMN_DEFINITION,
    title: headCellAttr.textContent,
    field: headCellAttr.textContent,
    width: node.attrs['columnWidths'][headCellIdx],
  }));

  const dataRows = isSyntheticHeaders ? tableAllRows : tableAllRows.slice(maxHeadRowspanIdx + 1);

  const rowLengths: number[] = [];

  const data: RowContent[] = dataRows.map((rowNode, rowIdx) => {
    const rowCells: ProseMirroNode[] = [];

    rowNode.content.forEach((cNode) => rowCells.push(cNode));

    rowLengths.push(rowCells.length);

    const rowCellsEntries: [string, string][] = rowCells.map((cellNode, cellIdx) => [
      columns[cellIdx]?.field || getUniqCode(),

      wrapHtmlWithBgc(
        getHTMLFromFragment(cellNode.content, editorSchema),
        cellNode.attrs['backgroundColor'] || 'transparent',
      ),
    ]);

    return { id: `${rowIdx}`, ...fromPairs(rowCellsEntries) };
  });

  // skip filters - строки данных таблицы не равной длинны
  if ([...new Set(rowLengths)].length !== 1) {
    return {
      colgroup,

      canBeFiltered: false,
      initHeadingNames: [],
      initTableData: { columns: [], data: [] },
    };
  }

  return {
    colgroup,

    canBeFiltered: isTableContentExists,
    initHeadingNames,
    initTableData: { columns, data },
  };
};

export { useTable };
