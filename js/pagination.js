let numbers = [1, 2, 3, 4, 5, 6, 4, 2, 4, 6, 4, 3, 2, 3, 5, 6, 4, 22, 1, 4, 6]

let pageNum = 0
let numPerPage = 4
let startIdx = pageNum * numPerPage
let endIdx = startIdx + numPerPage

let curPage = numbers.slice(startIdx, endIdx)

curPage
