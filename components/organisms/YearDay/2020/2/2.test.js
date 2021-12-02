import {
  testData,
  prepareData,
  validateRegExpOnValues,
  validateByIndexOnValues,
} from './2'

describe('day2', () => {
  it('validateRegExpOnValues should return 2 for testData', () => {
    const data = prepareData(testData)
    expect(validateRegExpOnValues(data)).toEqual(2)
  })
  it('validateByIndexOnValues should return 1 for testData', () => {
    const data = prepareData(testData)
    expect(validateByIndexOnValues(data).length).toEqual(1)
  })
  it('validateByIndexOnValues should return 1 for "1-6 m: mmmmmmm"', () => {
    const data = prepareData(['1-6 m: mmmmmmm'])
    expect(validateByIndexOnValues(data).length).toEqual(0)
  })
})
