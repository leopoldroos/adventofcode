import { findSumPairs, findSumThrees } from './findSum'

describe('findSumPairs', () => {
  it('should return 514579 for [1721, 299]', () => {
    expect(findSumPairs([1721, 299], 2020)).toEqual(514579)
  })
  it('should return 514579 for [979, 366, 675]', () => {
    expect(findSumThrees([979, 366, 675], 2020)).toEqual(241861950)
  })
})
