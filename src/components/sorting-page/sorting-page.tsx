import React, { useState, ChangeEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { RadioInput } from "../ui/radio-input/radio-input";
import { Button } from "../ui/button/button";
import { Column } from "../ui/column/column";
import styles from "./sorting-page.module.css";
import { SortTypes, ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";
import { nanoid } from "nanoid";
import { selectSort, bubbleSort } from "./utils";

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

  const getNewArray = () => {
    setArray(randomArr());
  };

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setRadioValue(e.target.value);
  };

  const handleSort = (order: Direction) => {
    if (radioValue === "selectionSort") {
      if (order === Direction.Ascending) {
        setLoader({ ...loader, loader: true, ascending: true });
      } else {
        setLoader({ ...loader, loader: true, descending: true });
      }
      selectSort(array, order, setLoader, setArray);
    } else {
      if (order === Direction.Ascending) {
        setLoader({ ...loader, loader: true, ascending: true });
      } else {
        setLoader({ ...loader, loader: true, descending: true });
      }
      bubbleSort(array, order, setLoader, setArray);
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
