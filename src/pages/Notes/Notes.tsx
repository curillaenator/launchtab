import React, { FC, useCallback, memo, useState, useEffect } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { debounce, throttle } from 'lodash';

import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';
import { RichTextField, type RichtextChangeEvent } from '@launch-ui/richtext';

import { setAside } from '@src/entities/app';
import { $userStore } from '@src/entities/user';
import { setHeaderMidComponent } from '@src/entities/header';
import { useNoteBodyData, useNoteBodyUpdate, NOTE_DEBOUNCE_TIME } from '@src/entities/note';

import { Loader } from '@src/features/loader';
import { NotesContainer, RichTextContainer } from './notes.styled';

import 'tabulator-tables/dist/css/tabulator.min.css';

const HeaderComponent: FC = () => <Loader view='fit-parent' iconSize='56px' />;
const updateHeader = () => setHeaderMidComponent(HeaderComponent);

const Note: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const { noteId: routerNoteId = null } = useParams<{ noteId?: string }>();

  const { uid } = useEffectorUnit($userStore);
  const payload = { uid, routerNoteId } as const;

  const { data: noteBody, isLoading: isNoteBodyLoading } = useNoteBodyData(payload);
  const { mutate: updateNoteBody } = useNoteBodyUpdate({ ...payload, onSuccess: () => setHeaderMidComponent(null) });

  const onChangeStart = useCallback(throttle(updateHeader, NOTE_DEBOUNCE_TIME), []); //eslint-disable-line react-hooks/exhaustive-deps
  const onChangeDebounced = useCallback(debounce(updateNoteBody, NOTE_DEBOUNCE_TIME), []); //eslint-disable-line react-hooks/exhaustive-deps

  const onRichTextChange = useCallback((richTextEvent: RichtextChangeEvent) => {
    onChangeStart();
    onChangeDebounced(richTextEvent);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  return (
    <RichTextContainer>
      {isNoteBodyLoading ? (
        <Loader view='fit-parent' iconSize='56px' />
      ) : (
        <RichTextField maxHeight={maxHeight} initialValue={noteBody || ''} onChange={onRichTextChange} />
      )}
    </RichTextContainer>
  );
};

const Notes: FC = memo(() => {
  const { noteId: routerNoteId } = useParams<{ noteId?: string }>();

  useEffect(() => {
    setAside(true);
  }, []);

  const [pageOutletHeight, setPageOutletHeight] = useState<number>(0);

  const onWindowResize = useCallback(() => setPageOutletHeight(window.innerHeight - 168 - 56), []);

  useEffect(() => {
    onWindowResize();

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return (
    <NotesContainer data-notes-container height={pageOutletHeight}>
      <Corners borderRadius={24} />
      {!!routerNoteId ? (
        <Note maxHeight={pageOutletHeight - 32} />
      ) : (
        <Typography as='span' type='RoundedHeavy36'>
          Notes dashboard
        </Typography>
      )}
    </NotesContainer>
  );
});

export { Notes };
