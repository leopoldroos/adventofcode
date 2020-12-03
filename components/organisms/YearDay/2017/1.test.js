import { testData, prepareData, validate } from './1'

describe('day1', () => {
  it('validate should given 1122 return 3', () => {
    const data = prepareData(testData)
    expect(validate(data)).toEqual(3)
  })
  it('validate should given 1111 return 4', () => {
    expect(validate('1111')).toEqual(4)
  })
  it('validate should given 1234 return 4', () => {
    expect(validate('1234')).toEqual(0)
  })
  it('validate should given 91212129 return 4', () => {
    expect(validate('91212129')).toEqual(9)
  })
})
