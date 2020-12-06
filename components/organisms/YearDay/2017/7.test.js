import { testData, prepareData, validate, validateTwo } from './7'
import myData from './7.json'

describe('day7', () => {
  it('validate testData should return 5', () => {
    const data = prepareData(testData)
    const tower = validate(data)
    expect(tower.name).toEqual('tknk')
    expect(validateTwo(tower)).toEqual(60)
  })
  it('validate myData should return 5', () => {
    const data = prepareData(myData)
    const tower = validate(data)
    expect(tower.name).toEqual('ahnofa')
    expect(validateTwo(tower)).toEqual(802)
  })
})
