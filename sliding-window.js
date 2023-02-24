// Write a function called maxSubarraySum which accepts an array of integers and a number called n. 
// The function should calculate the max sum of n consecutive elements in the array.
// Examples:
  // maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 2) --> 10
  // maxSubarraySum([1, 2, 5, 2, 8, 1, 5], 4) --> 17
  // maxSubarraySum([4, 2, 1, 6], 1) --> 6
  // maxSubarraySum([], 4) --> null

// Basically, it's saying to combine 'n' amount of elements to get the highest possible sum.

// The first function below is the n-squared time complexity version. Not efficient!!!!!!!

function maxSubarraySumBad(arr, num) {
  // edge case to protect the function from breaking if it receives an empty array
  if (num > arr.length) {
    return null;
  }
  // Max begins at negative infinity just in case our array uses all negative integers, the largest sum would still be negative
  var max = -Infinity;
  // Loop iterates to "almost" the end of the array; for example...
    // If our call is maxSubarraySum([1, 2, 3, 4, 5, 6, 7, 8, 9], 3), we want to stop at 7, because... 
    // it's the 3rd to last element in the array, and we need 3 numbers to get the correct output
  for (let i = 0; i < arr.length - num + 1; i++) {
  // temp variable stores our sum for each case, and compares it to max
    temp = 0;
  // We use j < num so that the loop knows when to stop
    for (let j = 0; j < num; j++) {
      temp += arr[i + j];
    }
    if (temp > max) {
      max = temp;
    }
    // Can run console.log(temp,max) here to see each comparison
  }
  return max;
}

// The only issue with this function is if it takes a much larger array, 
// it will take a long time to run because of the nested loop (line 27), which gives it the time complexity of n-squared.

// HERE is the refactored sliding window version that runs at O(N):

function maxSubarraySum(arr, num) {
  let maxSum = 0;
  let tempSum = 0;
  // Same edge case as before
  if (arr.length < num) return null;
  // Our first sum is created here - this will sum together the first n-number of digits and store the total in maxSum
  for (let i = 0; i < num; i++) {
    maxSum += arr[i];
  }
  tempSum = maxSum;
  // Start another loop, but instead of starting at the beginning, we're going to start at the FIRST element AFTER our initial loop
  for (let i = num; i < arr.length; i++) {
  // As the loop iterates, we're going to take the variable tempSum that's currently storing maxSum, and have it store the result of
    // subtracting the oldest/left-most/first element in the window, and adding the next/newest element in the array
    tempSum = tempSum - arr[i - num] + arr[i];
  // Then we compare each sum and update maxSum (but only if tempSum is greater than the current maxSum. Math.max does that automatically for us)
    maxSum = Math.max(maxSum, tempSum);
  }
  return maxSum;
}

console.log(maxSubarraySum([2, 6, 9, 2, 1, 8, 5, 6, 3], 3)) // 19

// Instead of adding together the "num" integers (in this case 3) for each test like our first function...
// this one will subtract the first of the 3 integers, and add the next new integer to test.
  // So now this is what the computer is doing step-by-step:
  // 1) 2 + 6 + 9 = 17
  // 2) 17 - 2 + 2 = 17
  // 3) 17 - 6 + 1 = 12
  // 4) 12 - 9 + 8 = 11
  // etc. etc... so this more-efficient function is dropping the oldest integer from the previous total...
  // and adding the next newest integer in the array. This way, it doesn't have to keep adding the same numbers over and over
