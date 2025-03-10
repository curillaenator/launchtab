import React, { FC, useId, useMemo, useRef } from 'react';
import { useEditor, EditorContext } from '@tiptap/react';
import { setDefaultOptions } from 'date-fns';
import { enUS } from 'date-fns/locale';

import { RichTextView } from './RichTextView';

import { useEnableOnChageFn } from './hooks';
import { isContentSemiEmpty, parseJSONWithoutError } from './utils';
import { getExtensions } from './getExtensions';

import type { RichtextContainerProps } from './interfaces';

setDefaultOptions({ locale: enUS });

const RichTextContainer: FC<RichtextContainerProps> = (props) => {
  const { extensionsOptions, editable = true, initialValue, onChange } = props;

  const editorContentRef = useRef<HTMLDivElement | null>(null);

  const internalScrollContainerId = useId();

  const { isOnChangeEnabledRef, enableEditorOnChangeFn } = useEnableOnChageFn();

  // const canUploadDrawIo = useCanUploadDrawIo(drawioCfg);
  // const canHandlePlantUml = useCanHandlePlantUml(plantUmlCfg);

  const editor = useEditor(
    {
      editable,

      extensions: getExtensions({
        extensionsOptions,
        editorContentRef,
        internalScrollContainerId,
        enableEditorOnChangeFn,
      }),

      content: parseJSONWithoutError(initialValue),

      onUpdate: (v) => {
        if (!isOnChangeEnabledRef.current) return;

        const json = v.editor.getJSON();

        onChange?.({
          value: json,

          // когда редактор пуст и пользователь сразу создает элементы документа
          // синтаксисом (например список через ввод символа * + space ). В момент преобразования вводимых символов в
          // элементы доукумента текстовый контент документа исчезает, но контент не пуст
          isSemiEmpty: isContentSemiEmpty(json),
        });
      },
    },
    [editable, initialValue, onChange, enableEditorOnChangeFn],
  );

  const editorCTX = useMemo(() => ({ editor }), [editor]);

  return (
    <EditorContext.Provider value={editorCTX}>
      <RichTextView
        {...props}
        editorContentRef={editorContentRef}
        internalScrollContainerId={internalScrollContainerId}
      />
    </EditorContext.Provider>
  );
};

export { RichTextContainer };
