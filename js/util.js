// const makeUniq = arr => {
//   return arr.filter((el, id) => arr.indexOf(el) === id)
// }

// function makeUniq(arr) {
//   let set = [...new set(arr)]
//   return set
// }

const makeUniq = arr => {
  const uniqSet = new Set(arr)
  return [...uniqSet]
}
