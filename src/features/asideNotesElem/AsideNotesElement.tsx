import React, { FC, useEffect, useState, memo, useRef } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import { keys } from 'lodash';

import { Dropable } from '@launch-ui/dropable';
import { Hierarchy, type HierarchyState } from '@launch-ui/hierarchy';
import { ButtonGhost, ButtonAction } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';
import { Loader } from '@launch-ui/loader';

import { useDropable } from '@src/hooks/useDropable';
import { useLayoutContext } from '@src/hooks/useLayoutContext';

import { getUserSpacesQuery, updateLastViewedSpace, LaunchSpaceProps } from '@src/entities/space';

import { $userStore } from '@src/entities/user';
import { getNoteUnitQuery } from '@src/entities/note';

import { MAX_SPACES_PER_USER, MAX_UNITS_PER_SPACE } from '@src/shared/appConfig';
import { USER_SPACES_QUERY, UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';

import { AsideNotesElementStyled } from './AsideNotesElement.styled';

import AddFolderIcon from '@src/assets/svg/addFolder.svg';
import AddDocumentIcon from '@src/assets/svg/addDocument.svg';

type CreateParamType = 'space' | 'note';

import FolderIcon from '@src/assets/svg/folder.svg';

const AsideNotesElement: FC<{ uid: string }> = memo(({ uid }) => {
  const { createPageType } = useParams<{
    noteId?: string;
    createPageType?: CreateParamType;
  }>();

  const spacesLastHierarchyStores = useRef<Record<string, HierarchyState>>({});

  const { currentSpaceRef, setCurrentSpaceRef } = useLayoutContext();

  const {
    // lastViewedSpace,
    spaces: spaceIdList = [],
  } = useEffectorUnit($userStore);

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

  useEffect(() => {
    const existinglastViewedSpace =
      userSpaces?.find(
        (sp) => sp.spaceCode === currentSpaceRef.current?.spaceCode, // || sp.spaceCode === lastViewedSpace,
      ) ||
      userSpaces?.[0] ||
      null;

    if (!!existinglastViewedSpace?.spaceCode) {
      setCurrentSpaceRef(existinglastViewedSpace);
      setSelectedSpace(existinglastViewedSpace);
    }
  }, [userSpaces, setCurrentSpaceRef, currentSpaceRef]);

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
          <Corners borderRadius={10} />
          <Loader iconSize='24px' />
        </div>
      )}

      {!showCreateSapceButtonLoader && !userSpaces.length && isCreateSpaceButton && (
        <ButtonAction
          active={createPageType === 'space'}
          appearance='secondary'
          disabled={!userSpaces}
          LeftIcon={() => <AddFolderIcon />}
          title={!userSpaces ? 'Wait...' : 'Create LaunchSpace'}
          onClick={() => navigate('/notes/create/space')}
          fullwidth
          className='create-space-button'
        />
      )}

      {!showCreateSapceButtonLoader && !!userSpaces.length && (
        <>
          <div className='space-elements'>
            <Dropable
              {...restSpaceSelector}
              maxWidth={328}
              minWidth={328}
              offset={[0, 4]}
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
                    setCurrentSpaceRef(userSpace);
                    updateLastViewedSpace(uid!, userSpace.spaceCode);
                    closeSpaceSelector?.();
                  }}
                />
              ))}
            </Dropable>

            <ButtonAction
              disabled={userSpaces.length >= MAX_SPACES_PER_USER}
              LeftIcon={() => <AddFolderIcon />}
              appearance='secondary'
              onClick={() => navigate('/notes/create/space')}
              active={createPageType === 'space'}
            />

            <ButtonAction
              disabled={keys(selectedSpace?.hierarchy).length >= MAX_UNITS_PER_SPACE}
              LeftIcon={() => <AddDocumentIcon />}
              appearance='secondary'
              onClick={() => navigate('/notes/create/note')}
              active={createPageType === 'note'}
            />
          </div>

          {!!selectedSpace?.hierarchy ? (
            <div className='unit-list'>
              <Hierarchy
                queryKey={UNIT_NOTE_UNIT_QUERY}
                storeStatesCache={spacesLastHierarchyStores}
                rootId={selectedSpace.spaceCode}
                rootItemsIds={selectedSpace.hierarchy}
                linkPattern={(item: { code: string }) => `/notes/${item.code}`}
                matchRoutePattern={() => `/notes/:noteId`}
                getItemQuery={getNoteUnitQuery}
                onRootIdsChange={(rootId, store) => (spacesLastHierarchyStores.current[rootId] = store)}
                ItemLoader={() => <Loader iconSize='24px' iconPadding='4px' />}
              />
            </div>
          ) : (
            <div className='unit-list_empty'>
              <span>No notes yet</span>
            </div>
          )}
        </>
      )}
    </AsideNotesElementStyled>
  );
});

export { AsideNotesElement };
