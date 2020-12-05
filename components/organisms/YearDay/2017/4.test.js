import { validate, validateTwo } from './4'
import myData from './4.json'

describe('day4', () => {
  it('validate "aa bb cc dd ee" should return 1', () => {
    expect(validate(['aa bb cc dd ee'])).toEqual(1)
  })
  it('validate "aa bb cc dd aa" should return 0', () => {
    expect(validate(['aa bb cc dd aa'])).toEqual(0)
  })
  it('validate "aa bb cc dd aaa" should return 1', () => {
    expect(validate(['aa bb cc dd aaa'])).toEqual(1)
  })
  it('validate myData should return 455', () => {
    expect(validate(myData)).toEqual(455)
  })

  it('validateTwo abcde fghij should return 1', () => {
    expect(validate(['abcde fghij'])).toEqual(1)
  })
  it('validateTwo "abcde xyz ecdab" should return 0', () => {
    expect(validateTwo(['abcde xyz ecdab'])).toEqual(0)
  })
  it('validateTwo "a ab abc abd abf abj" should return 1', () => {
    expect(validateTwo(['a ab abc abd abf abj'])).toEqual(1)
  })
  it('validateTwo "iiii oiii ooii oooi oooo" should return 1', () => {
    expect(validateTwo(['iiii oiii ooii oooi oooo'])).toEqual(1)
  })
  it('validateTwo "oiii ioii iioi iiio" should return 0', () => {
    expect(validateTwo(['oiii ioii iioi iiio'])).toEqual(0)
  })
  it('validateTwo myData should return 186', () => {
    expect(validateTwo(myData)).toEqual(186)
  })
})
