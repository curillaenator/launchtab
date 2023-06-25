import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { batch } from 'react-redux';
import shortid from 'shortid';

import { pagesApi, localStorageApi } from '../../api/api';

import type { IBookmark, IData, IUpdate, TThunk } from '../../types/types';

export interface IBookmarks {
  pages: string[];
  curPage: string;
  data: IData[];
  curBookmarks: IBookmark[];
  message: string;
}

const initialState: IBookmarks = {
  pages: [],
  curPage: '',
  data: [],
  curBookmarks: [],
  message: '',
};

const bmSlice = createSlice({
  name: 'bookmarks',
  initialState,
  reducers: {
    setPages: (state, action: PayloadAction<string[]>) => {
      state.pages = action.payload;
    },

    setCurPage: (state, action: PayloadAction<string>) => {
      state.curPage = action.payload;
    },

    setCurBookmarks: (state, action: PayloadAction<IBookmark[]>) => {
      state.curBookmarks = action.payload;
    },

    setData: (state, action: PayloadAction<IData[]>) => {
      state.data = action.payload;
    },

    setMessage: (state, action: PayloadAction<string>) => {
      state.message = action.payload;
    },
  },
});
export const bookmarks = bmSlice.reducer;

export const { setPages, setCurPage, setCurBookmarks, setData, setMessage } = bmSlice.actions;

// THUNKS

type TApplyData = (pagesData: IData[]) => TThunk;

export const applyData: TApplyData = (pagesData) => {
  return (dispatch) => {
    const pages: string[] = pagesData.map((page: IData) => page.name);
    const curBookmarks = pagesData[0].pages;

    batch(() => {
      dispatch(setPages(pages));
      dispatch(setCurPage(pages[0]));
      dispatch(setData(pagesData));
      dispatch(setCurBookmarks(curBookmarks));
    });
  };
};

export const getCurBookmarks = (curPage: string): TThunk => {
  return async (dispatch, getState) => {
    const data = getState().bookmarks.data;

    const curBookmarks = data.find((page) => page.name === curPage);

    if (curBookmarks) {
      batch(() => {
        dispatch(setCurBookmarks(curBookmarks.pages));
      });
    }
  };
};

export const createPage = (pageName: string): TThunk => {
  return async (dispatch, getState) => {
    const { pages, data } = getState().bookmarks;
    const user = getState().auth.user;

    const updData = [...data, { name: pageName, pages: [] }];

    // State update

    batch(() => {
      dispatch(setPages([...pages, pageName]));
      dispatch(setData(updData));
    });

    dispatch(setCurPage(pageName));

    // Server update

    if (user) {
      !user.isAnonymous && localStorageApi.setBookmarks(updData);

      const userData: IUpdate = { uid: user.uid, tabs: updData };
      const message = await pagesApi.updateData(userData);

      dispatch(setMessage(message));
    }
  };
};

export const createBookmark = (name: string, link: string, imageURL: string | null, iconURL: string | null): TThunk => {
  return async (dispatch, getState) => {
    const { curPage, data, curBookmarks } = getState().bookmarks;
    const user = getState().auth.user;
    const id = shortid.generate();

    const curBookmarksIndex = data.findIndex((page) => page.name === curPage);

    const updData = [...data];
    const updBookmars = [...curBookmarks, { id, name, link, imageURL, iconURL }];

    const updCurBookmarks = { name: curPage, pages: updBookmars };

    updData.splice(curBookmarksIndex, 1, updCurBookmarks);

    batch(() => {
      dispatch(setData(updData));
      dispatch(setCurBookmarks(updBookmars));
    });

    if (user) {
      !user.isAnonymous && localStorageApi.setBookmarks(updData);

      const userData: IUpdate = { uid: user.uid, tabs: updData };
      const message = await pagesApi.updateData(userData);

      dispatch(setMessage(message));
    }
  };
};

export const updatePagesOrder = (pagesOrder: string[]): TThunk => {
  return async (dispatch, getState) => {
    const data = getState().bookmarks.data;
    const user = getState().auth.user;

    const updData = pagesOrder.map((knob) => data.find((tab) => tab.name === knob));

    batch(() => {
      dispatch(setData(updData as IData[]));
      dispatch(setPages(pagesOrder));
    });

    if (user) {
      !user.isAnonymous && localStorageApi.setBookmarks(updData as IData[]);
      const userData: IUpdate = { uid: user.uid, tabs: updData as IData[] };
      const message = await pagesApi.updateData(userData);

      dispatch(setMessage(message));
    }
  };
};

export const updateBookmarksOrder = (bookmarks: IBookmark[]): TThunk => {
  return async (dispatch, getState) => {
    const { curPage, data } = getState().bookmarks;
    const user = getState().auth.user;

    const curBookmarksIndex = data.findIndex((page) => page.name === curPage);
    const updCurBookmarks = { name: curPage, pages: bookmarks };

    const updData = [...data];

    updData.splice(curBookmarksIndex, 1, updCurBookmarks);

    batch(() => {
      dispatch(setData(updData));
      dispatch(setCurBookmarks(bookmarks));
    });

    if (user) {
      !user.isAnonymous && localStorageApi.setBookmarks(updData);

      const userData: IUpdate = { uid: user.uid, tabs: updData };
      const message = await pagesApi.updateData(userData);

      dispatch(setMessage(message));
    }
  };
};

export const deletePage = (pageName: string): TThunk => {
  return async (dispatch, getState) => {
    const { curPage, data, pages } = getState().bookmarks;

    if (pageName === 'Home') return alert('This bookmark can not be deleted');

    const confirm = window.confirm('Delete bookmark?');

    if (confirm) {
      const user = getState().auth.user;

      const updData = data.filter((tab) => tab.name !== pageName);
      const updPages = pages.filter((knob) => knob !== pageName);

      if (curPage === pageName) {
        batch(() => {
          dispatch(setCurBookmarks(data[0].pages));
          dispatch(setData(updData));
          dispatch(setPages(updPages));
          dispatch(setCurPage(data[0].name));
        });
      }

      if (curPage !== pageName) {
        dispatch(setData(updData));
        dispatch(setPages(updPages));
      }

      if (user) {
        !user.isAnonymous && localStorageApi.setBookmarks(updData);

        const userData: IUpdate = { uid: user.uid, tabs: updData };
        const message = await pagesApi.updateData(userData);

        dispatch(setMessage(message));
      }
    }
  };
};

export const deleteBookmark = (
  bookmarkName: string,
  // pageID?: string
): TThunk => {
  return (dispatch, getState) => {
    const { curPage, data, curBookmarks } = getState().bookmarks;

    const deleteFunc = async () => {
      const user = getState().auth.user;

      const curBookmarksIndex = data.findIndex((item) => item.name === curPage);

      const updCurBookmarks = curBookmarks.filter((page) => page.name !== bookmarkName);
      const updCurBookmarkObj = { name: curPage, pages: updCurBookmarks };

      const updData = [...data];
      updData.splice(curBookmarksIndex, 1, updCurBookmarkObj);

      batch(() => {
        dispatch(setData(updData));
        dispatch(setCurBookmarks(updCurBookmarks));
      });

      if (user) {
        !user.isAnonymous && localStorageApi.setBookmarks(updData);

        const userData: IUpdate = { uid: user.uid, tabs: updData };
        const message = await pagesApi.updateData(userData);

        dispatch(setMessage(message));
      }
    };

    const confirm = window.confirm('Delete bookmark?');

    if (confirm) {
      const curBookmarksPredelete = curBookmarks.map((page) =>
        page.name === bookmarkName ? { ...page, deleted: true } : page,
      );

      dispatch(setCurBookmarks(curBookmarksPredelete));

      setTimeout(deleteFunc, 200);
    }
  };
};
