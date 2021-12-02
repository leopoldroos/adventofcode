import { testData, prepareData, validate, validateTwo, getNewDirection, move } from './12'
import myData from './12.json'
import testData3 from './12.moredata.json'

describe('day12', () => {
  it('getNewDirection', () => {
    expect(getNewDirection('R', 90, 'E')).toEqual('S')
    expect(getNewDirection('R', 90, 'S')).toEqual('W')
    expect(getNewDirection('R', 90, 'W')).toEqual('N')
    expect(getNewDirection('R', 90, 'N')).toEqual('E')

    expect(getNewDirection('L', 90, 'E')).toEqual('N')
    expect(getNewDirection('L', 90, 'N')).toEqual('W')
    expect(getNewDirection('L', 90, 'W')).toEqual('S')
    expect(getNewDirection('L', 90, 'S')).toEqual('E')

    expect(getNewDirection('F', 90, 'E')).toEqual('E')

    expect(getNewDirection('R', 180, 'E')).toEqual('W')
    expect(getNewDirection('L', 180, 'E')).toEqual('W')
    expect(getNewDirection('R', 360, 'E')).toEqual('E')
  })
  it('move', () => {
    let pos = move({ x: 0, y: 0, previousDirection: 'E' }, 'F', 12)
    expect(pos).toEqual({
      x: 12,
      y: 0,
      previousDirection: 'E'
    })
    pos = move({ x: 12, y: 0, previousDirection: 'E' }, 'N', 21)
    expect(pos).toEqual({
      x: 12,
      y: -21,
      previousDirection: 'E'
    })
    pos = move({ x: 0, y: 0, previousDirection: 'E' }, 'R', 90)
    expect(pos).toEqual({
      x: 0,
      y: 0,
      previousDirection: 'S'
    })
    pos = move({ x: 0, y: 0, previousDirection: 'E' }, 'L', 180)
    expect(pos).toEqual({
      x: 0,
      y: 0,
      previousDirection: 'W'
    })
  })
  it('move complex', () => {
    let pos = move({ x: 0, y: 0, previousDirection: 'E' }, 'F', 12)
    expect(pos).toEqual({
      x: 12,
      y: 0,
      previousDirection: 'E'
    })
    pos = move(pos, 'N', 21)
    expect(pos).toEqual({
      x: 12,
      y: -21,
      previousDirection: 'E'
    })
    pos = move(pos, 'R', 90)
    expect(pos).toEqual({
      x: 12,
      y: -21,
      previousDirection: 'S'
    })
    pos = move(pos, 'L', 180)
    expect(pos).toEqual({
      x: 12,
      y: -21,
      previousDirection: 'N'
    })
    pos = move(pos, 'F', 1)
    expect(pos).toEqual({
      x: 12,
      y: -22,
      previousDirection: 'N'
    })
    pos = move(pos, 'R', 90)
    expect(pos).toEqual({
      x: 12,
      y: -22,
      previousDirection: 'E'
    })
    pos = move(pos, 'F', 1)
    expect(pos).toEqual({
      x: 13,
      y: -22,
      previousDirection: 'E'
    })
    pos = move(pos, 'R', 180)
    expect(pos).toEqual({
      x: 13,
      y: -22,
      previousDirection: 'W'
    })
  })
  it('validate some data', () => {
    const prepData = prepareData([
      'F10',
      'N3',
      'F7'
    ])
    expect(validate(prepData)).toEqual({
      x: 17,
      y: -3,
      previousDirection: 'E',
      distance: 20
    })
  })
  it('validate testData', () => {
    const prepData = prepareData(testData)
    expect(validate(prepData)).toEqual({
      x: 17,
      y: 8,
      previousDirection: 'S',
      distance: 25
    })
  })
  it('validate testData3', () => {
    const prepData = prepareData(testData3)
    expect(validate(prepData).distance).toEqual(882)
  })
  it('validate myData', () => {
    const prepData = prepareData(myData)
    expect(validate(prepData)).toEqual({
      distance: 1441,
      previousDirection: "S",
      x: 987,
      y: 454
    })
  })

})
