import {evolve} from './game-of-life'
import {andreasUniverse, simpleUniverse} from './universes'
import {concat, contains} from 'ramda'

const printUniverse = (message, universe) => {
  const {size: [width, height], cells} = universe
  let output = `${message}\n`
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      output = `${output}${contains([x, y], cells) ? '◆' : '◇'}${x === width - 1 ? '\n': ''}`
    }
  }
  console.log(output)
  return universe
}

describe('game-of-life', () => {
  it('first rule', () => {
    // 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
    let universe = {
      size: [3, 3],
      cells: [[1, 1]]
    }
    printUniverse('start first rule', universe)
    expect(printUniverse('end', evolve(universe))).toEqual({
      ...universe,
      cells: []
    })
  })
  it('second rule', () => {
    // 2. Any live cell with two or three live neighbours lives on to the next generation.
    let universe = {
      size: [9, 9],
      cells: [[1, 1], [2,1], [3, 1],  [1, 7], [2, 7], [3,7], [1, 6], [2,6], [3, 6]]
    }
    printUniverse('start second rule', universe)
    expect(printUniverse('end', evolve(universe))).toEqual({
      ...universe,
      cells: [[2, 2], [1, 7], [2, 1], [3, 6], [1, 6], [3, 7], [2, 0], [2, 8], [2, 5]]
    })
  })
  it('third rule', () => {
    // Any live cell with more than three live neighbours dies, as if by overpopulation.
    let universe = {
      size: [4, 4],
      cells: [[1, 1], [2, 1], [1, 2], [2, 2]]
    }
    printUniverse('start third rule', universe)
    expect(printUniverse('end', evolve(universe))).toEqual({
      ...universe,
      cells: [[1, 2], [2, 2], [1, 1], [2, 1]]
    })
  })
  it('forth rule', () => {
    // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
    let universe = {
      size: [5, 5],
      cells: [[1, 2], [2, 1], [3, 2]]
    }
    printUniverse('start forth rule', universe)
    expect(printUniverse('end', evolve(universe))).toEqual({
        ...universe,
      cells: [[2, 2], [2, 1]]
    })
  })
})
