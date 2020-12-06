import { testData, prepareData, validate, validateTwo } from './8'
import myData from './8.json'

describe('day8', () => {
  it('validate testData should return 1', () => {
    const data = prepareData(testData)
    const { maxValue, topValue } = validate(data)
    expect(topValue).toEqual(1)
    expect(maxValue).toEqual(10)
  })
  it('validate myData should return 4902', () => {
    const data = prepareData(myData)
    const { maxValue, topValue } = validate(data)
    expect(topValue).toEqual(4902)
    expect(maxValue).toEqual(7037)
  })
})
