export class Queue<T> {
  private store: T[] = []
  constructor(initialData: Array<T> = []) {
    this.store.push(...initialData)
  }

  push(val: T) {
    this.store.push(val)
  }

  pop(): T | undefined {
    return this.store.shift()
  }

  isEmpty(): boolean {
    return this.size() === 0
  }

  size(): number {
    return this.store.length
  }
}
