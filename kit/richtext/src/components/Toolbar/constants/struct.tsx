import React from 'react';
import { ToolbarComponentStruct } from '../interfaces';
import { DropdownWithActiveCommand } from '../../DropdownWithActiveCommand';

import { DROPDOWN_PARAMS } from './const';
import { ITEMS } from './items';

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
