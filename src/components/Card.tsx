import styled from "styled-components";

const Card = styled.div<{ dragging?: boolean }>`
  border-radius: 3px;
  padding: 8px;
  background-color: ${({ dragging }) => (dragging ? "#E1E3E7" : "white")};
  color: ${({ dragging }) => (dragging ? "#E1E3E7" : "black")};
  box-shadow: ${({ dragging }) => (dragging ? null : "0 1px 0 #091e4240")};
  cursor: pointer;
`;
export default Card;
