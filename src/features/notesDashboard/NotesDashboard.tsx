import React, { FC, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQuery } from '@tanstack/react-query';

import { Typography } from '@launch-ui/typography';
import { Corners } from '@launch-ui/shape';
import { Modal } from '@launch-ui/modal';

import { $userStore } from '@src/entities/user';
import { getUserSpacesQuery, LaunchSpaceProps } from '@src/entities/space';

import { USER_SPACES_QUERY } from '@src/shared/queryKeys';
import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import { DashCard } from './DashCard';
import { SetupSpace } from './SetupSpace';
import { NoteContainer } from './dashboard.styled';

const NotesDashboard: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const { spaces: spaceIdList = [] } = useEffectorUnit($userStore);

  const [spaceSetupOpen, setSpaceSetupOpen] = useState<boolean>(false);
  const [setupSpace, setSetupSpace] = useState<LaunchSpaceProps | null>(null);

  const { data: userSpaces = [] } = useQuery({
    queryKey: [USER_SPACES_QUERY, spaceIdList],
    queryFn: () => getUserSpacesQuery(spaceIdList),
  });

  console.log('userSpaces', userSpaces);

  return (
    <>
      <NoteContainer height={maxHeight}>
        <Corners borderRadius={LAUNCH_PAPER_BDRS} />

        <div className='dashboard-block'>
          <Typography as='span' type='RoundedHeavy24'>
            {'Notes '}
          </Typography>
          <Typography as='span' type='RoundedHeavy24' className='highlighted'>
            Spaces
          </Typography>
        </div>

        <div className='dashboard-block dashboard-block-grid'>
          {userSpaces.map((userSpace) => (
            <DashCard
              key={userSpace.spaceCode}
              title={userSpace.name}
              hierarchy={userSpace.hierarchy}
              onClick={() => {
                setSetupSpace(userSpace);
                setSpaceSetupOpen(true);
              }}
            />
          ))}
        </div>

        <div className='dashboard-block'>
          <Typography as='span' type='RoundedHeavy24'>
            {'Last viewed '}
          </Typography>
          <Typography as='span' type='RoundedHeavy24' className='highlighted'>
            Notes
          </Typography>
        </div>
      </NoteContainer>

      {!!setupSpace && (
        <Modal
          open={spaceSetupOpen}
          onClose={() => {
            setSetupSpace(null);
            setSpaceSetupOpen(false);
          }}
        >
          <SetupSpace
            closePopup={() => {
              setSetupSpace(null);
              setSpaceSetupOpen(false);
            }}
            space={setupSpace}
          />
        </Modal>
      )}
    </>
  );
};

export { NotesDashboard };
