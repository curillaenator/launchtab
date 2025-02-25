import type { ColorKey, ColorSet } from './interfaces';

const hexa = (hex: string, opacity: number) => {
  const hexA = Math.ceil(255 * opacity).toString(16);
  return `${hex}${hexA}`;
};

const convertMap: [ColorKey, ColorKey][] = [
  [100, 900],
  [200, 800],
  [300, 700],
  [400, 600],
  [500, 500],
  [600, 400],
  [700, 300],
  [800, 200],
  [900, 100],
];

const invertColors = (colorSet: ColorSet) =>
  Object.fromEntries(convertMap.map(([colorKey, colorTargetKey]) => [colorKey, colorSet[colorTargetKey]])) as ColorSet;

export { hexa, invertColors };
