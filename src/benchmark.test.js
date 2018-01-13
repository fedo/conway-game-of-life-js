import * as gol_fedo from './game-of-life'
import {andreasUniverse, simpleUniverse} from './universes'
import * as gol_vqBE4 from './game-of-life-jsfiddle-vqBE4'
import {randomlyPopulate} from "./game-of-life-jsfiddle-vqBE4"
import now from 'performance-now'

const CYCLES = 10

const getTime = () => now();

const logExecutionTime = (t0) => console.log(`it took ${((now() - t0)).toFixed(3)} milliseconds.`)

describe('fedo\'s implementation', () => {
  it('simple universe', () => {
    let universe = simpleUniverse;
    let t0 = getTime()
    for(let i = 0; i < CYCLES; i++){
      universe = gol_fedo.evolve(universe)
    }
    logExecutionTime(t0)
  })
  it('andreas\' universe', () => {
    let universe = andreasUniverse;
    let t0 = getTime()
    for(let i = 0; i < CYCLES; i++){
      universe = gol_fedo.evolve(universe)
    }
    logExecutionTime(t0)
  })
})

describe('jsfiddle vqBE4 implementation', () => {
  it('runs', () => {
    let universe = gol_vqBE4.buildArr()
    randomlyPopulate(universe)
    let t0 = getTime()
    for(let i = 0; i < CYCLES; i++){
      universe = gol_vqBE4.step(universe)
    }
    logExecutionTime(t0)
  })
})
