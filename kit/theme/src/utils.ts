import type { ColorSet } from './interfaces';

const COLOR_SET_DUMMY = [...new Array(9)];
const STEP = 0.125;

const colors = (hue: number, sat: number, light: number) => {
  const lightUpper = Math.max(light, 92);
  const lightLower = Math.min(light, 20);

  const steps = [
    lightUpper,
    light + (lightUpper - light) * Math.pow(0.75, 2),
    light + (lightUpper - light) * Math.pow(0.5, 2),
    light + (lightUpper - light) * Math.pow(0.25, 2),
    light,
    light - (light - lightLower) * Math.pow(0.25, 2),
    light - (light - lightLower) * Math.pow(0.5, 2),
    light - (light - lightLower) * Math.pow(0.75, 2),
    lightLower,
  ];

  const shades = [100, 200, 300, 400, 500, 600, 700, 800, 900] as const;

  return shades.reduce((acc, shade, index) => {
    acc[shade] = `hsl(${hue}, ${sat}%, ${steps[index]}%)`;
    return acc;
  }, {} as ColorSet);
};

// Q out of 100. flattens Math.pow(x, 2) by q/100
// affect how "far" in terms of lightness colors will be spread among each other, less Q, closer colors generated
const NEUTRALS_SPREAD_Q = 82;

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
