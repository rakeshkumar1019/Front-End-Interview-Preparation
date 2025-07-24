# `let` vs `var` vs `const` in JavaScript

## What's the difference between `var`, `let`, and `const`?

-  `var` is function-scoped and allows re-declaration, but it's error-prone due to hoisting.  
- `let` is block-scoped and supports reassignment, making it useful for loops and dynamic values.  
-  `const` is also block-scoped but prevents reassignment, ideal for constants.  
> **In modern JavaScript, prefer `const` by default and use `let` when necessary.**

---

## ✅ Key Differences

| Feature              | `var`             | `let`             | `const`           |
|----------------------|-------------------|-------------------|-------------------|
| **Scope**            | Function-scoped   | Block-scoped      | Block-scoped      |
| **Re-declaration**   | ✅ Allowed         | ❌ Not allowed     | ❌ Not allowed     |
| **Re-assignment**    | ✅ Allowed         | ✅ Allowed         | ❌ Not allowed     |
| **Hoisting**         | ✅ Yes *(initialized to `undefined`)* | ✅ Yes *(not initialized)* | ✅ Yes *(not initialized)* |
| **Temporal Dead Zone** | ❌ No             | ✅ Yes             | ✅ Yes             |

---

## 🔍 Scope Example

```js
function example() {
  if (true) {
    var a = 10;
    let b = 20;
    const c = 30;
  }

  console.log(a); // ✅ 10
  console.log(b); // ❌ ReferenceError
  console.log(c); // ❌ ReferenceError
}
example();
```
- var is function-scoped, so a is accessible outside the block.
- let and const are block-scoped, so b and c are not accessible outside the block.
  
## Re-declaration & Re-assignment
```javascript
var x = 1;
var x = 2; // ✅ Allowed

let y = 1;
// let y = 2; // ❌ SyntaxError

const z = 1;
// z = 2;      // ❌ TypeError
```
- var can be re-declared and reassigned.
- let can be reassigned but not re-declared.
- const can be neither reassigned nor re-declared.
##  Hoisting Behavior
```javascript
console.log(a); // undefined
var a = 5;

console.log(b); // ❌ ReferenceError
let b = 5;

console.log(c); // ❌ ReferenceError
const c = 5;
```
- var is hoisted and initialized as undefined.
- let and const are hoisted but not initialized, and live in a Temporal Dead Zone (TDZ) until declared.

## Best Practices
| Use This | When                                                                  |
| -------- | --------------------------------------------------------------------- |
| `var`    | ⚠️ Avoid. Use only in legacy code.                                    |
| `let`    | When the variable's value needs to change (e.g., in loops, counters). |
| `const`  | ✅ Default choice for all variables unless reassignment is needed.     |

