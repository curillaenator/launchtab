import React, { FC, useState, memo, useEffect } from 'react';
import { useCurrentEditor } from '@tiptap/react';

import { ToolbarButton } from '../ToolbarButton';

import type { DropdownItemProps } from '../Dropdown';

import styles from './styles.module.scss';

interface ControlSectionProps {
  id: string;
  items: DropdownItemProps<string>[];
  disabled?: boolean;
  onSelectionUpdateHandlers: React.MutableRefObject<(() => void)[]>;
}

const ControlSection: FC<ControlSectionProps> = memo((props) => {
  const { id, onSelectionUpdateHandlers, items = [], disabled: sectionDisabled } = props;
  const { editor } = useCurrentEditor();

  const [_, setActiveCommand] = useState<number>(Date.now());

  useEffect(() => {
    onSelectionUpdateHandlers.current.push(() => setActiveCommand(Date.now()));
  }, [id, setActiveCommand]);

  return (
    <div className={styles.toolbarSection}>
      {items.map(({ id, Icon, command, isActive, shouldBeDisabled, disabled, dataTestId }) => (
        <ToolbarButton
          key={id}
          dataTestId={dataTestId}
          disabled={(editor && shouldBeDisabled?.(editor)) || disabled || sectionDisabled}
          active={(editor && (isActive?.(editor) ?? editor?.isActive(id))) ?? false}
          onClick={() => {
            setActiveCommand(Date.now());
            editor && command?.(editor.chain());
          }}
        >
          {Icon && <Icon />}
        </ToolbarButton>
      ))}
    </div>
  );
});

export { ControlSection };
