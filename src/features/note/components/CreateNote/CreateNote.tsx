import React, { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { useUnit as UseEffectorUnit } from 'effector-react';
import { debounce, keys, toPairs } from 'lodash';
import { useQueryClient } from '@tanstack/react-query';

import { Corners } from '@launch-ui/shape';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { RichTextField, type RichtextChangeEvent, type RichTextJsonContent } from '@launch-ui/richtext';
import { Typography } from '@launch-ui/typography';

import { $userStore } from '@src/entities/user';
import { setHeaderMidComponent } from '@src/entities/header';
import { type LaunchUnitProps, useNoteCreate } from '@src/entities/note';

import { useLayoutContext } from '@src/hooks/useLayoutContext';

import { CreateNoteHeader } from './CreateNoteHeader';
import { CreateNoteForm } from './createNote.styled';

import { USER_SPACES_QUERY } from '@src/shared/queryKeys';

type NoteFormFields = LaunchUnitProps & { noteBody: RichTextJsonContent | string };

const CreateNote: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const qc = useQueryClient();
  const navigate = useNavigate();

  const { uid, spaces: spaceIdList } = UseEffectorUnit($userStore);
  const { currentSpaceRef } = useLayoutContext();

  const { mutate: submitNote, isPending: isNoteSubmitting } = useNoteCreate({
    uid: uid!,
    parentUnitId: '',
    // TODO: add nested notes
    parentSpaceId: currentSpaceRef.current?.spaceCode,
    onSuccess: ({ createdUnitId }) => {
      qc.invalidateQueries({ queryKey: [USER_SPACES_QUERY, spaceIdList] });
      navigate(`/notes/${createdUnitId}`);
    },
  });

  const {
    // control,
    register,
    // reset,
    setValue,
    // getValues,
    // watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<NoteFormFields>({ defaultValues: { name: '', noteBody: '' } });

  useEffect(() => {
    setHeaderMidComponent(() => <CreateNoteHeader register={register} isSubmitting={isNoteSubmitting} />);

    return () => {
      setHeaderMidComponent(null);
    };
  }, [register, isNoteSubmitting]);

  //eslint-disable-next-line react-hooks/exhaustive-deps
  const setFormValueDebounced = useCallback(
    debounce((richTextEvent: RichtextChangeEvent) => {
      setValue('noteBody', richTextEvent.value, { shouldDirty: true, shouldTouch: true });
    }, 200),
    [setValue],
  );

  const onRichTextChange = useCallback(
    (richTextEvent: RichtextChangeEvent) => {
      setFormValueDebounced(richTextEvent);
    },
    [setFormValueDebounced],
  );

  return (
    <CreateNoteForm
      data-create-note-form
      onSubmit={handleSubmit((formData: NoteFormFields) => submitNote({ formData }))}
    >
      <Corners borderRadius={24} />

      <RichTextField
        // onEditorInstanceChange={(richTextEditor) => (currentEditorRef.current = richTextEditor)}
        maxHeight={maxHeight - 64 - 40}
        initialValue={''}
        onChange={onRichTextChange}
      />

      <div className='create-note-form-field-controls'>
        <ButtonAction
          disabled={isNoteSubmitting || !keys(dirtyFields).length || !!keys(errors).length}
          type='submit'
          title='Create note'
        />

        <ButtonGhost type='button' title='Cancel' onClick={() => navigate('/notes')} />

        {!!keys(errors).length && (
          <span className='create-note-form-errors'>
            {toPairs(errors).map(([fieldName, { message }]) => (
              <Typography type='RoundedMedium16' key={`${fieldName}-${message}`}>
                {(message as string) || ''}
              </Typography>
            ))}
          </span>
        )}
      </div>
    </CreateNoteForm>
  );
};

export { CreateNote };
