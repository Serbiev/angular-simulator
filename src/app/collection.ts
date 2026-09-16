class Collection<T> {

  private items: T[];

  constructor(items: T[] = []) {
    this.items = items;
  }

  getAll(): T[] {
    return this.items;
  }

  getItem(index: number): T {
    return this.items[index];
  }

  clear(): void {
    this.items = [];
  }

  remove(index: number): void {
    this.items.splice(index, 1);
  }

  replace(index: number, replacement: T): void {
    if (index >= 0 && index < this.items.length) {
      this.items[index] = replacement;
    }
  }

}

const nameCollection: Collection<string> = new Collection(['Apple', 'banana', 'orange']);
const numberCollection: Collection<number> = new Collection([1, 2, 3]);