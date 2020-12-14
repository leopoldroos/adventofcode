import {
  testData,
  prepareData,
  validate,
  validateTwo,
  getRecommendedChange,
  runOneRound,
  findInDirection
} from './11'
import myData from './11.json'

describe('day11',
  () => {
    it('getRecommendedChange should return valid stuff', () => {
      const data = [
        'L##.',
        '####',
        'L#.#',
        '####',
      ]
      const prepData = prepareData(data)
      expect(getRecommendedChange(prepData, 2, 0)).toEqual('L')
      expect(getRecommendedChange(prepData, 0, 0)).toEqual('L')
      expect(getRecommendedChange(prepData, 3, 0)).toEqual('.')
      expect(getRecommendedChange(prepData, 0, 1)).toEqual('#')
      expect(getRecommendedChange(prepData, 1, 1)).toEqual('L')
      expect(getRecommendedChange(prepData, 3, 3)).toEqual('#')
    })
    it('getRecommendedChange for some perticcular situations should return valid stuff', () => {
      const data = [
        "#.##.##.##",
        "#######.##",
        "#.#.#..#..",
        "####.##.##",
      ]
      let prepData = prepareData(data)
      expect(getRecommendedChange(prepData, 2, 0)).toEqual('L')
      expect(getRecommendedChange(prepData, 3, 0)).toEqual('L')
      prepData = runOneRound(prepData)
      expect(prepData[0].join('')).toEqual('#.LL.L#.##')
      expect(prepData[1].join('')).toEqual('#LLLLLL.L#')
      expect(prepData[2].join('')).toEqual('L.L.L..L..')
    })
    it('runOneRound should return valid stuff s', () => {
      let prepData = prepareData(testData)
      prepData = runOneRound(prepData)
      expect(prepData.map(r => r.join(''))).toEqual([
        "#.##.##.##",
        "#######.##",
        "#.#.#..#..",
        "####.##.##",
        "#.##.##.##",
        "#.#####.##",
        "..#.#.....",
        "##########",
        "#.######.#",
        "#.#####.##",
      ])
      prepData = runOneRound(prepData)
      expect(prepData[0].join('')).toEqual('#.LL.L#.##')
      expect(prepData[1].join('')).toEqual('#LLLLLL.L#')
      expect(prepData[2].join('')).toEqual('L.L.L..L..')

      expect(prepData.map(r => r.join(''))).toEqual([
        "#.LL.L#.##",
        "#LLLLLL.L#",
        "L.L.L..L..",
        "#LLL.LL.L#",
        "#.LL.LL.LL",
        "#.LLLL#.##",
        "..L.L.....",
        "#LLLLLLLL#",
        "#.LLLLLL.L",
        "#.#LLLL.##",
      ])
      prepData = runOneRound(prepData)

      expect(prepData[0].join('')).toEqual('#.##.L#.##')
      expect(prepData.map(r => r.join(''))).toEqual([
        "#.##.L#.##",
        "#L###LL.L#",
        "L.#.#..#..",
        "#L##.##.L#",
        "#.##.LL.LL",
        "#.###L#.##",
        "..#.#.....",
        "#L######L#",
        "#.LL###L.L",
        "#.#L###.##"
      ])
      prepData = runOneRound(prepData)
      expect(prepData.map(r => r.join(''))).toEqual([
        "#.#L.L#.##",
        "#LLL#LL.L#",
        "L.L.L..#..",
        "#LLL.##.L#",
        "#.LL.LL.LL",
        "#.LL#L#.##",
        "..L.L.....",
        "#L#LLLL#L#",
        "#.LLLLLL.L",
        "#.#L#L#.##"
      ])
      prepData = runOneRound(prepData)
      expect(prepData.map(r => r.join(''))).toEqual([
        "#.#L.L#.##",
        "#LLL#LL.L#",
        "L.#.L..#..",
        "#L##.##.L#",
        "#.#L.LL.LL",
        "#.#L#L#.##",
        "..L.L.....",
        "#L#L##L#L#",
        "#.LLLLLL.L",
        "#.#L#L#.##"
      ])
    })

    it('validate testData should return 37/35, 5', () => {
      let prepData = prepareData(testData)
      const res = validate(prepData)
      expect(res.available).toEqual(34)
      expect(res.occupied).toEqual(37)
      expect(res.rounds).toEqual(5)
    })
    it('validate myData should return expected', () => {
      const prepData = prepareData(myData)
      expect(validate(prepData).occupied).toEqual(2265)
    })
  })
