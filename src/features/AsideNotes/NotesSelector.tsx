import React, { FC, useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';
import styled from 'styled-components';

import { Dropable } from '@launch-ui/dropable';
import { ButtonGhost, Button } from '@launch-ui/button';

import { Loader } from '@src/features/loader';

import { getUserSpacesQuery, LaunchSpaceProps } from '@src/entities/space';
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
`;

const NotesSelector: FC = () => {
  const { uid, spaces: spaceIds } = useEffectorUnit($userStore);

  const [selectedSpace, setSelectedSpace] = useState<LaunchSpaceProps | null>(null);

  // const navigate = useNavigate();

  const { data: userSpaces, isLoading: isUserSpacesLoading } = useQuery({
    queryKey: ['user-spaces-query', spaceIds.join('-')],
    queryFn: () => getUserSpacesQuery(spaceIds),
    enabled: !!uid && !!spaceIds.length,
  });

  useEffect(() => {
    if (!!userSpaces?.length) setSelectedSpace(userSpaces[0]);
  }, [userSpaces]);

  const {
    isOpen: isSpaceSelectorOpen = false,
    closeDropdown: closeSpaceSelector,
    ...restSpaceSelector
  } = useDropable();

  if (isUserSpacesLoading || !userSpaces?.length)
    return (
      <NotesSelectorStyled>
        <Loader />
      </NotesSelectorStyled>
    );

  return (
    <NotesSelectorStyled>
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
            className={classNames('open-spaces-button', {
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
    </NotesSelectorStyled>
  );
};

export { NotesSelector };
