import {
  testData,
  testData2,
  prepareData,
  validate,
  validateTwo,
  givesAcceptedVoltage,
  highestAdapterVoltage,
  findFirstValidAdapter,
  findLowestValidAdapter,
  findAllValidAdaptersFromStart,
  getValidAdaptersChainByLowest,
  countDifferencesBetweenItems
} from './10'
import myData from './10.json'

describe('day10', () => {
  it('givesAcceptedVoltage should return valid: true for some cases', () => {
    expect(givesAcceptedVoltage(10, 10)).toEqual({ valid: true, diff: 0 })
    expect(givesAcceptedVoltage(9, 10)).toEqual({ valid: true, diff: 1 })
    expect(givesAcceptedVoltage(8, 10)).toEqual({ valid: true, diff: 2 })
    expect(givesAcceptedVoltage(7, 10)).toEqual({ valid: true, diff: 3 })
  })
  it('givesAcceptedVoltage should return valid: false for some cases', () => {
    expect(givesAcceptedVoltage(11, 10)).toEqual({ valid: false, diff: -1 })
    expect(givesAcceptedVoltage(6, 10)).toEqual({ valid: false, diff: 4 })
  })

  it('highestAdapterVoltage should return 22 fo rtestData and 53 for testData2', () => {
    const prepData = prepareData(testData)
    expect(highestAdapterVoltage(prepData)).toEqual(22)
    const prepData2 = prepareData(testData2)
    expect(highestAdapterVoltage(prepData2)).toEqual(52)
  })

  it('findFirstValidAdapter should return 3 for 0, [12, 3, 2]', () => {
    expect(findFirstValidAdapter(0, [12, 3, 2])).toEqual(3)
  })
  it('findLowestValidAdapter should return 3 for 0, [12, 3, 2]', () => {
    expect(findLowestValidAdapter(0, [12, 3, 2])).toEqual(2)
  })
  it('findAllValidAdaptersFromStart should return correct', () => {
    expect(findAllValidAdaptersFromStart(0, [1, 3, 10, 11, 12])).toEqual([1, 3])
    expect(findAllValidAdaptersFromStart(0, [1, 2, 3, 10, 11, 12])).toEqual([1, 2, 3])
    expect(findAllValidAdaptersFromStart(10, [1, 3, 10, 11, 12])).toEqual([])
  })

  it('getValidAdaptersChainByLowest with testData should return [1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19]', () => {
    const prepData = prepareData(testData)
    expect(getValidAdaptersChainByLowest(prepData)).toEqual([1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19])
  })
  it('countDifferencesBetweenItems [1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19] shoudl return {1:6, 3:4}', () => {
    expect(countDifferencesBetweenItems([1, 4, 5, 6, 7, 10, 11, 12, 15, 16, 19])).toEqual({
      '1': 6,
      '3': 4,
    })
  })

  it('validate testData and testData2 should return expected', () => {
    const prepData = prepareData(testData)
    expect(validate(prepData)).toEqual({
      '1': 7,
      '3': 5,
    })
    const prepData2 = prepareData(testData2)
    expect(validate(prepData2)).toEqual({
      '1': 22,
      '3': 10,
    })
  })

  it('validate myData...', () => {
    const prepData = prepareData(myData)
    expect(validate(prepData)).toEqual({ "1": 65, "3": 25 })
  })
})
