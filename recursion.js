// RECURSION - a function that calls itself. It can also sometimes be a cleaner alternative to iteration!

// json.parse and json.stringify are actually recursive functions! Neat!
  // same with document.getElementById and DOM traversal alogrithms; object traversal


// As a recursive function calls itself, as with all program languages, there is a built in data structure that manages what happens
  // when functions are invoked. This is where the "call stack" comes in --> it's a stack data structure.
  // Any time a function is invoked, it is placed (aka pushed) on the top of the call stack.
  // When JavaScript sees the return keyword, or when the function ends, the compiler will remove (aka pop)

// Here's a short n silly example:

function takeShower() {
  // STEP 2: This runs
  return "Showering!"
}

function eatBreakfast() {
  // STEP 3: This runs, and the meal variable is waiting on the cookFood function to run, so it moves to that function.
  let meal = cookFood()
  // STEP 5: Our string is returned with the meal that is generated in the cookFood function on the line above.
  return `Eating ${meal}`
}

function cookFood() {
  // STEP 4: This runs, and randomizes which breakfast we're making
  let items = ["oatmeal", "eggs", "protein shake"]
  return items[Math.floor(Math.random() * items.length)];
}

function wakeUp() {
  // STEP 1: The wakeUp function calls two of the other functions above - takeShower and eatBreakfast
  takeShower()
  eatBreakfast()
  // STEP 6: We get our final console.log
  console.log("Ready to go to work haha I wish I actually had a job haha!!!")
}

wakeUp()

// If you run this function in the Chrome Dev Tools, you can see each function/result working through the Call Stack tab (under Sources)
  // As functions are invoked, they are added to the TOP of the Call Stack.
  // Typically, we're used to functions being pushed on the call stack and popped off when they are done.
  // When we write recursive functions, we keep pushing new functions onto the top of call stack! So how do we keep it from going on forever?

// OUR FIRST RECURSIVE FUNCTION

// One of the most important concepts to understand in recursion is the Base Case.
  // A Base Case is the condition when the recursion ends. This is how to avoid infinite loops.
  // The other essential piece of recursion is what we're going to call the "Different Input."
    // This ensures the next time the function calls itself, it uses a new input.

// EXAMPLE:

function countDown(num) {
  // Checks to see if the count down has finished.
  if (num <= 0) {
    console.log("all done!");
    return;
  }
  // Starts by printing the number that's being passed in.
  console.log(num);
  // We then subtract 1 from num 
  num--;
  // And then countDown is called again with the new value of num
    // This repeats until num is less than or equal to 0... so it would look like this:
      // countDown(3)
        // print 3 --> (3 - 1 = 2)
          // countDown(2)
            // print 2 --> (2 - 1 = 1)
              // countDown(1)
                // print 1 --> (1-1 = 0)
                  // countDown(0) --> num is <= 0
                    // print "all done!"

  countDown(num)
}

console.log(countDown(5))

// This can of course be written without recursion. But that's not the point.

// Another recursion function:

function sumRange(num) {
  // base case is single line
  if (num === 1) return 1;
  // function itself is single line
  return num + sumRange(num - 1);
}

// In our previous function, the base case was basically the end point of the function, in that
  // our function was counting down until its output was less than or equal to 0.
  // Here, we're just doing it at the top.

// If we call sumRange(3), it would return sumRange(2), because the function calls itself with 
  // whatever input we give it minus 1 (aka `return 3 + sumRange(2)`.

// So this function is returning over and over again, counting down to 1 (via the `num-1` part of our function).
  // Once it reaches 1, it works back up its results to return the final sum.

// Here's how sumRange(4) would look manually/in the call stack:
  // return 4 + sumRange(3) -->
    // return 3 + sumRange(2) -->
      // return 2 + sumRange(1) -->
        // return 1.
        // THEN it works back up to run the operations that live in the call stack
      // return 2 + sumRange(1) = 2 + 1 = 3 (because sumRange(1) = 1, based on our base case on the first line within the function)
    // return 3 + sumRange(2) = 3 + 3 = 6
  // return 4 + sumRange(3) = 4 + 6 = 10
// the final output is 10.



// FACTORIALS - ONE OF THE MOST COMMON RECURSION VERSIONS

// HERE'S A NON-RECURSION VERSION OF FACTORIAL (ITERATIVE VERSION)
function factorial(num) {
  let total = 1;
  for (let i = num; i > 1; i--) {
    total += 1
  }
  return total;
}

// HERE'S THE RECURSION VERSION - it's super short and easy to write!
  // Notice the base case like before, just to ensure the function doesn't break our computers and go forever

function factorialRecursive(num) {
  if (num === 1) return 1
  return num * factorial(num-1)
}

// HOWEVER, while this works, it has some pitfalls. The base case actually isn't quite right, because if we call
  // factorialRecursive(2), it'll immediately try to run factorialRecursive(1) and return an error that says
  // maximum call stack size exceeded (at least in the Chrome Dev Tools).
  // This is one of the major pit falls of recursion. Idk if there's a way to fix it he just kinda moved on to
  // the pitfall, which is forgetting to return or not returning at all. Like using console.log instead of return.
    // Return will actually end the function, where as a console.log is just an extra step. As a result, we get
      // a max call stack size error. Fun fact, this call stack size error is called STACK OVERFLOW

// HELPER METHOD RECURSION


// This function doesn't actually do anything. It's more of a map/template of how helper method works.
function outer(input) {
  
  var outerScopedVariable = []

  function helper(helperInput) {
    // modify the outerScopedVariable
    helper(helperInput--)
  }

  helper(input)

  return outerScopedVariable;
}


// Let's try to collect all of the odd values in an array

function collectOdds(arr) {
  // Initialize an empty array where we'll store our data
  let result = [];
  // And then we call our helper function

    // Without the helper function below, result would either have to be declared globally,
    // or result would just be constantly getting reset.
  function helper(helperInput) {
    // Here's our base case to do nothing with an empty array
    if (helperInput.length === 0) {
      return;
    }
    // This says, "if the element at the given index isn't divisible by 2, put it in result"
      // % 2 !== 0 is the "not divisible by 2" part
    if (helperInput[0] % 2 !== 0) {
      result.push(helperInput[0])
    }
    // Then we call helper again, EXCLUDING the first element. So helperInput[0] is now a new value.
    helper(helperInput.slice(1))
  }

  //Helper is executed here with the array that's plugged in when we call collectOdds
  helper(arr)

  return result
}
