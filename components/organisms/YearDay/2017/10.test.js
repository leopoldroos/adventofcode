import {
  testData,
  prepareData,
  validate,
  validateTwo,
  reversOrderLengthFromIndex,
  denseHash,
  xor,
  generateZeros,
  xorList,
  decToHex,
} from './10'

describe('day10', () => {
  it('reversyOrderFromIndex [0,1,2,3,4], 0 should return [0,1,4,3,2]', () => {
    expect(reversOrderLengthFromIndex([0, 1, 2, 3, 4], 0, 5)).toEqual([
      4,
      3,
      2,
      1,
      0,
    ])
  })
  it('reversyOrderFromIndex [0,1,2,3,4], 2 should return [0,1,4,3,2]', () => {
    expect(reversOrderLengthFromIndex([0, 1, 2, 3, 4], 2, 3)).toEqual([
      0,
      1,
      4,
      3,
      2,
    ])
  })
  it('reversyOrderFromIndex [0,1,2,3,4], 4 should return [0,1,4,3,2]', () => {
    expect(reversOrderLengthFromIndex([0, 1, 2, 3, 4], 2, 4)).toEqual([
      2,
      1,
      0,
      4,
      3,
    ])
  })
  it('validate list of [0,1,2,3,4], and lengths 3', () => {
    const data = prepareData(['3'], 5)
    expect(validate(data).listOfNumbers).toEqual([2, 1, 0, 3, 4])
  })
  it('validate list of [0,1,2,3,4], and lengths 3,4 ', () => {
    const data = prepareData(['3,4'], 5)
    expect(validate(data).listOfNumbers).toEqual([4, 3, 0, 1, 2])
  })

  it('validate list of [0,1,2,3,4], and lengths 3, 4, 1, 5 ', () => {
    const data = prepareData(['3,4,1,5'], 5)
    expect(validate(data).listOfNumbers).toEqual([3, 4, 2, 1, 0])
  })
  it('validate testData should return 46600', () => {
    const data = prepareData(testData)
    const { listOfNumbers } = validate(data)
    expect(listOfNumbers[0] * listOfNumbers[1]).toEqual(46600)
  })

  it('generateZeros(3) => "000"', () => {
    expect(generateZeros(3)).toEqual('000')
  })
  it('xor 10 01 => 11', () => {
    expect(xor('10', '1')).toEqual('11')
    expect(xor(10, 1)).toEqual('11')
    expect(xor('10101', '11111')).toEqual('01010')
  })
  it('xorList [10 01 10] => 01', () => {
    expect(xorList(['10', '01', '10'])).toEqual('01')
    expect(xorList(['10', 1, '110'])).toEqual('101')
  })

  it('denseHash [65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22] should return 64', () => {
    expect(
      denseHash([65, 27, 9, 1, 4, 3, 40, 50, 91, 7, 6, 0, 2, 5, 68, 22])
    ).toEqual([64])
  })
  it('decToHex 64, 7, 255 should correspond to 40, 07, ff', () => {
    expect(decToHex(64)).toEqual('40')
    expect(decToHex(7)).toEqual('07')
    expect(decToHex(255)).toEqual('ff')
  })
  it('dvalidateTwo of "AoC 2017" should return 32 length equal to 33efeb34ea91902bb2f59c9920caa6cd', () => {
    const prepData = prepareData(['AoC 2017'])
    const { hashie } = validateTwo(prepData)
    expect(hashie.length).toEqual(32)
    expect(hashie).toEqual('33efeb34ea91902bb2f59c9920caa6cd')
  })
  it('dvalidateTwo of "" should return 32 length equal to a2582a3a0e66e6e86e3812dcb672a272', () => {
    const prepData = prepareData([''])
    const { hashie } = validateTwo(prepData)
    expect(hashie.length).toEqual(32)
    expect(hashie).toEqual('a2582a3a0e66e6e86e3812dcb672a272')
  })
  it('dvalidateTwo of "1,2,3" should return 32 length equal to 3efbe78a8d82f29979031a4aa0b16a9d', () => {
    const prepData = prepareData(['1,2,3'])
    const { hashie } = validateTwo(prepData)
    expect(hashie.length).toEqual(32)
    expect(hashie).toEqual('3efbe78a8d82f29979031a4aa0b16a9d')
  })
  it('dvalidateTwo of "1,2,4" should return 32 length equal to 63960835bcdc130f0b66d7ff4f6a5a8e', () => {
    const prepData = prepareData(['1,2,4'])
    const { hashie } = validateTwo(prepData)
    expect(hashie.length).toEqual(32)
    expect(hashie).toEqual('63960835bcdc130f0b66d7ff4f6a5a8e')
  })
  it('dvalidateTwo of my/test data should return 32 length equal to 23234babdc6afa036749cfa9b597de1b', () => {
    const prepData = prepareData(testData) // testData === my data
    const { hashie } = validateTwo(prepData)
    expect(hashie.length).toEqual(32)
    expect(hashie).toEqual('23234babdc6afa036749cfa9b597de1b')
  })
})
