import React, { FC } from 'react';
// import { useUnit as useEffectorUnit } from 'effector-react';
// import { useParams } from 'react-router-dom';
// import { fromPairs } from 'lodash';

import { Typography } from '@launch-ui/typography';
import { ColorKey, colorsLib } from '@launch-ui/theme';

import { Corners } from '@launch-ui/shape';
// import { RichTextField, RichTextEditor, type RichtextChangeEvent } from '@launch-ui/richtext';

// import { $userStore } from '@src/entities/user';
// import { setHeaderMidComponent } from '@src/entities/header';
// import { useNoteBodyData, useNoteBodyUpdate, NOTE_DEBOUNCE_TIME } from '@src/entities/note';

// import { Loader } from '@src/features/loader';
import { NoteContainer } from './dashboard.styled';

// const HeaderComponent: FC = () => <Loader view='fit-parent' iconSize='56px' />;
// const updateHeader = () => setHeaderMidComponent(HeaderComponent);

// hsl 360deg 100% 100%

const GRAY_HSL = [...new Array(9)].map((_, i) => {
  const colorKey = (1000 - (i + 1) * 100) as ColorKey;
  const x = 0.125 * i;

  return {
    cssv: `--hsl--lightness-${x}`,
    hslLightness: `${10 + x * x * 82}%`,
    colorGen: colorsLib.ultra[colorKey],
  };
});

const NotesDashboard: FC<{ maxHeight: number }> = ({ maxHeight }) => {
  // const { noteId: routerNoteId = null } = useParams<{
  //   noteId?: string;
  //   createPageType?: CreateParamType;
  // }>();

  // const { uid } = useEffectorUnit($userStore);

  console.log('GRAY_HSL', GRAY_HSL);

  return (
    <NoteContainer height={maxHeight}>
      <Corners borderRadius={24} />

      <Typography as='span' type='RoundedHeavy36'>
        Notes dashboard
      </Typography>

      <div style={{ display: 'flex', width: '100%' }}>
        {GRAY_HSL.map(({ cssv, hslLightness, colorGen }) => (
          <div key={cssv} style={{ width: '20%' }}>
            <div style={{ width: '100%', height: 144, backgroundColor: `hsl(40, 3%, ${hslLightness})` }} />
            <div style={{ width: '100%', height: 144, backgroundColor: colorGen }} />
          </div>
        ))}
      </div>
    </NoteContainer>
  );
};

export { NotesDashboard };
