import { testData, prepareData, validate, validateTwo } from './8'
import myData from './8.json'

describe('day8', () => {
  it('testData should validate accumulator = 5', () => {
    const preparedData = prepareData(testData)
    const { accumulator } = validate(preparedData)
    expect(accumulator).toEqual(5)
  })
  it('testData should validateTwo accumulator = 8', () => {
    const preparedData = prepareData(testData)
    const { accumulator } = validateTwo(preparedData)
    expect(accumulator).toEqual(8)
  })
  it('myData should validate accumulator = 1915', () => {
    const preparedData = prepareData(myData)
    const { accumulator } = validate(preparedData)
    expect(accumulator).toEqual(1915)
  })
  it('myData should validateTwo accumulator = 944', () => {
    const preparedData = prepareData(myData)
    const { accumulator } = validateTwo(preparedData)
    expect(accumulator).toEqual(944)
  })
})
