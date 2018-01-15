import R, {contains} from 'ramda'
import * as golImmutable from './engines/game-of-life-immutable'
import * as golJsfiddle from './engines/game-of-life-jsfiddle-vqBE4'

/*
Game of Life
- create(size, {cells, random}) -> customUniverse
- evolve(customUniverse) -> customUniverse
- view(customUniverse) -> { size, cells }
*/

const ENGINES = {
  IMMUTABLE: golImmutable,
  JSFIDDLE: golJsfiddle
}

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

const sortCells = R.sortWith([
  R.ascend(R.prop(0)),
  R.ascend(R.prop(1))
]);

class GameOfLife {
  constructor(engineName){
    const e = ENGINES[engineName]
    if(!e){
      throw new Error(`engine '${engineName}' does not Exist`)
    }
    this.engine = e
  }
  create = (size, {cells, random}) => random
    ? this.engine.createRandom(size)
    : this.engine.createFromCells(size, cells)
  evolve = (customUniverse) => this.engine.evolve(customUniverse)
  view = (customUniverse) => this.engine.view(customUniverse)
}

export default GameOfLife

export {
  printUniverse,
  sortCells
}