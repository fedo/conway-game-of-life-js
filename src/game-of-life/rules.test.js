import {compose, contains} from 'ramda'
import GameOfLife from "./game-of-life-api"

const printUniverse = (message, universe) => {
  const {size: [width, height], cells} = universe
  let output = `${message}\n`
  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      output = `${output}${contains([x, y], cells) ? '◆' : '◇'}${x === width - 1 ? '\n' : ''}`
    }
  }
  console.log(output)
  return universe
}

const firstRule = (engine) => {
  // 1. Any live cell with fewer than two live neighbours dies, as if caused by underpopulation.
  let universe = {
    size: [3, 3],
    cells: [[1, 1]]
  }
  printUniverse('start first rule', universe)
  const nextUniverse = engine.view(engine.evolve(engine.create(universe.size, {cells: universe.cells})))
  expect(printUniverse('end', nextUniverse)).toEqual({
    ...universe,
    cells: []
  })
}

const secondRule = (engine) => {
  // 2. Any live cell with two or three live neighbours lives on to the next generation.

  let universe = {
    size: [9, 9],
    cells: [[1, 1], [2, 1], [3, 1], [1, 7], [2, 7], [3, 7], [1, 6], [2, 6], [3, 6]]
  }
  printUniverse('start second rule', universe)
  const nextUniverse = engine.view(engine.evolve(engine.create(universe.size, {cells: universe.cells})))
  expect(printUniverse('end', nextUniverse)).toEqual({
    ...universe,
    cells: [[1, 6], [1, 7], [2, 0], [2, 1], [2, 2], [2, 5], [2, 8], [3, 6], [3, 7]]
  })
}

const thirdRule = (engine) => {
  // Any live cell with more than three live neighbours dies, as if by overpopulation.
  let universe = {
    size: [4, 4],
    cells: [[1, 1], [2, 1], [1, 2], [2, 2]]
  }
  printUniverse('start third rule', universe)
  const nextUniverse = engine.view(engine.evolve(engine.create(universe.size, {cells: universe.cells})))
  expect(printUniverse('end', nextUniverse)).toEqual({
    ...universe,
    cells: [[1, 1], [1, 2], [2, 1], [2, 2]]
  })
}

const forthRule = (engine) => {
  // 4. Any dead cell with exactly three live neighbours becomes a live cell, as if by reproduction.
  let universe = {
    size: [5, 5],
    cells: [[1, 2], [2, 1], [3, 2]]
  }
  printUniverse('start forth rule', universe)
  const nextUniverse = engine.view(engine.evolve(engine.create(universe.size, {cells: universe.cells})))
  expect(printUniverse('end', nextUniverse)).toEqual({
    ...universe,
    cells: [[2, 1], [2, 2]]
  })
}

const golImmutable = new GameOfLife('IMMUTABLE')

describe('game-of-life-immutable', () => {

  it('first rule', () => {
    firstRule(golImmutable)
  })
  it('second rule', () => {
    secondRule(golImmutable)
  })
  it('third rule', () => {
    thirdRule(golImmutable)
  })
  it('forth rule', () => {
    forthRule(golImmutable)
  })
})

const golJsfiddle = new GameOfLife('JSFIDDLE')

describe('game-of-life-jsfiddle', () => {

  it('first rule', () => {
    firstRule(golJsfiddle)
  })
  it('second rule', () => {
    secondRule(golJsfiddle)
  })
  it('third rule', () => {
    thirdRule(golJsfiddle)
  })
  it('forth rule', () => {
    forthRule(golJsfiddle)
  })
})
