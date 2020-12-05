import { testData, prepareData, validate, validateTwo } from './7'
import myData from './7.json'

describe('day7', () => {
  it('validate myData should return 5', () => {
    const data = prepareData(myData)
    const tower = validate(data)
    expect(tower).toEqual('ahnofa')
    expect(validateTwo(tower)).toEqual(5)
  })
})
