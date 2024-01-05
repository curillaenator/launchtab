import React, { FC } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import styled from 'styled-components';

import { ContextMenu } from '@launch-ui/context-menu';
import { Create } from '@src/components/create';
import { Card } from '@src/components/card/Card';

import { useAppDispatch } from '@src/hooks/hooks';

import { updateBookmarksOrder, deleteBookmark } from '@src/redux/reducers/bookmarks';

import type { IBookmark } from '@src/types/types';

const SortableListStyled = styled(SortableList)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 480px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 768px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1152px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1440px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1680px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (min-width: 2560px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const HoverWrapper = styled.div`
  &:hover {
    z-index: 20;
  }
`;

interface IBookmarks {
  curPage: string;
  bookmarks: IBookmark[];
}

export const Bookmarks: FC<IBookmarks> = ({ bookmarks, curPage }) => {
  const dispatch = useAppDispatch();

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    const updBookmarks = arrayMoveImmutable([...bookmarks], oldIndex, newIndex);
    dispatch(updateBookmarksOrder(updBookmarks));
  };

  return (
    <SortableListStyled onSortEnd={onSortEnd}>
      {bookmarks.map((bookmark, i) => (
        <SortableItem key={`${curPage}${i}`}>
          <HoverWrapper>
            <ContextMenu
              items={[
                {
                  title: 'Delete',
                  danger: true,
                  handler: () => dispatch(deleteBookmark(bookmark.name)),
                },
              ]}
            >
              <Card bookmark={bookmark} />
            </ContextMenu>
          </HoverWrapper>
        </SortableItem>
      ))}

      <Create create='new-bookmark' />
    </SortableListStyled>
  );
};
