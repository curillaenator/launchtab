import type { PlantUmlConfig } from '../extensions/PlantUML/core/interfaces';
export const useCanHandlePlantUml = ({ generatePlant }: PlantUmlConfig | undefined = {}) => !!generatePlant;
