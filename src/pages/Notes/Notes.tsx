import React, { FC, PropsWithChildren, useCallback } from 'react';
import styled from 'styled-components';

import { Corners } from '@launch-ui/shape';
import { RichTextField, type RichtextChangeEvent } from '@launch-ui/richtext';

import { useThemeToCssv } from '@src/hooks/useThemeToCssv';

import { INIT_CONTENT } from './constants';

import 'tabulator-tables/dist/css/tabulator.min.css';

const NotesStyled = styled.div`
  --dd-pd: 8px 8px;
  --dd-bdw: 1px;
  --dd-scrl-pd: 0 8px 0 0;
  --dd-bdrs: 6px;

  --dd-bgc: var(--theme-backgrounds-lightest);
  --dd-bdc: var(--theme-backgrounds-dark);
  --dd-drop-sh: 0 0 0 0 transparent;

  --shp-bgc: ${({ theme }) => theme.backgrounds.base};
  --shp-bdc: transparent;
  --form-bdrs: calc(24px * 1.25 + 3px);

  position: relative;

  width: 100%;
  height: fit-content;
  border-radius: var(--form-bdrs);
  background-color: ${({ theme }) => theme.backgrounds.base};
  padding: 32px 32px 0;
`;

const Notes: FC<PropsWithChildren> = () => {
  const { pageRef } = useThemeToCssv();

  const onRichTextChange = useCallback((e: RichtextChangeEvent) => {
    console.log('onRichTextChange', e.value);
  }, []);

  return (
    <NotesStyled ref={pageRef}>
      <Corners borderRadius={24} />

      <RichTextField
        maxHeight={window.innerHeight - 168 - 56 * 2 - 64 - 4}
        initialValue={INIT_CONTENT}
        onChange={onRichTextChange}
      />
    </NotesStyled>
  );
};

export { Notes };
