import React, { FC, useState, useCallback, useMemo, useEffect, memo } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { noop, uniqueId } from 'lodash';

import { Dropdown } from '../Dropdown';

import { DEFAULT_CAPTIONS } from '../constants';
import type { ControlCaption, ToolbarActiveComponentDropdownProps } from '../Toolbar/interfaces';

const WATCH_IDS_FOR_ACTIVE_COMMAND = ['h1-h2-h3-h4-h5-h6-paragraph-bull'];
const WATCH_IDS_FOR_FOCUSED_CONTENT = ['tableInsert-tableDelete'];

const DropdownWithActiveCommand: FC<ToolbarActiveComponentDropdownProps> = memo((props) => {
  const {
    id = uniqueId('dd-with-comands'),
    items,
    defaultValue = 'paragraph',
    editorContentRef,
    onSelectionUpdateHandlers,
    //
    ...rest
  } = props;

  const { editor } = useCurrentEditor();

  const [activeCommand, setActiveCommand] = useState<string | number>(defaultValue);

  const itemsWithCaptions = useMemo(
    () => items?.map((g) => g.map((v) => ({ ...v, caption: DEFAULT_CAPTIONS[v.id as ControlCaption] ?? '' }))),
    [items],
  );

  const onUpdate = useCallback(() => {
    if (!editor) return;

    if (WATCH_IDS_FOR_FOCUSED_CONTENT.includes(id)) {
      setActiveCommand(Date.now());
      return;
    }

    if (!WATCH_IDS_FOR_ACTIVE_COMMAND.includes(id)) return;

    const flatten = (items ?? []).flat().filter((v) => v.id !== 'paragraph');
    const theActiveCommand = flatten.find((v) => v.isActive?.(editor) ?? editor?.isActive(v.id))?.id ?? defaultValue;

    setActiveCommand(theActiveCommand);
  }, [id, editor, items, defaultValue]);

  useEffect(() => {
    onSelectionUpdateHandlers.current.push(onUpdate);
  }, [onUpdate]);

  return <Dropdown {...rest} items={itemsWithCaptions} value={activeCommand} onChange={noop} closeOnItemClick />;
});

export { DropdownWithActiveCommand };
