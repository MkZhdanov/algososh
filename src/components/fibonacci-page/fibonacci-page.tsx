import React, { useState, ChangeEvent, FormEvent } from "react";
import { SolutionLayout } from "../ui/solution-layout/solution-layout";
import { Input } from "../ui/input/input";
import { Button } from "../ui/button/button";
import { Circle } from "../ui/circle/circle";
import styles from "./fibonacci-page.module.css";
import { renderFib } from "./utils";

export const FibonacciPage: React.FC = () => {
  const [fibArray, setFibArray] = useState<number[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [values, setValues] = useState("");

  const initialFib = [1, 1];

  const onChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValues(e.target.value);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    renderFib(Number(values), initialFib, setIsLoading, setFibArray);
  };

  return (
    <SolutionLayout title="Последовательность Фибоначчи">
      <form className={styles.form} onSubmit={handleSubmit}>
        <Input
          type="number"
          max={19}
          min={1}
          isLimitText={true}
          value={values}
          name="index"
          onChange={onChange}
          extraClass="mr-6"
        />
        <Button
          text={"Развернуть"}
          type="submit"
          isLoader={isLoading}
          disabled={
            !values ||
            Number(values) < 1 ||
            Number(values) > 19 ||
            !Number.isInteger(Number(values))
          }
        />
      </form>
      {fibArray && (
        <div className={styles.wrapper}>
          <ul className={styles.series}>
            {fibArray.map((item, index) => (
              <li key={index}>
                <Circle letter={item.toString()} index={index} />
              </li>
            ))}
          </ul>
        </div>
      )}
    </SolutionLayout>
  );
};
