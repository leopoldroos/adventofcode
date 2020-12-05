import { testData, validate, validateTwo } from './3'

describe('day3', () => {
  it('validate 1 should return 0', () => {
    expect(validate(1)).toEqual(0)
  })
  it('validate 12 should return 3', () => {
    expect(validate(12)).toEqual(3)
  })
  it('validate 23 should return 2', () => {
    expect(validate(23)).toEqual(2)
  })
  it('validate 1024 should return 31', () => {
    expect(validate(1024)).toEqual(31)
  })
})
