import { Dispatch, SetStateAction } from "react";
import setDelay from "../../utils/delay";
import { DELAY_IN_MS } from "../../constants/delays";
import { ElementTypes, ElementStates } from "../../types/element-states";

const swap = (value: ElementTypes[], firstItem: number, secondItem: number) => {
  return ([value[firstItem], value[secondItem]] = [
    value[secondItem],
    value[firstItem],
  ]);
};

export const stringReverse = async (
  newArray: ElementTypes[],
  setLoader: Dispatch<SetStateAction<boolean>>,
  setInputValue: Dispatch<SetStateAction<string>>,
  setArray: Dispatch<Array<ElementTypes>>
) => {
  setArray(newArray);
  setLoader(true);
  const endString = newArray.length - 1;
  const middleString = Math.ceil(newArray.length / 2);

  for (let i = 0; i < middleString; i++) {
    let j = endString - i;

    if (i !== j) {
      newArray[i].state = ElementStates.Changing;
      newArray[j].state = ElementStates.Changing;
      setArray([...newArray]);
      await setDelay(DELAY_IN_MS);
    }
    swap(newArray, i, j);

    newArray[i].state = ElementStates.Modified;
    newArray[j].state = ElementStates.Modified;

    setArray([...newArray]);
  }

  setLoader(false);
  setInputValue("");
};
