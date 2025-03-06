import React, { FC, ReactNode, useMemo } from 'react';
import { Corners } from '@launch-ui/shape';
import { Button } from '@launch-ui/button';

import { useCreateForm } from './hooks/useCreateForm';
import { CreateFormCTX } from './context';
import { PopupStyled, CreateTabButton } from './created.styled';

import { TabsGroupPopup as CreateTabsGroupPopup } from './components/TabsGroupPopup';
import { TabPopup as CreateTabPopup } from './components/TabPopup';

import { LAUNCH_CARD_BDRS } from '@src/shared/appConfig';

import LinkIcon from '@src/assets/svg/link.svg';
import FolderIcon from '@src/assets/svg/folder.svg';

const CreateTabs: FC<{ create: 'new-page' | 'new-bookmark' }> = ({ create }) => {
  const { formContextValue, resetFormState } = useCreateForm(create);

  return (
    <CreateFormCTX.Provider value={useMemo(() => formContextValue, [formContextValue])}>
      <PopupStyled
        offsetX={16}
        arrow={false}
        onClose={() => resetFormState()}
        keepTooltipInside='.layout-container'
        position={['right center', 'left center']}
        trigger={(open: boolean) =>
          create === 'new-page' ? (
            <Button active={open} IconLeft={() => <FolderIcon />} />
          ) : (
            <CreateTabButton active={open}>
              <Corners borderRadius={LAUNCH_CARD_BDRS} stroke={6} />
              <LinkIcon width={32} height={32} viewBox='0 0 24 24' fill='none' />
            </CreateTabButton>
          )
        }
      >
        {
          ((close: () => void) =>
            create === 'new-page' ? (
              <CreateTabsGroupPopup closePopup={close} />
            ) : (
              <CreateTabPopup closePopup={close} />
            )) as unknown as ReactNode
        }
      </PopupStyled>
    </CreateFormCTX.Provider>
  );
};

export { CreateTabs };
