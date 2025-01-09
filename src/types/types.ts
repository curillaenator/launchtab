export interface IUpdate {
  uid: string;
  tabs: IData[];
}

// COMMON

export interface IBookmark {
  id?: string;
  name: string;
  deleted?: boolean;
  link: string;
  imageURL?: string | null;
  iconURL?: string | null;
}

export interface IData {
  name: string;
  pages: IBookmark[];
}
