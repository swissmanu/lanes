import { useDragLayer, XYCoord } from "react-dnd";
import styled from "styled-components";
import Card from "./Card";

const Layer = styled.div`
  position: fixed;
  pointer-events: none;
  z-index: 100;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
`;

const PreviewCard = styled(Card)`
  width: 238px;
  transform: rotate(2deg);
`;

interface DragLayerProps {}

function getItemStyles(
  initialOffset: XYCoord | null,
  currentOffset: XYCoord | null
) {
  if (!initialOffset || !currentOffset) {
    return {
      display: "none",
    };
  }

  const { x, y } = currentOffset;
  const transform = `translate(${x}px, ${y}px)`;
  return {
    transform,
    WebkitTransform: transform,
  };
}

const DragLayer: React.FC<DragLayerProps> = () => {
  const { itemType, isDragging, item, initialOffset, currentOffset } =
    useDragLayer((monitor) => ({
      item: monitor.getItem(),
      itemType: monitor.getItemType(),
      initialOffset: monitor.getInitialSourceClientOffset(),
      currentOffset: monitor.getSourceClientOffset(),
      isDragging: monitor.isDragging(),
    }));

  function renderItem() {
    switch (itemType) {
      case "task":
        return <PreviewCard>Task</PreviewCard>;
      default:
        return null;
    }
  }

  if (!isDragging) {
    return null;
  }

  return (
    <Layer>
      <div style={getItemStyles(initialOffset, currentOffset)}>
        {renderItem()}
      </div>
    </Layer>
  );
};
export default DragLayer;
