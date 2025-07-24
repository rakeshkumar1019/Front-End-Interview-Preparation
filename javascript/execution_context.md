# 🔄 Execution Context in JavaScript

## 📘 How JavaScript Works

- Everything in JavaScript happens inside an **Execution Context**.
- JavaScript is a **synchronous, single-threaded language**.

The **Execution Context** is created in two main phases:

---

### 1. 🧠 Memory Phase (Variable Environment)

In this phase, the JavaScript engine scans the entire code and allocates memory for all variables and functions.

- **Variables** are initialized with the value `undefined`.
- **Functions** are stored in memory with their full definitions.

---

### 2. ⚙️ Code Execution Phase (Thread of Execution)

Once memory is allocated, the JavaScript engine executes the code **line-by-line**, top to bottom.

- Actual values are assigned to the variables.
- Function calls result in new **Function Execution Contexts** that are pushed onto the **Call Stack**.
- When a function finishes executing, its context is removed (popped) from the stack, and control returns to the previous context.

--- 
## 📚 The Call Stack

The **Call Stack** is a LIFO (Last In, First Out) structure used to track the order of execution contexts.

---
  
| Memory       | Code |
| ------------ | ---- |
| `a: 10`      |      |
| `fn: {..}`   |      |

### 📊 Example Breakdown
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

### Call Stack

| Global EC |
|---|

2. **Code Execution Phase(Thread Of Execution)**:

- Javascript again scan the whole code line by line and assign acutal values to an varaibles by replacing the `undefined` keyword.
- `n` is assigned the value 2.
- `square` is skipped since it's an function defination.
- `square2` = `square(2)` triggers a new Function Execution Context (ex1)

| Memory         | Code |
|----------------|------|
| `n: 2` | var n = 2;     |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: undefined`     |   new function invocation execution context(ex1)   |
| `square4: undefined`     |      |

new function invocation execution context(ex1) :
### Call Stack

| square(2) (Ex1) |
|------|
| Global EC |


1. Memory Phase(Varaible Environment)
   
| Memory         | Code |
|----------------|------|
| `num: undefined` |      |
| `ans: undefined`     |   |

2. Code Execution Phase(Thread Of Execution)
   
| Memory         | Code |
|----------------|------|
| `num: 2` |  `num * num`    |
| `ans: 4`     | `return ans` → return to global context and this context will be deleted. |

- The result 4 is returned and assigned to square2. ex1 is destroyed.

### Call Stack

| Global EC |
|---|

| Memory         | Code |
|----------------|------|
| `n: 2` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: 4`     |   new function invocation execution context(ex1)(Deleted)   |
| `square4: undefined`     |      |

- `square4` = `square(4)` triggers a new Function Execution Context (ex2)

| Memory         | Code |
|----------------|------|
| `n: 2` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: 4`     |   (ex1)(Deleted)  |
| `square4: undefined`     |  new function invocation execution context(ex2)    |

### Call Stack

| square(4) (Ex2) |
|------|
| Global EC |

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
| `ans: 16`     | `return ans` → return to global context and this function context will be deleted. |

-  The result 16 is returned and assigned to square4. ex2 is destroyed.
### Call Stack

| Global EC |
|---|
  
| Memory         | Code |
|----------------|------|
| `n: 2` |      |
| `square: function square(num) { var ans = num * num; return ans; }` | |
| `square2: 4`     |   (ex1)(Deleted)  |
| `square4: 16`     |  (ex2)(Deleted)  |

### Call Stack After All Executions:
(empty) 👋 (Global EC popped after program ends)

## Visual Representation
![Execution Context](https://github.com/rakeshkumar1019/Front-End-Interview-Preparation/raw/main/images/execution_context.png)

## Cleanup
- Once the last line of code is executed, the Global Execution Context is removed from the Call Stack, and the program ends.


