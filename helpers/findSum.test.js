import {
  findSum,
  findSumPairs,
  findSumThrees,
  findSumFours,
  findSumsUpTo,
} from './findSum'

describe('findSum alternatives', () => {
  it('findSum should return integer for valid setups', () => {
    expect(findSum([1, 2, 3], 1, 4)).toEqual(3)
    expect(findSum([1, 2, 3], 3, 4)).toEqual(1)
  })

  it('findSum should return undefined for valid setups', () => {
    expect(findSum([1, 2, 3], 2, 4)).toEqual(2)
  })

  it('should return [3, 1] for [1, 2, 3], 4', () => {
    const res = findSumPairs([1, 2, 3], 4)
    expect(res).toEqual([3, 1])
  })
  it('should return null for [1, 2, 3, 4, 5], 10', () => {
    const res = findSumPairs([1, 2, 3, 4, 5], 10)
    expect(res).toEqual(undefined)
  })
  it('should return 514579 for [1721, 299]', () => {
    const res = findSumPairs([1721, 299], 2020)
    expect(res[0] * res[1]).toEqual(514579)
  })
  it('should return 514579 for [979, 366, 675]', () => {
    const res = findSumThrees([979, 366, 675], 2020)
    expect(res[0] * res[1] * res[2]).toEqual(241861950)
  })
  it('findSumFours should return [3, 1] for [1, 2, 3, 4, 5, 6], 10', () => {
    const res = findSumFours([1, 2, 3, 4, 5, 6], 10)
    expect(res).toEqual([2, 1, 3, 4])
  })
  it('findSumsUpTo should return [9, 1, 9] for [2, 9, 1, 9, 5, 6, 7, 8, 9], 19', () => {
    const res = findSumsUpTo([2, 9, 1, 9, 5, 6, 7, 8, 9], 19)
    expect(res).toEqual([9, 1, 9])
  })
})
