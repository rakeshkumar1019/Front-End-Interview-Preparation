```javascript
const user = {
    name: "John",
    dob : '25-05-1888',
    address: {
        city: "Hyd",
        pincode: 356098,
    }
}

const shallowCopyObj = {...user}
shallowCopyObj.address.city = "Delhi"
// console.log(shallowCopyObj)
// console.log(user)

const deepCopyObj = JSON.parse(JSON.stringify(user))
deepCopyObj.address.city = "Nodia"
console.log(user)
console.log(deepCopyObj)



```
