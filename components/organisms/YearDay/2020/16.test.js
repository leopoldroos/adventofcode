import { testData, testData2, prepareData, validate, validateTwo } from './16'
import myData from './16.json'

describe('day16', () => {
  it('validate myData', () => {
    const prepData = prepareData(myData)
    expect(validate(prepData)[0]).toEqual(536)
  })

  // it('validateTwo myData', () => {
  //   const prepData = prepareData(myData)
  //   expect(validateTwo(prepData)[0]).toEqual(1)
  // })
})
