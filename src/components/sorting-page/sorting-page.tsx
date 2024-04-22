import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { SortTypes, ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { nanoid } from "nanoid";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

export const SortingPage: React.FC = () => {
  const [radioValue, setRadioValue] = useState("selectionSort");
  const [array, setArray] = useState<SortTypes[]>(randomArr());
  const [loader, setLoader] = useState({
    ascending: false,
    descending: false,
    loader: false,
  });

  function randomArr(): SortTypes[] {
    const minLen = 3;
    const maxLen = 17;
    const len = Math.floor(Math.random() * (maxLen - minLen + 1)) + minLen;
    const arr: SortTypes[] = [];
    for (let i = 0; i < len; i++) {
      const randInt = Math.floor(Math.random() * 101);
      arr.push({ index: randInt, state: ElementStates.Default });
    }
    return arr;
  }

  const swap = (value: SortTypes[], firstItem: number, secondItem: number) => {
    return ([value[firstItem], value[secondItem]] = [
      value[secondItem],
      value[firstItem],
    ]);
  };

  const getNewArray = () => {
    setArray(randomArr());
  };

  function setDelay(delay: number) {
    return new Promise<void>((res) => setTimeout(res, delay));
  }

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  const selectSort = async (arr: SortTypes[], order: Direction) => {
    if (order === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      let maxInd = i;
      arr[maxInd].state = ElementStates.Changing;
      for (let j = i + 1; j < length; j++) {
        arr[j].state = ElementStates.Changing;
        setArray([...arr]);
        await setDelay(SHORT_DELAY_IN_MS);
        if (
          order === Direction.Ascending
            ? arr[j].index < arr[maxInd].index
            : arr[j].index > arr[maxInd].index
        ) {
          maxInd = j;
          arr[j].state = ElementStates.Changing;
          arr[maxInd].state =
            i === maxInd ? ElementStates.Changing : ElementStates.Default;
        }
        if (j !== maxInd) {
          array[j].state = ElementStates.Default;
        }
        setArray([...arr]);
      }
      swap(array, maxInd, i);
      array[maxInd].state = ElementStates.Default;
      array[i].state = ElementStates.Modified;
      setArray([...array]);
    }
    setLoader({ loader: false, descending: false, ascending: false });
  };

  const bubbleSort = async (arr: SortTypes[], order: Direction) => {
    if (order === Direction.Ascending) {
      setLoader({ ...loader, loader: true, ascending: true });
    } else {
      setLoader({ ...loader, loader: true, descending: true });
    }
    const { length } = arr;
    for (let i = 0; i < length; i++) {
      for (let j = 0; j < length - i - 1; j++) {
        arr[j].state = ElementStates.Changing;
        arr[j + 1].state = ElementStates.Changing;
        setArray([...array]);
        await setDelay(SHORT_DELAY_IN_MS);
        if (
          order === Direction.Ascending
            ? arr[j].index > arr[j + 1].index
            : arr[j].index < arr[j + 1].index
        ) {
          swap(arr, j, j + 1);
        }
        arr[j].state = ElementStates.Default;
      }
      arr[arr.length - i - 1].state = ElementStates.Modified;
      setArray([...arr]);
    }
    setLoader({ loader: false, descending: false, ascending: false });
  };

  const handleSort = (order: Direction) => {
    if (radioValue === "selectionSort") {
      selectSort(array, order);
    } else {
      bubbleSort(array, order);
    }
  };

  return (
    <SolutionLayout title="Сортировка массива">
      <div className={styles.form}>
        <div className={styles.form__radioButtons}>
          <RadioInput
            label="Выбор"
            name="sortType"
            value="selectionSort"
            defaultChecked
            onChange={onChange}
            disabled={loader.loader}
          />
          <RadioInput
            label="Пузырёк"
            name="sortType"
            value="bubbleSort"
            onChange={onChange}
            disabled={loader.loader}
          />
        </div>
        <div className={styles.form__buttons}>
          <Button
            text="По возрастанию"
            sorting={Direction.Ascending}
            onClick={() => handleSort(Direction.Ascending)}
            isLoader={loader.ascending}
            disabled={loader.descending}
            extraClass={styles.button}
          />
          <Button
            text="По убыванию"
            sorting={Direction.Descending}
            onClick={() => handleSort(Direction.Descending)}
            isLoader={loader.descending}
            disabled={loader.ascending}
            extraClass={styles.button}
          />
          <Button
            text="Новый массив"
            onClick={getNewArray}
            disabled={loader.loader}
          />
        </div>
      </div>
      <ul className={styles.symbolList}>
        {array?.map((item) => {
          return (
            <Column key={nanoid()} index={item.index} state={item.state} />
          );
        })}
      </ul>
    </SolutionLayout>
  );
};
