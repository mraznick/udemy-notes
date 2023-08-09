// QUICK SORT - THE BANE OF THE INSTRUCTOR'S EXISTENCE LOL GREAT
  // - Like merge sort, quick sort exploits the fact that arrays of 0 or 1 element are always sorted
  // - Works by selecting one element (called the "pivot"), and finding the index where
     // the pivot should end up in the sorted array.
  // - Once the pivot is positioned appropriately, quick sort can be applied on either side of the pivot.

// Diagram attempt:
// [ 5, 2, 1, 8, 4, 7, 6, 3 ]
  // ^ Take the numbers that are less than 5 (our pivot point), and move them to the left.
    // There are four numbers that are less than five in this array.
    // So, those four numbers are going to be placed as the first four elements,
    // which are currently 5, 2, 1, and 8. The following index is where 5 will be placed.
      // The result is [ 3, 2, 1, 4, *5*, 7, 6, 8 ]. The number 5 is the only sorted element right now.
        
      // * HE FUCKED UP THIS DIAGRAM SO BAD LOL
          // Line 13 is wrong. The result is: [ 2, 1, 4, 3, 5, 8, 7, 6 ]
            // Here's why:
          
              // With the pivot point of 5, the array will first look like this:
              // [5, 2, 1, 4, 3, 8, 7, 6]... so as the algo iterates through the array,
              // it finds the values that are less than 5, and places them AFTER 5 in the order
              // they're found. So the numbers 8, 7, and 6 were always
              // in that order if you look at the original array.
              // THEN, since we know there were FOUR elements that are less than 5, the algo will know
              // to move 5 to the FOURTH index: [ 2, 1, 4, 3, 5, 8, 7, 6 ] (same as what I have on line 16)

    // Now we're here: [ 2, 1, 4, 3, 5, 8, 7, 6 ]
      // The value 5 is currently in the correct/final spot,
      // so the algo then looks at[ 2, 1, 4, 3 ], splitting them into...
        // left: ([ 2, 1 ]) with 2 being the pivot... and
        // right: ([ 4, 3 ]) with 4 being the pivot.
        
      // On the left, there's ONE element less than 2,
        // so 2 will move to index ONE: [ 1, 2 ]
      // On the right, theres ONE element less than 4,
        // so 4 will move to index one: [ 3, 4 ]
  
      // Now, we have [ 1, 2 ], [ 3, 4, ], [ 5, 8, 7, 6 ].
        // Our algo knows that everything to the left of 5, including 5, are sorted.
        // so those are merged: [ 1, 2, 3, 4, 5, 8, 7, 6 ]
      
      // The process is then repeated, starting with [ 8, 7, 6 ], with 8 being the pivot (since the algo knows 5 and lower are sorted)
        // There are TWO numbers less than 8, so 8 then moves to index TWO:
          // [ 7, 6, 8 ]
        // With 7 as the new pivot point, there is one number less than 7, so to index one with ye!
          // [ 6, 7, 8 ] holy moly are those SORTED? You betcha! MERGE EM BABY:
        // [ 1, 2, 3, 4, 5, 6, 7, 8 ] DONE BITCH STUPID ASS INSTRUCTOR SMH
              
  // WRONG LOL LINES 50 THROUGH 58:
  // Now, we repeat this process with the above array by
    // looking at how many elements are less than 3.
    // There are two elements that are less than 3, so we're going to take those two elements,
    // Put them at the front, and place 3 after them:
      // [ 1, 2, *3*, 4, *5*, 7, 6, 8 ]
  // The left side of the array (with the midpoint being the 5) is sorted.
  // Now we need to sort the right side, by setting 7 as the new pivot point.
    // There is only one number less than 7, so if we're only looking at the right side,
      // 7 needs to become index 1, 6 needs to become index 0, and 8 can stay where it is.

      
// PIVOT HELPER:
  // - In order to implement merge sort, it's useful to first implement a function responsible for arranging
    // elements in an array on either side of a pivot.
  // - Given an array, this helper function should designate an element as the pivot.
  // - It should then rearrange elements in the array so that all values less than the pivot are moved to
    // the left of the pivot, and all values greater than the pivot are moved to the right of the pivot (or
    // I guess you could say they *stay* to the right of the pivot)
  // - The order of elements on either side of the pivot DOESN'T MATTER
  // - The helper should do this *in place*, that is, it should NOT create a new array.
  // - When complete, the helper should return the index of the pivot.

  // Picking a Pivot:
    // - The runtime of Quick Sort depends in part on how we select our pivot.
    // - Ideally, the pivot should be chosen so that it's roughly the median value in the data set you're sorting.
    // - For simplicity, in this lesson, we'll always choose the pivot as the first element.
      // The consequences of this will be discussed later >:)
  
// Pivot helper example:

let arr = [5, 2, 1, 8, 4, 7, 6, 3]
pivot(arr); // 4;
arr;
// any one of these is an acceptable mutation:
  // [ 2, 1, 4, 3, 5, 8, 7, 6 ]
  // [ 1, 4, 3, 2, 5, 7, 6, 8 ]
  // [ 3, 2, 1, 4, 5, 7, 6, 8 ]
  // [ 4, 1, 2, 3, 5, 6, 8, 7 ]
  // And there are more! LMFAO so I guess maybe he wasn't wrong? Because it doesn't matter the order in which the elements
    // Before the pivot are placed (once the pivot is in the correct/final position)

// PIVOT PSEUDOCODE:
  // - It will help to accept three arguments: an array, a start index, and an end index.
      // These can default to 0 and the array length minus 1, respectively.
  // - Grab the pivot from the start of the array
  // - Store the current pivot index in a variable (this will keep track of where the pivot should end up.)
  // - Loop through the array from start to end...
      // - If the pivot is GREATER than the CURRENT element, increment the pivot index variable, and then
        // swap the current element with the element at the pivot index.
  // - Swap the starting element (i.e. the pivot) with the pivot index.
  // - Return the pivot index.

// PIVOT HELPER IMPLEMENTATION:

// the parameters this function (other than arr ofc) takes are defaults for start and end. Neat!
function pivot(arr, start = 0, end = arr.length + 1) {
  // remember this from our other sorting algos, can do either ES5 or ES2015
  function swap(array, i, j) {
    let temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
  // since we default start to 0, and we want to use the first element as our pivot...
  let pivot = arr[start];
  // This is not only where our pivot needs to end up, it's also what we're going to return.
  let swapIdx = start;
  // We want to start looping after our pivot, so we set i to start plus 1 (I think we could also just put 1 lol)
  for (let i = start + 1; i < arr.length; i++) {
    if (pivot > arr[i]) {
      swapIdx++; // remember the swapIdx is the index where our pivot needs to land.
      // Now we're going to go inside the array, and swap the swapIdx and i
      swap(arr, swapIdx, i) 
    }
  }
  // Final swap the array, the start, and swapIdx. We are not swapping the pivot, because the pivot is the VALUE,
    // where as the start is the INDEX of that value.
  swap(arr, start, swapIdx)
  // Finally, return the swap index:
  return swapIdx;

}

pivot([4, 8, 2, 1, 5, 7, 6, 3])
  // Here's what happens to our array as the pivot function works:
    // Each value that is less than our pivot (4) will be swapped with index 1 (which is where our for-loop starts):
    // *** Each array below is the RESULT of the function working on the array.
    // [ 4, 2*, 8, 1, 5, 7, 6, 3 ] --> the function checked to see if 2 < 4, which it is, so it swapped with 8. 1 is next.
    // [ 4, 2, 1*, 8, 5, 7, 6, 3 ] --> the function checked to see if 1 < 4, which it is, so it swapped with 8. 5 is next.
    // [ 4, 2, 1, 8, 5*, 7, 6, 3 ] --> the function checked to see if 5 < 4, which it is NOT, so nothing happens. 7 is next.
    // [ 4, 2, 1, 8, 5, 7*, 6, 3 ] --> the function checked to see if 7 < 4, which it is NOT, so nothing happens. 6 is next.
    // [ 4, 2, 1, 8, 5, 7, 6*, 3 ] --> the function checked to see if 6 < 4, which it is NOT, so nothing happens. 3 is next.
    // [ 4, 2, 1, 3*, 5, 7, 6, 8 ] --> the function checked to see if 3 < 4, which it is, so it swapped with 8. Done for now.
    
    // Now, because there were three elements less than 4, our function swaps our pivot (4) with
      // whatever is at the third index (which is 3):
      // [ 3, 2, 1, 4, 5, 7, 6, 8 ]

// NOW TO ACTUALLY DO THE QUICK SORT PART LMAO

// QS PSEUDOCODE:
  // - Call the pivot helper on the array.
  // - When the helper returns the updated pivot index, recursively call the pivot helper on
      // the subarray to the left of that index, and the subarray to the right of that index.
  // - Your base case occurs when you consider a subarray with less than 2 elements

function quickSort(arr, left = 0, right = arr.length - 1) {
  // base case for stopping when a subarray is less than 2 elements long
  if (left < right) {
    // implement our pivot helper on array, left, and right
    let pivotIndex = pivot(arr, left, right); // pivot index currentlty = 3
    // left side quick sort, which still starts at index 0, but only goes to one element before the pivotIndex:
    quickSort(arr, left, pivotIndex - 1);
    // right side quick sort, but the opposite kinda
    quickSort(arr, pivotIndex + 1, right);
  }
  return arr;
}

console.log(quickSort([4, 6, 9, 1, 2, 5, 3]))

// BIG O COMPLEXITY OF QUICKSORT:
  // - Best: O(n log n)
  // - Average: O(n log n)
  // - Worst: O(n^2) <-- we only ran quick sort by using the first element as our pivot. But if our data is mostly sorted, it's a lot of useless comparing and sorting 
    // - O(n) decompositions; O(n) comparisons
  // - Space: O(log n)