import React from 'react';

import { ToolbarComponentStruct } from '../interfaces';
import { DropdownWithActiveCommand } from '../../DropdownWithActiveCommand';
import { ControlSection } from '../../ControlSection';
import { GridSelector } from '../../GridSelector';

import { DROPDOWN_PARAMS } from './const';
import { ITEMS, ADDITIONAL_ITEMS, TABLE_ITEMS } from './items';

import { getIdFromTollbarItems } from '../../../utils';
import IconTableInsert from '../../../icons/IconTableInsert';

const DEFAULT_STRUCT: ToolbarComponentStruct = {
  full: {
    left: [
      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id={getIdFromTollbarItems(ITEMS)}
          items={ITEMS}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.left}
          maxWidth={DROPDOWN_PARAMS.left}
        />
      ),

      (props) => <ControlSection {...props} id={getIdFromTollbarItems([ADDITIONAL_ITEMS])} items={ADDITIONAL_ITEMS} />,

      (props) => (
        <DropdownWithActiveCommand
          {...props}
          id={getIdFromTollbarItems([TABLE_ITEMS])}
          icon={IconTableInsert}
          items={[TABLE_ITEMS]}
          placement='bottom-end'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.table}
          maxWidth={DROPDOWN_PARAMS.table}
        />
      ),

      // (props) => (
      //   <DropdownWithActiveCommand
      //     {...props}
      //     id={getIdFromTollbarItems([TABLE_COLOR_ITEMS])}
      //     defaultValue='colorFillLightGreen'
      //     items={[TABLE_COLOR_ITEMS]}
      //     placement='bottom-end'
      //     maxHeight={DROPDOWN_PARAMS.maxHeight}
      //     minWidth={DROPDOWN_PARAMS.table}
      //     maxWidth={DROPDOWN_PARAMS.table}
      //   />
      // ),

      (props) => (
        <GridSelector
          {...props}
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.blocksGrid}
          maxWidth={DROPDOWN_PARAMS.blocksGrid}
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
