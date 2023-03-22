// Similar to bubble sort, but instead of first placing large values into sorted position,
  // it places small values into sorted position, one at a time, from beginning to end.
  // It goes through an array, finds the smallest value, and puts it at the front by
  // comparing each element to one another to find out which one is the smallest. The larger
  // element of each comparison is moved to the end.
  // Once the first minimum element is found, it is placed at the very front of the dataset.
  // As it continues after finding the first minimum, it only looks at the dataset WITHOUT
    // the minimum that was already found.

// PSEDUOCODE
  // - Store the first element as the smallest value you've seen so far.
  // - Compare this item to the next item in the array until you find a smaller number.
  // - If a smaller number is found, designate that smaller number to be the new "minimum"
    // and continue until the end of the array.
  // - If the "minimum" is not the value (index) you initially began with, swap the two values.
  // - Repeat this with the next element until the array is sorted.

// ES5 VERSION
function selectionSort(arr) {
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }
    // Swap logic, which also makes sure we aren't swapping unnecessarily (when 'i' & 'lowest' are the same) 
    if (i !== lowest) {      
      let temp = arr[i];
      arr[i] = arr[lowest];
      arr[lowest] = temp;
    }
  }
  return arr;
}


// ES2015 VERSION

function selectionSortTwo(arr) {
  // ES2015 SWAP VARIABLE:
  const swap = (arr, idx1, idx2) =>
    ([arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]]);
  // SAME LOOP LOGIC AS BEFORE
  for (let i = 0; i < arr.length; i++) {
    let lowest = i;
    for (let j = i + 1; j < arr.length; j++) {
      if (arr[j] < arr[lowest]) {
        lowest = j;
      }
    }
    // Swap logic, which also makes sure we aren't swapping unnecessarily (when 'i' & 'lowest' are the same) 
    if (i !== lowest) swap(arr, i, lowest);
  }
  return arr;
}


// SELECTION SORT TIME COMP: The above algos are about O(N^2). 
    // Selection Sort is easy to write, but isn't very efficient. It also just helps us
    // Prepare for the other sorting algos.

// Time Complexity:
  // - Best: O(n^2)
  // - Average: O(n^2)
  // - Worst: O(n^2)
  // - Space: O(1)