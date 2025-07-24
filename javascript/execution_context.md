# Execution Context

## How JavaScript Works
- Everything in javascript happens inside an "Execution Context".
- Javascripot is a synchrous single threaded langauage

The Execution Context is created in two phases: the Memory Phase and the Code Execution Phase.
1. **Memory Phase(Varaible Environment)**: The JavaScript engine scans the entire code and allocates memory for all variables and functions.
    - Variables are initialized with the value undefined.
    - Functions are stored in memory with their entire definition.
  
2. **Code Execution Phase(Thread Of Execution)**: The JavaScript engine starts executing the code line by line, in the order it appears (top to bottom).
      -  The actual values are assigned to variables (replacing undefined from the memory phase).
      -  Function calls are executed, and each call creates a new Function Execution Context, which is pushed onto the Call Stack.
      -  As each function finishes executing, its context is popped off the stack, and control returns to the previous context.
  
| Memory       | Code |
| ------------ | ---- |
| `a: 10`      |      |
| `fn: {..}`   |      |

Lets take below code Example:
```javascript
var n = 2;
function square(num) {
  var ans = num * num;
  return ans;
}
var square2 = square(2)
var square4 = square(4)
```
1. **Memory Phase(Varaible Environment)**:
- Allocate memory to varaibles with `undefined` keyword and for functions whole defination of the function.
   
| Memory         | Code |
|----------------|------|
| `n: undefined` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: undefined`     |      |
| `square4: undefined`     |      |

2. **Code Execution Phase(Thread Of Execution)**:
- Javascript again scan the whole code line by line and assign acutal values to an varaibles by replacing the `undefined` keyword.
- value 2 is assgined to `n`.
- skip `square` as it just an function definataion.
- square2 = square(2) function invocation.in this case again new execution context is created for this function `square`

| Memory         | Code |
|----------------|------|
| `n: 2` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: undefined`     |   new function invocation execution context(ex1)   |
| `square4: undefined`     |      |

new function invocation execution context(ex1) :
1. Memory Phase(Varaible Environment)
   
| Memory         | Code |
|----------------|------|
| `num: undefined` |      |
| `ans: undefined`     |   |

2. Code Execution Phase(Thread Of Execution)
   
| Memory         | Code |
|----------------|------|
| `num: 2` |  `num * num`    |
| `ans: 4`     | as soon it sees `return ans` goes back to  `square2: undefined` to `square2: 4` in main execution context and this function conntext will be deleted. |

| Memory         | Code |
|----------------|------|
| `n: 2` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: 4`     |   new function invocation execution context(ex1)   |
| `square4: undefined`     |      |


| Memory         | Code |
|----------------|------|
| `n: 2` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: 4`     |   new function invocation execution context(ex1)(Deleted)  |
| `square4: undefined`     |  new function invocation execution context(ex2)    |


new function invocation execution context(ex2) :
1. Memory Phase(Varaible Environment)
   
| Memory         | Code |
|----------------|------|
| `num: undefined` |      |
| `ans: undefined`     |   |

2. Code Execution Phase(Thread Of Execution)
   
| Memory         | Code |
|----------------|------|
| `num: 4` |  `num * num`    |
| `ans: 16`     | as soon it sees `return ans` goes back to  `square4: undefined` to `square4: 16` in main execution context and this function conntext will be deleted. |


| Memory         | Code |
|----------------|------|
| `n: 2` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: 4`     |   new function invocation execution context(ex1)(Deleted)  |
| `square4: 16`     |  new function invocation execution context(ex2)(Deleted)  |


- when it reaches to last line of code the whole execution context is deleted.


