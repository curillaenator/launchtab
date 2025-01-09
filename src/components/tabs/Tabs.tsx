import React, { FC, useCallback } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import styled from 'styled-components';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import { Button } from '@launch-ui/button';
// import { ContextMenu } from '@launch-ui/context-menu';
import { Create } from '@src/components/create';

import { $bookmarksStore, setCurrentTab } from '@src/entities/bookmarks';

// import { getContextMenuItems } from './helpers';

//@ts-expect-error
import HomeIcon from '@src/assets/svg/home.svg';

//@ts-expect-error
const SortableListStyled = styled(SortableList)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3.5rem;
`;

export const Tabs: FC = () => {
  const { tabs, currentTab } = useEffectorUnit($bookmarksStore);

  const sortablePages = tabs.filter((...[, i]) => i !== 0);

  const onSortEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      const sortedKnobs = arrayMoveImmutable([...sortablePages], oldIndex, newIndex);

      // dispatch(updatePagesOrder([pages[0], ...sortedKnobs]));
    },
    [tabs, sortablePages],
  );

  if (!tabs.length) return null;

  return (
    <SortableListStyled onSortEnd={onSortEnd}>
      <Button IconLeft={HomeIcon} title='Home' active={currentTab === 'Home'} onClick={() => setCurrentTab('home')} />

      {sortablePages.map(({ name }, i) => (
        <SortableItem key={`${name}${i}`}>
          {/* <div> */}
          {/* <ContextMenu items={getContextMenuItems(knob, dispatch)}> */}
          <Button title={name} active={name === currentTab} onClick={() => setCurrentTab(name)} />
          {/* </ContextMenu> */}
          {/* </div> */}
        </SortableItem>
      ))}

      <Create create='new-page' />
    </SortableListStyled>
  );
};
