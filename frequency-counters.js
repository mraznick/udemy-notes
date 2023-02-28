// Frequency Counters is not an official term btw

// This patttern uses objects or sets to collect values/frequencies of values.
// This can often avoid the need for nested loops or O(N^2) operations with arrays/strings.

// Write a function called same, which accepts two arrays. The function should return "true" if every value
  // in the array has it's corresponding value squared in the second array. The frequency of values must
  // be the same.

// Example:
  // same([1, 2, 3], [4, 1, 9]) --> true
  // same([1, 2, 3], [1, 9]) --> false
  // same([1, 2, 1], [4, 1, 4]) --> false (must be same frequency)



  // Naive Solution: time complexicty of N^2

function same(arr1, arr2) {
  // Edge case that immediately rules out any arrays that couldn't possibly have matching frequencies
  if (arr1.length !== arr2.length) {
      return false
  }

  // Loop over first array, and pass in the square of each value into indexOf
    // Essentially asking, "what's the index of arr1[i] in arr2?"
  for (let i = 0; i < arr1.length; i++) {
    let correctIndex = arr2.indexOf(arr1[i] ** 2)
    // Another edge case sorta; the function will automatically set correctIndex to -1 if the value we need isn't in arr2,
      // so it will stop our function at that point.
    if (correctIndex === -1) {
      return false;
    }

    // if the values match, it will remove the value from the second array. The 1 indicates the number of elements to splice
    arr2.splice(correctIndex, 1)
  }

  // The loop will continue until either arr2 is empty, or false is returned. If arr1 is emptied, and false is not returned, we get true.
  return true;
}


// REFACTORED VERSION: Time complexity O(n)

function same(arr1, arr2) {
  // Same edge case as before
  if (arr1.length !== arr2.length) {
    return false;
  }
  // Initialize variables to store empty objects, in which we will declare keys and values. 
    // The key will be the element at [i], and the value will be the number of occurences.
  let freqCount1 = {}
  let freqCount2 = {}
  // We use a for-of loop to iterate through the each array, counting the values of each element
    // (in this case, value = number of times it occurs in the array)
    // This logic will count the number of times an element is occuring, or it will initialize that element to 1
  for(let val of arr1) {
    freqCount1[val] = (freqCount1[val] || 0) + 1
  }
  for(let val of arr2) {
    freqCount2[val] = (freqCount2[val] || 0) + 1
  }
  // We use a for-in loop on our freqCount1 object to first check whether the squared freqCount1 key exists in freqCount2
    // If it does not exist (i.e. if 3 is a key in freqCount1, but there is no 9 key in freqCount2), the function returns false.
  for (let key in freqCount1) {
    // Is [2^2] in freqCount2? If yes, continue. If not, return false.
    if (!(key ** 2 in freqCount2)) {
      return false
    }
    // There are three 2s in freqCount1. Does freqCount2 have the same amount of [2^2]s? If yes, continue. If not, return false.
    if (freqCount2[key ** 2] !== freqCount1[key]) {
      return false
    }
  }
  // Essentially, this function checks for falsities (if that's a word). 
    // If it doesn't return false at any point, it must return true.
  return true;
}

// ANAGRAM PROBLEM

// Given two strings, write a function to determine if the second string is an anagram of the first. An anagram is a word, phrase, or name
  // formed by rearranging the letters of another. For example, cinema and iceman are anagrams.
  // Examples:
    // validAnagram('', '') --> true
    // validAnagram('aaz', 'zza') --> false
    // validAnagram("anagram", "nagaram") --> true
    // validAnagram("rat", "car") --> false
    // validAnagram("awesome", "awesom") --> false
    // validAnagram("cheeseburger", "regcheeserub") --> true

function validAnagram(first, second) {
  if (first.length !== second.length) {
    return false;
  }

  const lookup = {};

  for (let i = 0; i < first.length; i++) {
    let letter = first[i];
    // if letter exists, increment, otherwise set to 1
    lookup[letter] ? lookup[letter] += 1 : lookup[letter] = 1;
  }

  for (let i = 0; i < second.length; i++) {
    let letter = second[i];
    // can't find letter or letter is zero, then it's not an anagram
    if (!lookup[letter]) {
      return false;
    } else {
      lookup[letter] -= 1;
    }
  }
  return true;
}

// This function will find each letter in one array, and count UP how many times each letter occurs in that array. 
  // Then, it will take a second array, and do the same, except it will count DOWN for each time each letter occurs.
  // If the keys in the object all have a value of 0 at the end, it will return true.


// MORE PROBLEMS AND EXAMPLES:

// Write a function called sameFrequency. Given two positive integers, find out if the two numbers have the same frequency of digits.
  // Your solution MUST have time complexity O(N).

  // MY ANSWER:

  function sameFrequency(int1, int2) {
    // initialize objects to assign key value pairs to the two integers
    let freqCount1 = {};
    let freqCount2 = {};
    
    // initialize variables to store the integers that are converted to arrays
    let arr1 = Array.from(String(int1), Number)
    let arr2 = Array.from(String(int2), Number)
    
    // edge case to return false if the integers (now arrays) are different lengths
    if(arr1.length !== arr2.length) {
        return false;
    }
    
    // count how many times a certain number occurs within int1 (now arr1) and store as value in empty object
      // do this for both int1 & int2/arr1 & arr2.
    for (let val of arr1) {
      freqCount1[val] = (freqCount1[val] || 0) + 1  
    }
    
    for (let val of arr2) {
        freqCount2[val] = (freqCount2[val] || 0) + 1
    }
  
    // compare keys in each object - if one object does not have matching keys to the other object, return false
      // otherwise, it will skip these steps and just return true.
    for (let key in freqCount1) {
        if(!(key in freqCount2)) {
            return false
        }
    }
      for (let key in freqCount2) {
        if(!(key in freqCount1)) {
            return false
        }
    }
     return true; 
  }
  
  // UDEMY ANSWER:

function sameFrequency(num1, num2) {
  // Convert integers to strings
    let strNum1 = num1.toString();
    let strNum2 = num2.toString();
  
  // Edge case to return false if string lengths don't match
    if(strNum1.length !== strNum2.length) return false;
  
  // Initialize empty objects
    let countNum1 = {};
    let countNum2 = {};
  
  // First pointer iterates through string1 to tally occurences of each number, plugging tallies into the empty object countNum1
    for(let i = 0; i < strNum1.length; i++){
      countNum1[strNum1[i]] = (countNum1[strNum1[i]] || 0) + 1
    }
    
  // Second pointer iterates through string2 to tally occurences of each number, plugging tallies into the empty object countNum2
    for(let j = 0; j < strNum1.length; j++){
      countNum2[strNum2[j]] = (countNum2[strNum2[j]] || 0) + 1
    }
  
  // Initialize keys in first object and compare to second object; return false if anything is missing
    for(let key in countNum1){
      if(countNum1[key] !== countNum2[key]) return false;
    }
   
    return true;
  }