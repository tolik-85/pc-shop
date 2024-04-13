let numbers = [1, 2, 5, 10, 20, 33, 42, 101, 303, 1001, 1221, 1337, 4004]

let pageNum = 1

let numberPerPage = 5

let startIdx = pageNum * numberPerPage

let endIdx = startIdx + numberPerPage

let curPage = numbers.slice(startIdx, endIdx)

curPage
