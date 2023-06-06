import firebase from 'firebase/app';
import { batch } from 'react-redux';
import { useEffect } from 'react';
import { useAppDispatch } from '../../hooks/hooks';
import { pagesApi, localStorageApi } from '../../api/api';
import { initialPages } from '../../api/apiHelpers';

import { setMessage, applyData } from '../../redux/reducers/bookmarks';

import { setIsDataLoading, setIsDataSyncing } from '../../redux/reducers/loadings';

import { applySettings, initialState as initialSettings } from '../../redux/reducers/settings';

export const useDataQuery = (user: firebase.User | null) => {
  const dispatch = useAppDispatch();
  const userAuthorized = !user?.isAnonymous;

  useEffect(() => {
    batch(() => {
      dispatch(setIsDataLoading(true));
      dispatch(setIsDataSyncing(true));
    });

    // clear localStorage if settings & bookmarks EXIST, but user is UNATHORIZED

    if (user?.isAnonymous === true && 'bookmarks' in localStorage && 'settings' in localStorage) {
      localStorageApi.clear();
    }

    // data process when user is ATHORIZED and settings & bookmarks EXIST in localStorage

    if ('bookmarks' in localStorage && 'settings' in localStorage) {
      const localResponse = {
        pages: localStorageApi.getBookmarks() || initialPages,
        settings: localStorageApi.getSettings() || initialSettings,
      };

      batch(() => {
        dispatch(applyData(localResponse.pages));
        dispatch(applySettings(localResponse.settings));
        dispatch(setIsDataLoading(false));
      });
    }

    // after check localStorage if still no user break here until next getUser iteration with existing user

    if (!user) return;

    // data process when settings & bookmarks NOT EXIST in localStorage and user EXISTS

    pagesApi.getData(user.uid).then((response) => {
      if (!response) return dispatch(setMessage('Bad server responce'));
      if (typeof response === 'string') return dispatch(setMessage(response));

      if (userAuthorized) {
        localStorageApi.setBookmarks(response.pages);
        localStorageApi.setSettings(response.settings);
      }

      batch(() => {
        dispatch(applyData(response.pages));
        dispatch(applySettings(response.settings));
        dispatch(setIsDataLoading(false));
        dispatch(setIsDataSyncing(false));
      });
    });
  }, [user]);

  return [!userAuthorized];
};
