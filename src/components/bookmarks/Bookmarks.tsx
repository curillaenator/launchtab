import React, { FC } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import { $bookmarksStore, reorderCards, BookmarkTabProps } from '@src/entities/bookmarks';
import { $userStore } from '@src/entities/user';

// import { ContextMenu } from '@launch-ui/context-menu';
import { Create } from '@src/components/create';
import { Card } from '@src/components/card/Card';
import { SortableListStyled, HoverWrapper } from './styles';

export const Bookmarks: FC = () => {
  const { uid } = useEffectorUnit($userStore);
  const { tabs, currentTab } = useEffectorUnit($bookmarksStore);

  const { name, pages: bookmarks } = (tabs.find((el) => el?.name === currentTab) || {}) as BookmarkTabProps;

  const onSortEnd = (oldIndex: number, newIndex: number) => {
    if (!uid) return;
    const reorderedCards = arrayMoveImmutable([...bookmarks], oldIndex, newIndex);
    reorderCards({ uid, tabs, tabName: name, reorderedCards });
  };

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
