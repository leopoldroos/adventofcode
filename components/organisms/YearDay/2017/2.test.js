import { testData, prepareData, validate, validateTwo } from './2'

describe('day1', () => {
  it('validate should return 18', () => {
    const data = prepareData(testData)
    expect(validate(data)).toEqual(18)
  })
  it('validateTwo should return 9', () => {
    const data = prepareData(testData)
    expect(validateTwo(data)).toEqual(9)
  })
})
