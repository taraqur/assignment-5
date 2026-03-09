1. What is the difference between var, let, and const?

Ans: Difference between var, let, and const:

var – Old way to declare variables, function scoped, can be redeclared.

let – Block scoped, can change value but cannot redeclare in the same scope.

const – Block scoped, cannot change value after declaration.

-------------------------------------------------------------------------------

2. What is the spread operator (...)?

Ans: Spread Operator (...):
Used to expand or copy elements from arrays or objects.

Example:

const arr1 = [1,2];
const arr2 = [...arr1,3,4];

------------------------------------------------------------------------------

3. What is the difference between map(), filter(), and forEach()?

Ans: Difference between map(), filter(), and forEach():

map() – Creates a new array by modifying each element.

filter() – Creates a new array with elements that pass a condition.

forEach() – Runs a function for each element, but does not return a new array.

--------------------------------------------------------------------------------

4. What is an arrow function?

Ans: Arrow Function:
A short way to write functions using =>.

Example:

const add = (a,b) => a + b;

-----------------------------------------------------------------------------

5. What are template literals?

Ans: Used to insert variables inside strings using backticks ` and ${}.

Example:

const name = "John";
console.log(`Hello ${name}`);