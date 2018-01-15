import GameOfLife from './game-of-life-api'
import {
  evolve,
  counterMap$,
  getNeighbours,
  universe
} from './engines/game-of-life-immutable'

export {
  evolve,
  getNeighbours,
  universe,
  GameOfLife
}

export default GameOfLife