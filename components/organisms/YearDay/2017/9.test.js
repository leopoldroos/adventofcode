import { testData, validate } from './9'

describe('day9', () => {
  it('validate testData should return 14212 and 6569', () => {
    const { groups, nrOfGarbageCharacters, score } = validate(testData)
    expect(score).toEqual(14212)
    expect(nrOfGarbageCharacters).toEqual(6569)
  })
})
