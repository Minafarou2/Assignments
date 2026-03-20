function findKthPositive(arr, k) {
  let i = 0;
  let num = 1;

  while (k > 0) {
    if (i < arr.length && arr[i] === num) {
      i++;
    } else {
      k--;
      if (k === 0) return num;
    }
    num++;
  }
}

console.log(findKthPositive([2, 3, 4, 7, 11], 5));
console.log(findKthPositive([1, 2, 3, 4], 2));
