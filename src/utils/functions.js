function chunk(arr, size) {
  let newArr = []
  let total = Math.ceil(arr.length / size)
  for (let i = 0; i < total; i++) {
    newArr.push(arr.splice(0, size))
  }
  return newArr
}

export { chunk }