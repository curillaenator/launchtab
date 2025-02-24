import React, { FC, useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { Dropable } from '@launch-ui/dropable';
import { ButtonGhost, Button } from '@launch-ui/button';
import { Corners } from '@launch-ui/shape';

import { Loader } from '@src/features/loader';

import { getUserSpacesQuery, getSpaceUnitsQuery, LaunchSpaceProps } from '@src/entities/space';
import { $userStore } from '@src/entities/user';

import { useDropable } from '@src/hooks/useDropable';
import classNames from 'classnames';

const NotesSelectorStyled = styled.div`
  --dd-pd: 8px 8px;
  --dd-bdw: 1px;
  --dd-scrl-pd: 0;
  --dd-bdrs: 18px;

  --dd-bgc: var(--theme-backgrounds-lightest);
  --dd-bdc: var(--theme-backgrounds-dark);
  --dd-drop-sh: 0 0 0 0 transparent;

  width: 100%;
  min-height: 40px;
  padding: 32px 0;

  .open-spaces-button {
    width: 100%;
    justify-content: flex-start;

    &_inactive {
      --shp-bgc: var(--theme-backgrounds-lightest);
    }
  }

  .unit-list {
    margin-top: 32px;
    width: 100%;
    padding-left: 24px;
  }

  .selector-loader-dummy {
    --shp-bgc: ${({ theme }) => theme.backgrounds.lightest};
    --shp-bdc: transparent;

    // for corners
    position: relative;

    display: flex;
    align-items: center;
    justify-content: center;

    width: 100%;
    height: 56px;
    border-radius: calc(24px * 1.25 + 3px);

    background-color: ${({ theme }) => theme.backgrounds.lightest};
  }

  .unit-loader-dummy {
    display: flex;
    align-items: center;
    justify-content: center;

    margin-top: 32px;
    width: 100%;
    height: 40px;
  }
`;

const SpaceSelector: FC = () => {
  const { noteId: routerNoteId } = useParams<{ noteId?: string }>();

  const { uid, spaces: spaceIds = [] } = useEffectorUnit($userStore);

  const [selectedSpace, setSelectedSpace] = useState<LaunchSpaceProps | null>(null);

  const navigate = useNavigate();

  const { data: userSpaces, isLoading: isUserSpacesLoading } = useQuery({
    queryKey: ['user-spaces-query', spaceIds.join('-') || null],
    queryFn: () => getUserSpacesQuery(spaceIds),
    enabled: !!uid && !!spaceIds.length,
  });

  const { data: spaceUnits, isLoading: isSpaceUnitsLoading } = useQuery({
    queryKey: ['space-units-query', selectedSpace?.spaceCode || null],
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
    <NotesSelectorStyled>
      {isUserSpacesLoading ? (
        <div className='selector-loader-dummy'>
          <Corners borderRadius={24} />
          <Loader />
        </div>
      ) : (
        <Dropable
          {...restSpaceSelector}
          maxHeight={320}
          maxWidth={320}
          minWidth={320}
          offset={[0, 16]}
          openNode={
            <Button
              title={userSpaces?.find((sps) => sps.spaceCode === selectedSpace?.spaceCode)?.name}
              active={isSpaceSelectorOpen}
              className={classNames('open-spaces-button', {
                ['open-spaces-button_inactive']: !isSpaceSelectorOpen,
              })}
            />
          }
        >
          {(userSpaces || []).map((userSpace) => (
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
      )}

      {isSpaceUnitsLoading ? (
        <div className='unit-loader-dummy'>
          <Loader />
        </div>
      ) : spaceUnits?.length ? (
        <div className='unit-list'>
          {spaceUnits.map(({ unitCode, name: unitName }) => (
            <ButtonGhost
              key={unitCode}
              title={unitName}
              active={routerNoteId === unitCode}
              onClick={() => {
                navigate(`/notes/${unitCode}`);
              }}
            />
          ))}
        </div>
      ) : null}
    </NotesSelectorStyled>
  );
};

export { SpaceSelector };
