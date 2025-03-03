import React, { FC, useEffect, useState, memo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';

import { Dropable } from '@launch-ui/dropable';
import { Hierarchy } from '@launch-ui/hierarchy';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';

import { useDropable } from '@src/hooks/useDropable';
import { useLayoutContext } from '@src/hooks/useLayoutContext';

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
import AddFolderIcon from '@src/assets/svg/addFolder.svg';
import AddDocumentIcon from '@src/assets/svg/addDocument.svg';

type CreateParamType = 'space' | 'note';

import FolderIcon from '@src/assets/svg/folder.svg';

const AsideNotesElement: FC<{ uid: string }> = memo(({ uid }) => {
  const { createPageType } = useParams<{
    noteId?: string;
    createPageType?: CreateParamType;
  }>();

  const { setCurrentSpaceId } = useLayoutContext();

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
    queryFn: () => getSpaceUnitsQuery(selectedSpace!.spaceCode, true),
    enabled: !!selectedSpace?.spaceCode,
  });

  useEffect(() => {
    const existinglastViewedSpace =
      userSpaces?.find((sp) => sp.spaceCode === lastViewedSpace) || userSpaces?.[0] || null;

    if (!!existinglastViewedSpace?.spaceCode) setCurrentSpaceId(existinglastViewedSpace.spaceCode);
    setSelectedSpace(existinglastViewedSpace);
  }, [userSpaces, lastViewedSpace, setCurrentSpaceId]);

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
          <Corners borderRadius={12} />
          <Loader />
        </div>
      )}

      {!showCreateSapceButtonLoader && !userSpaces.length && isCreateSpaceButton && (
        <ButtonAction
          active={createPageType === 'space'}
          appearance='secondary'
          disabled={!userSpaces}
          LeftIcon={() => <PlusIcon />}
          title={!userSpaces ? 'Wait...' : 'Create LaunchSpace'}
          onClick={() => navigate('/notes/create/space')}
          // className={cn('create-space-button', {
          //   ['create-space-button_active']: createPageType === 'space',
          // })}
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
              offset={[0, 8]}
              openNode={
                <ButtonAction
                  LeftIcon={() => <FolderIcon />}
                  title={userSpaces.find((sps) => sps.spaceCode === selectedSpace?.spaceCode)?.name}
                  active={isSpaceSelectorOpen}
                  appearance='secondary'
                  fullwidth
                  className='open-spaces-button'
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
                    setCurrentSpaceId(userSpace.spaceCode);
                    updateLastViewedSpace(uid!, userSpace.spaceCode);
                    closeSpaceSelector?.();
                  }}
                />
              ))}
            </Dropable>

            {/* {userSpaces.length < MAX_SPACES_PER_USER && ( */}
            <ButtonAction
              disabled={userSpaces.length >= MAX_SPACES_PER_USER}
              LeftIcon={() => <AddFolderIcon />}
              appearance='secondary'
              onClick={() => navigate('/notes/create/space')}
              active={createPageType === 'space'}
            />
            {/* )} */}

            <ButtonAction
              // fullwidth
              // title='Create note'
              // className='hierarchy-create-note-button'
              disabled={isRootItemsLoading}
              LeftIcon={() => <AddDocumentIcon />}
              appearance='secondary'
              onClick={() => navigate('/notes/create/note')}
              active={createPageType === 'note'}
            />
          </div>

          {selectedSpace?.hierarchy && (
            <>
              {isRootItemsLoading ? (
                <div className='unit-loader-dummy'>
                  <Loader />
                </div>
              ) : (
                <div className='unit-list' data-aside-notes-element-unit-list>
                  <Hierarchy
                    queryKey={SPACE_UNITS_QUERY}
                    rootItems={rootItems}
                    ItemLoader={() => <Loader />}
                    getItemsQuery={getSpaceUnitsQuery}
                    linkPattern={(item: { code: string }) => `/notes/${item.code}`}
                    matchRoutePattern={() => `/notes/:noteId`}
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
