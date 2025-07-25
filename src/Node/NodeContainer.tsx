import type { NodeData } from "../utils/types";
import { CSS } from "@dnd-kit/utilities";
import { useSortable } from "@dnd-kit/sortable";
import { NodeTypeSwitcher } from "./NodeTypeSwitcher";
import styles from "./NodeContainer.module.css";

type NodeContainerProps = {
  node: NodeData;
  upadteFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};

export const NodeContainer = ({
  node,
  index,
  isFocused,
  upadteFocusedIndex,
}: NodeContainerProps) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({
      id: node.id,
    });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div
      {...attributes}
      style={style}
      ref={setNodeRef}
      className={styles.container}
    >
      <div {...listeners} className={styles.dragHandle}>
        ⠿
      </div>
      <NodeTypeSwitcher
        node={node}
        index={index}
        isFocused={isFocused}
        upadteFocusedIndex={upadteFocusedIndex}
      />
    </div>
  );
};
