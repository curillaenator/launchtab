import { useState, useEffect, Dispatch } from 'react';
import { checkImageURL, CheckImageURL } from '../../../helpers/helpers';

const fetchLink = 'https://vector-logos-figma-plugin-api.vercel.app/api/search?query=';

interface IconsResponse {
  [title: string]: string;
}

export const useCreateBookmark = (
  title: string,
): [CheckImageURL[], boolean, Dispatch<React.SetStateAction<boolean>>, () => void] => {
  const [isFetchedIconsOpen, setIsFetchedIconsOpen] = useState<boolean>(false);
  const [iconsResponse, setIconsResponce] = useState<IconsResponse[]>([]);
  const [icons, setIcons] = useState<CheckImageURL[]>([]);

  const fetchIcons = () => {
    if (!title.trim()) {
      setIsFetchedIconsOpen(false);
      setIcons([]);
      return;
    }

    fetch(`${fetchLink}${title}`, { credentials: 'omit' })
      .then((res) => res.json())
      .then((json) => setIconsResponce(json.results))
      .catch(() => setIconsResponce([]));
  };

  useEffect(() => {
    const urlsCheck = iconsResponse.map((icon) => checkImageURL(icon.url));

    Promise.all(urlsCheck).then((res) => {
      const goodLinks = res.length ? res.filter((resItem) => resItem.ok) : [];

      if (!goodLinks.length) {
        setIcons([]);
        setIsFetchedIconsOpen(false);
        return;
      }

      setIcons(goodLinks);
      setIsFetchedIconsOpen(true);
    });
  }, [iconsResponse]);

  return [icons, isFetchedIconsOpen, setIsFetchedIconsOpen, fetchIcons];
};
