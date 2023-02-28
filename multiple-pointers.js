// MULTIPLE POINTERS: SUMZERO AND COUNTUNIQUEVALUES

// Not an official title for this method but...
// This is when we create multiple pointers or values that correspond to an inddex or position and
  // move towards the beginning, end, or middle based on a certain condition.
  // This method is very efficient for solving problems with minimal space complexity as well.


                            // SUM ZERO

// Write a function called sumZero which accepts a sorted array of integers. 
  // The function should find the first pair where the sum is 0. Return an array that includes both values that
  // sum to zero or undefined if a pair does not exist.

  // Examples:
    // sumZero([-3, -2, -1, 0, 1, 2, 3]) --> [-3, 3]
    // sumZero([-2, 0, 1, 3]) --> undefined
    // sumZero([8, 4, 2, 0, -2, -4]) --> [-4, 4]

// NAIVE SOLUTION - simplest way, but uses nested loops that hurt our time complexity.

function sumZeroNaive(arr) {
  // First loop iterates to initialize sum operations
  for (let i = 0; i < arr.length; i++) {
    // Second loop grabs second part of sum operations, starting at one ahead of the first loop
    for (let j = i + 1; j < arr.length; j++) {
      // if statement sums every i & j together at each index, one operation at a time.
      if (arr[i] + arr[j] === 0) {
        return [arr[i], arr[j]];
      }
    }
  }
}

sumZeroNaive([-4, -3, -2, -1, 0, 1, 2, 5]) // [2, -2]


// REFACTORED WITH MULTIPLE POINTERS
  // This way, we will be able to run each operation starting at either side of the array.
    // Our array is already sorted, so we know the left-most element is going to be our smallest digit,
    // and our right-most element will be our largest digit.
    // As this function works, it'll recognize when we're too high or too low compared to 0 (our targeted sum). It will
    // adjust its comparisons accordingly. For example, the first operation will be (-4 + 5 = 1). 1 > 0, so our left pointer
    // will stay at -4, because it's the smallest digit in the array,
    // and our right pointer will shift down / to the left along the array, in case there might be a 4 in the data set.
    // So the next operation will be (-4 + 2 = -2). -2 < 0. So now that we're too low for our expected output,
    // the left pointer will shift up / to the right along the array, and the right pointer will stay where it is.
    // The next operation will be (-3 + 2 = -1). 0 < -1, so same thing here with the left pointer shifting right.
    // Finally, the next operation will be (- 2 + 2 = 0), and our function will return [-2, 2], and end there.
  
function sumZero(arr) {
  // Left pointer starts at the first element, or the zero index.
  let left = 0;
  // Right pointer starts at the last element (remember the last element's index = arr.length - 1)
  let right = arr.length - 1;
  // This loop will continue WHILE the left pointer element is less than the right
  while (left < right) {
    // Initialize the operation at the start of the loop
    let sum = arr[left] + arr[right];
    // Once we find our zero sum, just return the elements where the pointers are.
    if (sum === 0) {
      return [arr[left], arr[right]]
      // Because our array is sorted, if the sum of the two pointers are more than 0, 
        // the right pointer will move down along the array, since our left pointer is 
        // the lowest digit, and our right is the highest. So if their sum is higher than zero, 
        // the right pointer must hold an element that's too high. 
    } else if (sum > 0) {
      right--;
      // It's the opposite case here. If the sum is less than 0 (the only remaining outcome, which is why
        // there's no comparison or if statement), then the left pointer needs to move up, because there
        // must not be a number low enough to combine with the highest number to equal 0.
        // With the array we're using, this won't be the case until the operation of
        // (-4 + 2 = -2) (in the first array ofc)
    } else {
      left++;
    }
  }
}

console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 5])) // [2, -2]

console.log(sumZero([-4, -3, -2, -1, 0, 1, 2, 3, 10])) // [-3, 3]


                                // COUNT UNIQUE VALUES

// Implemennt a function called countUniqueValues, which accepts a sorted array,
  // and counts the unique values in the array. There can be negative numbers in the array,
  // but it will always be sorted.

  // Examples:
    // countUniqueValues([1, 1, 1, 1, 1, 2]) --> 2
    // countUniqueValues([1, 2, 3, 4, 4, 4, 7, 7, 12, 12, 13]) --> 7
    // countUniqueValues([ ]) --> 0
    // countUniqueValues([-2, -1, -1, 0, 1]) --> 4

// [1, 1, 1, 2, 3, 3, 4, 4, 5, 6]

// In the above array, we're going to have two pointers. One will be or sort of "base,"
  // while the other is the "scout." The base pointer will be one element to compare to the scout.
  // As the scout iterates through, the base will compare itself to the scout. The base will not
  // move or follow the scout until the scout finds a new element.
  // So the base stays at 1, and the scout will continue to move forward until it hits 2.
  // Once that happens, our function will have the base change the following element to a 2,
  // which sets a new base, and the scout will go out searching again until it finds the 3.
  // The process will repeat until the array looks like this: [1, 2, 3, 4, 5, 6, 4, 4, 5, 6],
  // and whatever index our base ends up at will also be the amount of unique values.
  // In this case, the i will end up at index 5, and we just need to add a +1 to the output so that
  // it returns "6 unique values."


function countUniqueValues(arr) {
  // Edge case to return 0 for empty arrays
  if (arr.length === 0) return 0;
  // sets the base at 0
  var i = 0;
  for (var j = 1; j < arr.length; j++) {
    // Check whether i and j are equal to another (we want them to NOT be equal)
    if (arr[i] !== arr[j]) {
      // move i up one index
      i++;
      // Set the value at index of i to the same value at index of j
      arr[i] = arr[j]
    }
    // Use this console log to see the function doing its work
    // console.table(i, j)
  }
  return i + 1;
}

console.log(countUniqueValues([[1, 1, 1, 2, 3, 3, 4, 4, 5, 6]]))

// MORE PROBLEMS/EXAMPLES

