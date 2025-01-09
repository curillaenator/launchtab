import { useReducer, useCallback } from 'react';
import { useUnit as useEffectorUnit } from 'effector-react';
import { $bookmarksStore, createTab } from '@src/entities/bookmarks';
import { $userStore } from '@src/entities/user';

import type { FormStateType, FormActionType } from '../interfaces';

const formReducer = (prev: FormStateType, action: FormActionType) => ({
  ...prev,
  [action.key]: action.payload,
});

export const useCreateForm = (create: 'new-page' | 'new-bookmark') => {
  const { uid } = useEffectorUnit($userStore);
  const { tabs } = useEffectorUnit($bookmarksStore);

  const [formState, dispatchForm] = useReducer(formReducer, { name: '', link: '', iconURL: '' });

  const resetFormState = () => {
    dispatchForm({ key: 'name', payload: '' });
    dispatchForm({ key: 'link', payload: '' });
    dispatchForm({ key: 'iconURL', payload: '' });
  };

  const handleCreate = useCallback(() => {
    const { name, link, iconURL } = formState;

    const submitName = name.trim();
    const submitLink = link.trim().replace(/^https?:\/\//, '');
    const submitIcon = iconURL.trim();

    if (create === 'new-page' && uid && submitName) {
      createTab({ uid, tabs, tabName: submitName });
    }

    // if (create === 'new-bookmark' && submitName && submitLink) {
    //   dispatchApp(createBookmark(submitName, submitLink, null, submitIcon || null));
    // }
  }, [create, formState]);

  return {
    formContextValue: { formState, dispatchForm, handleCreate },
    resetFormState,
  };
};
