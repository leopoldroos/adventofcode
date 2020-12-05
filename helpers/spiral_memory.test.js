import { spiralMemory } from './spiral_memory'

const theSpiral = [
  [17, 16, 15, 14, 13],
  [18, 5, 4, 3, 12],
  [19, 6, 1, 2, 11],
  [20, 7, 8, 9, 10],
  [21, 22, 23, 24, 25],
]

describe('spiralMemory', () => {
  it('should starting at 0,0 return 4 for theSpiral', () => {
    expect(spiralMemory(theSpiral, 0, 0)).toEqual(4)
  })
  it('should starting at 0,1 return 4 for theSpiral', () => {
    expect(spiralMemory(theSpiral, 0, 1)).toEqual(3)
  })
  it('should starting at 1,1 return 2 for theSpiral', () => {
    expect(spiralMemory(theSpiral, 1, 1)).toEqual(2)
  })
  it('should starting at 2,2 return 0 for theSpiral', () => {
    expect(spiralMemory(theSpiral, 2, 2)).toEqual(0)
  })
  it('should starting at 3,2 return 1 for theSpiral', () => {
    expect(spiralMemory(theSpiral, 3, 2)).toEqual(1)
  })
  it('should starting at 4,4 return 4 for theSpiral', () => {
    expect(spiralMemory(theSpiral, 4, 4)).toEqual(4)
  })
})
