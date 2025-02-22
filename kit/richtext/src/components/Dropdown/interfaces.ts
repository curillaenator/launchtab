import { SyntheticEvent, FC } from 'react';
import { Editor as ReactEditor } from '@tiptap/react';
import type {
  ChainedCommands,
  // Editor as CoreEditor
} from '@tiptap/core';
import type { DropableProps } from '@launch-ui/dropable';

type DropdownIdProp = string | number;

interface BaseDropdownItemProps<T extends DropdownIdProp> {
  id: T;
  caption?: string;
  Icon?: DropdownIconComponent;
  active?: boolean;
  closeOnClick?: boolean;
  disabled?: boolean;
  canTextOverflow?: boolean;
}

interface DropdownItemProps<T extends DropdownIdProp> extends BaseDropdownItemProps<T> {
  dataTestId?: string;
  onClick?: (item: BaseDropdownItemProps<T>) => void;
  command?: (chain: ChainedCommands) => boolean;
  isActive?: (editor: ReactEditor) => boolean;
  shouldBeDisabled?: (editor: ReactEditor) => boolean;
  disabled?: BaseDropdownItemProps<T>['disabled'];
}

type OmitedBaseDropableProps = Omit<DropableProps, 'openNode' | 'trigger' | 'placement' | 'children'>;

type Placements = Extract<DropableProps['placement'], 'bottom-start' | 'bottom-end'>;

interface DropdownBaseProps<
  TValue extends DropdownIdProp = DropdownIdProp,
  TItem extends DropdownItemProps<TValue> = DropdownItemProps<TValue>,
> {
  id?: string;
  value: TValue | null;
  selectedItems?: Record<TValue, boolean>;
  onChange: (itemId: TValue) => void;
  placement?: Placements;
  items?: TItem[][];
  icon?: DropdownIconComponent;
  // showOnlyIconComponent?: boolean;
  // placeholder?: string;
  // isOpenNodeCaption?: boolean;
  // canTextOverflow?: boolean;
}

interface DropdownProps<T extends DropdownIdProp>
  extends DropdownBaseProps<T, DropdownItemProps<T>>,
    OmitedBaseDropableProps {}

interface DropdownIconProps {
  id?: string;
  dataTestId?: string;
  state?: 'disabled';
  onClick?: (e: SyntheticEvent<HTMLImageElement | SVGElement>) => void;
  className?: string;
  colorMode?: 'light' | 'dark' | 'color';
}

type DropdownIconComponent = FC<DropdownIconProps>;

export type { DropdownProps, DropdownItemProps, DropdownIdProp, DropdownIconComponent };
