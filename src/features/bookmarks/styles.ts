import SortableList from 'react-easy-sort';
import styled from 'styled-components';

//@ts-expect-error
const SortableListStyled = styled(SortableList)`
  display: grid;
  grid-template-columns: 1fr;
  gap: 1rem;

  @media (min-width: 481px) {
    grid-template-columns: repeat(2, 1fr);
  }

  @media (min-width: 769px) {
    grid-template-columns: repeat(3, 1fr);
  }

  @media (min-width: 1153px) {
    grid-template-columns: repeat(4, 1fr);
  }

  @media (min-width: 1441px) {
    grid-template-columns: repeat(5, 1fr);
  }

  @media (min-width: 1681px) {
    grid-template-columns: repeat(6, 1fr);
  }

  @media (min-width: 1921px) {
    grid-template-columns: repeat(7, 1fr);
  }

  @media (min-width: 2561px) {
    grid-template-columns: repeat(8, 1fr);
  }
`;

const HoverWrapper = styled.div`
  &:hover {
    z-index: 20;
  }
`;

export { SortableListStyled, HoverWrapper };
