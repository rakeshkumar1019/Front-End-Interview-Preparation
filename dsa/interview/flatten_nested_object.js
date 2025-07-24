let person = {
    name:"Rakesh",
    age:26,
    address:{
        city:"hyd",
        pincode: 502307
    }
}

/*
Output:
let person = {
    name:"Rakesh",
    age:26,
    address_city:"hyd",
    address_pincode: 502307
}
*/
function flattenObject(obj,parent,res={}){
  for(let key in obj){  //key = name,age,address...
    let parent_plus_key = parent ? parent+ "_" + key : key; // address_city or city
    if(typeof obj[key] === 'object'){  // obj["address"]
        flattenObject(obj[key],key, res); // flattenObject(obj["address"],address,res);
    }else{
        res[parent_plus_key] = obj[key];  // res[address_city] = "hyd"
    }
  }
  return res; 
}

let output = flattenObject(person, '', {})
console.log(output)
