import { DEFAULT_TEST_ID } from '../../../constants';

const TEST_ID_TABLE = 'Table';
const DEFAULT_TABLE_TEST_ID = `${DEFAULT_TEST_ID}.${TEST_ID_TABLE}`;

const MIN_CELL_WIDTH = 96;

const TABLE_WIDTH_CSSV = '--table-grouped-calced-width';
const TABLE_COL_CSSV_PREFIX = '--table-group-col';

export { DEFAULT_TABLE_TEST_ID, TEST_ID_TABLE, MIN_CELL_WIDTH, TABLE_WIDTH_CSSV, TABLE_COL_CSSV_PREFIX };
