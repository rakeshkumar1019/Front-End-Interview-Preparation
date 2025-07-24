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
