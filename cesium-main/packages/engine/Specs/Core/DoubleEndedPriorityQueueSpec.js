import { DoubleEndedPriorityQueue } from "../../index.js";

describe("Core/DoubleEndedPriorityQueue", function () {
  function comparator(a, b) {
    return a - b;
  }

  it("constructor throws without options", function () {
    expect(function () {
      return new DoubleEndedPriorityQueue();
    }).toThrowDeveloperError();
  });

  it("constructor throws if maximum length is less than zero", function () {
    expect(function () {
      return new DoubleEndedPriorityQueue({
        comparator: comparator,
        maximumLength: -1,
      });
    }).toThrowDeveloperError();
  });

  it("constructor throws without comparator", function () {
    expect(function () {
      return new DoubleEndedPriorityQueue({
        comparator: undefined,
      });
    }).toThrowDeveloperError();
  });

  it("gets comparator", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });
    const returnedComparator = queue.comparator;
    expect(returnedComparator).toEqual(comparator);
  });

  it("uses different comparator", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: function (a, b) {
        return b - a;
      },
    });
    queue.insert(1);
    queue.insert(2);

    // The comparator is flipped, so 2 is considered the minimum and 1 is considered the maximum
    expect(queue.length).toEqual(2);
    expect(queue.getMinimum()).toEqual(2);
    expect(queue.getMaximum()).toEqual(1);
  });

  it("checks state of default empty queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    expect(queue.length).toEqual(0);
    expect(queue.maximumLength).toBeUndefined();
    expect(queue.internalArray.length).toEqual(0);
    expect(queue.getMinimum()).toBeUndefined();
    expect(queue.getMaximum()).toBeUndefined();
  });

  it("inserts one element into queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    queue.insert(1);

    expect(queue.length).toEqual(1);
    expect(queue.internalArray.length).toEqual(1);
    expect(queue.getMinimum()).toEqual(1);
    expect(queue.getMaximum()).toEqual(1);
  });

  it("inserts two elements into queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    queue.insert(1);
    queue.insert(2);

    expect(queue.length).toEqual(2);
    expect(queue.internalArray.length).toEqual(2);
    expect(queue.getMinimum()).toEqual(1);
    expect(queue.getMaximum()).toEqual(2);
  });

  it("inserts three elements into queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    queue.insert(1);
    queue.insert(2);
    queue.insert(3);

    expect(queue.length).toEqual(3);
    expect(queue.internalArray.length).toEqual(3);
    expect(queue.getMinimum()).toEqual(1);
    expect(queue.getMaximum()).toEqual(3);
  });

  it("inserts four elements into queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    queue.insert(1);
    queue.insert(2);
    queue.insert(3);
    queue.insert(4);

    expect(queue.length).toEqual(4);
    expect(queue.internalArray.length).toEqual(4);
    expect(queue.getMinimum()).toEqual(1);
    expect(queue.getMaximum()).toEqual(4);
  });

  it("insert removes and returns minimum element when the queue is full", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: 1,
    });

    const nothing = queue.insert(1);
    const removed = queue.insert(2);

    expect(queue.length).toEqual(1);
    expect(queue.maximumLength).toEqual(1);
    expect(queue.internalArray.length).toEqual(1);
    expect(queue.getMinimum()).toEqual(2);
    expect(queue.getMaximum()).toEqual(2);
    expect(nothing).toBeUndefined();
    expect(removed).toEqual(1);
  });

  it("insert returns undefined when new element is less than or equal priority to the minimum element and the queue is full", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: function (a, b) {
        return a.value - b.value;
      },
      maximumLength: 2,
    });

    const obj1 = { value: 1, id: 0 };
    const obj2 = { value: 2, id: 0 };
    const obj3 = { value: 1, id: 1 };
    const obj4 = { value: 0, id: 1 };
    const result1 = queue.insert(obj1);
    const result2 = queue.insert(obj2);
    const result3 = queue.insert(obj3); // ignored because equal priority to minimum
    const result4 = queue.insert(obj4); // ignored because lower priority than minimum

    expect(queue.length).toEqual(2);
    expect(queue.maximumLength).toEqual(2);
    expect(queue.internalArray.length).toEqual(2);
    expect(queue.getMinimum().id).toEqual(0);
    expect(result1).toBeUndefined();
    expect(result2).toBeUndefined();
    expect(result3).toEqual(obj3);
    expect(result4).toEqual(obj4);
  });

  it("remove and return minimum element", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    queue.insert(1);
    queue.insert(2);
    queue.insert(3);

    const minimumValue = queue.removeMinimum();

    expect(queue.length).toEqual(2);
    expect(minimumValue).toEqual(1);
    expect(queue.getMinimum()).toEqual(2);
    // check that the element was dereferenced
    expect(queue.internalArray[2]).toBeUndefined();
  });

  it("removeMinimum returns undefined when queue is empty", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    const minimumValue = queue.removeMinimum();
    expect(minimumValue).toBeUndefined();
  });

  it("remove and return maximum element", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    queue.insert(1);
    queue.insert(2);
    queue.insert(3);

    const maximumValue = queue.removeMaximum();

    expect(queue.length).toEqual(2);
    expect(maximumValue).toEqual(3);
    expect(queue.getMaximum()).toEqual(2);
    // check that the element was dereferenced
    expect(queue.internalArray[2]).toBeUndefined();
  });

  it("removeMaximum returns undefined when queue is empty", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    const maximumValue = queue.removeMaximum();
    expect(maximumValue).toBeUndefined();
  });

  it("clones queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: 4,
    });

    queue.insert(1);
    queue.insert(2);

    const clone = queue.clone();
    expect(clone.length).toEqual(queue.length);
    expect(clone.maximumLength).toEqual(queue.maximumLength);
    expect(clone.comparator).toEqual(queue.comparator);
    expect(clone.getMaximum()).toEqual(queue.getMaximum());
    expect(clone.getMinimum()).toEqual(queue.getMinimum());
  });

  it("resets queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });
    queue.insert(1);
    queue.insert(2);
    queue.reset();

    expect(queue.length).toEqual(0);
    expect(queue.getMinimum()).toBeUndefined();
    expect(queue.getMaximum()).toBeUndefined();
    // check that the elements were dereferenced
    expect(queue.internalArray.length).toEqual(0);
  });

  it("resets queue with maximum length", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: 1,
    });
    queue.insert(1);
    queue.reset();

    expect(queue.length).toEqual(0);
    expect(queue.getMinimum()).toBeUndefined();
    expect(queue.getMaximum()).toBeUndefined();
    // check that the element was dereferenced but the array stayed the same size
    expect(queue.internalArray.length).toEqual(1);
    expect(queue.internalArray[0]).toBeUndefined();
  });

  it("creates queue with maximum length of zero", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: 0,
    });

    queue.insert(1);

    expect(queue.length).toEqual(0);
    expect(queue.maximumLength).toEqual(0);
    expect(queue.internalArray.length).toEqual(0);
    expect(queue.getMinimum()).toBeUndefined();
    expect(queue.getMaximum()).toBeUndefined();
  });

  it("creates queue with maximum length of one", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: 1,
    });

    queue.insert(1);
    queue.insert(2);

    expect(queue.length).toEqual(1);
    expect(queue.maximumLength).toEqual(1);
    expect(queue.internalArray.length).toEqual(1);
    expect(queue.getMinimum()).toEqual(2);
    expect(queue.getMaximum()).toEqual(2);
  });

  it("throws when maximum length is set to less than zero", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    expect(function () {
      queue.maximumLength = -1;
    }).toThrowDeveloperError();
  });

  it("sets maximum length to undefined", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    queue.maximumLength = 2;
    queue.insert(1);
    queue.insert(2);

    queue.maximumLength = undefined;
    queue.insert(3);

    expect(queue.length).toEqual(3);
    expect(queue.maximumLength).toBeUndefined();
    expect(queue.getMinimum()).toEqual(1);
    expect(queue.getMaximum()).toEqual(3);
  });

  it("sets maximum length to less than current length", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    const maximumLength = 5;
    for (let i = 0; i < maximumLength * 2; i++) {
      const value = i;
      queue.insert(value);
    }
    queue.maximumLength = maximumLength;

    expect(queue.length).toEqual(maximumLength);
    expect(queue.maximumLength).toEqual(maximumLength);
    expect(queue.internalArray.length).toEqual(maximumLength);
    expect(queue.getMinimum()).toEqual(maximumLength);
    expect(queue.getMaximum()).toEqual(maximumLength * 2 - 1);
  });

  function isValidQueue(queue) {
    // 1) Remove successive minimum elements from the queue and check if they are sorted correctly
    // 2) Remove successive maximum elements from the queue and check if they are sorted correctly

    const minArray = [];
    const maxArray = [];

    const minQueue = queue.clone();
    const maxQueue = queue.clone();

    while (minQueue.length > 0) {
      minArray.push(minQueue.removeMinimum());
    }
    while (maxQueue.length > 0) {
      maxArray.push(maxQueue.removeMaximum());
    }

    if (minQueue.length !== 0 || maxQueue.length !== 0) {
      return false;
    }

    let i;
    for (i = 0; i < minArray.length - 1; i++) {
      if (minArray[i] > minArray[i + 1]) {
        return false;
      }
    }
    for (i = 0; i < maxArray.length - 1; i++) {
      if (maxArray[i] < maxArray[i + 1]) {
        return false;
      }
    }
    return true;
  }

  it("maintains priority with ascending insertions", function () {
    const length = 200;
    const maximumLength = 100;

    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: maximumLength,
    });

    let pass = true;
    for (let i = 0; i < length; ++i) {
      const value = i;
      queue.insert(value);
      pass = pass && isValidQueue(queue);
    }

    expect(pass).toBe(true);
  });

  it("maintains priority with descending insertions", function () {
    const length = 200;
    const maximumLength = 100;

    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: maximumLength,
    });

    let pass = true;
    for (let i = 0; i < length; ++i) {
      const value = length - 1 - i;
      queue.insert(value);
      pass = pass && isValidQueue(queue);
    }

    expect(pass).toBe(true);
  });

  it("maintains priority with random insertions", function () {
    const length = 200;
    const maximumLength = 100;

    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
      maximumLength: maximumLength,
    });

    let pass = true;
    for (let i = 0; i < length; ++i) {
      const value = Math.random();
      queue.insert(value);
      pass = pass && isValidQueue(queue);
    }

    expect(pass).toBe(true);
  });

  it("resorts queue", function () {
    const queue = new DoubleEndedPriorityQueue({
      comparator: comparator,
    });

    let i;
    const length = 200;

    for (i = 0; i < length; ++i) {
      queue.insert(0);
    }

    // Change all of the queue values to random values to make it unsorted
    const array = queue.internalArray;
    for (i = 0; i < length; i++) {
      array[i] = Math.random();
    }

    queue.resort();

    const pass = isValidQueue(queue);
    expect(pass).toBe(true);
  });
});
