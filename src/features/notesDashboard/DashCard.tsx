import React, { FC, HTMLAttributes } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { useQueryClient } from '@tanstack/react-query';
import styled from 'styled-components';
import { keys } from 'lodash';

import { Corners } from '@launch-ui/shape';
import { ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';

import { $userStore } from '@src/entities/user';
import { LaunchUnitProps } from '@src/entities/note';

import { UNIT_NOTE_UNIT_QUERY } from '@src/shared/queryKeys';
import { LAUNCH_CARD_BDRS } from '@src/shared/appConfig';

import SetupIcon from '@src/assets/svg/switches.svg';

const Card = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.light};
  --shp-bdc: transparent;

  position: relative;
  border-radius: calc(${LAUNCH_CARD_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.light};
  padding: 24px;
`;

const CardContent = styled.div`
  width: 100%;

  ul[data-space-child-units] {
    list-style: none;
    /* padding: 0; 
    margin: 0; */
  }

  .card-content-top {
    display: flex;
    gap: 16px;
    width: 100%;

    & > h3 {
      width: 100%;
      flex: 1 1 auto;
      padding: 8px 0%;
    }
  }
`;

interface DashCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  hierarchy: LaunchUnitProps['hierarchy'];
  createdBy: string;
  onSetup: () => void;
}

const DashCard: FC<DashCardProps> = (props) => {
  const { title, hierarchy, onSetup, createdBy, ...restDiv } = props;

  const { uid } = useEffectorUnit($userStore);

  const qc = useQueryClient();

  const childUnits = keys(hierarchy);

  const iCanSetup = uid === createdBy;

  return (
    <Card {...restDiv} data-space-card={title}>
      <Corners borderRadius={LAUNCH_CARD_BDRS} />

      <CardContent>
        <div className='card-content-top'>
          <Typography as='h3' type='RoundedBold20' className='card-content-title'>
            {title}
          </Typography>

          {iCanSetup && <ButtonGhost title='Setup' RightIcon={() => <SetupIcon />} onClick={onSetup} />}
        </div>

        <ul data-space-child-units>
          {childUnits.map((childUnitId) => {
            const childUnitData = qc.getQueryData([UNIT_NOTE_UNIT_QUERY, childUnitId]) as LaunchUnitProps | null;

            if (!childUnitData) return null;

            return (
              <li key={childUnitId}>
                <Typography color='var(--theme-texts-placeholder)' type='TextRegular16'>
                  {childUnitData.name}
                </Typography>
              </li>
            );
          })}
        </ul>
      </CardContent>
    </Card>
  );
};

export { DashCard };
