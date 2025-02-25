import React, { FC, memo } from 'react';

import { useUnit as useEffectorUnit } from 'effector-react';
import { useMatch } from 'react-router-dom';

import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import { AsideNotesElement } from '../asideNotesElem';
import { AsideHeader, AsideRoutesList, AsideStyled, RouteLinkStyled } from './aside.styled';

import { $appStore } from '@src/entities/app';
import { $userStore } from '@src/entities/user';

import { NOTES_ROUTE } from '@src/routes';
import HomeIcon from '@src/assets/svg/home.svg';
import StarIcon from '@src/assets/svg/star.svg';
// import GoogleIcon from '@src/assets/svg/google.svg';

export const Aside: FC = memo(() => {
  const { isAsideOpen } = useEffectorUnit($appStore);
  const { uid } = useEffectorUnit($userStore);

  const notesRouteMatch = useMatch(NOTES_ROUTE);

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

        {!!uid && (
          <>
            <RouteLinkStyled to='/notes'>
              <StarIcon />

              <Typography as='span' type='RoundedBold20' className='typography'>
                Notes
              </Typography>
            </RouteLinkStyled>

            {notesRouteMatch && <AsideNotesElement />}
          </>
        )}

        {/* <RouteLinkStyled
          to='https://google.com'
          target='_blank'
          // className={(({ isActive }) => (isActive ? 'active-route' : '')) as NavLinkProps['className']}
        >
          <GoogleIcon />

          <Typography as='span' type='RoundedBold20' className='typography'>
            Google
          </Typography>
        </RouteLinkStyled> */}
      </AsideRoutesList>
    </AsideStyled>
  );
});
