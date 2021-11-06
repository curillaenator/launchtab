import { useState, FormEvent, Dispatch } from "react";

export const useSearch = (): [
  string,
  Dispatch<React.SetStateAction<string>>,
  (e: FormEvent) => Window | null | undefined
] => {
  const [value, setValue] = useState("");

  // const urlRegEx = /(^https?:\/\/)?[a-z0-9~_\-\.]+[a-z]{2,9}/;
  const urlRegExHttps = /(^https?:\/\/)[a-z0-9~_\-]+\.[a-z]{2,9}/;
  const wwwRegEx = /^www\.[a-z0-9~_\-]+\.[a-z]{2,9}/;

  const onSubmit = (e: FormEvent) => {
    if (urlRegExHttps.test(value)) {
      e.preventDefault();
      return window.open(value, "_self");
    }

    if (wwwRegEx.test(value)) {
      e.preventDefault();
      return window.open(`https://${value}`, "_self");
    }
  };

  return [value, setValue, onSubmit];
};
