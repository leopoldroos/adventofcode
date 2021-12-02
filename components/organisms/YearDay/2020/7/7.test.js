import { testData, prepareData, validate, validateTwo } from './7'
import myData from './7.json'

describe('day6', () => {
  it('prepareData A', () => {
    const preparedData = prepareData([
      'light red bags contain 1 bright white bag, 2 muted yellow bags.',
    ])
    expect(preparedData).toEqual({
      red_light: {
        color: 'red',
        intensity: 'light',
        name: 'red_light',
        referingTo: [
          { color: 'white', name: 'white_bright', size: 1 },
          { color: 'yellow', name: 'yellow_muted', size: 2 },
        ],
        referredTo: [],
      },
    })
  })

  it('prepareData B', () => {
    const preparedData = prepareData([
      'dotted chartreuse bags contain 1 light beige bag.',
    ])
    expect(preparedData).toEqual({
      chartreuse_dotted: {
        color: 'chartreuse',
        intensity: 'dotted',
        name: 'chartreuse_dotted',
        referingTo: [{ color: 'beige', name: 'beige_light', size: 1 }],
        referredTo: [],
      },
    })
  })

  it('validate testData check blackpink should return []', () => {
    const preparedData = prepareData(testData)
    expect(validate(preparedData, 'blackpink')).toEqual([])
  })

  it('validate testData check gold_shiny should return array length 4', () => {
    const preparedData = prepareData(testData)
    expect(validate(preparedData, 'gold_shiny')).toEqual([
      'white_bright',
      'red_light',
      'orange_dark',
      'yellow_muted',
    ])
  })
  it('validate myData should return ...', () => {
    const preparedData = prepareData(myData)
    expect(validate(preparedData, 'gold_shiny').length).toEqual(169)
  })

  it('validateTwo myData should return 126', () => {
    const preparedData = prepareData([
      'shiny gold bags contain 2 dark red bags.',
      'dark red bags contain 2 dark orange bags.',
      'dark orange bags contain 2 dark yellow bags.',
      'dark yellow bags contain 2 dark green bags.',
      'dark green bags contain 2 dark blue bags.',
      'dark blue bags contain 2 dark violet bags.',
      'dark violet bags contain no other bags.',
    ])
    expect(validateTwo(preparedData)).toEqual(126)
  })

  it('validateTwo myData should return 82372', () => {
    const preparedData = prepareData(myData)
    expect(validateTwo(preparedData)).toEqual(82372)
  })
})
