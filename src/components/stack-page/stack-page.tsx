import React, { useState, useMemo, ChangeEvent, MouseEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./stack-page.module.css";
import { ElementTypes, ElementStates } from "../../types/element-states";
import { Stack } from "./utils";
import { SHORT_DELAY_IN_MS } from "../../constants/delays";
import setDelay from "../../utils/delay";

export const StackPage: React.FC = () => {
  const [stackToRender, setStackToRender] = useState<ElementTypes[]>([]);
  const [currIndex, setCurrIndex] = useState(0);
  const [values, setValues] = useState("");
  const [loader, setLoader] = useState({
    add: false,
    delete: false,
    clear: false,
  });

  const stack = useMemo(() => new Stack<ElementTypes>(), []);

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

  const handlePush = async (elem: string, e: MouseEvent<HTMLButtonElement>) => {
    setLoader({ ...loader, add: true });

    stack.push({ letter: elem, state: ElementStates.Changing });
    setStackToRender([...stack.getElements()]);

    setValues("");
    await setDelay(SHORT_DELAY_IN_MS);

    stack.peak()!.state = ElementStates.Default;
    setStackToRender([...stack.getElements()]);
    setCurrIndex(currIndex + 1);

    setLoader({ ...loader, add: false });
  };

  const handlePop = async (e: MouseEvent<HTMLButtonElement>) => {
    setLoader({ ...loader, delete: true });
    setCurrIndex(stack.getSize() - 1);
    stack.peak()!.state = ElementStates.Changing;
    setStackToRender([...stack.getElements()]);
    await setDelay(SHORT_DELAY_IN_MS);

    stack.pop();
    setStackToRender([...stack.getElements()]);

    setLoader({ ...loader, delete: false });
  };

  const reset = (e: MouseEvent<HTMLButtonElement>) => {
    setLoader({ ...loader, clear: true });
    stack.reset();
    setStackToRender([...stack.getElements()]);
    setCurrIndex(0);
    setLoader({ ...loader, clear: false });
  };

  return (
    <SolutionLayout title="Стек">
      <form className={styles.form}>
        <Input
          maxLength={4}
          isLimitText={true}
          placeholder="Введите значение"
          value={values}
          name="elem"
          onChange={onChange}
          extraClass="mr-6"
        />
        <Button
          text={"Добавить"}
          type="button"
          isLoader={loader.add}
          disabled={!values}
          onClick={(e) => handlePush(values, e)}
          extraClass="mr-6"
        />
        <Button
          text={"Удалить"}
          type="button"
          isLoader={loader.delete}
          disabled={currIndex === 0}
          onClick={(e) => handlePop(e)}
          extraClass="mr-40"
        />
        <Button
          text={"Очистить"}
          type="reset"
          disabled={currIndex === 0}
          isLoader={loader.clear}
          onClick={(e) => reset(e)}
        />
      </form>
      {stackToRender && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {stackToRender.map((item, index) => (
              <li key={index}>
                <Circle
                  letter={item.letter}
                  state={item.state}
                  index={index}
                  head={index === stackToRender.length - 1 ? "top" : null}
                />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
