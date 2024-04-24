import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { TAIL, HEAD } from "../../constants/element-captions";
import { ElementStates } from "../../types/element-states";
import styles from "./queue-page.module.css";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { queue } from "./utils";
import { nanoid } from "nanoid";
import setDelay from "../../utils/delay";

export const QueuePage: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [array, setArray] = useState<string[]>(queue.getElements());
  const [currIndex, setCurrIndex] = useState<number | null>(null);
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const enqueue = async () => {
    setLoader({ ...loader, add: true });
    setCurrIndex(queue.getTail());
    await setDelay(SHORT_DELAY_IN_MS);
    queue.enqueue(inputValue);
    setArray([...queue.getElements()]);
    setInputValue("");
    setCurrIndex(null);
    setLoader({ ...loader, add: false });
  };

  const dequeue = async () => {
    setLoader({ ...loader, delete: true });
    setCurrIndex(queue.getHead());
    await setDelay(SHORT_DELAY_IN_MS);
    queue.dequeue();
    setArray([...queue.getElements()]);
    if (queue.isEmpty()) {
      queue.clear();
    }
    setCurrIndex(null);
    setLoader({ ...loader, delete: false });
  };

  const clear = async () => {
    setLoader({ ...loader, clear: true });
    await setDelay(SHORT_DELAY_IN_MS);
    queue.clear();
    setArray([...queue.getElements()]);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Очередь">
      <div className={styles.form}>
        <Input
          maxLength={4}
          isLimitText
          onChange={onChange}
          value={inputValue}
          disabled={queue.isFull()}
        />
        <Button
          text="Добавить"
          type="button"
          onClick={enqueue}
          isLoader={loader.add}
          disabled={!inputValue || queue.isFull()}
        />
        <Button
          text="Удалить"
          type="button"
          onClick={dequeue}
          isLoader={loader.delete}
          disabled={queue.isEmpty()}
        />
        <Button
          text="Очистить"
          type="button"
          onClick={clear}
          extraClass={styles.button}
          isLoader={loader.clear}
          disabled={queue.isEmpty()}
        />
      </div>
      <ul className={styles.symbolList}>
        {array?.map((element, index) => {
          return (
            <Circle
              key={nanoid()}
              index={index}
              letter={element}
              state={
                index === currIndex
                  ? ElementStates.Changing
                  : ElementStates.Default
              }
              head={index === queue.getHead() && !queue.isEmpty() ? HEAD : ""}
              tail={
                index === queue.getTailIndex() && !queue.isEmpty() ? TAIL : ""
              }
            />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
