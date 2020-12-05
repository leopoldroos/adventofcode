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

  it('validate should given 1212 and offset 2 (halfing) return 6', () => {
    expect(validate('1212', 2)).toEqual(6)
  })
  it('validate should given 1221 and offset 2 (halfing) return 0', () => {
    expect(validate('1221', 2)).toEqual(0)
  })
  // it('validate should given 123425 and offset 2 (halfing) return 4', () => {
  //   expect(validate('123425', 2)).toEqual(4)
  // })
  // it('validate should given 123123 and offset 2 (halfing) return 12', () => {
  //   expect(validate('123123', 2)).toEqual(12)
  // })
  it('validate should given 12131415 and offset 2 (halfing) return 4', () => {
    expect(validate('12131415', 2)).toEqual(4)
  })
})
