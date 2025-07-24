function multiply_arr(arr) {
    console.log(arr)
    if (arr.length <= 0) {
        return 1;
    }
    return arr[arr.length - 1] * multiply_arr(arr.slice(0, arr.length - 1))
}
console.log(multiply_arr([1, 2, 3, 4]))
