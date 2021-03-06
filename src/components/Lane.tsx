import React from "react";
import { useDrop } from "react-dnd";
import styled from "styled-components";
import { LaneViewModel, TaskViewModel } from "../model/viewModels";
import moveCard from "../model/viewModels/moveCard";
import { Tail } from "../util/tail";
import CreateTask from "./CreateTask";
import DraggableTask from "./DraggableTask";
import TextEditor from "./TextEditor";

const LaneContainer = styled.div`
  display: flex;
  flex-direction: column;
  background-color: ${(props) => props.theme.lane.background};
  border-radius: 3px;
  max-height: 100%;
  padding-bottom: 8px;
`;

const Header = styled.header`
  padding: 10px 14px;
  font-weight: 600;
`;
const HiddenTitle = styled.h2`
  display: none;
`;
const TitleEditor = styled(TextEditor)`
  width: 100%;
  min-height: 17px;
`;

const Content = styled.div`
  overflow-y: scroll;
`;

const Tasks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  padding: 0 8px;
  margin-bottom: 8px;
`;

const Footer = styled.footer`
  padding: 0 8px;
`;

interface LaneProps {
  lane: LaneViewModel;
  tasks: ReadonlyArray<TaskViewModel>;
  onChange: (lane: LaneViewModel) => void;
  onMoveTask: (...x: Tail<Parameters<typeof moveCard>>) => void;
  onCreateTask: (task: Pick<TaskViewModel, "title" | "notes" | "laneId">) => void;
}

const Lane: React.FC<LaneProps> = ({ lane, tasks, onChange, onMoveTask, onCreateTask: onCreateTaskInLane }) => {
  // const createOnChangeTask = React.useCallback(
  //   (index: number) => (task: TaskModel) => {
  //     onChange({
  //       ...lane,
  //       tasks: [...lane.tasks.slice(0, index), task, ...lane.tasks.slice(index + 1)],
  //     });
  //   },
  //   [lane, onChange]
  // );
  const ref = React.useRef<HTMLDivElement>(null);

  const onChangeLaneTitle = React.useCallback(
    (title: string) => {
      if (title !== lane.title) {
        onChange({ ...lane, title });
      }
    },
    [lane, onChange]
  );

  const onCreateTask = React.useCallback(
    (task: Pick<TaskViewModel, "title" | "notes">) => {
      onCreateTaskInLane({ ...task, laneId: lane.id });
    },
    [lane.id, onCreateTaskInLane]
  );

  const [, drop] = useDrop<TaskViewModel, unknown, unknown>(
    {
      accept: "task",
      canDrop: () => tasks.length === 0,
      hover: (item, monitor) => {
        if (monitor.isOver({ shallow: true }) && monitor.canDrop()) {
          onMoveTask(item.id, 0, lane.id);
        }
      },
    },
    [onMoveTask, tasks, lane.id]
  );
  drop(ref);

  return (
    <LaneContainer ref={ref}>
      <Header>
        <HiddenTitle>{lane.title}</HiddenTitle>
        <TitleEditor value={lane.title} onChange={onChangeLaneTitle} inTabOrder />
      </Header>
      <Content>
        {tasks.length > 0 ? (
          <Tasks>
            {tasks.map((task, i) => (
              <DraggableTask key={task.id} task={task} onChange={() => {}} onMove={onMoveTask} />
            ))}
          </Tasks>
        ) : null}
        <Footer>
          <CreateTask onCreate={onCreateTask} />
        </Footer>
      </Content>
    </LaneContainer>
  );
};
export default Lane;
