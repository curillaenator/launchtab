import type { ControlCaption } from './Toolbar';

const DEFAULT_CAPTIONS: Record<ControlCaption, string> = {
  insertTableOfContent: 'Table of content',
  h1: 'Heading 1',
  h2: 'Heading 2',
  h3: 'Heading 3',
  h4: 'Heading 4',
  h5: 'Heading 5',
  h6: 'Heading 6',
  paragraph: 'Text',
  bulletList: 'Bullet list',
  orderedList: 'Ordered list',
  checkbox: 'Task list',
  hr: 'Divider',
  expand: 'Expand block',
  blockquote: 'Blockquote',
  codeBlock: 'Code block',
  left: 'Left',
  right: 'Rigth',
  center: 'Center',
  justify: 'Justify',
  code: 'Inline code',
  inlineComment: 'Comment',
  bold: 'Bold',
  italic: 'Italic',
  strike: 'Strike',
  underline: 'Underline',
  tableInsert: 'Add table',
  tableDelete: 'Remove table',
  addColumnBefore: 'Add column before',
  addColumnAfter: 'Add column after',
  deleteColumn: 'Remove column',
  addRowBefore: 'Add row above',
  addRowAfter: 'Add row below',
  deleteRow: 'Delete row',
  mergeCells: 'Merge cells',
  splitCell: 'Split cells',
  toggleHeaderColumn: 'Столбец-заголовок',
  toggleHeaderRow: 'Строка-заголовок',
  redColor: 'Danger',
  greenColor: 'Positive',
  lightBlueColor: 'Light-blue',
  blackColor: 'Black',
  lightGreyColor: 'Secondary',
  blueColor: 'Blue',
  darkOrangeColor: 'Warning',
  lightOrangeColor: 'Light-orange',
  purpleColor: 'Accent',
  redColorBackground: 'Red hightlight',
  greenColorBackground: 'Green hightlight',
  lightBlueColorBackground: 'Light-blue hightlight',
  blackColorBackground: 'Black hightlight',
  lightGreyColorBackground: 'Light-grey hightlight',
  blueColorBackground: 'Blue hightlight',
  darkOrangeColorBackground: 'Dark-orange hightlight',
  lightOrangeColorBackground: 'Light-orange hightlight',
  purpleColorBackground: 'Purple hightlight',
  defaultColor: 'Default',
  textColorClear: 'Reset text color styles',
  textHighlightClear: 'Use default hightlight',
  textColorAndHighlightClear: 'Use default color/hightlight',
  chooseAttachment: 'Вложение',
  insertDrawIo: 'DrawIO',
  insertPlantUML: 'PlantUML',
  insertBlocksGrid: 'Add grid',
  deleteBlocksGrid: 'Remove grid',
  undo: 'Undo',
  redo: 'Redo',
  colorFill: 'Fill table cell',
  colorFillLightGreen: 'Light-green',
  colorFillLightYellow: 'Light-yellow',
  colorFillLightRed: 'Light-red',
  colorFillLightTurquoise: 'Light-turquoise',
  colorFillLightBlue: 'Light-blue',
  colorFillModerateGray: 'Moderate-grey',
  colorFillLightGray: 'СLight-grey',
  colorFillNoFill: 'No cell fill',
};

export { DEFAULT_CAPTIONS };
