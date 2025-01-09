export interface IUpdate {
  uid: string;
  tabs: BookmarkTabProps[];
}

// COMMON

export interface BookmarkCardProps {
  id?: string;
  name: string;
  deleted?: boolean;
  link: string;
  imageURL?: string | null;
  iconURL?: string | null;
}

export interface BookmarkTabProps {
  name: string;
  pages: BookmarkCardProps[];
}
