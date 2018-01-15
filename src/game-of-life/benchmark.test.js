import now from 'performance-now'
import * as golImmutable from './engines/game-of-life-immutable'
import * as golJsfiddle from './engines/game-of-life-jsfiddle-vqBE4'
import {printUniverse} from "./game-of-life-api"

const CYCLES = 10

const getTime = () => now();

const logExecutionTime = (message, t0) => console.log(`${message} - it took ${((now() - t0)).toFixed(4)} milliseconds.`)

describe('golImmutable', () => {
  it('random 10x10', () => {
    let universe = golImmutable.createRandom([10, 10])
    printUniverse('golImmutable start', golImmutable.view(universe))
    let t0 = getTime()
    for(let i = 0; i < CYCLES; i++){
      universe = golImmutable.evolve(universe)
    }
    printUniverse('golImmutable end', golImmutable.view(universe))
    logExecutionTime('golImmutable', t0)
  })
})

describe('jsfiddle vqBE4 implementation', () => {
  it('random 10x10', () => {
    let universe = golJsfiddle.createRandom([10, 10])
    printUniverse('golJsfiddle start', golJsfiddle.view(universe))
    let t0 = getTime()
    for(let i = 0; i < CYCLES; i++){
      universe = golJsfiddle.step(universe)
    }
    printUniverse('golJsfiddle end', golJsfiddle.view(universe))
    logExecutionTime('golJsfiddle', t0)
  })
})
