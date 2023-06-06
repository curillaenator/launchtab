import { useState } from 'react';
import { useAppDispatch } from '../../../hooks/hooks';
import { createPage, createBookmark } from '../../../redux/reducers/bookmarks';

export interface States {
  name: string;
  link: string;
  imageURL: string;
  imageURLerror: boolean;
  iconURL: string;
}

export type Handlers = {
  handleName: (nameString: string) => void;
  handleLink: (linkString: string) => void;
  handleImageURL: (urlString: string) => void;
  handleImageURLerror: (error: boolean) => void;
  handleIconURL: (urlString: string) => void;
};

export const useCreateForm = (
  create: 'new-page' | 'new-bookmark',
): [States, Handlers, (close: () => void) => void, () => void] => {
  const dispatch = useAppDispatch();

  const [name, setName] = useState('');

  const [link, setLink] = useState('');

  const [imageURL, setImageURL] = useState('');
  const [imageURLerror, setImageURLerror] = useState(false);

  const [iconURL, setIconURL] = useState('');

  const resetFormState = () => {
    setName('');
    setLink('');
    setImageURL('');
    setImageURLerror(false);
    setIconURL('');
  };

  const states: States = {
    name,
    link,
    imageURL,
    imageURLerror,
    iconURL,
  };

  const handlers: Handlers = {
    handleName: (string) => setName(string),
    handleLink: (string) => setLink(string),
    handleImageURL: (urlString) => setImageURL(urlString),
    handleImageURLerror: (error) => setImageURLerror(error),
    handleIconURL: (urlString) => setIconURL(urlString),
  };

  const handleCreate = (close: () => void) => {
    const submitName = name.trim();
    const submitLink = link.trim();
    const submitImage = imageURL.trim();
    const submitIcon = iconURL.trim();

    if (create === 'new-page' && submitName) {
      dispatch(createPage(submitName));
      close();
    }

    if (create === 'new-bookmark' && submitName && submitLink) {
      const isImageURL = !!submitImage ? submitImage : null;
      const isIconsURL = !!submitIcon ? submitIcon : null;

      dispatch(createBookmark(submitName, submitLink, isImageURL, isIconsURL));
      close();
    }
  };

  return [states, handlers, handleCreate, resetFormState];
};
