import renderer from "react-test-renderer";
import { Circle } from "./circle";
import { ElementStates } from "../../../types/element-states";

describe("Тестирование компонента Circle", () => {
  it("корректная отрисовка компонента без буквы", () => {
    const circle = renderer.create(<Circle letter="" />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент с буквой отрисован корректно", () => {
    const circle = renderer.create(<Circle letter="text" />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент с head отрисован корректно", () => {
    const circle = renderer.create(<Circle head="head" />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент с  react-элементом в head отрисован корректно", () => {
    const circle = renderer.create(<Circle head={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент с tail отрисован корректно", () => {
    const circle = renderer.create(<Circle tail="tail" />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент с react-элементом в tail отрисован корректно", () => {
    const circle = renderer.create(<Circle tail={<Circle />} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент с индексом отрисован корректно", () => {
    const circle = renderer.create(<Circle index={1} />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент с пропом isSmall отрисован корректно", () => {
    const circle = renderer.create(<Circle isSmall />).toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент в состоянии default отрисован корректно", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Default} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент в состоянии changing отрисован корректно", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Changing} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
  it("Компонент в состоянии modified отрисован корректно", () => {
    const circle = renderer
      .create(<Circle state={ElementStates.Modified} />)
      .toJSON();
    expect(circle).toMatchSnapshot();
  });
});
