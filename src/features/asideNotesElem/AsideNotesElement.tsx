import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import cn from 'classnames';

import { Dropable } from '@launch-ui/dropable';
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

import { NotesSelectorStyled } from './selector.styled';
import { PlusIcon } from './PlusIcon';

type CreateParamType = 'space' | 'note';

// import FolderIcon from '@src/assets/svg/folder.svg';

const AsideNotesElement: FC = () => {
  const { noteId: routerNoteId, createPageType } = useParams<{
    noteId?: string;
    createPageType?: CreateParamType;
  }>();

  const { uid, lastViewedSpace } = useEffectorUnit($userStore);

  const [selectedSpace, setSelectedSpace] = useState<LaunchSpaceProps | null>(null);

  const navigate = useNavigate();

  const { data: userSpaces, isLoading: isUserSpacesLoading } = useQuery({
    queryKey: [USER_SPACES_QUERY, uid],
    queryFn: () => getUserSpacesQuery(uid!),
    enabled: !!uid,
  });

  const { data: spaceUnits, isLoading: isSpaceUnitsLoading } = useQuery({
    queryKey: [SPACE_UNITS_QUERY, uid, selectedSpace?.spaceCode || null],
    queryFn: () => getSpaceUnitsQuery(selectedSpace!.units),
    enabled: !!uid && !!selectedSpace?.spaceCode,
  });

  useEffect(() => {
    if (!!userSpaces?.length)
      setSelectedSpace(userSpaces.find((sp) => sp.spaceCode === lastViewedSpace) || userSpaces[0]);
  }, [userSpaces, lastViewedSpace]);

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
      ) : !!userSpaces?.length ? (
        <div className='space-elements'>
          <Dropable
            {...restSpaceSelector}
            maxHeight={320}
            maxWidth={320}
            minWidth={320}
            offset={[0, 16]}
            openNode={
              <Button
                title={userSpaces.find((sps) => sps.spaceCode === selectedSpace?.spaceCode)?.name}
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
                  updateLastViewedSpace(uid!, userSpace.spaceCode);
                  closeSpaceSelector?.();
                }}
              />
            ))}
          </Dropable>

          <Button
            IconLeft={PlusIcon}
            onClick={() => {
              if ((userSpaces?.length || 0) < MAX_SPACES_PER_USER) return navigate('/notes/create/space');
              alert(`Space count is limited by ${MAX_SPACES_PER_USER}`);
            }}
          />
        </div>
      ) : (
        <Button
          active={createPageType === 'space'}
          title='Create LaunchSpace'
          onClick={() => navigate('/notes/create/space')}
          className={cn('create-space-button', {
            ['create-space-button_inactive']: createPageType !== 'space',
          })}
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
