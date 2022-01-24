import React from "react";
import styled from "styled-components";
import TextEditor from "./TextEditor";

interface CreateLaneProps {
  onCreate: (title: string) => void;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.createLane.background};
  border-radius: 3px;
  max-height: 100%;
  padding: 8px 8px 8px 14px;

  &:focus-within {
    background-color: ${(props) => props.theme.lane.background};
  }
`;

const LaneTitle = styled(TextEditor)`
  &::placeholder {
    color: ${(props) => props.theme.createLane.placeholderColor};
    opacity: 1;
  }

  &:focus&::placeholder {
    color: ${(props) => props.theme.createLane.focusedPlaceholderColor};
    opacity: 0.3;
  }
`;

const CreateLane: React.FC<CreateLaneProps> = ({ onCreate }) => {
  const key = React.useRef(0);

  const onChange = React.useCallback(
    (title: string) => {
      if (title.trim().length > 0) {
        onCreate(title);
        key.current++; // Increment to force Rerender of TextEditor 🧙‍♂️
      }
    },
    [onCreate]
  );

  return (
    <Container>
      <LaneTitle key={key.current} value="" placeholder="Add another lane" onChange={onChange} />
    </Container>
  );
};
export default CreateLane;
