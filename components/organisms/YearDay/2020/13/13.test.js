import { testData, testData2, prepareData, validate, validateTwo, getEarliestBusAndTime, getWaitingTime } from './13'
import myData from './13.json'

describe('day13', () => {
  it('prepareData testData', () => {
    expect(prepareData(testData)).toEqual({
      arrives: 939,
      buses: [7, 13, 59, 31, 19],
      busesWithTime: [
        {
          number: 7,
          timeOffset: 0
        },
        {
          number: 13,
          timeOffset: 1
        },
        {
          number: 59,
          timeOffset: 4
        },
        {
          number: 31,
          timeOffset: 6
        },
        {
          number: 19,
          timeOffset: 7
        }
      ]
    })
  })
  it('getEarliestBusAndTime testData', () => {
    const prepData = prepareData(testData)
    expect(getEarliestBusAndTime(prepData)).toEqual({ arrives: 944, waitingTime: 5, busNumber: 59 })
  })
  it('getWaitingTime testData', () => {
    const prepData = prepareData(testData)
    expect(getWaitingTime(prepData)).toEqual(5)
  })
  it('validate testData', () => {
    const prepData = prepareData(testData)
    expect(validate(prepData)).toEqual(295)
  })
  it('validate myData', () => {
    const prepData = prepareData(myData)
    expect(validate(prepData)).toEqual(3035)
  })
  it('validateTwo 17,x,13,19', () => {
    const prepData = prepareData(['', '17,x,13,19'])
    expect(validateTwo(prepData)).toEqual(3417)
  })
})
