import React, { FC, useCallback, useMemo } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import styled from 'styled-components';
import SortableList, { SortableItem } from 'react-easy-sort';
import { arrayMoveImmutable } from 'array-move';

import { Button } from '@launch-ui/button';
import { ContextMenu } from '@launch-ui/context-menu';
import { Create } from '@src/components/create';

import { $userStore } from '@src/entities/user';
import { $bookmarksStore, setCurrentTab, setTabsWithDbUpdate, removeTab } from '@src/entities/bookmarks';

//@ts-expect-error
import HomeIcon from '@src/assets/svg/home.svg';

const SortableListStyled = styled(SortableList)`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 1rem;
  margin-bottom: 3.5rem;
`;

export const Tabs: FC = () => {
  const { uid } = useEffectorUnit($userStore);
  const { tabs = [], currentTab } = useEffectorUnit($bookmarksStore);

  const sortableTabs = useMemo(() => tabs.filter((...[, i]) => i !== 0), [tabs]);

  const onSortEnd = useCallback(
    (oldIndex: number, newIndex: number) => {
      if (!uid || !sortableTabs.length) return;

      const sortedTabs = arrayMoveImmutable([...sortableTabs], oldIndex, newIndex);
      setTabsWithDbUpdate({ uid, tabs: [tabs[0], ...sortedTabs], tabName: '' });
    },
    [tabs, sortableTabs, uid],
  );

  if (!tabs.length) return null;

  return (
    <SortableListStyled onSortEnd={onSortEnd}>
      <Button IconLeft={HomeIcon} title='Home' active={currentTab === 'Home'} onClick={() => setCurrentTab('Home')} />

      {sortableTabs.map(({ name }, i) => (
        <SortableItem key={`${name}${i}`}>
          <div>
            <ContextMenu
              items={[
                {
                  title: 'Delete',
                  danger: true,
                  handler: () => {
                    if (!uid) return;
                    removeTab({ uid, tabs, tabName: name });
                  },
                },
              ]}
            >
              <Button title={name} active={name === currentTab} onClick={() => setCurrentTab(name)} />
            </ContextMenu>
          </div>
        </SortableItem>
      ))}

      <Create create='new-page' />
    </SortableListStyled>
  );
};
