import React, { FC, useId, useMemo, useRef } from 'react';
import { setDefaultOptions } from 'date-fns';
import { ru } from 'date-fns/locale';

import { useEditor, EditorContext } from '@tiptap/react';

import { RichTextView } from './RichTextView';

// import { useCanUploadDrawIo, useEnableOnChageFn } from './hooks';
import { isContentSemiEmpty, parseJSONWithoutError } from './utils';

import { getExtensions } from './getExtensions';
// import { getStruct } from './getStruct';

import type { RichtextContainerProps } from './interfaces';
import { DEFAULT_TEST_ID } from './constants';

setDefaultOptions({ locale: ru });

const RichTextContainer: FC<RichtextContainerProps> = (props) => {
  const {
    dataTestId = DEFAULT_TEST_ID,

    // disabled = false,
    editable = true,

    initialValue,
    // placeholder,

    // maxHeight = 'auto',
    // className,

    // onEditorInstanceChange,
    // onEditorContentWidthChange,

    onChange,

    // toolStruct,

    extensionsOptions,
  } = props;

  const editorContentRef = useRef<HTMLDivElement | null>(null);

  const internalScrollContainerId = useId();

  // const tocNodeConfig = tocCfg?.scrollContainerId
  //   ? { title: tocCfg?.title || '', scrollContainerId: tocCfg.scrollContainerId }
  //   : { title: tocCfg?.title || '', scrollContainerId: internalScrollContainerId };

  // const { isOnChangeEnabledRef, enableEditorOnChangeFn } = useEnableOnChageFn();

  // const canUploadDrawIo = useCanUploadDrawIo(drawioCfg);
  // const canHandlePlantUml = useCanHandlePlantUml(plantUmlCfg);

  const editor = useEditor(
    {
      editable,

      extensions: getExtensions({
        extensionsOptions,

        config: {
          dataTestId,
          editorContentRef,
          internalScrollContainerId,
        },
      }),

      content: parseJSONWithoutError(initialValue),

      onUpdate: (v) => {
        // if (!isOnChangeEnabledRef.current) return;

        const json = v.editor.getJSON();

        onChange?.({
          value: json,

          // когда редактор пуст и пользователь сразу создает элементы документа
          // синтаксисом (например список через ввод символа * + space ). В момент преобразования вводимых символов в
          // элементы доукумента текстовый контент документа исчезает, но контент не пуст
          isSemiEmpty: isContentSemiEmpty(json),

          // hasOnlyImage: isOnlyImageContent(json),

          // hasText: !!v.editor.getText().trim().length,

          // isEditable: editable,
        });
      },
    },
    [editable, initialValue, onChange],
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
