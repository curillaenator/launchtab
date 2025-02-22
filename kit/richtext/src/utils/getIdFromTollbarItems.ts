import type { DropdownItemProps, DropdownIdProp } from '../components/Dropdown';

const getIdFromItems = (items: DropdownItemProps<string>[][]) =>
  (items.flat(Infinity) as DropdownItemProps<string>[])
    .map((el: DropdownItemProps<DropdownIdProp>) => el.id)
    .join('-')
    .slice(0, 32);

export { getIdFromItems };
