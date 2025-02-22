import React, { FC, useMemo, useRef, useState, useId } from 'react';
import { NodeViewWrapper, useReactNodeView } from '@tiptap/react';
import { ButtonGhost } from '@launch-ui/button';
import cn from 'classnames';

import {
  // FilterSelector,
  // Actions,
  TabulatorTable,
  // TableSettings,
} from './components';

import { $filterTableCtx as WidgetCtx } from './context';
import { useTable } from './hooks/useTable';
import { useResizers } from './hooks/useResizers';

import { TABLE_WIDTH_CSSV } from './constants';
import type { UiWidgetProps, TabulatorRef, FilterControls } from './interfaces';

import { SettingsIcon, IconEdit } from './icons';

import styles from './widget.module.scss';

export const ReactNodeViewWidget: FC<UiWidgetProps> = (props) => {
  const { selected, editor, extension, node, updateAttributes, getPos } = props;
  const nodeAttrs = node.attrs;

  const { nodeViewContentRef } = useReactNodeView();
  const resizersTableId = useId();

  const { initHeadingNames, colgroup, initTableData, canBeFiltered } = useTable(props);
  const { resizersDomRef } = useResizers({ resizersTableId, editor, colgroup, attrs: node.attrs, updateAttributes });

  const tiptapTableHeightRef = useRef<{ width: number; height: number } | null>(null);

  const tabultorRef = useRef<TabulatorRef | null>(null);
  const filterControlsRef = useRef<FilterControls | null>(null);

  const [headingNames, setHeadingNames] = useState<string[]>(initHeadingNames);

  const [isFilterPresentor, setIsFilterPresentor] = useState<boolean>(canBeFiltered);
  // const [isSaveFiltersSortBtn, setIsSaveFiltersSortBtn] = useState<boolean>(false);
  // const [isSettings, setIsSettings] = useState<boolean>(false);
  const [isTableReady, setIsTableReady] = useState<boolean>(false);

  // const isEditable = editor.options.editable;

  const ctxValue = useMemo(
    () => ({
      // no need as useMemo deps
      filterControlsRef,

      setIsTableReady,
      setHeadingNames,
      // no need as useMemo deps end

      isTableReady,
      canBeFiltered,
      selected,

      headingNames,
      initTableData,

      nodeAttrs,

      updateAttributes,
    }),
    [isTableReady, canBeFiltered, selected, headingNames, initTableData, nodeAttrs, updateAttributes],
  );

  return (
    <NodeViewWrapper as='section' className={cn(styles.nodeViewWrapper)}>
      <WidgetCtx.Provider value={ctxValue}>
        {isFilterPresentor ? (
          <div className={styles.tableContainer}>
            <div className={styles.toolbar} contentEditable={false}>
              <div className={cn(styles.block, styles.block_left)}>
                {/* <FilterSelector tabultorRef={tabultorRef} setIsSaveFiltersSortBtn={setIsSaveFiltersSortBtn} /> */}
              </div>

              <div className={cn(styles.block, styles.block_right)}>
                {/* {isSaveFiltersSortBtn && isEditable && (
                  <ButtonGhost
                    title='Сохранить фильтры/сортировку'
                    onClick={() => filterControlsRef.current?.saveSortFiltersToNodeAttrs?.()}
                  />
                )} */}

                {/* <ButtonGhost LeftIcon={SettingsIcon} onClick={() => setIsSettings(true)} /> */}

                <ButtonGhost LeftIcon={IconEdit} onClick={() => setIsFilterPresentor((p) => !p)} />
              </div>
            </div>

            <TabulatorTable ref={(inst) => (tabultorRef.current = inst)} tableSize={tiptapTableHeightRef.current} />

            {/* <TableSettings
              tabultorRef={tabultorRef}
              open={isSettings}
              close={() => setIsSettings(false)}
              isEditable={isEditable}
            /> */}
          </div>
        ) : (
          <div
            ref={resizersDomRef}
            className={styles.tableContainer}
            data-resizers-container
            data-resizers-table-id={resizersTableId}
          >
            <div className={styles.toolbar} contentEditable={false}>
              <div />

              <div className={cn(styles.block, styles.block_right)}>
                {canBeFiltered && <ButtonGhost onClick={() => setIsFilterPresentor((p) => !p)} title={'Filters'} />}
              </div>
            </div>

            <div
              ref={(inst) => {
                if (!inst) return;
                tiptapTableHeightRef.current = { width: inst.clientWidth, height: inst.clientHeight };
              }}
              className={styles.contentTable}
            >
              <table ref={nodeViewContentRef} style={{ width: `var(${TABLE_WIDTH_CSSV})` }}>
                <colgroup>
                  {colgroup.map(({ colWidthCssv }) => (
                    <col key={`${resizersTableId}-${colWidthCssv}`} style={{ width: `var(${colWidthCssv})` }} />
                  ))}
                </colgroup>
              </table>
            </div>
          </div>
        )}
      </WidgetCtx.Provider>
    </NodeViewWrapper>
  );
};
