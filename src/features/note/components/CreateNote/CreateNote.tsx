import React, { FC, useCallback, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { useNavigate } from 'react-router-dom';
import { debounce, keys, toPairs } from 'lodash';
// import { useQueryClient } from '@tanstack/react-query';
// import { useUnit as useEffectorUnit } from 'effector-react';

import { Corners } from '@launch-ui/shape';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { RichTextField, type RichtextChangeEvent, type RichTextJsonContent } from '@launch-ui/richtext';
import { Typography } from '@launch-ui/typography';

import { setHeaderMidComponent } from '@src/entities/header';
import type { LaunchNoteProps } from '@src/entities/note';

import { CreateNoteHeader } from './CreateNoteHeader';
import { CreateNoteForm } from './createNote.styled';

const CreateNote: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const navigate = useNavigate();

  const isSubmitting = true;

  const {
    // control,
    register,

    // reset,
    setValue,
    getValues,
    // watch,
    handleSubmit,
    formState: { errors, dirtyFields },
  } = useForm<LaunchNoteProps & { noteBody: RichTextJsonContent | string }>({
    defaultValues: { name: '', noteBody: '' },
  });

  useEffect(() => {
    setHeaderMidComponent(() => <CreateNoteHeader register={register} isSubmitting={isSubmitting} />);

    return () => {
      setHeaderMidComponent(null);
    };
  }, [register, isSubmitting]);

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
      onSubmit={handleSubmit((spaceData: LaunchNoteProps) => {
        console.log('data-create-note-form', spaceData, getValues('noteBody'));
      })}
    >
      <Corners borderRadius={24} />

      <RichTextField
        // onEditorInstanceChange={(richTextEditor) => (currentEditorRef.current = richTextEditor)}
        maxHeight={maxHeight - 64 - 40}
        initialValue={''}
        onChange={onRichTextChange}
      />

      <div className='create-note-form-field-controls'>
        <ButtonAction disabled={!keys(dirtyFields).length} type='submit' title='Create note' />
        <ButtonGhost type='button' title='Cancel' onClick={() => navigate('/notes')} />

        {!!keys(errors).length && (
          <span className='create-note-form-errors'>
            {toPairs(errors).map(([fieldName, { message }]) => (
              <Typography type='TextRegular12' key={`${fieldName}-${message}`}>
                {message || ''}
              </Typography>
            ))}
          </span>
        )}
      </div>
    </CreateNoteForm>
  );
};

export { CreateNote };
