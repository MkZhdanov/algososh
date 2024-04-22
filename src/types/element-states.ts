export enum ElementStates {
  Default = "default",
  Changing = "changing",
  Modified = "modified",
}

export type ElementTypes = {
  letter: string;
  state: ElementStates;
};

export type SortTypes = {
  index: number;
  state: ElementStates;
};

export enum CirclePosition {
  head = "head",
  tail = "tail",
}

export type CircleState = {
  modifiedIndex: number;
  changingIndex: number;
};
