// SEARCHING ALGORITHMS
  // i.e. checking if a username is already taken (using indexOf, for example);
    // Or having a list of US states, and want to make sure a user is inputing a valid state


// Objectives:
  // - Describe what a searching algo is
  // - Implement linear search on arrays
  // - Implement binary search on sorted arrays
  // - Implement a naive string searching algo
  // - Implement the KMP string searching algo


// LINEAR SEARCH //
  // Basically it just searches through an algorithm, one at a time, till it finds the value you want

// Write a function using this pseudocode:
  // This function accepts an array and a value
  // Loop through the array, and check if the current array element is equal to the value
  // If it is, return the index at which the element is found
  // If the value is never found, return -1

  // MY FUNCTION
  function linearSearch(arr, value){
    for (let i = 0; i < arr.length; i++) {
      if (arr[i] === value) {
      // This was my issue. Just needed to return i; not arr[i]
        return i;
        // I also had an else statement here, which isn't necessary
    } return -1
  }
  }

// CLEAN VERSION
function linearSearchClean(arr, val) {
  for (let i = 0; i < arr.length; i++){
    if (arr[i] === val) return i;
  }
  return -1;
}

// Linear Search BIG O is (best case scenario) O(1) or (worst) O(n) (which is also average)

