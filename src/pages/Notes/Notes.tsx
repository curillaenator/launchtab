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

import { CreateSpace } from '../CreateSpace';
import { CreateNote } from '../CreateNote';
import { NotesContainer, RichTextContainer } from './notes.styled';

import 'tabulator-tables/dist/css/tabulator.min.css';

type CreateParamType = 'space' | 'note';

const CREATE_COMPONENTS_ASSOC: Record<CreateParamType, FC> = {
  space: CreateSpace,
  note: CreateNote,
};

const HeaderComponent: FC = () => <Loader view='fit-parent' iconSize='56px' />;
const updateHeader = () => setHeaderMidComponent(HeaderComponent);

const Note: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const { noteId: routerNoteId = null } = useParams<{
    noteId?: string;
    createPageType?: CreateParamType;
  }>();

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
  const { noteId: routerNoteId, createPageType } = useParams<{
    noteId?: string;
    createPageType?: CreateParamType;
  }>();

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

  // if (!uid) return <Navigate to='/' replace />;

  if (!!createPageType) {
    const CreateMappedComponent = CREATE_COMPONENTS_ASSOC[createPageType];
    return <CreateMappedComponent />;
  }

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
