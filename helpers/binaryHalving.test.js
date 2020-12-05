import { binaryHalving } from './binaryHalving'

describe('binaryHalving', () => {
  it('should given 128, F return 0, 63', () => {
    const { min, max } = binaryHalving(128, 'F', 'F')
    expect(min).toEqual(0)
    expect(max).toEqual(63)
  })
  it('should given 128, FF return 0, 31', () => {
    const { min, max } = binaryHalving(128, 'FF', 'F')
    expect(min).toEqual(0)
    expect(max).toEqual(31)
  })
  it('should given 128, B return 64, 127', () => {
    const { min, max } = binaryHalving(128, 'B', 'F')
    expect(min).toEqual(64)
    expect(max).toEqual(127)
  })
  it('should given 128, BB return 0, 31', () => {
    const { min, max } = binaryHalving(128, 'BB', 'F')
    expect(min).toEqual(96)
    expect(max).toEqual(127)
  })
  it('should given 128, FB return 32, 63', () => {
    const { min, max } = binaryHalving(128, 'FB', 'F')
    expect(min).toEqual(32)
    expect(max).toEqual(63)
  })
  it('should given 128, FBF return 0, 31', () => {
    const { min, max } = binaryHalving(128, 'FBF', 'F')
    expect(min).toEqual(32)
    expect(max).toEqual(47)
  })
  it('should given 128, FFFFFF return 0, 1', () => {
    const { min, max } = binaryHalving(128, 'FFFFFF', 'F')
    expect(min).toEqual(0)
    expect(max).toEqual(1)
  })
  it('should given 128, BBBBBB return 126, 127', () => {
    const { min, max } = binaryHalving(128, 'BBBBBB', 'F')
    expect(min).toEqual(126)
    expect(max).toEqual(127)
  })
  it('should given 128, FFFFFFF return 0, 0', () => {
    const { min, max } = binaryHalving(128, 'FFFFFFF', 'F')
    expect(min).toEqual(0)
    expect(max).toEqual(0)
  })
  it('should given 128, BBBBBBB return 127, 127', () => {
    const { min, max } = binaryHalving(128, 'BBBBBBB', 'F')
    expect(min).toEqual(127)
    expect(max).toEqual(127)
  })
  it('should given 128, FBFBBFF return 127, 127', () => {
    const { min, max } = binaryHalving(128, 'FBFBBFF', 'F')
    expect(min).toEqual(44)
    expect(max).toEqual(44)
  })

  it('should given 8, RLR return 5, 5', () => {
    const { min, max } = binaryHalving(8, 'RLR', 'L')
    expect(min).toEqual(5)
    expect(max).toEqual(5)
  })
})
