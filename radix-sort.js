// Everything so far has been COMPARISON SORTING algorithms
  // Average Time Cpx:
    // - Bubble - O(n^2)
    // - Insertion - O(n^2)
    // - Selection - O(n^2)
    // - Quick - O(n log(n))
    // - Merge - O(n log(n))
  // Radix is better than these! Because it doesn't use comparisons. Radix is an integer sorting algo.
  // However, Radix only works with lists of integers, exploiting the fact that the size of a number is determined by the amount of digits in a number
  // Radix goes through each value, grabbing the farthest right digit and grouping the matching values accordingly
    // This continues from right to left for each value in the array. As this continues, radix places a zero at the farthest left position of each value.
    // As those values increase in the amount of zerooes on the left side of the value, radix sorts them accordingly


                            // --- RADIX SORT HELPERS --- //

// In order to implement radix sort, it's helpful to build a few helper functions first:

                            // -- HELPER 1: GETDIGIT -- // 
            
  // getDigit(num, place) returns the digit in num at a given place value:
    // getDigit(12345, 0) --> 5
    // getDigit(12345, 1) --> 4
    // getDigit(12345, 2) --> 3
    // getDigit(12345, 3) --> 2
    // getDigit(12345, 4) --> 1
    // getDigit(12345, 5) --> 0
  // In Radix Sort, place values go from right to left, for whatever fucking reason!

  // Here's a getDigit function taken from stackoverflow by the instructor:

function getDigit(num, i) {
  return Math.floor(Math.abs(num) / Math.pow(10, i)) % 10;
}

// This function takes the num, then uses it to finish setting the divisble number by calculating 
  // 10 (since were using base 10 numbers) to the i-th power, and then divides by 10.
  // For example:
  // getDigit(7323, 2) --> 3
    // Broken down:
    // The function starts by running 7323 / 10, which equals 73.23
    // Using Math.floor, it simplifies the number to give us 73.
    // 73 % 10 (aka 73 "mod" 10) takes as many amounts of 10 from 73 as it can.
    // The function then returns the remaining digit, which is 3.


                            // -- HELPER 2: DIGITCOUNT -- //

// digitCount(num) returns the amount of digits in num

// digitCount(1) --> 1
// digitCount(25) --> 2
// digitCount(587) --> 3

// I'm gonna try to write this helper on my own.

function myDigitCount(num) {
  let count = 0
  for (let i = 0; i < num.length; i++) {
    count++
  }
  return count;
}

// lol nope here's the right one:

function digitCount(num) {
  if (num === 0) return 1;
  return Math.floor(Math.log10(Math.abs(num))) + 1;
}

// This function basically asks, 10 to what power gives us num (as in the input)?
  // if we wrote digitCount(455), it would find that 10^2 gives us a value of the same amount of digits.
  // But it needs to add +1 to that power value (2), since this is always true for power values compared to end values.


                              // -- HELPER 3: MOST DIGITS -- //

// mostDigits(nums) - given an array of numbers, this function returns the number of digits in the largest numbers in the list.
// Examples:
  // mostDigits([1234, 56, 7]) --> 4
  // mostDigits([1, 1, 11111, 1]) --> 5
  // mostDigits([12, 34, 56, 78]) --> 2

// I would try writing this myself again, but I bet it uses Math.floor and Math.abs lol

function mostDigits(nums) {
  let maxDigits = 0;
  for (let i = 0; i < nums.length; i++) {
    maxDigits = Math.max(maxDigits, digitCount(nums[i]));
  }
  return maxDigits;
}

// This function initializes a vale (maxDigits). It then iterates through all of the digits in nums, and stores the largest number
  // in nums by using Math.max.
  // Math.max will always return the larger number in the comparison of maxDigits and digitCount(nums[i])


// ACTUAL RADIX TIME BABY

// Pseudocode:
  // Define a function that accepts a list of numbers
  // Figure out how many digits the largest number has (aka use mostDigits duh)
    // Quick tip - when the largest number has four digits, you'll need to loop four times to make the proper amount of "buckets"
  // Loop from k = 0 up to this largest number of digits
  // For each iteration of the loop:
    // - Create buckets for each digits (0 to 9)
    // - Place each number in the corresponding bucket based on its Kth digit
        // i.e., the 0th digit in 127 is 7. So 127 would go in the "7 bucket"
  // Replace our existing array with values in our buckets, starting with Bucket 0 and up to Bucket 9
  // Return the list at the end
  

function radixSortWithNotes(nums) {
  let maxDigitCount = mostDigits(nums);
  // can console log here to test the results of mostDigits
  for (let k = 0; k < maxDigitCount; k++) {
    // time to make a da buckets - using Array.from, we can set one big array filled with 10 empty arrays. Thems be our buckets!
    let digitBuckets = Array.from({ length: 10 }, () => [])
    for (let i = 0; i < nums.length; i++) {
      // now take each individual number aka (nums[i]), and update k accordingly
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
      // Now we want to take nums[i], and put it at the matching index/bucket, so we're adding .push(nums[i]) to the line above
    }
    // now we need to concat the array after placing the digits in their buckets by 
        // 1. reassigning nums as a variable with...
        // 2. the .concat method to smush all the currently separated (but ordered!) elements into one array
        // 3. combined with the spread operator, which allows us to pass in all elements in digitBuckets as individual arguments, thus grouping them into a single array so we can do it all again!
    nums = [].concat(...digitBuckets);
  }
  return nums; //yayyyy
}

// note-free version

function radixSort(nums) {
  let maxDigitCount = mostDigits(nums);

  for (let k = 0; k < maxDigitCount; k++) {
    let digitBuckets = Array.from({ length: 10 }, () => [])

    for (let i = 0; i < nums.length; i++) {
      let digit = getDigit(nums[i], k);
      digitBuckets[digit].push(nums[i]);
    }

    nums = [].concat(...digitBuckets);
  }
  return nums; //yayyyy
}


// RADIX BIG O COMPLEXITY

// Apparently it's controversional wow spicy (comparison based sorting algorithms are best-case O(log n), which isn't as fast, on paper...)
// Time Complexity
    // Best: O(nk)
    // Avg: O(nk)
    // Worst: O(nk)
// Space Complexity = O(n + k)
// n = length of array
// k = number of digits(average) - this has to be considered obv