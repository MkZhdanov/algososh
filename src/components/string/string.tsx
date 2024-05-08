import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import { ElementTypes, ElementStates } from "../../types/element-states";
import styles from "./string.module.css";
import { nanoid } from "nanoid";
import { stringReverse } from "./utils";
import useMounted from "../../utils/useMounted";

export const StringComponent: React.FC = () => {
  const [inputValue, setInputValue] = useState("");
  const [loader, setLoader] = useState(false);
  const [array, setArray] = useState<Array<ElementTypes>>();
  const isMounted = useMounted();

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const onSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newArray = inputValue.split("").map((letter: string) => {
      return { letter, state: ElementStates.Default };
    });
    if (!isMounted.current) return;
    stringReverse(newArray, setLoader, setInputValue, setArray);
  };

  return (
    <SolutionLayout title="Строка">
      <form className={styles.form} onSubmit={onSubmit}>
        <Input
          maxLength={11}
          isLimitText
          onChange={onChange}
          value={inputValue}
        />
        <Button
          text="Развернуть"
          isLoader={loader}
          type="submit"
          disabled={inputValue.length === 0}
        />
      </form>
      <ul className={styles.ul}>
        {array?.map((item) => (
          <Circle key={nanoid()} letter={item.letter} state={item.state} />
        ))}
      </ul>
    </SolutionLayout>
  );
};
