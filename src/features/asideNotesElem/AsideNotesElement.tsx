import React, { FC, useEffect, useState, memo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import { keys } from 'lodash';
import cn from 'classnames';

import { Dropable } from '@launch-ui/dropable';
import { Hierarchy } from '@launch-ui/hierarchy';
import { ButtonGhost, Button } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';

import { useDropable } from '@src/hooks/useDropable';

import {
  getUserSpacesQuery,
  getSpaceUnitsQuery,
  updateLastViewedSpace,
  LaunchSpaceProps,
  MAX_SPACES_PER_USER,
} from '@src/entities/space';

import { $userStore } from '@src/entities/user';

import { Loader } from '@src/features/loader';

import { USER_SPACES_QUERY, SPACE_UNITS_QUERY } from '@src/shared/queryKeys';

import { AsideNotesElementStyled } from './AsideNotesElement.styled';

import PlusIcon from '@src/assets/svg/plus.svg';
import AddIcon from '@src/assets/svg/add.svg';

type CreateParamType = 'space' | 'note';

import FolderIcon from '@src/assets/svg/folder.svg';

const AsideNotesElement: FC<{ uid: string }> = memo(({ uid }) => {
  const { createPageType } = useParams<{
    noteId?: string;
    createPageType?: CreateParamType;
  }>();

  const { lastViewedSpace, spaces: spaceIdList = [] } = useEffectorUnit($userStore);

  const [showCreateSapceButtonLoader, setShowCreateSapceButtonLoader] = useState(false);
  const [isCreateSpaceButton, setIsCreateSpaceButton] = useState<boolean>(false);

  const [selectedSpace, setSelectedSpace] = useState<LaunchSpaceProps | null>(null);

  const navigate = useNavigate();

  const { data: userSpaces = [] } = useQuery({
    queryKey: [USER_SPACES_QUERY, spaceIdList],
    queryFn: () => getUserSpacesQuery(spaceIdList),
  });

  const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!!userSpaces?.length) {
      setShowCreateSapceButtonLoader(false);
      setIsCreateSpaceButton(false);

      if (timeoutId.current) {
        clearTimeout(timeoutId.current);
        timeoutId.current = null;
      }

      return;
    } else {
      setShowCreateSapceButtonLoader(true);
      setIsCreateSpaceButton(true);
    }

    timeoutId.current = setTimeout(() => {
      setShowCreateSapceButtonLoader(false);
      setIsCreateSpaceButton(true);
    }, 4000);
  }, [userSpaces]);

  const { data: rootItems = [], isLoading: isRootItemsLoading } = useQuery({
    queryKey: [SPACE_UNITS_QUERY, selectedSpace?.spaceCode || null],
    queryFn: () => getSpaceUnitsQuery(keys(selectedSpace?.hierarchy)),
    enabled: !!selectedSpace?.hierarchy,
  });

  useEffect(() => {
    setSelectedSpace(userSpaces?.find((sp) => sp.spaceCode === lastViewedSpace) || userSpaces?.[0] || null);
  }, [userSpaces, lastViewedSpace]);

  const {
    isOpen: isSpaceSelectorOpen = false,
    closeDropdown: closeSpaceSelector,
    ...restSpaceSelector
  } = useDropable();

  // const isSpaceListLoading = showCreateSapceButtonLoader || isUserSpacesLoading;

  return (
    <AsideNotesElementStyled data-aside-notes-element>
      {showCreateSapceButtonLoader && (
        <div className='selector-loader-dummy'>
          <Corners borderRadius={24} />
          <Loader />
        </div>
      )}

      {!showCreateSapceButtonLoader && !userSpaces.length && isCreateSpaceButton && (
        <Button
          active={createPageType === 'space'}
          disabled={!userSpaces}
          IconLeft={() => <PlusIcon />}
          title={!userSpaces ? 'Wait...' : 'Create LaunchSpace'}
          onClick={() => navigate('/notes/create/space')}
          className={cn('create-space-button', {
            ['create-space-button_active']: createPageType === 'space',
          })}
        />
      )}

      {!showCreateSapceButtonLoader && !!userSpaces.length && (
        <>
          <div className='space-elements'>
            <Dropable
              {...restSpaceSelector}
              maxHeight={320}
              maxWidth={320}
              minWidth={320}
              offset={[0, 16]}
              openNode={
                <Button
                  IconLeft={() => <FolderIcon />}
                  title={userSpaces.find((sps) => sps.spaceCode === selectedSpace?.spaceCode)?.name}
                  active={isSpaceSelectorOpen}
                  className={cn('open-spaces-button', {
                    ['open-spaces-button_active']: isSpaceSelectorOpen,
                  })}
                />
              }
            >
              {userSpaces.map((userSpace) => (
                <ButtonGhost
                  LeftIcon={() => <FolderIcon />}
                  key={userSpace.spaceCode}
                  height={32}
                  title={userSpace.name}
                  onClick={() => {
                    setSelectedSpace(userSpace);
                    updateLastViewedSpace(uid!, userSpace.spaceCode);
                    closeSpaceSelector?.();
                  }}
                />
              ))}
            </Dropable>

            {userSpaces.length < MAX_SPACES_PER_USER && (
              <Button
                IconLeft={() => <AddIcon />}
                onClick={() => navigate('/notes/create/space')}
                active={createPageType === 'space'}
                className={cn('hierarchy-create-space-button', {
                  ['hierarchy-create-space-button_active']: createPageType === 'space',
                })}
              />
            )}
          </div>

          {selectedSpace?.hierarchy && (
            <>
              <div className='unit-list' data-aside-notes-element-unit-list>
                {isRootItemsLoading && (
                  <div className='unit-loader-dummy'>
                    <Loader />
                  </div>
                )}

                <Hierarchy
                  queryKey={SPACE_UNITS_QUERY}
                  rootItems={rootItems}
                  ItemLoader={() => <Loader />}
                  getItemsQuery={getSpaceUnitsQuery}
                  linkPattern={(item: { code: string }) => `/notes/${item.code}`}
                  matchRoutePattern={() => `/notes/:noteId`}
                />
              </div>

              {!isRootItemsLoading && (
                <div className='hierarchy-create-note'>
                  <Button
                    title='Create note'
                    onClick={() => navigate('/notes/create/note')}
                    active={createPageType === 'note'}
                    IconLeft={() => <AddIcon />}
                    className={cn('hierarchy-create-note-button', {
                      ['hierarchy-create-note-button_active']: createPageType === 'note',
                    })}
                  />
                </div>
              )}
            </>
          )}
        </>
      )}
    </AsideNotesElementStyled>
  );
});

export { AsideNotesElement };
