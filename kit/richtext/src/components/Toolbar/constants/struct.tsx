import React from 'react';
import { ToolbarComponentStruct } from '../interfaces';
import { DropdownWithActiveCommand } from '../../DropdownWithActiveCommand';
import { ControlSection } from '../../ControlSection';
import { GridSelector } from '../../GridSelector';

import { DROPDOWN_PARAMS } from './const';
import { ITEMS, ADDITIONAL_ITEMS } from './items';

const DEFAULT_STRUCT: ToolbarComponentStruct = {
  full: {
    left: [
      (props) => (
        <DropdownWithActiveCommand
          {...props}
          items={ITEMS}
          // isOpenNodeCaption={false}
          placement='bottom-start'
          maxHeight={DROPDOWN_PARAMS.maxHeight}
          minWidth={DROPDOWN_PARAMS.left}
          maxWidth={DROPDOWN_PARAMS.left}
        />
      ),

      (props) => <ControlSection {...props} items={ADDITIONAL_ITEMS} />,

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
