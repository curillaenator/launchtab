import React, { FC, useRef, PropsWithChildren } from 'react';
import styled from 'styled-components';

import { BtnGhost } from '../buttons';

interface IAccordionStyled {
  open: boolean;
  height: number;
}

const AccordionStyled = styled.div<IAccordionStyled>`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  .trigger {
    margin-bottom: 1rem;
  }

  .accordion {
    width: 100%;
    height: ${({ height, open }) => (open ? height : 0)}px;
    transition: 0.2s ease-in-out;
    overflow: hidden;
  }
`;

interface AccordionProps extends PropsWithChildren {
  title: string;
  disabled: boolean;
  open: boolean;
  openHandler: () => void;
}

export const Accordion: FC<AccordionProps> = ({ title, open, disabled, children, openHandler }) => {
  const ref = useRef<HTMLDivElement | null>(null);

  return (
    <AccordionStyled open={open} height={ref.current?.scrollHeight || 0}>
      <div className='trigger'>
        <BtnGhost title={title} disabled={disabled} handler={openHandler} />
      </div>

      <div className='accordion' ref={ref}>
        {children}
      </div>
    </AccordionStyled>
  );
};
