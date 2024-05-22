import { Dispatch, SetStateAction } from "react";
import setDelay from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import { Direction } from "../../types/direction";
import { SortTypes, ElementStates } from "../../types/element-states";

const swap = (value: SortTypes[], firstItem: number, secondItem: number) => {
  return ([value[firstItem], value[secondItem]] = [
    value[secondItem],
    value[firstItem],
  ]);
};

export const selectSort = async (
  arr: SortTypes[],
  order: Direction,
  setLoader: Dispatch<
    SetStateAction<{
      ascending: boolean;
      descending: boolean;
      loader: boolean;
    }>
  >,
  setArray: Dispatch<Array<SortTypes>>
) => {
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
        arr[j].state = ElementStates.Default;
      }
      setArray([...arr]);
    }
    swap(arr, maxInd, i);
    arr[maxInd].state = ElementStates.Default;
    arr[i].state = ElementStates.Modified;
    setArray([...arr]);
  }
  setLoader({ loader: false, descending: false, ascending: false });
};

export const bubbleSort = async (
  arr: SortTypes[],
  order: Direction,
  setLoader: Dispatch<
    SetStateAction<{
      ascending: boolean;
      descending: boolean;
      loader: boolean;
    }>
  >,
  setArray: Dispatch<Array<SortTypes>>
) => {
  const { length } = arr;
  for (let i = 0; i < length; i++) {
    for (let j = 0; j < length - i - 1; j++) {
      arr[j].state = ElementStates.Changing;
      arr[j + 1].state = ElementStates.Changing;
      setArray([...arr]);
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
