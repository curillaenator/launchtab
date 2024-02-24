import { useReducer } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { createPage, createBookmark } from '../../../redux/reducers/bookmarks';

export interface States {
  name: string;
  link: string;
  imageURL?: string;
  iconURL: string;
}

export type Handlers = {
  handleName: (nameString: string) => void;
  handleLink: (linkString: string) => void;
  handleIconURL: (urlString: string) => void;
};

const formReducer = (prev: States, action: { key: keyof States; payload: string }) => ({
  ...prev,
  [action.key]: action.payload,
});

export const useCreateForm = (
  create: 'new-page' | 'new-bookmark',
): [States, Handlers, (close: () => void) => void, () => void] => {
  const dispatch = useAppDispatch();

  const [formState, dispatchForm] = useReducer(formReducer, { name: '', link: '', iconURL: '' });
  const { name, link, iconURL } = formState;

  const resetFormState = () => {
    dispatchForm({ key: 'name', payload: '' });
    dispatchForm({ key: 'link', payload: '' });
    dispatchForm({ key: 'iconURL', payload: '' });
  };

  const handlers: Handlers = {
    handleName: (string) => dispatchForm({ key: 'name', payload: string }),
    handleLink: (string) => dispatchForm({ key: 'link', payload: string }),
    handleIconURL: (string) => dispatchForm({ key: 'iconURL', payload: string }),
  };

  const handleCreate = (close: () => void) => {
    const submitName = name.trim();
    const submitLink = link.trim().replace(/^https?:\/\//, '');
    const submitIcon = iconURL.trim();

    if (create === 'new-page' && submitName) {
      dispatch(createPage(submitName));
      close();
    }

    if (create === 'new-bookmark' && submitName && submitLink) {
      dispatch(createBookmark(submitName, submitLink, null, submitIcon || null));
      close();
    }
  };

  return [formState, handlers, handleCreate, resetFormState];
};
