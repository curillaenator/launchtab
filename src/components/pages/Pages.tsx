import React, { FC, useCallback, useMemo } from 'react';
import styled from 'styled-components';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import { useAppDispatch } from '../../hooks/hooks';

import { Button } from '../buttons';
import { Create } from '../create';
import { ContextMenu } from '../contextMenu/ContextMenu';

import { setCurPage, updatePagesOrder } from '../../redux/reducers/bookmarks';

import { getContextMenuItems } from './helpers';

const SortableListStyled = styled(SortableList)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3.5rem;
`;

interface IPages {
  pages: string[];
  curPage: string;
}

const PagesJSX: FC<IPages> = ({ pages, curPage }) => {
  const dispatch = useAppDispatch();

  const sortablePages = useMemo(() => pages.filter((...[, i]) => i !== 0), [pages]);

  const onSortEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const sortedKnobs = arrayMoveImmutable([...sortablePages], oldIndex, newIndex);

      dispatch(updatePagesOrder([pages[0], ...sortedKnobs]));
    },
    [pages, dispatch, sortablePages],
  );

  return (
    <SortableListStyled onSortEnd={onSortEnd}>
      <Button title='Home' active={pages[0] === curPage} onClick={() => dispatch(setCurPage(pages[0]))} />

      {sortablePages.map((knob, i) => {
        return (
          <SortableItem key={`${knob}${i}`}>
            <div>
              <ContextMenu items={getContextMenuItems(knob, dispatch)}>
                <Button title={knob} active={knob === curPage} onClick={() => dispatch(setCurPage(knob))} />
              </ContextMenu>
            </div>
          </SortableItem>
        );
      })}

      <Create create='new-page' />
    </SortableListStyled>
  );
};

export const Pages = React.memo(PagesJSX);
