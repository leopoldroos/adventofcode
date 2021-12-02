import { testData, prepareData, validate, validateTwo } from './6'
import myData from './6.json'

describe('day6', () => {
  it('validate testData should return 11', () => {
    const preparedData = prepareData(testData)
    expect(validate(preparedData)).toEqual(11)
  })
  it('validate myData should return SeatID 554', () => {
    const preparedData = prepareData(myData)
    expect(validate(preparedData)).toEqual(6782)
  })
  it('validateTwo testData should return 6', () => {
    const preparedData = prepareData(testData)
    expect(validateTwo(preparedData)).toEqual(6)
  })
  it('validateTwo myData should return 6', () => {
    const preparedData = prepareData(myData)
    expect(validateTwo(preparedData)).toEqual(3596)
  })
})
