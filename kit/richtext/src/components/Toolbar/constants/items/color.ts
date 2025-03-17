import {
  BlackCharIcon,
  BlueCharIcon,
  RedCharIcon,
  LightGreyCharIcon,
  LightBlueCharIcon,
  GreenCharIcon,
  DarkOrangeCharIcon,
  LightOrangeCharIcon,
  PurpleCharIcon,
} from '../svg/CharIcon';

import {
  RedIcon,
  LightGreyIcon,
  BlueIcon,
  LightBlueIcon,
  GreenIcon,
  DarkOrangeIcon,
  LightOrangeIcon,
  PurpleIcon,
} from '../svg/CharHighlightIcon';

import ResetIcon from '../svg/reset.svg';

import type { ToolbarItemProps } from '../interfaces';

import { colorsLib } from '@launch-ui/theme';

const WYSIWYG_COLORS = {
  RED: colorsLib.danger[500],
  LIGHT_BLUE: colorsLib.ultra[300],
  LIGHT_GREY: 'var(--theme-neutral-200)',
  BLUE: colorsLib.ultra[500],
  GREEN: colorsLib.nika[500],
  DARK_ORANGE: colorsLib.orange[500],
  LIGHT_ORANGE: colorsLib.orange[700],
  PURPLE: colorsLib.electroviolet[500],
  WHITE: '#FFFFFF',
  DEFAULT: 'inherit',
} as const;

// TODO: Create special Icon component for Color, cuz storing Icon component for subjected to change colors is a violation of SSOT and DRY principles.
const COLOR_ITEMS: ToolbarItemProps[] = [
  {
    id: 'defaultColor',
    Icon: BlackCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.DEFAULT).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.DEFAULT }),
  },

  {
    id: 'redColor',
    Icon: RedCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.RED).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.RED }),
  },
  {
    id: 'lightGreyColor',
    Icon: LightGreyCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.LIGHT_GREY).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.LIGHT_GREY }),
  },
  {
    id: 'blueColor',
    Icon: BlueCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.BLUE).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.BLUE }),
  },
  {
    id: 'lightBlueColor',
    Icon: LightBlueCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.LIGHT_BLUE).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.LIGHT_BLUE }),
  },
  {
    id: 'greenColor',
    Icon: GreenCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.GREEN).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.GREEN }),
  },
  {
    id: 'darkOrangeColor',
    Icon: DarkOrangeCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.DARK_ORANGE).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.DARK_ORANGE }),
  },
  {
    id: 'lightOrangeColor',
    Icon: LightOrangeCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.LIGHT_ORANGE).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.LIGHT_ORANGE }),
  },

  {
    id: 'purpleColor',
    Icon: PurpleCharIcon,
    command: (chain) => chain.focus().setColor(WYSIWYG_COLORS.PURPLE).run(),
    isActive: (editor) => editor.isActive('textStyle', { color: WYSIWYG_COLORS.PURPLE }),
  },
];

const BACKGROUND_COLOR_ITEMS: ToolbarItemProps[] = [
  // {
  //   id: 'blackColorBackground',
  //   Icon: BlackIcon,
  //   command: (chain) =>
  //     chain.focus().setHighlight({ color: WYSIWYG_COLORS.BLACK }).setColor(WYSIWYG_COLORS.WHITE).run(),
  //   isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.BLACK }),
  // },

  {
    id: 'redColorBackground',
    Icon: RedIcon,
    command: (chain) => chain.focus().setHighlight({ color: WYSIWYG_COLORS.RED }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.RED }),
  },
  {
    id: 'lightGreyColorBackground',
    Icon: LightGreyIcon,
    command: (chain) =>
      chain.focus().setHighlight({ color: WYSIWYG_COLORS.LIGHT_GREY }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.LIGHT_GREY }),
  },
  {
    id: 'blueColorBackground',
    Icon: BlueIcon,
    command: (chain) => chain.focus().setHighlight({ color: WYSIWYG_COLORS.BLUE }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.BLUE }),
  },
  {
    id: 'lightBlueColorBackground',
    Icon: LightBlueIcon,
    command: (chain) =>
      chain.focus().setHighlight({ color: WYSIWYG_COLORS.LIGHT_BLUE }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.LIGHT_BLUE }),
  },
  {
    id: 'greenColorBackground',
    Icon: GreenIcon,
    command: (chain) =>
      chain.focus().setHighlight({ color: WYSIWYG_COLORS.GREEN }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.GREEN }),
  },
  {
    id: 'darkOrangeColorBackground',
    Icon: DarkOrangeIcon,
    command: (chain) =>
      chain.focus().setHighlight({ color: WYSIWYG_COLORS.DARK_ORANGE }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.DARK_ORANGE }),
  },
  {
    id: 'lightOrangeColorBackground',
    Icon: LightOrangeIcon,
    command: (chain) =>
      chain.focus().setHighlight({ color: WYSIWYG_COLORS.LIGHT_ORANGE }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.LIGHT_ORANGE }),
  },
  {
    id: 'purpleColorBackground',
    Icon: PurpleIcon,
    command: (chain) =>
      chain.focus().setHighlight({ color: WYSIWYG_COLORS.PURPLE }).setColor(WYSIWYG_COLORS.WHITE).run(),
    isActive: (editor) => editor.isActive('highlight', { color: WYSIWYG_COLORS.PURPLE }),
  },
];

const TEXT_COLOR_CLEAR: ToolbarItemProps = {
  id: 'textColorClear',
  Icon: ResetIcon,
  command: (chain) => chain.focus().unsetColor().run(),
};

const TEXT_HIGHLIGHT_CLEAR: ToolbarItemProps = {
  id: 'textHighlightClear',
  Icon: BlackCharIcon,
  command: (chain) => chain.focus().unsetHighlight().unsetColor().run(),
};

// ?? It's almost identical to textHighlightColor, but uses different caption
const TEXT_COLOR_AND_HIGHLIGHT_CLEAR: ToolbarItemProps = {
  ...TEXT_HIGHLIGHT_CLEAR,
  id: 'textColorAndHighlightClear',
};

export { COLOR_ITEMS, BACKGROUND_COLOR_ITEMS, TEXT_COLOR_CLEAR, TEXT_HIGHLIGHT_CLEAR, TEXT_COLOR_AND_HIGHLIGHT_CLEAR };
