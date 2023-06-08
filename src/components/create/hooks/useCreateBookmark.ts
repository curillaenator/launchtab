import { useState, useEffect, useCallback } from 'react';
import { checkImageURL, CheckImageURL } from '@src/helpers/helpers';

const fetchLink = 'https://vector-logos-figma-plugin-api.vercel.app/api/search?query=';

interface IconsResponse {
  [title: string]: string;
}

export const useCreateBookmark = (title: string) => {
  const [isFetchedIconsOpen, setIsFetchedIconsOpen] = useState<boolean>(false);
  const [iconsResponse, setIconsResponce] = useState<IconsResponse[]>([]);

  const [icons, setIcons] = useState<CheckImageURL[]>([]);

  const fetchIcons = useCallback(() => {
    if (!title.trim()) {
      setIsFetchedIconsOpen(false);
      setIcons([]);
      return;
    }

    fetch(`${fetchLink}${title}`, {
      method: 'GET',
      credentials: 'omit', // omit, same-origin или include
      mode: 'cors', // mode: 'cors' | 'same-origin' | 'no-cors'
    })
      .then((res) => res.json())
      .then((json) => setIconsResponce(json.results))
      .catch(() => setIconsResponce([]));
  }, [title]);

  useEffect(() => {
    if (!iconsResponse.length) return;

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

  return {
    iconsWithGoodLinks: icons,
    isFetchedIconsOpen,
    setIsFetchedIconsOpen,
    fetchIcons,
  };
};
