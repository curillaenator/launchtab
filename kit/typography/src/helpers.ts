import { fonts } from './fontsSettings';
import type { TypeAs, ITypographyTypes } from './interfaces';

export const getFontFamily = (type: ITypographyTypes): string => {
  const currentFont = type.includes('Rounded') ? fonts.sfRounded : fonts.sfPro;
  return `font-family: ${currentFont}, ${fonts.common};`;
};

export const generateTag = (type: ITypographyTypes): TypeAs => {
  const fontSize = type.replace(/\D/g, '');

  if (+fontSize < 20) return 'span';
  if (+fontSize < 24) return 'h4';
  if (+fontSize < 36) return 'h3';
  if (+fontSize < 48) return 'h2';
  return 'h1';
};
