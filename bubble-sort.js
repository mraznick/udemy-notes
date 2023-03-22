// Important to note btw that JS has a built-in .sort method, which isn't very reliable.
  // Look at the MDN documentation on .sort to see why it sucks tbh.
  // But if you have an array of numbers you need to sort, it can work well as long as you write
    // the optional comparator function that can go into the .sort() method.

function numberCompare(num1, num2) {
  return num1 - num2;
}

[6, 4, 15, 10].sort(numberCompare); // [4, 6, 10, 15]

// This can also work if you want to sort an array of strings by length, for example. It's all numeric basically.


// BUBBLE SORT TIME, BABY //

// Bubble sorting compares each element to the element next to it, checking to see which is larger/smaller,
    // and moving them accordingly. This isn't the most efficient sorting algo out there, because it has to
    // iterate through the entire array multiple times to get the whole thing sorted.

// The swapping functionality is found in many sorting algos. 

// ES5 SWAPPING METHOD:

// The ES5 method, like the ES2015 method, takes an arr, and two indeces to compare
function es5Swap(arr, idx1, idx2) {
  // we then set a temp variable with the first index of the array
  var temp = arr[idx1]
  // Then we change what was in arr[idx1] to be the valuable of index 2
  arr[idx1] = arr[idx2];
  // Finally, we use the temp variable to update the value of arr[idx2]
  arr[idx2] = temp;
}

// ES2015 SWAPPING METHOD:
// This method uses less lines to do the same thing, but it's a little less readable.
  // This is also the most up-to-date/most common method rn I think

const swap = (arr, idx1, idx2) => {
  // These are basically just mirrors of each other and somehow it works lol idk
  [arr[idx1], arr[idx2]] = [arr[idx2], arr[idx1]];
}

// BUBBLE SORT PSEUDOCODE
  // - Using a variable called i, start looping at the end of the array moving towards the start of the array.
  // - Start an inner loop with a variable called j from the beginning until i-1
  // - Compare arr[j] and arr[j+1]. If arr[j] > arr[j+1], swap those two values.
  // - Return the sorted array


// HERE'S THE LESS-OPTIMIZED VERSION THAT USES TWO NESTED LOOPS (AKA DOESN'T FOLLOW THE ABOVE INSTRUCTIONS)
function bubbleSortNaive(arr) {
  for (let i = 0; i < arr.length; i++) {
    for (let j = 0; j < arr.length; j++) {
      if (arr[j] > arr[j + 1]) {
        // ES5 SWAP - the problem with it is that our comparisons are going 1 index beyond whatever array we plug in
          // On top of that, we will have a needless comparison at the end of the second loop
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr; 
}

// HERE'S THE RIGHT WAY TO DO IT
function bubbleSortProper(arr) {
  // Set i to iterate from end to beginning
  for (let i = arr.length; i > 0; i--) {
    // Now that i is equal to the arr.length, we can just use that instead of arr.length-1 to shorten the code.
      // as j is getting larger, i is getting smaller 
    for (let j = 0; j < i - 1; j++) {
        // Idk if this is accurate, but it's like we're comparing the values that are stored in i and j, as opposed to the elements at each index.
          // You can add console.log(arr, arr[j], arr[j+1]); right here to see it working
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
      }
    }
  }
  return arr; 
}

// One thing to point out with bubble sort is that sometimes we need to short-circuit our code.
  // We will want to check if there were zero swaps on an iteration. If there were zero swaps, we can stop.
  // This will keep the algorithm from doing unnecessary iterations/comparisons, which would be a huge problem
  // For XXL arrays.
  // To do this...
      // 1. We make a variable called noSwaps above our first for loop.
      // 2. Then, we can assume noSwaps = true after the first loop.
      // 3. THEN, after the ES5 swap, we set noSwaps to false.
      // 4. Finally, before we return arr;, we tell the algo to break if there have been no swaps.
    
function bubbleNoSwaps(arr) {
  // Step 1 for no noSwaps
  let noSwaps;
  for (let i = arr.length; i > 0; i--) {
    // Step 2
    noSwaps = true;
    for (let j = 0; j < i - 1; j++) {
      if (arr[j] > arr[j + 1]) {
        let temp = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = temp;
        // Step 3
        noSwaps = false;
      }
    }
    // Step 4
    if (noSwaps) break;
  }
  return arr; 
}

// Bubble sort time complexity: best case is O(N). 

// Time Complexity:
  // - Best: O(n)
  // - Average: O(n^2)
  // - Worst: O(n^2)
  // - Space: O(1)