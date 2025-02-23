import React from 'react';

import { ToolbarComponentStruct } from '../interfaces';
import { DropdownWithActiveCommand } from '../../DropdownWithActiveCommand';
import { ControlSection } from '../../ControlSection';
import { GridSelector } from '../../GridSelector';

import { DROPDOWN_PARAMS } from './const';
import { ITEMS, ADDITIONAL_ITEMS, TABLE_ITEMS, DRAW_IO_ITEMS } from './items';

import IconTableInsert from '../../../icons/IconTableInsert';
import { AddMacrosIcon } from '../../../icons/AddMacrosIcon';

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

      (props) => <ControlSection {...props} id='additional-items-commands' items={ADDITIONAL_ITEMS} />,

      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id='macros-items-commands'
          icon={AddMacrosIcon}
          items={[DRAW_IO_ITEMS]}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.macros}
          maxWidth={DROPDOWN_PARAMS.macros}
        />
      ),

      (props) => (
        <GridSelector
          {...props}
          placement='bottom-end'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.blocksGrid}
          maxWidth={DROPDOWN_PARAMS.blocksGrid}
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
    right: [],
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
