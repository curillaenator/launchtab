import React, { FC, useEffect, useRef, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { ButtonAction } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import { $noteStore, useNoteUnitData, type NotesRouteParams } from '@src/entities/note';

import NoteTitleIcon from '@src/assets/svg/bookmark.svg';
import { Loader } from '@src/features/loader';

const NoteHeaderStyled = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  // for corners
  position: relative;

  display: flex;
  justify-content: space-between;
  gap: 16px;
  padding: 8px 16px;

  width: 100%;
  height: 56px;
  border-radius: calc(20px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.base};
  margin: 0 32px;

  .note-header-title {
    font-family: inherit;
    height: 40px;
    font-size: 36px;
    line-height: 40px;
    font-weight: 600;
  }
`;

const NoteHeaderBlockStyled = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  flex: 0 0 auto;
  width: fit-content;
`;

const SaveNotification = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  width: fit-content;
  height: 100%;

  .save-notification-message {
    display: flex;
    flex-direction: column;
    align-items: center;
    flex: 0 0 auto;
  }
`;

export const NoteHeader: FC = () => {
  const { noteId: routerNoteId = null } = useParams<NotesRouteParams>();

  const { data: noteUnit, isLoading: isNoteUnitLoading } = useNoteUnitData({ routerNoteId });

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

        {/* <ButtonAction title='Edit' /> */}
      </NoteHeaderBlockStyled>
    </NoteHeaderStyled>
  );
};
