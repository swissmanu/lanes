import React from "react";
import styled from "styled-components";
import { TaskViewModel } from "../model/viewModels";
import extractTitleAndNotesFromString from "../util/extractTitleAndNotesFromString";
import Card from "./Card";
import TextEditor from "./TextEditor";

interface CreateTaskProps {
  onCreate: (task: Pick<TaskViewModel, "title" | "notes">) => void;
}

const EditorCard = styled(Card)`
  background: none;
  box-shadow: none;
  margin-bottom: 1px; // Ensure Box Shadow is visible

  &:focus-within {
    background: ${({ theme }) => theme.card.background};
    box-shadow: 0 1px 0 #091e4240;
    padding-bottom: 8px;
  }

  &:hover&:not(&:focus-within) {
    background: ${({ theme }) => theme.card.dragging.background};
  }
`;

const TaskEditor = styled(TextEditor)`
  width: 100%;

  &::placeholder {
    color: ${(props) => props.theme.createTask.placeholderColor};
    opacity: 1;
  }

  &:focus&::placeholder {
    color: ${(props) => props.theme.createTask.focusedPlaceholderColor};
  }
`;

const CreateTask: React.FC<CreateTaskProps> = ({ onCreate }) => {
  const key = React.useRef(0);

  const onChange = React.useCallback(
    (input: string) => {
      if (input.trim().length > 0) {
        const [title, notes] = extractTitleAndNotesFromString(input);

        if (title) {
          onCreate({ title, notes });
          key.current++; // Increment to force Rerender of TextEditor 🧙‍♂️
        }
      }
    },
    [onCreate]
  );

  return (
    <EditorCard>
      <TaskEditor key={key.current} value="" placeholder="Add a card" onChange={onChange} allowInputLineBreak />
    </EditorCard>
  );
};
export default CreateTask;
