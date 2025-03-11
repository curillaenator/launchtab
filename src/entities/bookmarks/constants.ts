import { BookmarkTabProps, BookmarksStore } from './interfaces';

const DEFAULT_PAGES: BookmarkTabProps[] = [
  {
    name: 'Home',
    pages: [
      {
        id: 'app_default_1',
        name: 'About app',
        link: 'https://launchtab-81b06.web.app/notes/jtG8WhhR5KHtpBxqtUs5',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/firebase.svg',
      },
      {
        id: 'app_default_2',
        name: 'Tabs Guide',
        link: 'https://launchtab-81b06.web.app/notes/m4fCGpakK6eDhqsDZfCB',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/firebase.svg',
      },
      {
        id: 'app_default_3',
        name: 'Notes Guide',
        link: 'https://launchtab-81b06.web.app/notes/Wa3oXR4V2vCuFBhfydJZ',
        iconURL: 'https://raw.githubusercontent.com/gilbarbara/logos/main/logos/firebase.svg',
      },
      { id: 'home_default_1', name: 'Whatsapp', link: 'web.whatsapp.com' },
      { id: 'home_default_2', name: 'Facebook', link: 'facebook.com' },
      { id: 'home_default_3', name: 'Instagram', link: 'instagram.com' },
      { id: 'home_default_4', name: 'Gmail', link: 'gmail.com' },
    ],
  },
  {
    name: 'Video',
    pages: [
      { id: 'video_default_1', name: 'YouTube', link: 'youtube.com' },
      { id: 'video_default_3', name: 'Twitch', link: 'twitch.tv' },
      { id: 'video_default_4', name: 'Apple TV+', link: 'tv.apple.com' },
      { id: 'video_default_5', name: 'Netflix', link: 'netflix.com' },
    ],
  },
  {
    name: 'Music',
    pages: [
      { id: 'music_default_1', name: 'Spotify', link: 'spotify.com' },
      { id: 'music_default_2', name: 'Soundcloud', link: 'soundcloud.com' },
    ],
  },
];

const DEFAULT_CARDS_STORE: BookmarksStore = {
  currentTab: 'Home',
  tabs: DEFAULT_PAGES,
};

export { DEFAULT_PAGES, DEFAULT_CARDS_STORE };
