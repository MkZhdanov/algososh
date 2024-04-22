import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { ArrowIcon } from "../ui/icons/arrow-icon";
import styles from "./list-page.module.css";
import { nanoid } from "nanoid";
import { NodeType, linkedList } from "./type";
import {
  CirclePosition,
  CircleState,
  ElementStates,
} from "../../types/element-states";
import { Circle } from "../ui/circle/circle";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const ListPage: React.FC = () => {
  const [state, setState] = useState({
    modifiedIndex: -1,
    changingIndex: -1,
  });
  const [array, setArray] = useState<NodeType<string>[]>(linkedList.getArray());
  const [loader, setLoader] = useState({
    addToHead: false,
    addToTail: false,
    deleteInHead: false,
    deleteInTail: false,
    addToIndex: false,
    deleteToIndex: false,
    disabled: false,
  });
  const [circleIndex, setCircleIndex] = useState(-1);
  const [position, setPosition] = useState<CirclePosition>();
  const [currentValue, setCurrentValue] = useState("");
  const [inputValue, setInputValue] = useState({
    value: "",
    index: "",
  });

  const setDelay = (ms: number) => {
    return new Promise((resolve) => setTimeout(resolve, ms));
  };

  const setCircleState = (
    index: number,
    circleState: CircleState
  ): ElementStates => {
    return circleState.modifiedIndex === index
      ? ElementStates.Modified
      : circleState.changingIndex >= index
      ? ElementStates.Changing
      : ElementStates.Default;
  };

  const renderAddHead = async () => {
    setLoader({ ...loader, addToHead: true, disabled: true });
    setCurrentValue(inputValue.value);
    setCircleIndex(0);
    setPosition(CirclePosition.head);
    await setDelay(SHORT_DELAY_IN_MS);
    setCircleIndex(-1);
    linkedList.addToFront(inputValue.value);
    setArray([...linkedList.getArray()]);
    setState({ ...state, modifiedIndex: 0 });
    await setDelay(SHORT_DELAY_IN_MS);
    setState({ ...state, modifiedIndex: -1 });
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addToHead: false, disabled: false });
  };

  const renderAddTail = async () => {
    setLoader({ ...loader, addToTail: true, disabled: true });
    setCurrentValue(inputValue.value);
    setCircleIndex(linkedList.getSize() - 1);
    setPosition(CirclePosition.head);
    await setDelay(SHORT_DELAY_IN_MS);
    setCircleIndex(-1);
    linkedList.addToEnd(inputValue.value);
    setArray([...linkedList.getArray()]);
    setState({ ...state, modifiedIndex: linkedList.getSize() - 1 });
    await setDelay(SHORT_DELAY_IN_MS);
    setState({ ...state, modifiedIndex: -1 });
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addToTail: false, disabled: false });
  };

  const handleDeleteHead = async () => {
    setLoader({ ...loader, deleteInHead: true, disabled: true });
    setCurrentValue(linkedList.getFirst()!.val);
    linkedList.getFirst()!.val = "";
    setCircleIndex(0);
    setPosition(CirclePosition.tail);
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.deleteAtFront();
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteInHead: false, disabled: false });
  };

  const handleDeleteTail = async () => {
    setLoader({ ...loader, deleteInTail: true, disabled: true });
    setCurrentValue(linkedList.getLast()!.val);
    linkedList.getLast()!.val = "";
    setCircleIndex(linkedList.getSize() - 1);
    setPosition(CirclePosition.tail);
    await setDelay(SHORT_DELAY_IN_MS);
    linkedList.deleteAtEnd();
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    await setDelay(SHORT_DELAY_IN_MS);
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteInTail: false, disabled: false });
  };

  const addAtIndex = async () => {
    setLoader({ ...loader, addToIndex: true, disabled: true });
    for (let i = -1; i <= Number(inputValue.index); i++) {
      setCurrentValue(inputValue.value);
      setPosition(CirclePosition.head);
      setCircleIndex(i);
      setState({ ...state, changingIndex: i - 1 });
      await setDelay(SHORT_DELAY_IN_MS);
    }
    linkedList.addAtIndex(Number(inputValue.index), inputValue.value);
    setCircleIndex(-1);
    setArray([...linkedList.getArray()]);
    setState({ ...state, modifiedIndex: Number(inputValue.index) });
    await setDelay(SHORT_DELAY_IN_MS);
    setState({ ...state, modifiedIndex: -1 });
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, addToIndex: false, disabled: false });
  };

  const deleteAtIndex = async () => {
    setLoader({ ...loader, deleteToIndex: true, disabled: true });
    for (let i = 0; i <= Number(inputValue.index); i++) {
      setState({ ...state, changingIndex: i });
      await setDelay(SHORT_DELAY_IN_MS);
    }
    setState({ ...state, changingIndex: Number(inputValue.index) - 1 });
    setCurrentValue(
      String(linkedList.getAtIndex(Number(inputValue.index))?.val)
    );
    linkedList.getAtIndex(Number(inputValue.index))!.val = "";
    setArray([...linkedList.getArray()]);
    setCircleIndex(Number(inputValue.index));
    setPosition(CirclePosition.tail);
    linkedList.deleteAtIndex(Number(inputValue.index));
    await setDelay(SHORT_DELAY_IN_MS);
    setArray([...linkedList.getArray()]);
    setState({ ...state, changingIndex: -1 });
    setInputValue({ value: "", index: "" });
    setLoader({ ...loader, deleteToIndex: false, disabled: false });
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue({ ...inputValue, [e.target.name]: e.target.value });
  };

  const showHeadCircle = (index: number) => {
    if (circleIndex === index && position === CirclePosition.head) {
      return (
        <Circle isSmall letter={currentValue} state={ElementStates.Changing} />
      );
    } else if (index === 0) {
      return "head";
    } else {
      return undefined;
    }
  };

  const showTailCircle = (index: number) => {
    if (circleIndex === index && position === CirclePosition.tail) {
      return (
        <Circle isSmall letter={currentValue} state={ElementStates.Changing} />
      );
    } else if (index === array.length - 1) {
      return "tail";
    } else {
      return undefined;
    }
  };

  return (
    <SolutionLayout title="Связный список">
      <div className={styles.form}>
        <div className={styles.form__container}>
          <Input
            maxLength={4}
            isLimitText
            placeholder="Введите значение"
            name="value"
            value={inputValue.value}
            onChange={onChange}
          />
          <Button
            type="button"
            text="Добавить в head"
            extraClass={`${styles.button} ${styles.button_size_small}`}
            onClick={renderAddHead}
            disabled={
              !inputValue.value || loader.disabled || array.length === 7
            }
            isLoader={loader.addToHead}
          />
          <Button
            type="button"
            text="Добавить в tail"
            extraClass={`${styles.button} ${styles.button_size_small}`}
            onClick={renderAddTail}
            disabled={
              !inputValue.value || loader.disabled || array.length === 7
            }
            isLoader={loader.addToTail}
          />
          <Button
            type="button"
            text="Удалить из head"
            extraClass={`${styles.button} ${styles.button_size_small}`}
            onClick={handleDeleteHead}
            disabled={!array || loader.disabled || array.length === 0}
            isLoader={loader.deleteInHead}
          />
          <Button
            type="button"
            text="Удалить из tail"
            extraClass={`${styles.button} ${styles.button_size_small}`}
            onClick={handleDeleteTail}
            disabled={!array || loader.disabled || array.length === 0}
            isLoader={loader.deleteInTail}
          />
        </div>
        <div className={styles.form__container}>
          <Input
            type="number"
            placeholder="Введите индекс"
            name="index"
            min={0}
            max={array.length - 1}
            value={inputValue.index}
            onChange={onChange}
          />
          <Button
            type="button"
            text="Добавить по индексу"
            extraClass={`${styles.button} ${styles.button_size_large}`}
            onClick={addAtIndex}
            disabled={
              !(inputValue.index && inputValue.value) ||
              loader.disabled ||
              Number(inputValue.index) > array.length - 1 ||
              Number(inputValue.index) < 0
            }
            isLoader={loader.addToIndex}
          />
          <Button
            type="button"
            text="Удалить по индексу"
            extraClass={`${styles.button} ${styles.button_size_large}`}
            onClick={deleteAtIndex}
            disabled={
              !inputValue.index ||
              loader.disabled ||
              Number(inputValue.index) > array.length - 1 ||
              Number(inputValue.index) < 0
            }
            isLoader={loader.deleteToIndex}
          />
        </div>
      </div>
      <ul className={styles.symbolList}>
        {array?.map((item, index) => {
          return (
            <li className={styles.symbolList__item} key={nanoid()}>
              <Circle
                extraClass={styles.circle}
                index={index}
                letter={item.val}
                state={setCircleState(index, state)}
                head={showHeadCircle(index)}
                tail={showTailCircle(index)}
              />
              {index !== array.length - 1 && <ArrowIcon />}
            </li>
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
