import {contains, equals, range, reduce} from 'ramda'
import {List, Map} from 'immutable'
import {simpleUniverse, andreasUniverse} from '../universes'
import {sortCells} from "../game-of-life-api"

const getNeighbours = (position, universe) => {
  const {size, cells} = universe
  const [width, height] = size
  const [x, y] = position
  const xs = range(x - 1, x + 2)
  const ys = range(y - 1, y + 2)
  return reduce((acc, x) => {
    if (x >= 0 && x < width) {
      return reduce((acc2, y) => {
        return (y >= 0 && y < height && !equals(position, [x, y]))
          ? acc2.push([x, y])
          : acc2
      }, acc, ys)
    } else {
      return acc
    }
  }, List(), xs)
}

const counterMap$ = (universe) => {
  const {size, cells} = universe
  return cells.reduce((acc, position) => {
    return getNeighbours(position, universe).reduce((acc, neighbourPosition) => {
      return acc.update(List(neighbourPosition), (value) => (value || 0) + 1)
    }, acc)
  }, Map())
}

const isAlive = (position, cells) => contains(position, cells)

const evolve = (universe) => {
  const {size, cells} = universe
  const $counterMap = counterMap$(universe)
  return {
    size,
    cells: $counterMap.reduce((acc, counter, $position) => {
      const position = $position.toArray()
      return (counter === 3 || (isAlive(position, cells) && counter === 2))
        ? acc.push(position)
        : acc
    }, List()).toArray()
  }
}

const universe = andreasUniverse

const createFromCells = (size, cells) => ({size, cells})

const createRandom = (size, percentage = 0.5) => {
  const [width, height] = size
  let cells = []
  for(let x = 0; x < width; x++){
    for(let y = 0; y < height; y++){
      if(Math.random() > percentage){
        cells.push([x, y])
      }
    }
  }
  return {
    size,
    cells
  }
}

const view = (customUniverse) => ({
  ...customUniverse,
  cells: sortCells(customUniverse.cells)
})

export {
  createFromCells,
  createRandom,
  evolve,
  view,

  counterMap$,
  getNeighbours,
  universe
}

