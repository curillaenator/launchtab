import React, { FC } from 'react';
import styled from 'styled-components';

import { Typography } from '../../typography';

const FeatureListStyled = styled.div`
  display: flex;
  flex-direction: column;
  padding: 64px 0;
`;

interface IList {
  text: string;
  style?: string;
}

export interface IFeatureList {
  title: 'Free' | 'Pro';
  subtitle?: string;
  notion?: string;
  iconName?: string;
  featureList?: IList[];
  handler?: () => void;
}

export const FeatureList: FC<IFeatureList> = (props) => {
  const {
    title = '',
    subtitle = '',
    notion = '',
    // iconName,
    featureList = [],
    // handler,
  } = props;

  return (
    <FeatureListStyled>
      <Typography type='RoundedHeavy56' className='feature-title'>
        {title}
      </Typography>

      <Typography type='RoundedHeavy24' className='feature-subtitle'>
        {subtitle}
      </Typography>

      <Typography type='TextRegular12' className='feature-notion'>
        {notion}
      </Typography>

      {featureList.map((feature, i) => (
        <Typography type='RoundedBold14' className='feature-feature' key={feature.text + i}>
          {feature.text}
        </Typography>
      ))}
    </FeatureListStyled>
  );
};
