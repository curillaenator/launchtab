import React, { FC, useCallback, memo, useState, useEffect, CSSProperties } from 'react';
import { useParams } from 'react-router-dom';
import styled from 'styled-components';

import { setAside } from '@src/entities/app';

import { Note, CreateSpace, CreateNote } from '@src/features/note';
import { NotesDashboard } from '@src/features/notesDashboard';

import 'tabulator-tables/dist/css/tabulator.min.css';

const NotesContainer = styled.div<{ height: CSSProperties['height'] }>`
  width: 100%;
  height: ${({ height }) => `${height}px` || 'fit-content'};
`;

type CreateParamType = 'space' | 'note';

const CREATE_COMPONENTS_ASSOC: Record<CreateParamType, FC> = {
  space: CreateSpace,
  note: CreateNote,
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

  if (!!createPageType) {
    const CreateMappedComponent = CREATE_COMPONENTS_ASSOC[createPageType];

    return (
      <NotesContainer data-notes-container height={pageOutletHeight}>
        <CreateMappedComponent />
      </NotesContainer>
    );
  }

  if (!routerNoteId)
    return (
      <NotesContainer data-notes-container height={pageOutletHeight}>
        <NotesDashboard maxHeight={pageOutletHeight} />
      </NotesContainer>
    );

  return (
    <NotesContainer data-notes-container height={pageOutletHeight}>
      <Note maxHeight={pageOutletHeight} />
    </NotesContainer>
  );
});

export { Notes };
