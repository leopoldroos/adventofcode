import {
  testData,
  prepareData,
  validate,
  validateTwo,
  reversOrderLengthFromIndex,
} from './10'

describe('day10', () => {
  it('reversyOrderFromIndex [0,1,2,3,4], 0 should return [0,1,4,3,2]', () => {
    expect(reversOrderLengthFromIndex([0, 1, 2, 3, 4], 0, 5)).toEqual([
      4,
      3,
      2,
      1,
      0,
    ])
  })
  it('reversyOrderFromIndex [0,1,2,3,4], 2 should return [0,1,4,3,2]', () => {
    expect(reversOrderLengthFromIndex([0, 1, 2, 3, 4], 2, 3)).toEqual([
      0,
      1,
      4,
      3,
      2,
    ])
  })
  it('reversyOrderFromIndex [0,1,2,3,4], 4 should return [0,1,4,3,2]', () => {
    expect(reversOrderLengthFromIndex([0, 1, 2, 3, 4], 2, 4)).toEqual([
      2,
      1,
      0,
      4,
      3,
    ])
  })
  it('validate list of [0,1,2,3,4], and lengths 3', () => {
    const data = prepareData(['3'], 5)
    expect(validate(data).listOfNumbers).toEqual([2, 1, 0, 3, 4])
  })
  it('validate list of [0,1,2,3,4], and lengths 3,4 ', () => {
    const data = prepareData(['3,4'], 5)
    expect(validate(data).listOfNumbers).toEqual([4, 3, 0, 1, 2])
  })

  it('validate list of [0,1,2,3,4], and lengths 3, 4, 1, 5 ', () => {
    const data = prepareData(['3,4,1,5'], 5)
    expect(validate(data).listOfNumbers).toEqual([3, 4, 2, 1, 0])
  })
  it('validate testData should return 46600', () => {
    const data = prepareData(testData)
    const { listOfNumbers } = validate(data)
    expect(listOfNumbers[0] * listOfNumbers[1]).toEqual(46600)
  })
})
