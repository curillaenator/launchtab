import React from 'react';

import { ToolbarComponentStruct } from '../interfaces';
import { DropdownWithActiveCommand } from '../../DropdownWithActiveCommand';
import { ControlSection } from '../../ControlSection';
import { GridSelector } from '../../GridSelector';
import { EmojiSelector } from '../../EmojiSelector';

import { DROPDOWN_PARAMS } from './const';
import {
  ITEMS,
  ADDITIONAL_ITEMS,
  TABLE_ITEMS,
  DRAW_IO_ITEMS,
  TOC_ITEMS,
  TEXT_ALIGN_ITEMS,
  TEXT_FORMAT_ITEMS,
  COLOR_ITEMS,
  TEXT_COLOR_CLEAR,
  IMAGE_ITEMS,
  // BACKGROUND_COLOR_ITEMS,
  // TEXT_HIGHLIGHT_CLEAR,
  TASK_LIST_ITEMS,
} from './items';

import IconTableInsert from '../../../icons/IconTableInsert';
import { AddMacrosIcon } from '../../../icons/AddMacrosIcon';
// import IconEdit from '../../../icons/IconEdit';

const DEFAULT_STRUCT: ToolbarComponentStruct = {
  full: {
    left: [
      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id='text-items-commands'
          defaultValue='paragraph'
          items={ITEMS}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.left}
          maxWidth={DROPDOWN_PARAMS.left}
        />
      ),

      (props) => <ControlSection {...props} id='text-formats-commands' items={TEXT_FORMAT_ITEMS} />,

      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id='text-color-commands'
          defaultValue='defaultColor'
          items={[[...COLOR_ITEMS, TEXT_COLOR_CLEAR]]}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.color}
          maxWidth={DROPDOWN_PARAMS.color}
        />
      ),

      // (props) => (
      //   <DropdownWithActiveCommand
      //     {...props}
      //     id='text-background-commands'
      //     defaultValue='blackColorBackground'
      //     items={[[...BACKGROUND_COLOR_ITEMS, TEXT_HIGHLIGHT_CLEAR]]}
      //     placement='bottom-start'
      //     maxHeight={DROPDOWN_PARAMS.maxHeight}
      //     minWidth={DROPDOWN_PARAMS.color}
      //     maxWidth={DROPDOWN_PARAMS.color}
      //   />
      // ),

      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id='text-align-commands'
          defaultValue='justify'
          items={[TEXT_ALIGN_ITEMS]}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.textAlign}
          maxWidth={DROPDOWN_PARAMS.textAlign}
        />
      ),

      (props) => (
        <GridSelector
          {...props}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.blocksGrid}
          maxWidth={DROPDOWN_PARAMS.blocksGrid}
        />
      ),

      (props) => (
        <EmojiSelector
          {...props}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.blocksGrid}
          maxWidth={DROPDOWN_PARAMS.blocksGrid}
        />
      ),

      (props) => <ControlSection {...props} id='image-commands' items={IMAGE_ITEMS} />,
    ],

    right: [
      (props) => <ControlSection {...props} id='additional-items-commands' items={ADDITIONAL_ITEMS} />,

      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id='macros-items-commands'
          icon={AddMacrosIcon}
          items={[[...TOC_ITEMS, ...DRAW_IO_ITEMS, ...TASK_LIST_ITEMS]]}
          placement='bottom-end'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.macros}
          maxWidth={DROPDOWN_PARAMS.macros}
        />
      ),

      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id='table-items-commands'
          icon={IconTableInsert}
          items={[TABLE_ITEMS]}
          placement='bottom-end'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.table}
          maxWidth={DROPDOWN_PARAMS.table}
        />
      ),
    ],
  },
  medium: {
    left: [],
    right: [],
  },
  compact: {
    left: [],
    right: [],
  },
  small: {
    left: [],
    right: [],
  },
  minimal: { left: [], right: [] },
};

export { DEFAULT_STRUCT };
