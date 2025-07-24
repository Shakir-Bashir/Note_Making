import { nanoid } from "nanoid";
import type { NodeData, NodeType } from "../utils/types";
import styles from "./Node.module.css";
import {
  useRef,
  useEffect,
  type FormEventHandler,
  type KeyboardEventHandler,
} from "react";
import { useAppState } from "../state/AppStateContext";
import { CommandPanel } from "./CommandPanel";

type BasicNodeProps = {
  node: NodeData;
  upadteFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
};
import cx from "classnames";

export const BasicNode = ({
  node,
  upadteFocusedIndex,
  isFocused,
  index,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

  const showCommandPanel = isFocused && node?.value?.match(/^\//);

  const { changeNodeValue, changeNodeType, removeNodeByIndex, addNode } =
    useAppState();

  useEffect(() => {
    if (isFocused) {
      nodeRef.current?.focus();
    } else {
      nodeRef.current?.blur();
    }
  }, [isFocused]);

  useEffect(() => {
    if (nodeRef.current && !isFocused) {
      nodeRef.current.textContent = node.value;
    }
  }, [node]);

  const parseCommand = (nodeType: NodeType) => {
    if (nodeRef.current) {
      changeNodeType(index, nodeType);
      nodeRef.current.textContent = "";
    }
  };

  const handleInput: FormEventHandler<HTMLDivElement> = ({ currentTarget }) => {
    const { textContent } = currentTarget;
    changeNodeValue(index, textContent || "");
  };

  const handleClick = () => {
    upadteFocusedIndex(index);
  };

  const onKeyDown: KeyboardEventHandler<HTMLDivElement> = (event) => {
    const target = event.target as HTMLDivElement;
    if (event.key === "Enter") {
      event.preventDefault();
      if (target.textContent?.[0] === "/") {
        return;
      }
      const newIndex = index + 1;
      addNode({ type: node.type, value: "", id: nanoid() }, newIndex);
      upadteFocusedIndex(newIndex); // code added
    }
    if (event.key === "Backspace") {
      if (target.textContent?.length === 0) {
        event.preventDefault();
        removeNodeByIndex(index);
        upadteFocusedIndex(index - 1);
      } else if (window?.getSelection()?.anchorOffset === 0) {
        event.preventDefault();
        removeNodeByIndex(index - 1);
        upadteFocusedIndex(index - 1);
      }
    }
  };

  return (
    <>
      {showCommandPanel && (
        <CommandPanel selectItem={parseCommand} nodeText={node.value} />
      )}
      <div
        onClick={handleClick}
        onKeyDown={onKeyDown}
        onInput={handleInput}
        ref={nodeRef}
        contentEditable
        suppressContentEditableWarning
        className={cx(styles.node, styles[node.type])}
      />
    </>
  );
};
