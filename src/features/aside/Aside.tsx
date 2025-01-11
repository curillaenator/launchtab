import React, { FC } from 'react';
import type { NavLinkProps } from 'react-router-dom';
import { useUnit as useEffectorUnit } from 'effector-react';

import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';
import { AsideHeader, AsideRoutesList, AsideStyled, RouteLinkStyled } from './aside.styled';

import { $appStore } from '@src/entities/app';

//@ts-expect-error
import HomeIcon from '@src/assets/svg/home.svg';
//@ts-expect-error
import GoogleIcon from '@src/assets/svg/google.svg';
//@ts-expect-error
import StarIcon from '@src/assets/svg/star.svg';

export const Aside: FC = () => {
  const { isAsideOpen } = useEffectorUnit($appStore);

  return (
    <AsideStyled isAsideOpen={isAsideOpen}>
      <Corners borderRadius={24} corners={['tr', 'br']} />

      <AsideHeader>
        <Typography as='span' type='RoundedHeavy36'>
          Launch
        </Typography>

        <Typography as='span' type='RoundedHeavy36' className='highlighted'>
          Tabs
        </Typography>
      </AsideHeader>

      <AsideRoutesList>
        <RouteLinkStyled to='/' end>
          <HomeIcon />

          <Typography as='span' type='RoundedBold20' className='typography'>
            LaunchTabs
          </Typography>
        </RouteLinkStyled>

        <RouteLinkStyled to='/notes'>
          <StarIcon />

          <Typography as='span' type='RoundedBold20' className='typography'>
            Notes
          </Typography>
        </RouteLinkStyled>

        <RouteLinkStyled
          to='https://google.com'
          target='_blank'
          className={(({ isActive }) => (isActive ? 'active-route' : '')) as NavLinkProps['className']}
        >
          <GoogleIcon />

          <Typography as='span' type='RoundedBold20' className='typography'>
            Google
          </Typography>
        </RouteLinkStyled>
      </AsideRoutesList>
    </AsideStyled>
  );
};
