import React, { FC, useState, useCallback, useMemo } from 'react';
import { useCurrentEditor } from '@tiptap/react';

import { Dropdown } from '../Dropdown';

// TODO: thats wrong, should be in current dir
import { useToolbarActiveCommand } from '../Toolbar/hooks/useToolbarActiveCommand';

//  TODO: thats wrong, should be in current dir
import type { UpdatePayload, ControlCaption, ToolbarActiveComponentDropdownProps } from '../Toolbar/interfaces';

import { DEFAULT_CAPTIONS } from '../constants';

const DropdownWithActiveCommand: FC<ToolbarActiveComponentDropdownProps> = (props) => {
  const { items, defaultValue = 'paragraph', richtextViewId, ...rest } = props;

  const { editor } = useCurrentEditor();

  const [activeCommand, setActiveCommand] = useState<string | number>(defaultValue);

  const itemsWithCaptions = useMemo(
    () => items?.map((g) => g.map((v) => ({ ...v, caption: DEFAULT_CAPTIONS[v.id as ControlCaption] ?? '' }))),
    [items],
  );

  const onUpdate = useCallback(
    ({ editor: edtr }: { editor: UpdatePayload['editor'] }) => {
      const flatten = (items ?? []).flat().filter((v) => v.id !== 'paragraph');
      const theActiveCommand = flatten.find((v) => v.isActive?.(edtr) ?? edtr?.isActive(v.id))?.id ?? defaultValue;
      setActiveCommand(theActiveCommand);
    },
    [items, defaultValue, setActiveCommand],
  );

  useToolbarActiveCommand({ onUpdate });

  return editor ? (
    <Dropdown
      {...rest}
      items={itemsWithCaptions}
      value={activeCommand}
      onChange={setActiveCommand}
      chain={editor.chain()}
      closeOnItemClick
      appendToId={richtextViewId}
    />
  ) : null;
};

export { DropdownWithActiveCommand };
