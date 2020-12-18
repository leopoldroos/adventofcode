import { testData, testData2, prepareData, validate, validateTwo, calculateSubExpression, calculateAdvancedSubExpression, calculateExpressions } from './18'
import myData from './18.json'

describe('day18', () => {
  it('calculateSubExpression', () => {
    expect(calculateSubExpression('1 + 2')).toEqual(3)
    expect(calculateSubExpression('1 + 2 * 3')).toEqual(9)
    expect(calculateSubExpression('1 + 2 * 3 + 4')).toEqual(13)
    expect(calculateSubExpression('1 + 2 * 3 + 4 * 5 + 6')).toEqual(71)
  })

  it('calculateExpressions', () => {
    expect(calculateExpressions('1 + 2')).toEqual(3)
    expect(calculateExpressions('1 + (2 + 3)')).toEqual(6)
    expect(calculateExpressions('1 + (2 + 3) + (4 + 1 + (2 * 2))')).toEqual(15)
    expect(calculateExpressions('1 + 2 * 3 + 4 * 5 + 6')).toEqual(71)
    expect(calculateExpressions('1 + (2 * 3) + (4 * (5 + 6))')).toEqual(51)
    expect(calculateExpressions('2 * 3 + (4 * 5)')).toEqual(26)
    expect(calculateExpressions('5 + (8 * 3 + 9 + 3 * 4 * 3)')).toEqual(437)
    expect(calculateExpressions('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))')).toEqual(12240)
    expect(calculateExpressions('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2')).toEqual(13632)
  })
  it('calculateExpressions troublesome', () => {
    expect(calculateExpressions('(2 + 8 * 6 * 3 * (6 * 5 + 9 + 3 * 8 + 8) + (3 + 6 + 9 + 4 * 3 * 6))')).toEqual(62316)
    expect(calculateExpressions('62316 + 4 + (3 * 4 + 2 + (5 * 3 * 7 + 5 + 9)) * ((2 + 3 + 6 + 6 * 4 * 2) + 4 * 9 + 7 * (6 + 2)) + (6 + (8 * 7 + 2 + 2) + 8)')).toEqual(633023682)
    expect(calculateExpressions('633023682 * (7 + (9 + 3 + 9))')).toEqual(17724663096)
    expect(calculateExpressions('0 + 17724663096')).toEqual(17724663096)
  })
  // "(2 + 8 * 6 * 3 * (6 * 5 + 9 + 3 * 8 + 8) + (3 + 6 + 9 + 4 * 3 * 6)) + 4 + (3 * 4 + 2 + (5 * 3 * 7 + 5 + 9)) * ((2 + 3 + 6 + 6 * 4 * 2) + 4 * 9 + 7 * (6 + 2)) + (6 + (8 * 7 + 2 + 2) + 8) * (7 + (9 + 3 + 9))",

  it('calculateExpressions advanced troublesome', () => {
    expect(calculateExpressions('(2 + 8 * 6 * 3 * (6 * 5 + 9 + 3 * 8 + 8) + (3 + 6 + 9 + 4 * 3 * 6))', true)).toEqual(62316)
    expect(calculateExpressions('62316 + 4 + (3 * 4 + 2 + (5 * 3 * 7 + 5 + 9)) * ((2 + 3 + 6 + 6 * 4 * 2) + 4 * 9 + 7 * (6 + 2)) + (6 + (8 * 7 + 2 + 2) + 8)', true)).toEqual(633023682)
    expect(calculateExpressions('633023682 * (7 + (9 + 3 + 9))', true)).toEqual(17724663096)
    expect(calculateExpressions('0 + 17724663096', true)).toEqual(184692988312)
  })

  it('calculateExpressions advanced', () => {
    expect(calculateExpressions('1 + 2')).toEqual(3)
    // expect(calculateExpressions('1 + (2 + 3)', true)).toEqual(6)
    // expect(calculateExpressions('1 + (2 + 3) + (4 + 1 + (2 * 2))', true)).toEqual(15)
    // expect(calculateExpressions('1 + 2 * 3 + 4 * 5 + 6', true)).toEqual(231)
    // expect(calculateExpressions('1 + (2 * 3) + (4 * (5 + 6))', true)).toEqual(51)
    // expect(calculateExpressions('2 * 3 + (4 * 5)', true)).toEqual(46)
    // expect(calculateExpressions('5 + (8 * 3 + 9 + 3 * 4 * 3)', true)).toEqual(437)
    // expect(calculateExpressions('5 * 9 * (7 * 3 * 3 + 9 * 3 + (8 + 6 * 4))', true)).toEqual(12240)
    // expect(calculateExpressions('((2 + 4 * 9) * (6 + 9 * 8 + 6) + 6) + 2 + 4 * 2', true)).toEqual(13632)
  })

  it('validate testData', () => {
    expect(validate(testData)).toEqual(26457)
  })
  it('validate myData', () => {
    expect(validate(myData)).toEqual(3348222486398)
  })
})
