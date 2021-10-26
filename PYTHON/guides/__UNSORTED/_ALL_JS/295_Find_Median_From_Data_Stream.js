/**
 * @constructor
 */
let MedianFinder = function () {
  this.large = new MinHeap();
  this.small = new MaxHeap();
};

/**
 * @param {integer} word
 * @return {void}
 * Adds a num into the data structure.
 */
MedianFinder.prototype.addNum = function (num) {
  let lg = this.large.peek(); // lg peek is the minimum of large set
  let sm = this.small.peek(); // sm peek is the maximum of small set

  if (num <= sm) {
    this.small.add(num);
  } else {
    this.large.add(num);
  }

  let diff = this.small.size() - this.large.size();
  if (diff > 1) {
    this.large.add(this.small.pop());
  } else if (diff < 0) {
    this.small.add(this.large.pop());
  }
};

/**
 * @return {double}
 * Return median of current data stream
 */
MedianFinder.prototype.findMedian = function () {
  return this.small.size() > this.large.size()
    ? this.small.peek()
    : (this.small.peek() + this.large.peek()) / 2;
};

/**
 * Your MedianFinder object will be instantiated and called as such:
 *  let mf = new MedianFinder();
 * mf.addNum(1);
 * mf.findMedian();
 */

class MaxHeap {
  constructor() {
    this.arr = [];
  }

  peek() {
    return this.arr[0] || null;
  }

  size() {
    return this.arr.length;
  }

  pop() {
    let arr = this.arr;
    let len = arr.length;

    if (len === 0) {
      return null;
    }

    let max = arr[0];
    arr[0] = arr[len - 1]; // swap the last value with max value

    arr.pop();

    this.sinkDown(0);

    return max;
  }

  add(val) {
    let arr = this.arr;
    arr.push(val);
    this.bubbleUp(arr.length - 1);
  }

  bubbleUp(n) {
    let arr = this.arr;

    while (n > 0) {
      let parentN = Math.floor((n + 1) / 2) - 1; // [1,2,3] 1 as root 2 as left child and 3 as right child      2 has idx = 1 and 3 has idx = 2    1/2 will result in parent idx = 0 and 2/2 will result in parent idx = 1. So we need to add one to them and -1 at the end

      if (arr[parentN] > arr[n]) {
        break;
      }

      let tmp = arr[n];
      arr[n] = arr[parentN];
      arr[parentN] = tmp;
      n = parentN;
    }
  }

  sinkDown(n) {
    let arr = this.arr;
    let len = arr.length;
    let val = arr[n];

    while (true) {
      let swap = null;
      let child2N = (n + 1) * 2; // root = 0 right child idx is (0 + 1)*2 = 2
      let child1N = child2N - 1; // right child idx - 1 = 1 for root's left child

      if (child1N < len && arr[child1N] > val) {
        swap = child1N;
      }

      if (child2N < len && arr[child2N] > val && arr[child2N] >= arr[child1N]) {
        swap = child2N;
      }

      if (swap === null) {
        break;
      }

      let tmp = arr[n];
      arr[n] = arr[swap];
      arr[swap] = tmp;
      n = swap;
    }
  }
}

class MinHeap {
  constructor() {
    this.arr = [];
  }

  peek() {
    return this.arr[0] || null;
  }

  size() {
    return this.arr.length;
  }

  pop() {
    let arr = this.arr;
    let len = arr.length;

    if (len === 0) {
      return null;
    }

    let min = arr[0];
    arr[0] = arr[len - 1]; // swap the last value with min value

    arr.pop();

    this.sinkDown(0);

    return min;
  }

  add(val) {
    let arr = this.arr;
    arr.push(val);
    this.bubbleUp(arr.length - 1);
  }

  bubbleUp(n) {
    let arr = this.arr;

    while (n > 0) {
      let parentN = Math.floor((n + 1) / 2) - 1; // [1,2,3] 1 as root 2 as left child and 3 as right child      2 has idx = 1 and 3 has idx = 2    1/2 will result in parent idx = 0 and 2/2 will result in parent idx = 1. So we need to add one to them and -1 at the end

      if (arr[parentN] <= arr[n]) {
        break;
      }

      let tmp = arr[n];
      arr[n] = arr[parentN];
      arr[parentN] = tmp;
      n = parentN;
    }
  }

  sinkDown(n) {
    let arr = this.arr;
    let len = arr.length;
    let val = arr[n];

    while (true) {
      let swap = null;
      let child2N = (n + 1) * 2; // root = 0 right child idx is (0 + 1)*2 = 2
      let child1N = child2N - 1; // right child idx - 1 = 1 for root's left child
      if (child1N < len && arr[child1N] < val) {
        swap = child1N;
      }

      if (child2N < len && arr[child2N] < val && arr[child2N] <= arr[child1N]) {
        swap = child2N;
      }

      if (swap === null) {
        break;
      }

      let tmp = arr[n];
      arr[n] = arr[swap];
      arr[swap] = tmp;
      n = swap;
    }
  }
}
