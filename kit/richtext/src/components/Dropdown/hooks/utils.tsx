import React, { ReactNode } from 'react';
import IconEllipsis from '../../../icons/IconEllipsis';
import type { DropdownProps, DropdownItemProps, DropdownIdProp } from '../interfaces';

export const resolveOpenNodeLabel = (
  props: DropdownProps<DropdownIdProp>,
  selectedItem: DropdownItemProps<DropdownIdProp> | null,
  isOpen: boolean,
): ReactNode => {
  const { value, placeholder, isOpenNodeCaption = true, selectedItems } = props;

  if (!selectedItems && isOpenNodeCaption && !!value && selectedItem) return selectedItem?.caption || '';

  if (isOpenNodeCaption && placeholder) {
    return <span data-element={isOpen ? 'placeholder-active' : 'placeholder'}>{placeholder}</span>;
  }

  return null;
};

export const resolveOpenNodeIcon = (
  props: DropdownProps<DropdownIdProp>,
  selectedItem: DropdownItemProps<DropdownIdProp> | null,
) => {
  const { value: selectedId, items, icon = null, selectedItems, showOnlyIconComponent } = props;

  if (showOnlyIconComponent && icon) return icon;

  // отображение иконки: при синглвелью дропдауне
  if (!selectedItems) return !!selectedId ? selectedItem?.Icon || icon : icon;

  // при мультивелью дропдауне
  const multi = Object.entries(selectedItems);
  const multiDryed = multi.filter(([_, v]) => !!v); // eslint-disable-line @typescript-eslint/no-unused-vars

  // будет отображена иконка элемента, если выбран 1 элемент
  if (multiDryed.length === 1) return items?.flat().find((item) => item.id === multiDryed[0][0])?.Icon || null;

  // будет отображена иконка Ellipsis, если выбрано больше 1ого элемента
  return multiDryed.length > 1 ? IconEllipsis : icon;
};
