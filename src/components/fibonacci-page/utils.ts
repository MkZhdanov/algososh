import { Dispatch, SetStateAction } from "react";
import setDelay from "../../utils/delay";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";

const calcFibArray = (index: number, initialArr: number[]) => {
  for (let i = 2; i <= index; i++) {
    initialArr[i] = initialArr[i - 1] + initialArr[i - 2];
  }

  return initialArr;
};

export const renderFib = async (
  index: number,
  initialArr: number[],
  setIsLoading: Dispatch<SetStateAction<boolean>>,
  setFibArray: Dispatch<SetStateAction<number[]>>
) => {
  setIsLoading(true);
  setFibArray([]);
  const fibArray = calcFibArray(index, initialArr);

  for (let fib of fibArray) {
    setFibArray((arr) => [...arr, fib]);
    await setDelay(SHORT_DELAY_IN_MS);
  }
  setIsLoading(false);
};
