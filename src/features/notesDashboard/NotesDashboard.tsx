import React, { FC, useState } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';

import { Typography } from '@launch-ui/typography';
import { Corners } from '@launch-ui/shape';
import { Modal } from '@launch-ui/modal';

import { $userStore } from '@src/entities/user';
import { LaunchSpaceProps, useSpaces } from '@src/entities/space';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import { DashCard } from './components/DashCard/DashCard';
import { SetupSpace } from './components/SetupSpace/SetupSpace';
import { NoteContainer } from './dashboard.styled';

const NotesDashboard: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  const { spaces: spaceIdList = [] } = useEffectorUnit($userStore);

  const [spaceSetupOpen, setSpaceSetupOpen] = useState<boolean>(false);
  const [setupSpace, setSetupSpace] = useState<LaunchSpaceProps | null>(null);

  const { data: userSpaces = [] } = useSpaces(spaceIdList);

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
              createdBy={userSpace.createdBy}
              onSetup={() => {
                setSetupSpace(userSpace);
                setSpaceSetupOpen(true);
              }}
            />
          ))}
        </div>

        {/* <div className='dashboard-block'>
          <Typography as='span' type='RoundedHeavy24'>
            {'Last viewed '}
          </Typography>
          <Typography as='span' type='RoundedHeavy24' className='highlighted'>
            Notes
          </Typography>
        </div> */}
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
