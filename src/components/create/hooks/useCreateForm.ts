import { useReducer, useCallback } from 'react';
import { createPage, createBookmark } from '../../../redux/reducers/bookmarks';

import type { FormStateType, FormActionType } from '../interfaces';

const formReducer = (prev: FormStateType, action: FormActionType) => ({
  ...prev,
  [action.key]: action.payload,
});

export const useCreateForm = (create: 'new-page' | 'new-bookmark') => {
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

    // if (create === 'new-page' && submitName) {
    //   dispatchApp(createPage(submitName));
    // }

    // if (create === 'new-bookmark' && submitName && submitLink) {
    //   dispatchApp(createBookmark(submitName, submitLink, null, submitIcon || null));
    // }
  }, [create, formState]);

  return {
    formContextValue: { formState, dispatchForm, handleCreate },
    resetFormState,
  };
};
