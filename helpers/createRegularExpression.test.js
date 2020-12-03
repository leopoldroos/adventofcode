import { removeAllExcept } from './createRegularExpression'

describe('createRegularExpression', () => {
  describe('removeAllExcept', () => {
    it('should remove all chars except "a"', () => {
      const res = 'a s d s aa sdA'.replace(removeAllExcept('a'), '')
      expect(res).toEqual('aaa')
    })
  })
})
