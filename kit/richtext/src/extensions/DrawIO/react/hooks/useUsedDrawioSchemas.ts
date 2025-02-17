import { useEffect } from 'react';

import type { UiWidgetProps } from '../interfaces';

/**
 * @description используется storage tiptap экстеншена, в который складываются ID отрисованных в документе файлов
 */
const useUsedDrawioSchemas = (props: UiWidgetProps) => {
  const {
    node: { attrs },
    extension: { storage },
  } = props;

  useEffect(() => {
    if (!attrs.drawIoCode || storage.includedFiles.includes(attrs.drawIoCode)) return;

    storage.includedFiles.push(attrs.drawIoCode);

    return () => {
      storage.includedFiles = storage.includedFiles.filter((el: string) => el !== attrs.drawIoCode);
    };
  }, [attrs.drawIoCode]);
};

export { useUsedDrawioSchemas };
