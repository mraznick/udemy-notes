// INSERTION SORT

// Similar to bubble and selection, however, there are some key distinctions that make insertion pretty good:
  // - Builds up the sort by gradually creating a larger left half, which is always sorted
      // [ 5, 3, 4, 1, 2 ]
      //   ^ the algo starts by looking at 5, seeing it as a sorted portion.
      //      ^ then, it looks at 3, and figures out where 3 needs to be inserted for that element to be sorted. So it moves 3 to before the 5.
      // Now, the algo recognizes 3 & 5 as sorted, and it looks at the next value (4), and continues inserting accordingly.
        // - Here's a more in-detail visual breakdown:
          // [ 5, 3, 4, 1, 2 ]
          //   ^ sorted, with 3 as the next value to insert somewhere
            // [ 3, 5, 4, 1, 2 ]
            //   ^--^ sorted, with 4 being next to insert
              // [ 3, 4, 5, 1, 2 ]
              //   ^-----^ sorted, with 1 being next
                // [ 1, 3, 4, 5, 2 ]
                //   ^--------^ sorted, with 2 being next
                  // [ 1, 2, 3, 4, 5 ]
                  // Done!
                  // Notice how the sorted section "builds up"

// PSEUDOCODE
// - Start by picking the second element in the array
// - Now compare the second element with the one before it, and swap (if necessary)
// - Continue to the next element. If it is in the incorrect order, iterate through the
    // sorted portion (i.e. the left side) to place the element in the correct place.
// - Repeat until array is sorted.

function insertionSort(arr) {
  for (let i = 1; i < arr.length; i++) {
    let currentVal = arr[i];
    for (let j = i - 1; j >= 0 && arr[j] > currentVal; j--) {
      // move value forward
      arr[j+1] = arr[j]
    }
    // insert currentVal
    arr[j+1] = currentVal
  }
  return arr;
}


// Time Complexity:
  // - Best: O(n)
  // - Average: O(n^2)
  // - Worst: O(n^2)
  // - Space: O(1)
  