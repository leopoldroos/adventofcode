import {
  requiredProps,
  testData,
  prepareData,
  validate,
  validateTwo,
} from './4'
import myData from './4.json'

describe('day2', () => {
  it('requiredProps is valid for four digits; at least 1920 and at most 2002', () => {
    expect(requiredProps.byr('1920')).toEqual(true)
    expect(requiredProps.byr('2002')).toEqual(true)
    expect(requiredProps.byr('2000')).toEqual(true)
    expect(requiredProps.byr('1919')).toEqual(false)
    expect(requiredProps.byr('2003')).toEqual(false)
    expect(requiredProps.byr('203')).toEqual(false)
    expect(requiredProps.byr('20003')).toEqual(false)
  })
  it('requiredProps is valid for four digits; at least 2010 and at most 2020', () => {
    expect(requiredProps.iyr('2010')).toEqual(true)
    expect(requiredProps.iyr('2020')).toEqual(true)
    expect(requiredProps.iyr('2009')).toEqual(false)
    expect(requiredProps.iyr('2021')).toEqual(false)
    expect(requiredProps.iyr('202')).toEqual(false)
    expect(requiredProps.iyr('20200')).toEqual(false)
  })
  it('requiredProps is valid for four digits; at least 2020 and at most 2030', () => {
    expect(requiredProps.eyr('2020')).toEqual(true)
    expect(requiredProps.eyr('2030')).toEqual(true)
    expect(requiredProps.eyr('2025')).toEqual(true)
    expect(requiredProps.eyr('2019')).toEqual(false)
    expect(requiredProps.eyr('2031')).toEqual(false)
  })
  it('requiredProps is valid for a number followed by either cm or in: If cm, the number must be at least 150 and at most 193, If in, the number must be at least 59 and at most 76', () => {
    expect(requiredProps.hgt('150cm')).toEqual(true)
    expect(requiredProps.hgt('180cm')).toEqual(true)
    expect(requiredProps.hgt('193cm')).toEqual(true)
    expect(requiredProps.hgt('149cm')).toEqual(false)
    expect(requiredProps.hgt('194cm')).toEqual(false)
    expect(requiredProps.hgt('59in')).toEqual(true)
    expect(requiredProps.hgt('70in')).toEqual(true)
    expect(requiredProps.hgt('76in')).toEqual(true)
    expect(requiredProps.hgt('58in')).toEqual(false)
    expect(requiredProps.hgt('77in')).toEqual(false)
    expect(requiredProps.hgt('180mm')).toEqual(false)
    expect(requiredProps.hgt('180')).toEqual(false)
  })
  it('requiredProps is valid for a # followed by exactly six characters 0-9 or a-f', () => {
    expect(requiredProps.hcl('#aabbcc')).toEqual(true)
    expect(requiredProps.hcl('#0abFc9')).toEqual(true)
    expect(requiredProps.hcl('#0abFc')).toEqual(false)
    expect(requiredProps.hcl('0abFca')).toEqual(false)
    expect(requiredProps.hcl('#0abFch')).toEqual(false)
    expect(requiredProps.hcl('#0abFcc0')).toEqual(false)
  })
  it('requiredProps is valid for exactly one of: amb blu brn gry grn hzl oth', () => {
    expect(requiredProps.ecl('amb')).toEqual(true)
    expect(requiredProps.ecl('blu')).toEqual(true)
    expect(requiredProps.ecl('brn')).toEqual(true)
    expect(requiredProps.ecl('gry')).toEqual(true)
    expect(requiredProps.ecl('grn')).toEqual(true)
    expect(requiredProps.ecl('hzl')).toEqual(true)
    expect(requiredProps.ecl('oth')).toEqual(true)
    expect(requiredProps.ecl('oht')).toEqual(false)
    expect(requiredProps.ecl('ot')).toEqual(false)
    expect(requiredProps.ecl('othh')).toEqual(false)
  })
  it('requiredProps is valid for a nine-digit number, including leading zeroes', () => {
    expect(requiredProps.pid('000000000')).toEqual(true)
    expect(requiredProps.pid('123456789')).toEqual(true)
    expect(requiredProps.pid('000099999')).toEqual(true)
    expect(requiredProps.pid('00000000')).toEqual(false)
    expect(requiredProps.pid('0000000000')).toEqual(false)
    expect(requiredProps.pid('00000000a')).toEqual(false)
  })

  it('validate passports should return 2 for testData', () => {
    const data = prepareData(testData)
    expect(validate(data)).toEqual(2)
  })
  it('validate myData should return ', () => {
    const data = prepareData(myData)
    expect(validate(data)).toEqual(219)
  })
  it('validateTwo myData should return ', () => {
    const data = prepareData(myData)
    expect(validateTwo(data)).toEqual(127)
  })
})
