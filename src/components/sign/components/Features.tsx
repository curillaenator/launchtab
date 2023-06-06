import React, { FC } from 'react';
import styled from 'styled-components';

import { FeatureList } from './FeatureList';

import { featureLists } from './constants';

const FeaturesStyled = styled.div`
  display: flex;
`;

interface IFeatures {
  close: () => void;
}

export const Features: FC<IFeatures> = ({ close }) => {
  return (
    <FeaturesStyled>
      {featureLists.map((list) => (
        <FeatureList {...list} key={list.title} />
      ))}
    </FeaturesStyled>
  );
};
