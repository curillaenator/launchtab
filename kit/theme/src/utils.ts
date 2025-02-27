import type { ColorSet } from './interfaces';

const COLOR_SET_DUMMY = [...new Array(9)];
const STEP = 0.125;

// Q out of 100. flattens Math.pow(x, 2) by q/100
// affect how "far" in terms of lightness colors will be spread among each other, less Q, closer colors generated
const NEUTRALS_SPREAD_Q = 82;
const COLORS_SPREAD_Q = 40;

const TARGET_PRIMARY_COLOR_POS = 2;
const SHIFT = Math.pow(STEP * TARGET_PRIMARY_COLOR_POS, 2) * COLORS_SPREAD_Q;

const colors = (hue: number, sat: number, light: number) =>
  Object.fromEntries(
    COLOR_SET_DUMMY.map((_, colorIdx) => {
      const targetSat =
        colorIdx < TARGET_PRIMARY_COLOR_POS ? sat + (colorIdx * 10 - TARGET_PRIMARY_COLOR_POS * 10) : sat;
      const targetLightness = Math.min(100, light - SHIFT + Math.pow(STEP * colorIdx, 2) * COLORS_SPREAD_Q);
      return [1000 - (colorIdx + 1) * 100, `hsl(${hue}, ${targetSat}%, ${Math.min(targetLightness, 100)}%)`];
    }),
  ) as ColorSet;

const neutrals = (hue: number) =>
  Object.fromEntries(
    COLOR_SET_DUMMY.map((_, i) => [
      1000 - (i + 1) * 100,
      `hsl(${hue}, 3%, ${10 + Math.pow(STEP * i, 2) * NEUTRALS_SPREAD_Q}%)`,
    ]),
  ) as ColorSet;

const hsla = (hsl: string, opacity: number) => `hsl(${hsl.replace(/^hsl\(/, '').replace(/\)/, '')}, ${opacity})`;

const hexa = (hex: string, opacity: number) => {
  const hexA = Math.ceil(255 * opacity).toString(16);
  return `${hex}${hexA}`;
};

export { hsla, hexa, neutrals, colors };
