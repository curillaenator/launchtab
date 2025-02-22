const TOOLBAR_MIN_FULL_WIDTH = 1450;
const TOOLBAR_MIN_MEDIUM_WIDTH = 1250;
const TOOLBAR_MIN_COMPACT_WIDTH = 1015;
const TOOLBAR_MIN_SMALL_WIDTH = 450;

// TODO: wrong naming, initially this assoc aimed to store real CSS properties.
const DROPDOWN_PARAMS = {
  maxHeight: 360,
  left: 268,
  textAlign: 268,
  textFormat: 268,
  table: 268,
  color: 230,
  blocksGrid: 336,
  macros: 297,
} as const;

export {
  DROPDOWN_PARAMS,
  TOOLBAR_MIN_FULL_WIDTH,
  TOOLBAR_MIN_MEDIUM_WIDTH,
  TOOLBAR_MIN_COMPACT_WIDTH,
  TOOLBAR_MIN_SMALL_WIDTH,
};
