// This pattern involves dividing a data set into smaller chunks and then repeating a process with a subset of data.
// This pattern can tremendously decerease time complexity

// Given a SORTED array of intengers (needs to be sorted), write a function called search, 
  // which accepts a value and returns the index where the value passed to the function is located.
  // If the value is not found, return -1
  // Examples:
    // search([1, 2, 3, 4, 5, 6], 4) --> 3
    // search([1, 2, 3, 4, 5, 6], 6) --> 5
    // search([1, 2, 3, 4, 5, 6], 11) --> -1


// Naive Solution: Linear Search, time complexity O(N)

function search(arr, val) {
  for (let i = 0; i < arr.length; i++) {
    if (arr[i] === val) {
        return i
      }
  }
  return -1;
}

// Refactored: Binary Search, time complexity Log(N)

function search(arr, val) {
  let min = 0;
  let max = arr.length - 1;

  while (min <= max) {
    let middle = Math.floor((min + max) / 2);
    let currentElement = arr[middle];

    if (arr[middle] < val) {
      min = middle + 1;
    }
    else if (arr[middle] > val) {
      max = middle - 1;
    }
    else {
      return middle
    }
  }
  return -1;
}

[1, 2, 3, 5, 6, 8, 9, 12, 15, 16, 29]
// In the array above, Linear Search just goes one by one to find whatever value/element you're looking for.
// Binary Search will divide the array into smaller parts...
// since the array is sorted, we can focus on the middle value and ask, 
  // "is the value we're looking for greater than the middle value?"
  // If it is, our function won't even look at the entire first half of the array, and vise-versa.
// For larger data sets, it will continue to divide and conquer, continuously reducing the size of the data set that's being used


