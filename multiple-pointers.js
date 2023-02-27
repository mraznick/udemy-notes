// Not an official title for this method but...
// This is when we create multiple pointers or values that correspond to an inddex or position and
  // move towards the beginning, end, or middle based on a certain condition.
  // This method is very efficient for solving problems with minimal space complexity as well.

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
