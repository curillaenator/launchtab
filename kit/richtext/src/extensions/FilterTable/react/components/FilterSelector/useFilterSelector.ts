import { useState, useEffect } from 'react';
import { htmlToText } from '../../utils';

import { useFilterTableCtx } from '../../context';

import { TABULATOR_FILTERS, SELECT_FILTER_TYPE_RE } from './constants';
import type { FilterSelectItem, FilterSelectorProps } from './interfaces';

const useFilterSelector = (props: FilterSelectorProps) => {
  const { tabultorRef } = props;
  const { headingNames, isTableReady } = useFilterTableCtx();

  const [isAdd, setIsAdd] = useState<boolean>(false);

  const [selectedCol, setSelectedCol] = useState<string>(headingNames[0]);
  const [selectedFilterType, setSelectedFilterType] = useState<FilterSelectItem>(TABULATOR_FILTERS[0]);
  const [valueSelectorItems, setValueSelectorItems] = useState<string[]>([]);
  const [inputValue, setInputValue] = useState<string>('');

  const isValueSelector = SELECT_FILTER_TYPE_RE.test(selectedFilterType.key.toLowerCase());

  useEffect(() => {
    if (!isTableReady || !isValueSelector) return;

    const colValues = tabultorRef.current?.current
      ?.getData('visible')
      .map((row) => htmlToText(row[selectedCol] || '', false).slice(0, 40));

    const uniqueColValues = [...new Set(colValues)];

    setValueSelectorItems(uniqueColValues);
    setInputValue(uniqueColValues[0] || '');
  }, [isTableReady, selectedCol, selectedFilterType, isValueSelector]);

  return {
    isAdd,
    setIsAdd,

    selectedCol,
    setSelectedCol,

    selectedFilterType,
    setSelectedFilterType,

    valueSelectorItems,

    inputValue,
    setInputValue,

    isValueSelector,
  };
};

export { useFilterSelector };
