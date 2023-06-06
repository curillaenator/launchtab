import React, { FC } from 'react';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import styled from 'styled-components';

import { ContextMenu } from '../contextMenu/ContextMenu';
import { Create } from '../create';
import { Card } from '../card/Card';

import { useAppDispatch } from '../../hooks/hooks';

import { updateBookmarksOrder, deleteBookmark } from '../../redux/reducers/bookmarks';

import type { IBookmark } from '../../types/types';
import type { IMenuItem } from '../contextMenu/ContextMenu';

const SortableListStyled = styled(SortableList)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 0.75rem;
  /* margin-bottom: 7.25rem; */

  .create {
    display: flex;
    justify-content: center;
    align-items: center;
    min-height: 186px;
    width: 100%;

    border-radius: 18px;
    border: 2px dashed ${({ theme }) => theme.modals.matte};
  }

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

  const getMenuItems = (bm: IBookmark): IMenuItem[] => {
    const contextMenuItems: IMenuItem[] = [
      {
        title: 'Edit',
        handler: () => {},
      },
      {
        title: 'Delete',
        danger: true,
        handler: () => dispatch(deleteBookmark(bm.name, bm.id)),
      },
    ];

    return contextMenuItems;
  };

  return (
    <SortableListStyled onSortEnd={onSortEnd}>
      {bookmarks.map((bookmark, i) => {
        return (
          <SortableItem key={`${curPage}${i}`}>
            <HoverWrapper>
              <ContextMenu items={getMenuItems(bookmark)}>
                <Card bookmark={bookmark} />
              </ContextMenu>
            </HoverWrapper>
          </SortableItem>
        );
      })}

      <div className='create'>
        <Create create='new-bookmark' iconName='addBigIcon' />
      </div>
    </SortableListStyled>
  );
};
