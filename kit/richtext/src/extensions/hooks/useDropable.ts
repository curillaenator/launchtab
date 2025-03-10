import { useControledDropdown, useAnimation, useCombineControledAnimated, DropableProps } from '@launch-ui/dropable';

const useDropable = (props?: DropableProps) => {
  const controled = useControledDropdown();
  const animated = useAnimation();

  return useCombineControledAnimated({
    controled,
    animated,
    rest: props || {},
  });
};

export { useDropable };
