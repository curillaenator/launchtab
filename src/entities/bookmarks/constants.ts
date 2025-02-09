import { BookmarkTabProps, BookmarksStore } from './interfaces';

const DEFAULT_PAGES: BookmarkTabProps[] = [
  {
    name: 'Home',
    pages: [
      { id: 'home_default_1', name: 'Facebook', link: 'facebook.com' },
      { id: 'home_default_2', name: 'VK', link: 'vk.com' },
      { id: 'home_default_3', name: 'Instagram', link: 'instagram.com' },
    ],
  },
  {
    name: 'Office',
    pages: [
      { id: 'office_default_1', name: 'Gmail', link: 'gmail.com' },
      { id: 'office_default_2', name: 'Outlook', link: 'outlook.live.com' },
      { id: 'office_default_3', name: 'Zoom', link: 'zoom.us' },
      { id: 'office_default_4', name: 'Skype', link: 'skype.com' },
      { id: 'office_default_5', name: 'Google Meet', link: 'meet.google.com' },
    ],
  },
  {
    name: 'Video',
    pages: [
      { id: 'video_default_1', name: 'YouTube', link: 'youtube.com' },
      { id: 'video_default_2', name: 'Vimeo', link: 'vimeo.com' },
      { id: 'video_default_3', name: 'Twitch', link: 'twitch.tv' },
      { id: 'video_default_4', name: 'Apple TV+', link: 'tv.apple.com' },
      { id: 'video_default_5', name: 'Netflix', link: 'netflix.com' },
    ],
  },
  {
    name: 'Music',
    pages: [
      { id: 'music_default_1', name: 'Shazam', link: 'shazam.com' },
      { id: 'music_default_2', name: 'Spotify', link: 'spotify.com' },
      { id: 'music_default_3', name: 'Apple Music', link: 'music.apple.com' },
      { id: 'music_default_4', name: 'Last.fm', link: 'last.fm' },
      { id: 'music_default_5', name: 'Tidal', link: 'tidal.com' },
    ],
  },
];

const DEFAULT_CARDS_STORE: BookmarksStore = {
  currentTab: 'Home',
  tabs: DEFAULT_PAGES,
};

export { DEFAULT_PAGES, DEFAULT_CARDS_STORE };
