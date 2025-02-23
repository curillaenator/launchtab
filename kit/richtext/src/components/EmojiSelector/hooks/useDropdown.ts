import { useControledDropdown, useAnimation, useCombineControledAnimated } from '@launch-ui/dropable';

import type { EmojiSelectorProps } from '../interfaces';

export const useDropdown = (props: EmojiSelectorProps) => {
  const controled = useControledDropdown();
  const animated = useAnimation();

  const { isOpen, closeDropdown, ...combinedControled } = useCombineControledAnimated({
    controled,
    animated,
    rest: props,
  });

  return {
    ...props,
    ...combinedControled,

    isOpen,
    closeDropdown,
  };
};
