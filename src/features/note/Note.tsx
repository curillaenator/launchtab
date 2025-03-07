import React, { FC, useCallback, useRef, useEffect } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useParams } from 'react-router-dom';

import { Corners } from '@launch-ui/shape';
import { Loader } from '@launch-ui/loader';
import { RichTextField, RichTextEditor, type RichtextChangeEvent } from '@launch-ui/richtext';

import { $userStore } from '@src/entities/user';
import { setHeaderMidComponent } from '@src/entities/header';

import {
  // query hooks
  useNoteUnitData,
  useNoteBodyData,
  useNoteBodyUpdate,
  // store handlers
  setIsNoteSaving,
  setSaveNoteHandler,
  setNoteLastInputTimestamp,
  // misc
  NOTE_DEBOUNCE_TIME,
  type NotesRouteParams,
} from '@src/entities/note';

import { useICan } from '@src/hooks/useICan';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import { NoteHeader } from './components/NoteHeader';
import { NoteContainer } from './note.styled';

import 'tabulator-tables/dist/css/tabulator.min.css';

const Note: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const currentEditorRef = useRef<RichTextEditor | null>(null);

  const { noteId: routerNoteId = null } = useParams<NotesRouteParams>();
  const { uid } = useEffectorUnit($userStore);

  const { data: noteUnit } = useNoteUnitData({ routerNoteId });
  const iCan = useICan();

  const { data: noteBody, isLoading: isNoteBodyLoading } = useNoteBodyData({ routerNoteId });

  const { mutate: updateNoteBody } = useNoteBodyUpdate({
    uid,
    routerNoteId,
    onSuccess: () => setIsNoteSaving(false),
  });

  const saveDelayTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const lastRichTextEvent = useRef<RichtextChangeEvent | null>(null);

  const updateNoteBodyImmidiate = useCallback(() => {
    if (saveDelayTimer.current) {
      clearTimeout(saveDelayTimer.current);
      saveDelayTimer.current = null;
    }

    if (lastRichTextEvent.current) {
      setIsNoteSaving(true);
      updateNoteBody(lastRichTextEvent.current);
    }
  }, [updateNoteBody]);

  const updateNoteBodyDebounced = useCallback(
    (richTextEvent: RichtextChangeEvent) => {
      if (saveDelayTimer.current) clearTimeout(saveDelayTimer.current);

      saveDelayTimer.current = setTimeout(() => {
        setIsNoteSaving(true);
        updateNoteBody(richTextEvent);
      }, NOTE_DEBOUNCE_TIME);
    },
    [updateNoteBody],
  );

  const onRichTextChange = useCallback((richTextEvent: RichtextChangeEvent) => {
    lastRichTextEvent.current = richTextEvent;

    setNoteLastInputTimestamp(Date.now() + NOTE_DEBOUNCE_TIME);
    updateNoteBodyDebounced(richTextEvent);
  }, []); //eslint-disable-line react-hooks/exhaustive-deps

  useEffect(
    () => () => {
      updateNoteBodyImmidiate();
    },
    [updateNoteBodyImmidiate],
  );

  // INJECT HEADER COMPONENT START
  useEffect(() => {
    setHeaderMidComponent(NoteHeader);
    setSaveNoteHandler(updateNoteBodyImmidiate);

    return () => {
      setHeaderMidComponent(null);
      setSaveNoteHandler(null);
    };
  }, [updateNoteBodyImmidiate]);
  //INJECT HEADER COMPONENT END

  return (
    <NoteContainer height={maxHeight}>
      <Corners borderRadius={LAUNCH_PAPER_BDRS} />

      {isNoteBodyLoading ? (
        <Loader view='fit-parent' iconSize='40px' />
      ) : (
        <RichTextField
          editable={iCan.edit(noteUnit) && !noteUnit?.locked}
          onEditorInstanceChange={(richTextEditor) => (currentEditorRef.current = richTextEditor)}
          maxHeight={maxHeight - 24}
          initialValue={noteBody || ''}
          onChange={onRichTextChange}
        />
      )}
    </NoteContainer>
  );
};

export { Note };
