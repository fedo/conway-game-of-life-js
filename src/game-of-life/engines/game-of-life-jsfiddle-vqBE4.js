import {pathOr} from 'ramda'
import {sortCells} from "../game-of-life-api"

function createEmptyUniverse([width, height]) {
  var arr = []
  for (var i = 0; i < width; i++) {
    var innerArr = []
    for (var j = 0; j < height; j++) {
      innerArr.push(0)
    }
    arr.push(innerArr)
  }
  return arr
}

function aliveNeighbors(arr, x, y) {
  const get = (arr, x, y) => pathOr(0, [x, y], arr)
    var totalAlive =
      get(arr, x - 1, y - 1) +
      get(arr, x, y - 1) +
      get(arr, x + 1, y - 1) +
      get(arr, x - 1, y) +
      get(arr, x + 1, y) +
      get(arr, x - 1, y + 1) +
      get(arr, x, y + 1) +
      get(arr, x + 1, y + 1)
    return totalAlive
}

function step(arr) {
  var newArr = createEmptyUniverse([arr.length, arr[0].length])
  for (var x = 0; x < arr.length; x++) {
    for (var y = 0; y < arr[x].length; y++) {
      var cell = arr[x][y]
      var alives = aliveNeighbors(arr, x, y)
      if (cell == 1) {
        if (alives < 2) {
          newArr[x][y] = 0
        } else if (alives == 2 || alives == 3) {
          newArr[x][y] = 1
        } else if (alives > 3) {
          newArr[x][y] = 0
        }
      } else if (cell == 0 && alives == 3) {
        newArr[x][y] = 1
      }
    }
  }
  return newArr
}

const createFromCells = ([width, height], cells) => {
  let universe = createEmptyUniverse([width, height])
  cells.map(([x, y]) => {
    universe[x][y] = 1
  })
  return universe
}

const createRandom = ([width, height], percentage = 0.5) => {
  let arr = []
  for (let i = 0; i < width; i++) {
    let innerArr = []
    for (let j = 0; j < height; j++) {
      innerArr.push((Math.random() > percentage) ? 1 : 0)
    }
    arr.push(innerArr)
  }
  return arr
}

const evolve = (customUniverse) => step(customUniverse)

const view = (customUniverse) => {
  let cells = []
  for (let x = 0; x < customUniverse.length; x++) {
    for (let y = 0; y < customUniverse[x].length; y++) {
      if (customUniverse[x][y] === 1) {
        cells.push([x, y])
      }
    }
  }
  return {
    size: [customUniverse.length, customUniverse[0].length],
    cells: sortCells(cells)
  }

}

export {
  createFromCells,
  createRandom,
  evolve,
  view,

  createEmptyUniverse,
  step
}