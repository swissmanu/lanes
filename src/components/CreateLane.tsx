import React from "react";
import styled from "styled-components";
import TextEditor from "./TextEditor";

interface CreateLaneProps {
  onCreate: (title: string) => void;
  noOtherLanes?: boolean;
}

const Container = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.createLane.background};
  border-radius: 3px;
  max-height: 100%;
  padding: 8px;

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

const CreateLane: React.FC<CreateLaneProps> = ({ onCreate, noOtherLanes = false }) => {
  const onChange = React.useCallback(
    (title: string) => {
      if (title.trim().length > 0) {
        onCreate(title);
      }
    },
    [onCreate]
  );

  const placeholder = React.useMemo(() => (noOtherLanes ? "Add a lane" : "Add another lane"), [noOtherLanes]);

  return (
    <Container>
      <LaneTitle value="" placeholder={placeholder} onChange={onChange} keepFocusOnChange />
    </Container>
  );
};
export default CreateLane;
