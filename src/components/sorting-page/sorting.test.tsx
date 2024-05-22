import { bubbleSort, selectSort } from "./utils";
import { SortTypes, ElementStates } from "../../types/element-states";
import { Direction } from "../../types/direction";

const emptyArr: SortTypes[] = [];
const oneElArr: SortTypes[] = [{ index: 1, state: ElementStates.Default }];
const oneElArrSorted: SortTypes[] = [
  { index: 1, state: ElementStates.Modified },
];
const testArr: SortTypes[] = [
  { index: 3, state: ElementStates.Default },
  { index: 5, state: ElementStates.Default },
  { index: 1, state: ElementStates.Default },
  { index: 4, state: ElementStates.Default },
  { index: 2, state: ElementStates.Default },
];
const sortedAsc: SortTypes[] = [
  { index: 1, state: ElementStates.Modified },
  { index: 2, state: ElementStates.Modified },
  { index: 3, state: ElementStates.Modified },
  { index: 4, state: ElementStates.Modified },
  { index: 5, state: ElementStates.Modified },
];
const sortedDesc: SortTypes[] = [
  { index: 5, state: ElementStates.Modified },
  { index: 4, state: ElementStates.Modified },
  { index: 3, state: ElementStates.Modified },
  { index: 2, state: ElementStates.Modified },
  { index: 1, state: ElementStates.Modified },
];

const mockSetLoader = jest.fn();
const mockSetArr = jest.fn();

jest.setTimeout(30000);

describe("Тестирование алгоритмов сортировки выбором", () => {
  it("Сортировка выбором пустого массива по возрастанию", async () => {
    await selectSort(emptyArr, Direction.Ascending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });
  it("Сортировка выбором пустого массива по убыванию", async () => {
    await selectSort(emptyArr, Direction.Descending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });
  it("Сортировка выбором массива с одним элементом по возрастанию", async () => {
    await selectSort(oneElArr, Direction.Ascending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });
  it("Сортировка выбором массива с одним элементом по убыванию", async () => {
    await selectSort(oneElArr, Direction.Descending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });
  it("Сортировка выбором массива с несколькими элементами по возрастанию", async () => {
    await selectSort(testArr, Direction.Ascending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedAsc);
  });
  it("Сортировка выбором массива с несколькими элементами по убыванию", async () => {
    await selectSort(testArr, Direction.Descending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedDesc);
  });
});

describe("Тестирование алгоритмов сортировки пузырьком", () => {
  it("Сортировка пузырьком пустого массива по возрастанию", async () => {
    await bubbleSort(emptyArr, Direction.Ascending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });
  it("Сортировка пузырьком пустого массива по убыванию", async () => {
    await bubbleSort(emptyArr, Direction.Descending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenCalledTimes(0);
  });
  it("Сортировка пузырьком массива с одним элементом по возрастанию", async () => {
    await bubbleSort(oneElArr, Direction.Ascending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });
  it("Сортировка пузырьком массива с одним элементом по убыванию", async () => {
    await bubbleSort(oneElArr, Direction.Descending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(oneElArrSorted);
  });
  it("Сортировка пузырьком массива с несколькими элементами по возрастанию", async () => {
    await bubbleSort(testArr, Direction.Ascending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedAsc);
  });
  it("Сортировка пузырьком массива с несколькими элементами по убыванию", async () => {
    await bubbleSort(testArr, Direction.Descending, mockSetLoader, mockSetArr);
    expect(mockSetArr).toHaveBeenLastCalledWith(sortedDesc);
  });
});
