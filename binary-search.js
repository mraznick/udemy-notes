// BINARY SEARCH

// Binary Search can be much faster than linear (and usually is)
// You can elimante half of the remaining elements rather than 1 at a time
// Binary ONLY works on sorted arrays

// Binary will continue to group together sections of an array as it works through,
  // continuously reducing the amount of elements it's checking to return the sought result
  // The idea summed up is to Divide and Conquer

// Divide and Cnoquer this list to search for 15: [1, 3, 4, 6, 8, 9, 11, 12, 15, 16, 17, 18, 19]
  // Left is 1, Too Small is 11, right is 19.
  // 15 is greater than 11, so everything to the left of 11 can be eliminated (including 11)
  // Now, our left value is 12, our Too Small value becomes a Too Big value of 17, and right stays at 19.
  // Now, with 17 as our middle point, it's clearly too big, so everything to the right of 17 can be cut.
  // Now, our left stays at 12, our right is 16, and bingo 15 is right there baby

// binary pseudocode:
  // This function accepts a sorted array and a value
  // Create a left pointer at the start of the array, and a right pointer at the end of the array.
  // While the left pointer comes before the right pointer:
    // - Create a pointer in the middle
    // - If you find the value you want, return the index.
    // - If the value is too small, move the left pointer up.
    // - If the value is too large, move the right pointer down.
  // If you never find the value, return -1.

// SOLUTION:

function searchBinary(arr, elem) {
  // First pointer at the beginning of the array
  var start = 0;
  // Second at the end of arr
  var end = arr.length - 1;
  // Third/middle pointer needs to be the average of 'start' and 'end':
  var mid = Math.floor((start + end) / 2);
  // While the middle value is incorrect, repeat the following code:
  while (arr[mid] !== elem && start <= end) {
    // Set a new window to check for elem by eliminating what we know it won't be
    if (elem < arr[mid]) {
      // move the end accordingly
      end = mid - 1;
    } else {
      start = mid + 1;
    }
    // Set a new mid value based on the outcome of the while loop/conditional
    mid = Math.floor((start + end) / 2);
  }
  if (arr[mid] == elem) {
    return mid;
  }
  return -1
}

// Without a safety net to return -1 if the 'elem' is not in arr, we would get an infinite loop from
  // start/end/mid all ending up in the same place, and the function will just keep searching a single value
  // for the 'elem,' because 'start' ends up getting set outside of the brackets of the array.
  // Our safety net is what comes after the && in the while loop, along with
    // the final if statement with the -1 at the end.
    // I'm sort of recently realizing that most functions end with what to do if it doesn't work. I don't think I worded that correctly but like yeah

// SUPER CLEANED UP SOLUTION:

function searchBinaryClean(arr, elem) {
  let start = 0;
  let end = arr.length - 1;
  let mid = Math.floor((start + end) / 2);

  while (arr[mid] !== elem && start <= end) {
    if (elem < arr[mid]) end = mid - 1;
    else start = mid + 1;
    mid = Math.floor((start + end) / 2);
  }
  return arr[mid] === elem ? mid : -1;
}

// TIME COMPLEXITY FOR BINARY SEARCH:
  // Worst and Average case are both O(log n)
  // Best case is O(1)

// NAIVE STRING SEARCH PROBLEM/PSEUDOCODE
  // Loop over the longer string
  // Loop over the shorter string
  // If the characters don't match, break out of the inner loop
  // If they DO match, keep going
  // If you complete the inner loop and find a match, increment the count of matches
  // Return the count

function naiveSearch(long, short) {
  let count = 0;
  for (let i = 0; i < long.length; i++) {
    for (let j = 0; j < short.length; i++) {
      if (short[j] !== long[i + j]) {
        break;
      }
      if (j === short.length - 1) {
        count++;
      }
    }
  }
  return count;
}

naiveSearch("lorie loled", "lol")