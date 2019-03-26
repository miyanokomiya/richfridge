import * as models from '@/plugins/models'

describe('models', () => {
  describe('map2list', () => {
    test('順番通りにリスト化できること', () => {
      expect(
        models.map2list(
          {
            a: 1,
            b: 2,
            c: 3
          },
          ['c', 'a', 'b']
        )
      ).toEqual([3, 1, 2])
    })
  })
})
