import {
  testData,
  prepareData,
  validate,
  validateTwo,
  isNumberValidByPreamble,
} from './9'
import myData from './9.json'

describe('day9', () => {
  it('isNumberValidByPreamble should validate to be true', () => {
    expect(isNumberValidByPreamble([1, 2, 3, 4, 5], 6)).toEqual(true)
  })
  it('isNumberValidByPreamble should validate to be false', () => {
    expect(isNumberValidByPreamble([1, 2, 3, 4, 5], 10)).toEqual(false)
  })

  it('validate [1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3 should validate preamble to be [3, 4, 5]', () => {
    const result = validate([1, 2, 3, 4, 5, 6, 7, 8, 9, 10], 3)
    expect(result.preamble).toEqual([3, 4, 5])
  })
  it('validate myData should validate to be 530627549', () => {
    const prepData = prepareData(myData)
    const result = validate(prepData, 25)
    expect(result.number).toEqual(530627549)
    expect(result.preamble).toEqual([
      572324277,
      363297513,
      460516474,
      516508484,
      311627096,
      354271083,
      387383983,
      432972560,
      470593851,
      617288405,
      433757052,
      630528917,
      608261975,
      549642689,
      457030618,
      553801942,
      983399741,
      502945251,
      558303313,
      562462566,
      648422524,
      584143629,
      601619284,
      699011079,
      879805997,
    ])
  })
  it('validateTwo myData-> number and preamble should validate to be 77730285', () => {
    const prepData = prepareData(myData)
    const result = validate(prepData, 25)
    expect(validateTwo(prepData, result.number)).toEqual(77730285)
  })
})
