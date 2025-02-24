import React, { FC, useCallback, memo, useState, useEffect } from 'react';

import { Corners } from '@launch-ui/shape';
import { RichTextField, type RichtextChangeEvent } from '@launch-ui/richtext';

import { NotesContainer, RichTextContainer } from './notes.styled';
import { INIT_CONTENT } from './constants';

import 'tabulator-tables/dist/css/tabulator.min.css';

const Notes: FC = memo(() => {
  const [pageOutletHeight, setPageOutletHeight] = useState<number>(0);

  const onWindowResize = useCallback(() => setPageOutletHeight(window.innerHeight - 168 - 56), []);
  useEffect(() => {
    onWindowResize();

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  const onRichTextChange = useCallback((e: RichtextChangeEvent) => {
    console.log('onRichTextChange', e.value);
  }, []);

  return (
    <NotesContainer data-notes-container height={pageOutletHeight}>
      <Corners borderRadius={24} />

      <RichTextContainer>
        <RichTextField maxHeight={pageOutletHeight - 32} initialValue={INIT_CONTENT} onChange={onRichTextChange} />
      </RichTextContainer>
    </NotesContainer>
  );
});

export { Notes };
