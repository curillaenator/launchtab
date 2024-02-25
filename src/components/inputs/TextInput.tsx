import React, { FC, useState, useRef, useCallback, type ChangeEvent, type HTMLAttributes } from 'react';
import styled from 'styled-components';

import { ButtonGhost } from '@launch-ui/button';
import { Typography } from '@launch-ui/typography';

import { inputIcons, InputIconsType } from './assets/inputIcons';

type IInputState = 'normal' | 'success' | 'error';

interface IFieldStyled {
  state: IInputState;
  isIcon: boolean;
  isFocused: boolean;
  buttonWidth: number;
  hasValue: boolean;
}

const FieldStyled = styled.div<IFieldStyled>`
  position: relative;
  width: 100%;

  .input {
    position: relative;
    display: flex;
    width: 100%;
    gap: 1rem;
    margin-bottom: 4px;

    .input_icon {
      margin-top: 4px;
      flex-shrink: 0;

      &-light {
        transition: 0.08s ease-in-out;
        fill: ${({ theme, isFocused }) => (isFocused ? theme.primary[200] : theme.icons.light)};
      }

      &-dark {
        transition: 0.08s ease-in-out;
        fill: ${({ theme, isFocused }) => (isFocused ? theme.primary[500] : theme.icons.dark)};
      }
    }

    &-button {
      position: absolute;
      top: 50%;
      right: 0;
      transform: translateY(-50%);
    }

    &-input {
      width: 100%;
      height: 36px;
      padding: 4px ${({ buttonWidth }) => (buttonWidth ? `${buttonWidth + 4}px` : '4px')} 8px 4px;
      transition: 0.08s ease-in-out;
      font-style: normal;
      font-variation-settings: 'GRAD' 400, 'wght' 500;
      letter-spacing: 0.002em;
      font-size: 14px;
      line-height: 24px;
      background: none;
      color: ${({ theme }) => theme.texts.inputColor};
      border-bottom: 1px solid
        ${({ theme, isFocused, state }) => {
          switch (true) {
            case isFocused:
              return theme.primary[200];
            case state === 'error':
              return theme.texts.error;
            default:
              return theme.backgrounds.light;
          }
        }};

      &::placeholder {
        color: ${({ theme, state }) => {
          switch (true) {
            case state === 'error':
              return theme.texts.error;
            default:
              return theme.texts.placeholder;
          }
        }};
      }
    }
  }

  .subinput {
    display: flex;
    justify-content: space-between;
    align-items: center;
    min-height: 1rem;
    padding-left: ${({ isIcon }) => (isIcon ? '40px' : 'none')};

    &-text {
      color: ${({ theme, state }) => {
        switch (true) {
          case state === 'error':
            return theme.texts.error;
          default:
            return theme.texts.placeholder;
        }
      }};
      padding: 0 4px;
    }
  }
`;

type OmitedHTMLInputElementAttributes = Omit<HTMLAttributes<HTMLInputElement>, 'onChange'>;

export interface ITextInput extends OmitedHTMLInputElementAttributes {
  state?: IInputState;
  iconName?: InputIconsType;
  type?: 'text' | 'email' | 'password' | 'url';
  name: string;
  description?: string;
  placeholder?: string;
  value: string;
  limitSymbols?: number;
  buttonTitle?: string;
  withButton?: boolean;
  onChange: (valueString: string) => void;
  onFocusOut?: () => void;
  disabled?: boolean;
}

export const TextInput: FC<ITextInput> = ({
  state = 'normal',
  iconName,
  type = 'text',
  name,
  description,
  placeholder = '',
  value,
  limitSymbols,
  buttonTitle,
  withButton = false,
  onChange,
  onFocusOut,
  ...rest
}) => {
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

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (limitSymbols && e.target.value.length >= limitSymbols) return;
    onChange(e.target.value);
  };

  const getIcon = useCallback(() => {
    const iconSet = {
      normal: iconName ? inputIcons[iconName] : '',
      success: inputIcons.success,
      error: inputIcons.error,
    };

    return iconSet[state];
  }, [state, iconName]);

  return (
    <FieldStyled
      state={state}
      isIcon={!!iconName}
      tabIndex={0}
      isFocused={isFocused}
      hasValue={!!value.length}
      buttonWidth={inputButtonRef.current?.clientWidth || 0}
      onFocus={handleFocus}
      onBlur={handleBlur}
    >
      <div className='input'>
        {!!iconName && getIcon()}

        <input
          {...rest}
          ref={inputRef}
          className='input-input'
          type={type}
          name={name}
          placeholder={placeholder}
          autoComplete='off'
          value={value}
          onChange={handleChange}
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
    </FieldStyled>
  );
};
