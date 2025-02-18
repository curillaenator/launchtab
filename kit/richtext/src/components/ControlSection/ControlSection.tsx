import React, { FC } from 'react';
import { useCurrentEditor } from '@tiptap/react';

import { ToolbarButton } from '../ToolbarButton';

// TODO: wrong type
import type { DropdownItemProps } from '../Dropdown';

import styles from './styles.module.scss';

interface ControlSectionProps {
  items: DropdownItemProps<string>[];
  disabled?: boolean;
}

const ControlSection: FC<ControlSectionProps> = (props) => {
  const { editor } = useCurrentEditor();

  return (
    <div className={styles.toolbarSection}>
      {(props.items ?? []).map(({ id, Icon, command, isActive, shouldBeDisabled, disabled, dataTestId }) => (
        <ToolbarButton
          key={id}
          dataTestId={dataTestId}
          disabled={(editor && shouldBeDisabled?.(editor)) || disabled || props.disabled}
          active={(editor && (isActive?.(editor) ?? editor?.isActive(id))) ?? false}
          onClick={() => editor && command?.(editor.chain())}
        >
          {Icon && <Icon />}
        </ToolbarButton>
      ))}
    </div>
  );
};

export { ControlSection };
