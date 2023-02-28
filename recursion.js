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

