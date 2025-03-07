import React, { FC, HTMLAttributes } from 'react';
import styled from 'styled-components';
import { keys } from 'lodash';

import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import { LaunchUnitProps } from '@src/entities/note';

import { LAUNCH_CARD_BDRS } from '@src/shared/appConfig';

const Card = styled.div`
  --shp-bgc: ${({ theme }) => theme.backgrounds.light};
  --shp-bdc: transparent;

  cursor: pointer;

  position: relative;
  border-radius: calc(${LAUNCH_CARD_BDRS}px * 1.25 + 3px);
  background-color: ${({ theme }) => theme.backgrounds.light};
  padding: 24px;

  user-select: none;

  &:hover {
    --shp-bdc: ${({ theme }) => theme.primary[500]};

    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primary[500]};

    h3 {
      color: ${({ theme }) => theme.primary[500]};
    }
  }

  &:active {
    --shp-bdc: ${({ theme }) => theme.primary[800]};

    box-shadow: inset 0 0 0 1px ${({ theme }) => theme.primary[800]};

    h3 {
      color: ${({ theme }) => theme.primary[800]};
    }
  }
`;

interface DashCardProps extends HTMLAttributes<HTMLDivElement> {
  title: string;
  hierarchy: LaunchUnitProps['hierarchy'];
}

const DashCard: FC<DashCardProps> = (props) => {
  const { title, hierarchy, ...restDiv } = props;

  return (
    <Card {...restDiv}>
      <Corners borderRadius={LAUNCH_CARD_BDRS} stroke={1} />
      <Typography as='h3' type='RoundedBold20'>
        {title}
      </Typography>

      <Typography
        color='var(--theme-texts-placeholder)'
        type='TextRegular16'
      >{`includes ${keys(hierarchy).length} notes`}</Typography>
    </Card>
  );
};

export { DashCard };
