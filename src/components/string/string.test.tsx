import { stringReverse } from "./utils";
import { ElementTypes, ElementStates } from "../../types/element-states";

const emptyArr: ElementTypes[] = [];
const oneElArr: ElementTypes[] = [
  { letter: "a", state: ElementStates.Default },
];
const oneElArrSorted: ElementTypes[] = [
  { letter: "a", state: ElementStates.Modified },
];
const testEven: ElementTypes[] = [
  { letter: "т", state: ElementStates.Default },
  { letter: "е", state: ElementStates.Default },
  { letter: "к", state: ElementStates.Default },
  { letter: "с", state: ElementStates.Default },
  { letter: "т", state: ElementStates.Default },
];
const sortedEven: ElementTypes[] = [
  { letter: "т", state: ElementStates.Modified },
  { letter: "с", state: ElementStates.Modified },
  { letter: "к", state: ElementStates.Modified },
  { letter: "е", state: ElementStates.Modified },
  { letter: "т", state: ElementStates.Modified },
];
const testOdd: ElementTypes[] = [
  { letter: "м", state: ElementStates.Default },
  { letter: "о", state: ElementStates.Default },
  { letter: "с", state: ElementStates.Default },
  { letter: "т", state: ElementStates.Default },
];
const sortedOdd: ElementTypes[] = [
  { letter: "т", state: ElementStates.Modified },
  { letter: "с", state: ElementStates.Modified },
  { letter: "о", state: ElementStates.Modified },
  { letter: "м", state: ElementStates.Modified },
];

const mockSetLoader = jest.fn();
const mockSetInputValue = jest.fn();
const mockSetArr = jest.fn();

describe("Тестирование алгоритма разворота строки", () => {
  it("Алгоритм корректно разворачивает строку с четным количеством символом", async () => {
    await stringReverse(testOdd, mockSetLoader, mockSetInputValue, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedOdd);
  });
  it("Алгоритм корректно разворачивает строку с нечетным количеством символом", async () => {
    await stringReverse(testEven, mockSetLoader, mockSetInputValue, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedEven);
  });
  it("Алгоритм корректно разворачивает строку с одним символом", async () => {
    await stringReverse(oneElArr, mockSetLoader, mockSetInputValue, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });
  it("Алгоритм корректно разворачивает строку с пустым массивом", async () => {
    await stringReverse(emptyArr, mockSetLoader, mockSetInputValue, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(emptyArr);
  });
});
