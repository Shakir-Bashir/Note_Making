import { nanoid } from "nanoid";
import type { NodeData } from "../utils/types";
import syles from "./Node.module.css";
import {
  useRef,
  useEffect,
  type FormEventHandler,
  type KeyboardEventHandler,
} from "react";

type BasicNodeProps = {
  node: NodeData;
  upadteFocusedIndex(index: number): void;
  isFocused: boolean;
  index: number;
  addNode(node: NodeData, index: number): void;
  removeNodeByIndex(index: number): void;
  changeNodeValue(index: number, value: string): void;
};

export const BasicNode = ({
  node,
  upadteFocusedIndex,
  isFocused,
  index,
  addNode,
  removeNodeByIndex,
  changeNodeValue,
}: BasicNodeProps) => {
  const nodeRef = useRef<HTMLDivElement>(null);

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
    <div
      onClick={handleClick}
      onKeyDown={onKeyDown}
      onInput={handleInput}
      ref={nodeRef}
      contentEditable
      suppressContentEditableWarning
      className={syles.node}
    />
  );
};
