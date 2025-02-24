import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';

import { Dropable } from '@launch-ui/dropable';
import { ButtonGhost, Button } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';

import { useDropable } from '@src/hooks/useDropable';

import { getUserSpacesQuery, getSpaceUnitsQuery, LaunchSpaceProps, MAX_SPACES_PER_USER } from '@src/entities/space';
import { $userStore } from '@src/entities/user';

import { Loader } from '@src/features/loader';
import { NotesSelectorStyled } from './selector.styled';

// import FolderIcon from '@src/assets/svg/folder.svg';

const AsideNotesElement: FC = () => {
  const { noteId: routerNoteId } = useParams<{ noteId?: string }>();

  const { uid, spaces: spaceIds = [] } = useEffectorUnit($userStore);

  const [selectedSpace, setSelectedSpace] = useState<LaunchSpaceProps | null>(null);

  const navigate = useNavigate();

  const { data: userSpaces, isLoading: isUserSpacesLoading } = useQuery({
    queryKey: ['user-spaces-query', uid, spaceIds.join('-') || null],
    queryFn: () => getUserSpacesQuery(spaceIds),
    enabled: !!uid && !!spaceIds.length,
  });

  const { data: spaceUnits, isLoading: isSpaceUnitsLoading } = useQuery({
    queryKey: ['space-units-query', uid, selectedSpace?.spaceCode || null],
    queryFn: () => getSpaceUnitsQuery(selectedSpace!.units),
    enabled: !!uid && !!selectedSpace?.spaceCode && !!selectedSpace?.units?.length,
  });

  useEffect(() => {
    if (!!userSpaces?.length) setSelectedSpace(userSpaces[0]);
  }, [userSpaces]);

  const {
    isOpen: isSpaceSelectorOpen = false,
    closeDropdown: closeSpaceSelector,
    ...restSpaceSelector
  } = useDropable();

  return (
    <NotesSelectorStyled data-aside-notes-element>
      {isUserSpacesLoading ? (
        <div className='selector-loader-dummy'>
          <Corners borderRadius={24} />
          <Loader />
        </div>
      ) : userSpaces?.length ? (
        <Dropable
          {...restSpaceSelector}
          maxHeight={320}
          maxWidth={320}
          minWidth={320}
          offset={[0, 16]}
          openNode={
            <Button
              title={userSpaces?.find((sps) => sps.spaceCode === selectedSpace?.spaceCode)?.name || 'No spaces created'}
              active={isSpaceSelectorOpen}
              className={cn('open-spaces-button', {
                ['open-spaces-button_inactive']: !isSpaceSelectorOpen,
              })}
            />
          }
        >
          {userSpaces.map((userSpace) => (
            <ButtonGhost
              key={userSpace.spaceCode}
              height={32}
              title={userSpace.name}
              onClick={() => {
                setSelectedSpace(userSpace);
                closeSpaceSelector?.();
              }}
            />
          ))}
        </Dropable>
      ) : (
        <Button
          active
          disabled={(userSpaces?.length || 0) >= MAX_SPACES_PER_USER}
          className='create-space-button'
          title={
            (userSpaces?.length || 0) >= MAX_SPACES_PER_USER ? `${MAX_SPACES_PER_USER} spaces maximum` : 'Create space'
          }
        />
      )}

      {isSpaceUnitsLoading ? (
        <div className='unit-loader-dummy'>
          <Loader />
        </div>
      ) : spaceUnits?.length ? (
        <div className='unit-list' data-aside-notes-element-unit-list>
          {spaceUnits.map(({ unitCode, name: unitName }) => (
            <ButtonGhost
              key={unitCode}
              title={unitName}
              active={routerNoteId === unitCode}
              onClick={() => navigate(`/notes/${unitCode}`)}
            />
          ))}
        </div>
      ) : null}
    </NotesSelectorStyled>
  );
};

export { AsideNotesElement };
