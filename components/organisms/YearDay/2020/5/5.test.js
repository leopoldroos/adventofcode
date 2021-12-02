import { testData, prepareData, validate, validateTwo } from './5'
import myData from './5.json'

describe('day5', () => {
  it('testData should return SeatID 357', () => {
    const preparedData = prepareData(testData)
    expect(validate(preparedData).max).toEqual(357)
  })
  it('FFFBBBFRRR should return SeatID 567', () => {
    const preparedData = prepareData(['BFFFBBFRRR'])
    expect(validate(preparedData).max).toEqual(567)
  })
  it('FFFBBBFRRR should return SeatID 119', () => {
    const preparedData = prepareData(['FFFBBBFRRR'])
    expect(validate(preparedData).max).toEqual(119)
  })
  it('BBFFBBFRLL should return SeatID 820', () => {
    const preparedData = prepareData(['BBFFBBFRLL'])
    expect(validate(preparedData).max).toEqual(820)
  })
  it('FFFBBBFRRR, BBFFBBFRLL, FFFBBBFRRR should return SeatID 820', () => {
    const preparedData = prepareData(['FFFBBBFRRR', 'BBFFBBFRLL', 'FFFBBBFRRR'])
    expect(validate(preparedData).max).toEqual(820)
  })
  it('myData should return SeatID 554', () => {
    const preparedData = prepareData(myData)
    const { seatIds } = validate(preparedData)
    expect(validateTwo(seatIds)).toEqual(554)
  })
})
