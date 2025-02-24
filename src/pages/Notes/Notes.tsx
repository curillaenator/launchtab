import React, { FC, useCallback, memo, useState, useEffect } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery, useMutation } from '@tanstack/react-query';
import { useParams } from 'react-router-dom';
import { debounce, throttle } from 'lodash';

import { Corners } from '@launch-ui/shape';
import { RichTextField, type RichtextChangeEvent } from '@launch-ui/richtext';
import { Typography } from '@launch-ui/typography';

import { $userStore } from '@src/entities/user';
import { setAside } from '@src/entities/app';
import { setHeaderMidComponent } from '@src/entities/header';
import { getNoteBodyQuery, updateNoteBodyMutation } from '@src/entities/note';

import { Loader } from '@src/features/loader';

import { NotesContainer, RichTextContainer } from './notes.styled';

import 'tabulator-tables/dist/css/tabulator.min.css';

interface NoteProps {
  maxHeight: number;
}

const Note: FC<NoteProps> = ({ maxHeight }) => {
  const { noteId: routerNoteId } = useParams<{ noteId?: string }>();

  const { uid } = useEffectorUnit($userStore);

  const { data: noteBody, isLoading: isNoteBodyLoading } = useQuery({
    queryKey: ['unit-note-body-query', uid, routerNoteId || null],
    queryFn: () => getNoteBodyQuery(routerNoteId!),
    enabled: !!uid && !!routerNoteId,
    staleTime: 0,
  });

  const { mutate: updateNoteBody } = useMutation({
    mutationFn: async (noteBodyEvent: RichtextChangeEvent) => {
      if (!uid || !routerNoteId) return { routerNoteId: false };

      return updateNoteBodyMutation(routerNoteId, JSON.stringify(noteBodyEvent.value));
    },
    onSuccess: ({ routerNoteId }) => {
      console.log('unset header', routerNoteId);
      setHeaderMidComponent(null);
    },
  });

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const setHeaderMidComponentThrottled = useCallback(
    throttle(() => setHeaderMidComponent(() => <Loader view='fit-parent' iconSize='56px' />), 5000),
    [],
  );
  const updateNoteBodyDebounced = useCallback(debounce(updateNoteBody, 5000), []); //eslint-disable-line react-hooks/exhaustive-deps

  const onRichTextChange = useCallback((richTextEvent: RichtextChangeEvent) => {
    console.log('onRichTextChange', richTextEvent.value);
    setHeaderMidComponentThrottled();
    updateNoteBodyDebounced(richTextEvent);
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
          No note selected
        </Typography>
      )}
    </NotesContainer>
  );
});

export { Notes };
