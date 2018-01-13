import { evolve } from './game-of-life'
import {andreasUniverse, simpleUniverse} from './universes'

const CYCLES = 10

const getTime = () => new Date().getTime();

const logExecutionTime = (t0) => console.log(`it took ${(getTime() - t0)} milliseconds.`)

describe('fedo\'s implementation', () => {
  it('simple universe', () => {
    let universe = simpleUniverse;
    let t0 = getTime()
    for(let i = 0; i < CYCLES; i++){
      universe = evolve(universe)
    }
    logExecutionTime(t0)
  })
  it('andreas\' universe', () => {
    let universe = andreasUniverse;
    let t0 = getTime()
    for(let i = 0; i < CYCLES; i++){
      universe = evolve(universe)
    }
    logExecutionTime(t0)
  })
})
