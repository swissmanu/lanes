import styled from "styled-components";

const Card = styled.div<{ dragging?: boolean }>`
  border-radius: 3px;
  padding: 8px;
  background-color: ${({ dragging, theme }) => (dragging ? theme.card.dragging.background : theme.card.background)};
  color: ${({ dragging, theme }) => (dragging ? theme.card.dragging.color : theme.card.color)};
  box-shadow: ${({ dragging }) => (dragging ? null : "0 1px 0 #091e4240")};
  cursor: pointer;
`;
export default Card;
