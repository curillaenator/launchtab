import React, { FC } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';
import styled from 'styled-components';

import { $bookmarksStore, reorderCards, BookmarkTabProps } from '@src/entities/bookmarks';
import { $userStore } from '@src/entities/user';

// import { ContextMenu } from '@launch-ui/context-menu';
import { Create } from '@src/components/create';
import { Card } from '@src/components/card/Card';

//@ts-expect-error
const SortableListStyled = styled(SortableList)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 481px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1153px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1441px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1681px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1921px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (min-width: 2561px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const HoverWrapper = styled.div`
  &:hover {
    z-index: 20;
  }
`;

export const Bookmarks: FC = () => {
  const { uid } = useEffectorUnit($userStore);
  const { tabs, currentTab } = useEffectorUnit($bookmarksStore);

  const { name, pages: bookmarks } = (tabs.find((el) => el?.name === currentTab) || {}) as BookmarkTabProps;

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    if (!uid) return;
    const reorderedCards = arrayMoveImmutable([...bookmarks], oldIndex, newIndex);
    reorderCards({ uid, tabs, tabName: name, reorderedCards });
  };

  if (!bookmarks?.length) return null;

  return (
    <SortableListStyled onSortEnd={onSortEnd}>
      {bookmarks.map((card, i) => (
        <SortableItem key={`${card.name}${i}`}>
          <HoverWrapper>
            {/* <ContextMenu
              items={[
                {
                  title: 'Delete',
                  danger: true,
                  handler: () => dispatch(deleteBookmark(bookmark.name)),
                },
              ]}
            > */}
            <Card bookmark={card} />
            {/* </ContextMenu> */}
          </HoverWrapper>
        </SortableItem>
      ))}

      <Create create='new-bookmark' />
    </SortableListStyled>
  );
};
