import React, { useState, useRef, useEffect, FC, type MouseEventHandler } from 'react';
import styled, { keyframes } from 'styled-components';
import { fadeIn } from 'react-animations';
import { ButtonGhost } from '@launch-ui/button';
import { compose } from './utils';
import type { ContextMenuProps } from './interfaces';

const fade = keyframes`${fadeIn}`;

const MenuStyled = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 0 0.5rem;
  background-color: ${({ theme }) => theme.backgrounds.base};
  border-radius: 16px;
  animation: ${fade} 0.12s;
  z-index: 500;
  filter: drop-shadow(${({ theme }) => theme.shadows.card});

  .menuitem {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 56px;
    border-bottom: 1px solid ${({ theme }) => theme.backgrounds.light};

    &:last-child {
      border-bottom: none;
    }
  }
`;

export const ContextMenu: FC<ContextMenuProps> = ({ children, items }) => {
  const menuRef = useRef<HTMLDivElement | null>(null);

  const [location, setLocation] = useState({ x: 0, y: 0 });

  const [open, setOpen] = useState(false);
  const handleOpen = () => setOpen((prev) => !prev);

  const onClickOff = (event: MouseEvent) => {
    if (!menuRef.current?.contains(event.target as Node)) {
      setOpen(false);
    }
  };

  const onContextMenu: MouseEventHandler<HTMLDivElement> = (event) => {
    event.preventDefault();

    setLocation({ x: event.pageX, y: event.pageY });
    setOpen(true);
  };

  useEffect(() => {
    document.addEventListener('mousedown', onClickOff);

    return () => document.removeEventListener('mousedown', onClickOff);
  }, []);

  return (
    <div ref={menuRef} onContextMenu={onContextMenu}>
      {open && (
        <MenuStyled style={{ position: 'absolute', left: location.x, top: location.y }}>
          {items.map((item) => (
            <div className='menuitem' key={item.title}>
              <ButtonGhost {...item} onClick={() => compose([handleOpen, item.handler])} />
            </div>
          ))}
        </MenuStyled>
      )}
      {children}
    </div>
  );
};
