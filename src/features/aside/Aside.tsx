import React, { FC, memo } from 'react';

import { useUnit as useEffectorUnit } from 'effector-react';

import { Corners } from '@launch-ui/shape';
import { Typography } from '@launch-ui/typography';

import { AsideNotesElement } from '../asideNotesElem';
import { AsideHeader, AsideRoutesList, AsideStyled, RouteLinkStyled, RouteDivider } from './aside.styled';

import { $appStore } from '@src/entities/app';
import { $userStore } from '@src/entities/user';

import { LAUNCH_PAPER_BDRS } from '@src/shared/appConfig';

import HomeIcon from '@src/assets/svg/home.svg';
import NotesIcon from '@src/assets/svg/document.svg';
// import GoogleIcon from '@src/assets/svg/google.svg';

export const Aside: FC = memo(() => {
  const { isAsideOpen } = useEffectorUnit($appStore);
  const { uid } = useEffectorUnit($userStore);

  return (
    <AsideStyled isAsideOpen={isAsideOpen}>
      <Corners borderRadius={LAUNCH_PAPER_BDRS} corners={['tr', 'br']} />

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

        <RouteDivider />

        {!!uid && (
          <>
            <RouteLinkStyled to='/notes'>
              <NotesIcon />

              <Typography as='span' type='RoundedBold20' className='typography'>
                Launch Notes
              </Typography>
            </RouteLinkStyled>

            <AsideNotesElement uid={uid} />
          </>
        )}

        {/* <RouteLinkStyled
          // to='https://google.com'
          // className={(({ isActive }) => (isActive ? 'active-route' : '')) as NavLinkProps['className']}
          to={PALETTE_ROUTE}
        >
          <GoogleIcon />

          <Typography as='span' type='RoundedBold20' className='typography'>
            Palette
          </Typography>
        </RouteLinkStyled> */}
      </AsideRoutesList>
    </AsideStyled>
  );
});
