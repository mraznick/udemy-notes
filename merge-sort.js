// OUR FIRST INTERMEDIATE SORTING ALGO - MERGE SORT

// So far, the sorting algorithms we've learned so far don't scale well. They're only effective on smaller data sets.
  // For example, using bubble sort on an array of 100,000 elements would take upwards of 20 seconds.
  // If you use merge sort instead, it's almost instant.

// With faster sorts, our time complexity can improve from O(n^2) to O(n log n)
  // However, we trade this efficiency for complexity.

// Merge Sort exploits the fact that arrays of 0 or 1 element are always sorted.
// Merge sort works by decomposing an array into smaller arrays of 0 or 1 elements, then building up a newly sorted array

// VISUALIZATION:
  // - Start with this array: [ 8, 3, 5, 4, 7, 6, 1, 2 ]
  // - Merge sort splits that array into two arrays:
    // [ 8, 3, 5, 4 ] and [ 7, 6, 1, 2 ]
  // - Then each of those two arrays are split in two as well:
    // [ 8, 3 ] and [ 5, 4 ] *** [ 7, 6 ] and [ 1, 2 ]
  // - Then each of those four arrays are split in two again:
    // [ 8 ] [ 3 ] [ 5 ] [ 4 ] [ 7 ] [ 6 ] [ 1 ] [ 2 ]
  // Then we compare and merge all the way back up! (notice they're already sorted in these small arrays)
    // [ 3, 8 ] [ 4, 5 ] [ 6, 7 ] [ 1, 2 ]
  // And again...
    // [ 3, 4, 5, 8 ] [ 1, 2, 6, 7 ]
  // Andddd again... and we're done!
    // [ 1, 2, 3, 4, 5, 6, 7, 8 ]


// LETS GET IT
// Problem: Take two arrays, combine them into one sorted array.

// Important notes:
  // - In order to implement merge sort, it's useful to first implement
    // a function responsible for merging two sorted arrays.
  // - Given two sorted arrays, this helper function should create a new array, which is
    // also sorted, and consists of all elements in the two input arrays.
  // - This function should run in O(n + m) time and O(n + m) space, and
    // should NOT modify the parameters passed to it.
    // Btw, O(n + m) is new. n is the first input array, m is the size of the second input array.
    // Usually, IRL, when dealing with merge sort, most two-array inputs are the same size or maybe have a difference of one element.

// MERGE PSEUDOCODE:
  // - Create an empty array, take a look at the samllest values in each input array.
  // - While there are still values we haven't looked at...
    // - If the value in the first array is SMALLER than the value in the second array,
      // push the value in the FIRST array into our results,
      // and move on to the next value in the FIRST array.
    // - If the value in the first array is LARGER than the value in the second array,
      // push the value in the SECOND array into our results,
      // and move on to the next value in the SECOND array
    // - Once we exhaust one array, push in all remaining values from the other array.

function mergeOnly(arr1, arr2) {
  let results = [];
  let i = 0;
  let j = 0;
  while (i < arr1.length && j < arr2.length) {
    if (arr2[j] > arr1[i]) {
      results.push(arr1[i])
      i++;
    } else {
      results.push(arr2[j])
      j++;
    }
  }
  while (i < arr1.length) {
    results.push(arr1[i])
    i++;
  }
  while (j < arr2.length) {
    results.push(arr2[j])
    j++;
  }
  return results;
}

// console.log(mergeOnly([1, 10, 50], [2, 14, 99, 100]))

// NOTE THAT THIS FUNCTION DOESN'T WORK WHEN THE ARRAY LENGTHS ARE THE SAME
    // NOR DOES IT WORK ON ARRAYS THAT AREN'T ALREADY SORTED
    // So let's get into the sorting part ;)

// mergeSort PSEUDOCODE:
  // - Break up the merged array into halves until you have arrays that are empty or have one element.
  // - Once you have smaller sorted arrays, merge THOSE arrays with other sorted arrays until
    // you are back at the full length of the array
  // - Once the array has been merged back together, return the merged (and sorted!) array
  // Note that this will tie in recursion


function mergeSort(arr) {
  if (arr.length <= 1) return arr;
  let mid = Math.floor(arr.length / 2);
  let left = mergeSort(arr.slice(0, mid));
  let right = mergeSort(arr.slice(mid));
  return mergeOnly(left, right);
}

console.log(mergeSort([10, 24, 76, 73, 0, -2, 17]))

// TIME COMPLEXITY:
  // - Best: O(n log n)
  // - Average: O(n log n)
  // - Worst: O(n log n)
  // - Space: O(n)

  // O(log n) to refer to decompositions - aka how many times the original array needs to be split
  // O(n) to refer to comparisons per decomposition - aka the merge
  // The combination of these two complexities comes out to O(n log n)