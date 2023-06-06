import { IFeatureList } from './FeatureList';

export const featureLists: IFeatureList[] = [
  {
    title: 'Free',
    subtitle: '$0',
    notion: 'totally free forever',
    featureList: [
      {
        text: 'Your workspace stores on your computer until browser session ended',
      },
      {
        text: 'Access your bookmarks from any device',
      },
      {
        text: 'Use logos from our database or auto-generated site snapshots',
      },
      {
        text: 'Upload custom wallpapers',
      },
      {
        text: 'Use predefined color themes',
      },
    ],
  },
  {
    title: 'Pro',
    subtitle: '$1 per month*',
    notion: '*paying annually or $1.5 if paying monthly',
    featureList: [
      {
        text: 'Save your workspace and settings to secure cloud database',
      },
      {
        text: 'Access your bookmarks from any device',
      },
      {
        text: 'Upload custom logos and images for bookmarks',
      },
      {
        text: 'Upload custom wallpapers',
      },
      {
        text: 'Create custom color themes',
      },
    ],
  },
];
