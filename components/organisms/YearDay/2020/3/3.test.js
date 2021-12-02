import { testData, prepareData, validate, multiplyMany } from './3'

describe('day2', () => {
  it('validate slopes should return 2 for testData and right 1, down 1', () => {
    const data = prepareData(testData)
    expect(validate(data, 1, 1)).toEqual(2)
  })
  it('validate slopes should return 7 for testData and right 3, down 1', () => {
    const data = prepareData(testData)
    expect(validate(data, 3, 1)).toEqual(7)
  })
  it('validate slopes should return 3 for testData and right 5, down 1', () => {
    const data = prepareData(testData)
    expect(validate(data, 5, 1)).toEqual(3)
  })
  it('validate slopes should return 4 for testData and right 7, down 1', () => {
    const data = prepareData(testData)
    expect(validate(data, 7, 1)).toEqual(4)
  })
  it('validate slopes should return 2 for testData and right 1, down 2', () => {
    const data = prepareData(testData)
    expect(validate(data, 1, 2)).toEqual(2)
  })

  it('multiplyMany should return 336', () => {
    const data = prepareData(testData)
    expect(multiplyMany(data)).toEqual(336)
  })
})
