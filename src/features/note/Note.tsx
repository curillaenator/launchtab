import React, { FC, useCallback, useEffect, useRef } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useParams } from 'react-router-dom';
import { debounce, throttle } from 'lodash';

import { Corners } from '@launch-ui/shape';
import { RichTextField, RichTextEditor, type RichtextChangeEvent } from '@launch-ui/richtext';

import { $userStore } from '@src/entities/user';
import { setHeaderMidComponent } from '@src/entities/header';
import { useNoteBodyData, useNoteBodyUpdate, NOTE_DEBOUNCE_TIME } from '@src/entities/note';

import { Loader } from '@src/features/loader';
import { NoteContainer } from './note.styled';

import 'tabulator-tables/dist/css/tabulator.min.css';

type CreateParamType = 'space' | 'note';

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

  const editorRef = useRef<RichTextEditor | null>(null);

  useEffect(
    () => () => {
      if (editorRef.current) editorRef.current.commands.clearContent();
    },
    [],
  );

  return (
    <NoteContainer height={maxHeight}>
      <Corners borderRadius={24} />

      {isNoteBodyLoading ? (
        <Loader view='fit-parent' iconSize='56px' />
      ) : (
        <RichTextField
          onEditorInstanceChange={(richTextEditor) => (editorRef.current = richTextEditor)}
          maxHeight={maxHeight - 32}
          initialValue={noteBody || ''}
          onChange={onRichTextChange}
        />
      )}
    </NoteContainer>
  );
};

export { Note };
