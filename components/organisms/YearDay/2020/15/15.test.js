import { testData, testData2, prepareData, validate, validateTwo } from './15'
import myData from './15.json'

describe('day15', () => {
  it('validate', () => {
    expect(validate([1, 3, 2])[0]).toEqual(1)
    expect(validate([1, 2, 3])[0]).toEqual(27)
    expect(validate([2, 1, 3])[0]).toEqual(10)
  })
  it('validate myData', () => {
    const prepData = prepareData(myData)
    expect(validate(prepData)[0]).toEqual(536)
  })

  // it('validateTwo myData', () => {
  //   const prepData = prepareData(myData)
  //   expect(validateTwo(prepData)[0]).toEqual(1)
  // })
})
