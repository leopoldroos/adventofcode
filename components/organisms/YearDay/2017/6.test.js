import { testData, prepareData, validate } from './6'

describe('day6', () => {
  it('validate testData should return 5', () => {
    const preparedData = prepareData(testData)
    const { cycles, loopedBanks, loopIdentifiedAtIndex } = validate(
      preparedData
    )
    expect(cycles).toEqual(14029)
    expect(cycles - loopIdentifiedAtIndex).toEqual(2765)
  })
})
