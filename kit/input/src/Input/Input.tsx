import React, { FC, forwardRef, useState, useRef } from 'react';

import { ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';

import { InputStyled } from './input.styled';
import { InputProps } from './interfaces';

export const Input: FC<InputProps> = (props) => {
  const {
    state = 'normal',
    type = 'text',
    icon: Icon,
    name,
    description,
    value,
    limitSymbols = 256,
    buttonTitle,
    withButton = false,
    onChange,
    onFocusOut,
    ...rest
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const inputButtonRef = useRef<HTMLButtonElement | null>(null);

  const [isFocused, setIsFocused] = useState(false);

  const handleFocus = () => {
    !!inputRef.current && inputRef.current.focus();
    setIsFocused(true);
  };

  const handleBlur = () => {
    inputRef.current?.blur();
    onFocusOut?.();
    setIsFocused(false);
  };

  return (
    <InputStyled
      state={state}
      isIcon={!!Icon}
      tabIndex={0}
      isFocused={isFocused}
      hasValue={!!value.length}
      buttonWidth={inputButtonRef.current?.clientWidth || 0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className='input'>
        {!!Icon && <Icon />}

        <input
          {...rest}
          ref={inputRef}
          className='input-input'
          type={type}
          name={name}
          autoComplete='off'
          value={value}
          onChange={(e) => {
            if (e.target.value?.length >= limitSymbols) return;
            onChange?.(e);
          }}
        />

        {withButton && (
          <div className='input-button'>
            <ButtonGhost ref={inputButtonRef} title={buttonTitle || ''} colorPreset='secondary-colors' />
          </div>
        )}
      </div>

      {(description || limitSymbols) && (
        <div className='subinput'>
          <Typography type='TextRegular11' className='subinput-text'>
            {description || ''}
          </Typography>

          {limitSymbols && (
            <Typography type='TextRegular11' className='subinput-text'>
              {`${value.length}/${limitSymbols}`}
            </Typography>
          )}
        </div>
      )}
    </InputStyled>
  );
};
