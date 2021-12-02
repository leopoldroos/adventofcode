import {
  testData,
  prepareData,
  validate,
  validateTwo,
  getRecommendedChange,
  runOneRound,
  getRecommendedChange2
} from './11'
import myData from './11.json'

describe('day11.2',
  () => {
    it('findInDirection 1 #', () => {
      const data = [
        '....#',
        '.....',
        '..L..',
        '.....',
        '.....',
      ]
      const prepData = prepareData(data)
      expect(getRecommendedChange2(prepData, 2, 2, test)).toEqual(1)
      expect(getRecommendedChange2(prepData, 2, 2)).toEqual('L')
    })
    it('findInDirection 8 #', () => {
      const data = [
        '#.#.#',
        '.....',
        '#.L.#',
        '.....',
        '#.#.#',
      ]
      const prepData = prepareData(data)
      expect(getRecommendedChange2(prepData, 2, 2, test)).toEqual(8)
      expect(getRecommendedChange2(prepData, 2, 2)).toEqual('L')
    })
    it('validateTwo => 26', () => {
      const prepData = prepareData(testData)
      expect(validateTwo(prepData).occupied).toEqual(26)
    })
    it('validateTwo => 2045', () => {
      const prepData = prepareData(myData)
      expect(validateTwo(prepData).occupied).toEqual(2045)
    })


  })
