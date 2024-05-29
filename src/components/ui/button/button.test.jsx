import renderer from "react-test-renderer";
import { render, screen, fireEvent } from "@testing-library/react";
import { Button } from "./button";

describe("Тест кнопок", () => {
  it("кнопка с текстом корректно отрисована", () => {
    const button = renderer.create(<Button text="Сортировать" />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Кнопки без текста корректно отрисованы", () => {
    const button = renderer.create(<Button text="" />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Кнопки заблокированная корректно отрисованы", () => {
    const button = renderer.create(<Button disabled />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("Кнопки с индикацией загрузки корректно отрисованы", () => {
    const button = renderer.create(<Button isLoader />).toJSON();
    expect(button).toMatchSnapshot();
  });
  it("корректный вызов колбэка по клику", () => {
    const clickCallBack = jest.fn();
    render(<Button onClick={clickCallBack} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);
    expect(clickCallBack).toHaveBeenCalled();
  });
});
