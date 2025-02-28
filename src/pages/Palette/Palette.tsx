import React, { FC, useEffect, useCallback, useState } from 'react';

import { Typography } from '@launch-ui/typography';
import { ButtonAction } from '@launch-ui/button';
import { ColorKey, colorsLib } from '@launch-ui/theme';

import { Corners } from '@launch-ui/shape';

import { setHeaderMidComponent } from '@src/entities/header';
import { setNoteLastInputTimestamp } from '@src/entities/note';
import { NoteHeader } from '@src/features/note/components/NoteHeader';

import { PaletteContainer } from './palette.styled';

const GRAY_HSL = [...new Array(9)].map((_, i) => {
  const colorKey = (1000 - (i + 1) * 100) as ColorKey;

  return {
    ultra: colorsLib.ultra[colorKey],
    phlox: colorsLib.phlox[colorKey],
    orange: colorsLib.orange[colorKey],
    danger: colorsLib.danger[colorKey],
    awesome: colorsLib.awesome[colorKey],
    malachite: colorsLib.malachite[colorKey],
    nika: colorsLib.nika[colorKey],
    electroviolet: colorsLib.electroviolet[colorKey],
    yellamerica: colorsLib.yellamerica[colorKey],
  };
});

const Palette: FC = () => {
  const [pageOutletHeight, setPageOutletHeight] = useState<number>(0);

  const onWindowResize = useCallback(() => setPageOutletHeight(window.innerHeight - 168 - 56), []);

  useEffect(() => {
    setHeaderMidComponent(NoteHeader);

    return () => {
      setHeaderMidComponent(null);
    };
  }, []);

  useEffect(() => {
    onWindowResize();

    window.addEventListener('resize', onWindowResize);
    return () => window.removeEventListener('resize', onWindowResize);
  }, [onWindowResize]);

  return (
    <PaletteContainer height={pageOutletHeight}>
      <Corners borderRadius={24} />

      <Typography as='h2' type='RoundedHeavy36'>
        Palette
      </Typography>

      <ButtonAction title='Init' onClick={() => setNoteLastInputTimestamp(Date.now() + 15000)} />

      <div style={{ display: 'flex', width: '100%' }}>
        {GRAY_HSL.map(({ ultra, electroviolet, orange, danger, awesome, yellamerica, malachite, nika, phlox }) => (
          <div key={ultra + electroviolet + malachite} style={{ width: '20%' }}>
            <div style={{ width: '100%', height: 128, backgroundColor: ultra }} />
            <div style={{ width: '100%', height: 128, backgroundColor: electroviolet }} />
            <div style={{ width: '100%', height: 128, backgroundColor: orange }} />
            <div style={{ width: '100%', height: 128, backgroundColor: danger }} />
            <div style={{ width: '100%', height: 128, backgroundColor: awesome }} />
            <div style={{ width: '100%', height: 128, backgroundColor: yellamerica }} />
            <div style={{ width: '100%', height: 128, backgroundColor: malachite }} />
            <div style={{ width: '100%', height: 128, backgroundColor: nika }} />
            <div style={{ width: '100%', height: 128, backgroundColor: phlox }} />
          </div>
        ))}
      </div>
    </PaletteContainer>
  );
};

export { Palette };
