import React, { FC } from 'react';

import { useUnit as useEffectorUnit } from 'effector-react';
import { useMatch } from 'react-router-dom';

import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import { NotesSelector } from './NotesSelector';
import { AsideHeader, AsideRoutesList, AsideStyled, RouteLinkStyled } from './aside.styled';

import { $appStore } from '@src/entities/app';

import { useThemeToCssv } from '@src/hooks/useThemeToCssv';

//@ts-expect-error
import HomeIcon from '@src/assets/svg/home.svg';
//@ts-expect-error
import GoogleIcon from '@src/assets/svg/google.svg';
//@ts-expect-error
import StarIcon from '@src/assets/svg/star.svg';

export const Aside: FC = () => {
  const { isAsideOpen } = useEffectorUnit($appStore);

  const { pageRef } = useThemeToCssv();

  const notesRouteMatch = useMatch('/notes');

  return (
    <AsideStyled isAsideOpen={isAsideOpen} ref={pageRef}>
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

        {notesRouteMatch && <NotesSelector />}

        <RouteLinkStyled
          to='https://google.com'
          target='_blank'
          // className={(({ isActive }) => (isActive ? 'active-route' : '')) as NavLinkProps['className']}
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
