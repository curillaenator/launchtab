import React, { FC, useEffect, useRef, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useParams } from 'react-router-dom';

import { Modal } from '@launch-ui/modal';
import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';
import { ButtonAction, ButtonGhost } from '@launch-ui/button';

import { $noteStore, useNoteUnitData, type NotesRouteParams } from '@src/entities/note';

import { useICan } from '@src/hooks/useICan';

import { Loader } from '@src/features/loader';
import { SetupNote } from '../SetupNote';
import { NoteHeaderBlockStyled, NoteHeaderStyled, SaveNotification } from './noteHeader.styled';

import SwitchesIcon from '@src/assets/svg/switches.svg';
import NoteTitleIcon from '@src/assets/svg/bookmark.svg';

export const NoteHeader: FC = () => {
  const { noteId: routerNoteId = null } = useParams<NotesRouteParams>();

  const { data: noteUnit, isLoading: isNoteUnitLoading } = useNoteUnitData({ routerNoteId });

  const iCan = useICan();
  const iCanEdit = iCan.edit(noteUnit);
  const [editOpen, setEditOpen] = useState<boolean>(false);

  const { isNoteSaving, lastInputTimestamp, saveNoteHandler } = useEffectorUnit($noteStore);
  const [secondsUntilSave, setSecondsUntilSave] = useState<number | null>(null);

  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);

    if (Date.now() < lastInputTimestamp) {
      setSecondsUntilSave(Math.ceil((lastInputTimestamp - Date.now()) / 1000));

      intervalRef.current = setInterval(() => {
        if (Date.now() < lastInputTimestamp) {
          setSecondsUntilSave(Math.ceil((lastInputTimestamp - Date.now()) / 1000));
        } else {
          if (intervalRef.current) clearInterval(intervalRef.current);
          setSecondsUntilSave(null);
        }
      }, 1000);
    }
  }, [lastInputTimestamp]);

  return (
    <>
      <NoteHeaderStyled data-note-header>
        <Corners borderRadius={20} />

        <NoteHeaderBlockStyled>
          <NoteTitleIcon />

          {isNoteUnitLoading ? (
            <Loader iconSize='40px' />
          ) : (
            <span className='note-header-title'>{noteUnit?.name || ''}</span>
          )}
        </NoteHeaderBlockStyled>

        <NoteHeaderBlockStyled>
          {isNoteSaving && (
            <SaveNotification data-note-header-save-notification>
              <div className='save-notification-message'>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  Saving
                </Typography>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  Please wait...
                </Typography>
              </div>

              <Loader iconSize='40px' />
            </SaveNotification>
          )}

          {!!secondsUntilSave && (
            <SaveNotification data-note-header-save-notification>
              <ButtonAction
                title='Save'
                onClick={() => {
                  if (intervalRef.current) clearInterval(intervalRef.current);
                  setSecondsUntilSave(null);
                  saveNoteHandler?.();
                }}
              />

              <div className='save-notification-message'>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  Autosave in
                </Typography>
                <Typography type='TextRegular12' color='var(--theme-texts-placeholder)'>
                  {secondsUntilSave}
                </Typography>
              </div>
            </SaveNotification>
          )}

          {iCanEdit && (
            <ButtonGhost RightIcon={() => <SwitchesIcon />} title='Setup' onClick={() => setEditOpen(true)} />
          )}
        </NoteHeaderBlockStyled>
      </NoteHeaderStyled>

      {noteUnit && iCanEdit && (
        <Modal open={editOpen} onClose={() => setEditOpen(false)}>
          <SetupNote closePopup={() => setEditOpen(false)} unit={noteUnit} />
        </Modal>
      )}
    </>
  );
};
