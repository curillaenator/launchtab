import { BookmarkTabProps } from '@src/entities/bookmarks';
import { SettingsStore } from '@src/entities/settings';

interface LaunchStoreUser {
  uid: string | null;
  username: string | null;
  email: string | null;
  avatar: string | null;
}

interface LaunchUserData extends LaunchStoreUser {
  settings: SettingsStore;
  pages: BookmarkTabProps[];
}

export type { LaunchStoreUser, LaunchUserData };
