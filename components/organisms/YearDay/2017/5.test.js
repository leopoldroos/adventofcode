import { testData, prepareData, validate, validateTwo } from './5'
import myData from './5.json'

describe('day5', () => {
  it('validate ["0", "3", "0", "1", "-3"] should return 5', () => {
    const data = prepareData(['0', '3', '0', '1', '-3'])
    expect(validate(data)).toEqual(5)
  })
  it('validate myData should return 394829', () => {
    const data = prepareData(myData)
    expect(validate(data)).toEqual(394829)
  })

  it('validateTwo abcde fghij should return 10', () => {
    const data = prepareData(['0', '3', '0', '1', '-3'])
    expect(validateTwo(data)).toEqual(10)
  })
  it('validateTwo myData should return 31150702', () => {
    const data = prepareData(myData)
    expect(validateTwo(data)).toEqual(31150702)
  })
})
