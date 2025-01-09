import { batch } from 'react-redux';
import { useEffect } from 'react';
import { isEqual } from 'lodash';

import { useAppDispatch, useAppSelector } from '@src/hooks';
import { pagesApi, localStorageApi } from '@src/api/api';

import { setMessage, applyData } from '@src/redux/reducers/bookmarks';
import { setIsDataLoading } from '@src/redux/reducers/loadings';

import { applySettings, type ISettings } from '@src/redux/reducers/settings';

import type { IData } from '@src/types';

export const useDataQuery = () => {
  const user = useAppSelector((state) => state.auth.user);
  const loadings = useAppSelector((state) => state.loadings);

  const dispatch = useAppDispatch();

  const UID = user?.uid;

  useEffect(() => {
    const localBookmarks = localStorage.getItem('bookmarks');
    const localSettings = localStorage.getItem('settings');

    if (!localBookmarks) {
      dispatch(setIsDataLoading(true));
    }

    batch(() => {
      if (!!localBookmarks) dispatch(applyData(JSON.parse(localBookmarks) as IData[]));
      if (!!localSettings) dispatch(applySettings(JSON.parse(localSettings)));
    });
  }, [dispatch]);

  useEffect(() => {
    if (!UID) return;

    pagesApi.getData(UID).then((response) => {
      if (loadings.isDataLoading) {
        dispatch(setIsDataLoading(false));
      }

      if (!response) {
        dispatch(setMessage('Bad server response'));
        return;
      }

      if (typeof response === 'string') {
        dispatch(setMessage(response));
        return;
      }

      const { pages: resPages, settings: resSettings } = response;

      const bookmarks = localStorage.getItem('bookmarks') ? JSON.parse(localStorage.getItem('bookmarks') || '') : null;
      const settings = localStorage.getItem('settings') ? JSON.parse(localStorage.getItem('settings') || '') : null;

      const areCachedPagesEqualToRes = isEqual(resPages, bookmarks);
      const areCacheSettingsEqualToRes = isEqual(resSettings, settings);

      if (!areCachedPagesEqualToRes) {
        localStorageApi.setBookmarks(resPages);
        dispatch(applyData(resPages));
      }

      if (!areCacheSettingsEqualToRes) {
        if (!!resSettings) {
          localStorageApi.setSettings(resSettings);
        }

        if (!settings && !!resSettings) {
          dispatch(applySettings(resSettings));
        }
      }
    });
  }, [UID, loadings.isDataLoading, dispatch]);
};
