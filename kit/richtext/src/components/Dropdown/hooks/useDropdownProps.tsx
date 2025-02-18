import { useControledDropdown, useAnimation, useCombineControledAnimated } from '@launch-ui/dropable';

import { resolveOpenNodeIcon } from './utils';
import type { DropdownProps, DropdownItemProps, DropdownIdProp } from '../interfaces';

export const useDropdownProps = (props: DropdownProps<DropdownIdProp>) => {
  const {
    items = [] as DropdownItemProps<DropdownIdProp>[][],
    value,
    selectedItems,

    icon, // eslint-disable-line  @typescript-eslint/no-unused-vars

    ...rest
  } = props;

  const controled = useControledDropdown();
  const animated = useAnimation();

  const {
    isOpen,
    //
    openDropdown, // eslint-disable-line  @typescript-eslint/no-unused-vars
    mounted, // eslint-disable-line  @typescript-eslint/no-unused-vars

    ...combinedControled
  } = useCombineControledAnimated({
    controled,
    animated,
    rest,
  });

  const selectedItem = value !== null ? items.flat().filter((item) => item.id === value)?.[0] || null : null;

  return {
    ...rest,
    ...combinedControled,
    isActive: isOpen as boolean,

    items,
    selectedItem,
    selectedItems,

    openNodeIcon: resolveOpenNodeIcon(props, selectedItem),
  };
};
