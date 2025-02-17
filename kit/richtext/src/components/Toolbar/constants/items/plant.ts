import PluntUmlIcon from '../../../../icons/PluntUmlIcon';
import { selectionHasParent } from '../../../../shared/utils';

import type { DropdownItemProps } from '../../../Dropdown';
import type { PlantUMLCommand } from '../../interfaces';

const NODES_WITH_FORBIDDEN_PLANT = ['table'];

const PLANT_ITEMS: DropdownItemProps<PlantUMLCommand>[] = [
  {
    id: 'insertPlantUML',
    Icon: PluntUmlIcon,
    command: (chain) => chain.focus().insertPlantUML().run(),
    isActive: () => false,
    shouldBeDisabled: (editor) => selectionHasParent(editor, NODES_WITH_FORBIDDEN_PLANT),
  },
];

export { PLANT_ITEMS };
