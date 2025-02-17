import IconSplitCell from '../../../../icons/IconSplitCell';
import IconColumnHeader from '../../../../icons/IconColumnHeader';
import IconRowHeader from '../../../../icons/IconRowHeader';
import IconMergeCells from '../../../../icons/IconMergeCells';
import IconRowDelete from '../../../../icons/IconRowDelete';
import IconAddRowAfter from '../../../../icons/IconAddRowAfter';
import IconAddRowBefore from '../../../../icons/IconAddRowBefore';
import IconColumnDelete from '../../../../icons/IconColumnDelete';
import IconAddColumnAfter from '../../../../icons/IconAddColumnAfter';
import IconAddColumnBefore from '../../../../icons/IconAddColumnBefore';
import IconTableDelete from '../../../../icons/IconTableDelete';
import IconTableInsert from '../../../../icons/IconTableInsert';
import TableColorFill from '../../../../icons/TableColorFill';
import TableColorFillSquareIcon from '../../../../icons/TableColorFillSquareIcon';
import TableColorFillNoFillIcon from '../../../../icons/TableColorFillNoFillIcon';

import type { DropdownItemProps } from '../../../Dropdown';
import type { TableColorCommand, TableCommand } from '../../interfaces';
import React from 'react';

let TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.LIGHT_GRAY;

const enum TABLE_COLOR_FILL {
  LIGHT_GREEN = '#ABF5D1',
  LIGHT_YELLOW = '#FFF0B3',
  LIGHT_RED = '#FFBDAD',
  LIGHT_TURQUOISE = '#B3F5FF',
  LIGHT_BLUE = '#B3D4FF',
  MODERATE_GRAY = '#C1C7D0',
  LIGHT_GRAY = '#F4F5F7',
  NO_FILL = '#FFF',
}

const TABLE_MAX_COLUMNS = 100;
const TABLE_MAX_ROWS = 5000;

const isColumnsCountAtMaxOrTableNotActive: DropdownItemProps<TableCommand>['shouldBeDisabled'] = (editor) => {
  const selectedNode = editor.view.domAtPos(editor.state.selection.anchor).node;

  const closestTable =
    'closest' in selectedNode
      ? (selectedNode as HTMLElement).closest('table')
      : selectedNode.parentElement?.closest('table');

  return (
    !editor.isActive('table') || closestTable?.querySelectorAll('col:not(tr table col)').length === TABLE_MAX_COLUMNS
  );
};

const isRowsCountAtMaxOrTableNotActive: DropdownItemProps<TableCommand>['shouldBeDisabled'] = (editor) => {
  const selectedNode = editor.view.domAtPos(editor.state.selection.anchor).node;

  const closestTable =
    'closest' in selectedNode
      ? (selectedNode as HTMLElement).closest('table')
      : selectedNode.parentElement?.closest('table');

  return !editor.isActive('table') || closestTable?.querySelectorAll('tr:not(tr table tr)').length === TABLE_MAX_ROWS;
};

const TABLE_ITEMS: DropdownItemProps<TableCommand>[] = [
  {
    id: 'tableInsert',
    Icon: IconTableInsert,
    command: (chain) => chain.focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run(),
    shouldBeDisabled: (editor) => editor.isActive('table'),
  },
  {
    id: 'tableDelete',
    Icon: IconTableDelete,
    command: (chain) => chain.focus().deleteTable().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'addColumnBefore',
    Icon: IconAddColumnBefore,
    command: (chain) => chain.focus().addColumnBefore().run(),
    shouldBeDisabled: isColumnsCountAtMaxOrTableNotActive,
  },
  {
    id: 'addColumnAfter',
    Icon: IconAddColumnAfter,
    command: (chain) => chain.focus().addColumnAfter().run(),
    shouldBeDisabled: isColumnsCountAtMaxOrTableNotActive,
  },
  {
    id: 'deleteColumn',
    Icon: IconColumnDelete,
    command: (chain) => chain.focus().deleteColumn().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'addRowBefore',
    Icon: IconAddRowBefore,
    command: (chain) => chain.focus().addRowBefore().run(),
    shouldBeDisabled: isRowsCountAtMaxOrTableNotActive,
  },
  {
    id: 'addRowAfter',
    Icon: IconAddRowAfter,
    command: (chain) => chain.focus().addRowAfter().run(),
    shouldBeDisabled: isRowsCountAtMaxOrTableNotActive,
  },
  {
    id: 'deleteRow',
    Icon: IconRowDelete,
    command: (chain) => chain.focus().deleteRow().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'mergeCells',
    Icon: IconMergeCells,
    command: (chain) => chain.focus().mergeCells().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table') || editor.isActive('tableHeader'),
  },
  {
    id: 'splitCell',
    Icon: IconSplitCell,
    command: (chain) => chain.focus().splitCell().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table') || editor.isActive('tableHeader'),
  },
  {
    id: 'toggleHeaderColumn',
    Icon: IconColumnHeader,
    command: (chain) => chain.focus().toggleHeaderColumn().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
  {
    id: 'toggleHeaderRow',
    Icon: IconRowHeader,
    command: (chain) => chain.focus().toggleHeaderRow().run(),
    shouldBeDisabled: (editor) => !editor.isActive('table'),
  },
];

const TABLE_COLOR_ITEMS: DropdownItemProps<TableColorCommand>[] = [
  {
    id: 'colorFill',
    Icon: () => TableColorFill({ color: TABLE_COLOR_FILL_DEFAULT }),
    command: (chain) => chain.colorFill(TABLE_COLOR_FILL_DEFAULT).run(),
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL_DEFAULT),
  },
  {
    id: 'colorFillLightGreen',
    Icon: () => <TableColorFillSquareIcon style={{ color: TABLE_COLOR_FILL.LIGHT_GREEN }} />,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.LIGHT_GREEN;
      return chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_GREEN).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_GREEN),
  },
  {
    id: 'colorFillLightYellow',
    Icon: () => <TableColorFillSquareIcon style={{ color: TABLE_COLOR_FILL.LIGHT_YELLOW }} />,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.LIGHT_YELLOW;
      return chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_YELLOW).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_YELLOW),
  },
  {
    id: 'colorFillLightRed',
    Icon: () => <TableColorFillSquareIcon style={{ color: TABLE_COLOR_FILL.LIGHT_RED }} />,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.LIGHT_RED;
      return chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_RED).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_RED),
  },
  {
    id: 'colorFillLightTurquoise',
    Icon: () => <TableColorFillSquareIcon style={{ color: TABLE_COLOR_FILL.LIGHT_TURQUOISE }} />,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.LIGHT_TURQUOISE;
      return chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_TURQUOISE).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_TURQUOISE),
  },
  {
    id: 'colorFillLightBlue',
    Icon: () => <TableColorFillSquareIcon style={{ color: TABLE_COLOR_FILL.LIGHT_BLUE }} />,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.LIGHT_BLUE;
      return chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_BLUE).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_BLUE),
  },
  {
    id: 'colorFillModerateGray',
    Icon: () => <TableColorFillSquareIcon style={{ color: TABLE_COLOR_FILL.MODERATE_GRAY }} />,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.MODERATE_GRAY;
      return chain.focus().colorFill(TABLE_COLOR_FILL.MODERATE_GRAY).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.MODERATE_GRAY),
  },
  {
    id: 'colorFillLightGray',
    Icon: () => <TableColorFillSquareIcon style={{ color: TABLE_COLOR_FILL.LIGHT_GRAY }} />,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.LIGHT_GRAY;
      return chain.focus().colorFill(TABLE_COLOR_FILL.LIGHT_GRAY).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.LIGHT_GRAY),
  },
  {
    id: 'colorFillNoFill',
    Icon: TableColorFillNoFillIcon,
    command: (chain) => {
      TABLE_COLOR_FILL_DEFAULT = TABLE_COLOR_FILL.NO_FILL;
      return chain.focus().colorFill(TABLE_COLOR_FILL.NO_FILL).run();
    },
    shouldBeDisabled: (editor) => !editor.can().colorFill(TABLE_COLOR_FILL.NO_FILL),
  },
];

export { TABLE_ITEMS, TABLE_COLOR_ITEMS };
