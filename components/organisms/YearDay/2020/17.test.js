import { testData, prepareData, validate, validateTwo, getActiveKeys, generateAdjecentInactiveCubes } from './17'
import Cube from '@/helpers/Cube'

import myData from './17.json'

describe('day17', () => {
  it('Cube', () => {
    const cube = new Cube(1, 2, 3, 0, true)
    expect(cube.active).toEqual(true)
    expect(cube.z).toEqual(3)
    expect(cube.key).toEqual('1,2,3,0')
    expect(typeof cube.setActive).toEqual('function')
    expect(typeof cube.setInActive).toEqual('function')
  })

  it('isAdjecent', () => {
    const activeCubes = prepareData(['####', '####', '####', '####'])
    expect(activeCubes[0].isSelf(activeCubes[0])).toEqual(true)
    expect(activeCubes[0].isSelf(activeCubes[1])).toEqual(false)

    expect(activeCubes[0].isAdjecent(activeCubes[0])).toEqual(false)
    expect(activeCubes[0].isAdjecent(activeCubes[1])).toEqual(true)
    expect(activeCubes[0].isAdjecent(activeCubes[2])).toEqual(false)
  })

  it('getActiveKeys', () => {
    const activeCubes = prepareData(['##', '##'])
    const activeKeys = getActiveKeys(activeCubes)
    expect(activeKeys).toEqual({ "0,0,0,0": true, "0,1,0,0": true, "1,0,0,0": true, "1,1,0,0": true })
  })
  it('generateAdjecentInactiveCubes 1x1', () => {
    const activeCubes = prepareData(['#'])
    const activeKeys = getActiveKeys(activeCubes)
    expect(Object.keys(activeKeys).length).toEqual(1)
    const inActiveCubes = generateAdjecentInactiveCubes(activeCubes, activeKeys)
    expect(Object.keys(inActiveCubes).length).toEqual(26)
  })
  it('generateAdjecentInactiveCubes 2x1', () => {
    const activeCubes = prepareData(['##'])
    const activeKeys = getActiveKeys(activeCubes)
    expect(Object.keys(activeKeys).length).toEqual(2)
    const inActiveCubes = generateAdjecentInactiveCubes(activeCubes, activeKeys)
    expect(Object.keys(activeKeys).length).toEqual(36)
    expect(inActiveCubes.length).toEqual(34)
  })
  it('generateAdjecentInactiveCubes 2x2', () => {
    const activeCubes = prepareData(['##', '##'])
    const activeKeys = getActiveKeys(activeCubes)
    expect(Object.keys(activeKeys).length).toEqual(4)
    const inActiveCubes = generateAdjecentInactiveCubes(activeCubes, activeKeys)
    expect(Object.keys(activeKeys).length).toEqual(48)
    expect(inActiveCubes.length).toEqual(44)
  })

  it('validate ##', () => {
    const activeCubes = prepareData(['###'])
    let res = validate(activeCubes, 1)
    expect(res.length).toEqual(9)
    res = validate(activeCubes, 2)
    expect(res.length).toEqual(16)
    res = validate(activeCubes, 6)
    expect(res.length).toEqual(112)
  })

  it('validate testData', () => {
    const activeCubes = prepareData(testData)
    let res = validate(activeCubes, 1)
    expect(res.length).toEqual(11)
    res = validate(activeCubes, 2)
    expect(res.length).toEqual(21)
    res = validate(activeCubes, 3)
    expect(res.length).toEqual(38)
    res = validate(activeCubes, 6)
    expect(res.length).toEqual(112)
  })

  it('validate myData', () => {
    const activeCubes = prepareData(myData)
    const res = validate(activeCubes, 6)
    expect(res.length).toEqual(353)
  })

  it('validateTwo testData', () => {
    const activeCubes = prepareData(testData)
    let res = validateTwo(activeCubes, 1)
    expect(res.length).toEqual(29)
    res = validateTwo(activeCubes, 2)
    expect(res.length).toEqual(60)
    res = validateTwo(activeCubes, 6)
    expect(res.length).toEqual(848)
  })

  it('validateTwo myData', () => {
    const activeCubes = prepareData(myData)
    const res = validateTwo(activeCubes, 6)
    expect(res.length).toEqual(2472)
  })
})
