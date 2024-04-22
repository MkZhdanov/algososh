interface IStack<T> {
  push: (item: T) => void;
  pop: () => void;
  peak: () => T | null;
  getSize: () => number;
  getElements: () => Array<T>;
  reset: () => void;
}

export class Stack<T> implements IStack<T> {
  private container: T[] = [];

  push = (item: T): void => {
    this.container[this.getSize()] = item;
  };

  pop = (): void => {
    if (this.container.length > 0) {
      delete this.container[this.getSize() - 1];
      this.container.length = this.getSize() - 1;
    }
  };

  peak = (): T | null => {
    if (this.container.length > 0) {
      return this.container[this.getSize() - 1];
    }
    return null;
  };

  getSize = () => this.container.length;

  getElements = () => this.container;

  reset = () => (this.container = []);
}
