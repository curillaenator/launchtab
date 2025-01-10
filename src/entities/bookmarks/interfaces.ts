interface BookmarkCardProps {
  id?: string;
  name: string;
  deleted?: boolean;
  link: string;
  imageURL?: string | null;
  iconURL?: string | null;
}

interface BookmarkTabProps {
  name: string;
  pages: BookmarkCardProps[];
}

interface BookmarksStore {
  currentTab: string;
  tabs: BookmarkTabProps[];
}

export type { BookmarkCardProps, BookmarkTabProps, BookmarksStore };
