import React, { FC } from 'react';
import { useCurrentEditor } from '@tiptap/react';
import { toPairs } from 'lodash';

import { Dropable } from '@launch-ui/dropable';
import { ButtonGhost } from '@launch-ui/button';
import { ToolbarButton } from '../ToolbarButton';

import { useDropdown } from './hooks/useDropdown';

import { namesToEmoji } from './emojis';

import type { EmojiSelectorProps } from './interfaces';
import styles from './emojiselector.module.scss';

export const EmojiSelector: FC<EmojiSelectorProps> = (props) => {
  const { editor } = useCurrentEditor();

  const {
    id,
    disabled,
    offset = [0, 4],
    isOpen,
    closeDropdown,
    editorContentRef,

    //guard
    onSelectionUpdateHandlers,

    ...rest
  } = useDropdown(props);

  if (!editor) return null;

  return (
    <Dropable
      {...rest}
      offset={offset}
      closeDropdown={closeDropdown}
      closeOnItemClick
      openNode={
        <div>
          <ToolbarButton active={isOpen} onClick={() => setTimeout(() => editor.commands.focus(), 20)}>
            <span style={{ width: '32px', textAlign: 'center' }}>{namesToEmoji['smile']}</span>
          </ToolbarButton>
        </div>
      }
    >
      <div className={styles.emoji}>
        {toPairs(namesToEmoji).map(([shortName, emojiVal]) => (
          <ButtonGhost
            height={32}
            key={shortName}
            title={emojiVal}
            onClick={() => {
              editor.commands.setEmoji({ shortName });
              closeDropdown?.();
            }}
          />
        ))}
      </div>
    </Dropable>
  );
};
