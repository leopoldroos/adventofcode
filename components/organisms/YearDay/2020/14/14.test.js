import { testData, testData2, prepareData, validate, validateTwo, getMaskAsBin, applyValueBitmask, applyAddressBitmask, runBitmasks } from './14'
import myData from './14.json'

describe('day14', () => {
  it('getMaskAsBin', () => {
    expect(getMaskAsBin('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X')).toEqual('000000000000000000000000000001000000')
  })
  it('applyValueBitmask', () => {
    expect(applyValueBitmask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 0)).toEqual('000000000000000000000000000001000000')
    expect(applyValueBitmask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 11)).toEqual('000000000000000000000000000001001001')
    expect(applyValueBitmask('XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X', 101)).toEqual('000000000000000000000000000001100101')
  })
  it('applyAddressBitmask', () => {
    expect(applyAddressBitmask('000000000000000000000000000000X1001X', 42)).toEqual('000000000000000000000000000000X1101X')
  })
  it('prepareData', () => {
    expect(prepareData(testData)).toEqual([
      {
        mask: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXX1XXXX0X",
        mems: [
          {
            position: "8",
            value: 11
          },
          {
            position: "7",
            value: 101
          },
          {
            position: "8",
            value: 0
          }
        ]
      }
    ])
  })
  it('runBitmasks tesetData', () => {
    const prepData = prepareData(testData)
    expect(runBitmasks(prepData)).toEqual({
      7: 101,
      8: 64
    })
  })
  it('validate testData', () => {
    const prepData = prepareData(testData)
    expect(validate(prepData)).toEqual(165)
  })
  it('validate myData', () => {
    const prepData = prepareData(myData)
    expect(validate(prepData)).toEqual(15403588588538)
  })
  it('validateTwo testData', () => {
    const prepData = prepareData(testData2)
    expect(validateTwo(prepData)).toEqual(208)
  })
  it('validateTwo myData', () => {
    const prepData = prepareData(myData)
    expect(validateTwo(prepData)).toEqual(3260587250457)
  })
})
