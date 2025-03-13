import SortableList from 'react-easy-sort';
import styled from 'styled-components';

const SortableListStyled = styled(SortableList)`
  display: grid;
  grid-template-columns: repeat(4, 3fr);
  gap: 1rem;

  @media (min-width: 1440px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1520px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1920px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 2560px) {
    grid-template-columns: repeat(8, 1fr);
  }

  @media (min-width: 3840px) {
    grid-template-columns: repeat(10, 1fr);
  }
`;

const HoverWrapper = styled.div`
  &:hover {
    z-index: 20;
  }
`;

export { SortableListStyled, HoverWrapper };
