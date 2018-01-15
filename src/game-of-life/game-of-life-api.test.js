import GameOfLife from './game-of-life-api'
import {difference, pluck} from 'ramda'
import {printUniverse} from "./game-of-life-api"

const golImmutable = new GameOfLife('IMMUTABLE')
const golJsfiddle = new GameOfLife('JSFIDDLE')

describe(GameOfLife.name, () => {
  it('correctness', () => {
    const SIZE = [10, 10]
    const CYCLES = 10

    const {cells: cells1} = golImmutable.view(golImmutable.create(SIZE, {random: true}))
    const {cells: cells2} = golJsfiddle.view(golJsfiddle.create(SIZE, {random: true}))

    let immutable = {
      universe1: golImmutable.create(SIZE, {cells: cells1}),
      history1: [],
      universe2: golImmutable.create(SIZE, {cells: cells2}),
      history2: [],
    }
    let jsfiddle = {
      universe1: golJsfiddle.create(SIZE, {cells: cells1}),
      history1: [],
      universe2: golJsfiddle.create(SIZE, {cells: cells2}),
      history2: []
    }

    for (let n = 0; n < CYCLES; n++) {
      immutable.universe1 = golImmutable.evolve(immutable.universe1)
      immutable.history1.push(golImmutable.view(immutable.universe1))
      immutable.universe2 = golImmutable.evolve(immutable.universe2)
      immutable.history2.push(golImmutable.view(immutable.universe2))

      jsfiddle.universe1 = golJsfiddle.evolve(jsfiddle.universe1)
      jsfiddle.history1.push(golJsfiddle.view(jsfiddle.universe1))
      jsfiddle.universe2 = golJsfiddle.evolve(jsfiddle.universe2)
      jsfiddle.history2.push(golJsfiddle.view(jsfiddle.universe2))
    }

    expect(immutable.history1).toEqual(jsfiddle.history1)
    expect(immutable.history2).toEqual(jsfiddle.history2)
  })
})