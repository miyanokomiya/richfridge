import * as models from '@/plugins/models'

describe('models', () => {
  describe('createFridgeAuth', () => {
    test('FridgeAuth を作成できること', () => {
      const result = models.createFridgeAuth()
      expect(result).toEqual({ ownerID: '', users: {} })
    })
    test('引数のプロパティを引き継ぐこと', () => {
      const result = models.createFridgeAuth({
        ownerID: 'a',
        users: { b: { type: 'owner' } }
      })
      expect(result).toEqual({ ownerID: 'a', users: { b: { type: 'owner' } } })
    })
  })

  describe('createFridge', () => {
    test('Fridge を作成できること', () => {
      const result = models.createFridge()
      expect(result).toEqual({ name: '', stageOrder: [], laneOrder: [] })
    })
    test('引数のプロパティを引き継ぐこと', () => {
      const result = models.createFridge({
        name: 'a',
        stageOrder: ['b'],
        laneOrder: ['c']
      })
      expect(result).toEqual({ name: 'a', stageOrder: ['b'], laneOrder: ['c'] })
    })
  })

  describe('createLane', () => {
    test('Lane を作成できること', () => {
      const result = models.createLane()
      expect(result).toEqual({ name: '' })
    })
    test('引数のプロパティを引き継ぐこと', () => {
      const result = models.createLane({ name: 'a' })
      expect(result).toEqual({ name: 'a' })
    })
  })

  describe('createStage', () => {
    test('Stage を作成できること', () => {
      const result = models.createStage()
      expect(result).toEqual({ name: '' })
    })
    test('引数のプロパティを引き継ぐこと', () => {
      const result = models.createStage({ name: 'a' })
      expect(result).toEqual({ name: 'a' })
    })
  })

  describe('map2list', () => {
    test('順番通りにリスト化できること', () => {
      const result = models.map2list({ a: 1, b: 2, c: 3 }, ['c', 'a', 'b'])
      expect(result).toEqual([3, 1, 2])
    })
  })

  describe('createItem', () => {
    test('Item を作成できること', () => {
      const result = models.createItem()
      expect(result).toEqual({ name: '', stageID: '', laneID: '' })
    })
    test('引数のプロパティを引き継ぐこと', () => {
      const result = models.createItem({ name: 'a', stageID: 'b', laneID: 'c' })
      expect(result).toEqual({ name: 'a', stageID: 'b', laneID: 'c' })
    })
  })

  describe('map2list', () => {
    test('順番通りにリスト化できること', () => {
      const result = models.map2list({ a: 1, b: 2, c: 3 }, ['c', 'a', 'b'])
      expect(result).toEqual([3, 1, 2])
    })
  })

  describe('getNextStageID', () => {
    const target = models.getNextStageID
    const table = [
      {
        target,
        message: '次の stageID を取得できること',
        arg: {
          fridge: { stageOrder: ['a', 'b', 'c'] } as Fridge,
          stageID: 'a'
        },
        result: 'b'
      },
      {
        target,
        message: '末尾からは先頭の stageID を取得できること',
        arg: {
          fridge: { stageOrder: ['a', 'b', 'c'] } as Fridge,
          stageID: 'c'
        },
        result: 'a'
      }
    ]
    table.forEach((data, i) => {
      test(`${i}: ${data.message}`, () => {
        expect(data.target(data.arg)).toEqual(data.result)
      })
    })
  })

  describe('getOptionList', () => {
    test('option 一覧を取得できること', () => {
      const map = {
        a: { name: 'aa' },
        b: { name: 'bb' },
        c: { name: 'cc' }
      }
      const order = ['b', 'a', 'c']
      const result = models.getOptionList(map, order)
      expect(result).toEqual([
        { value: 'b', label: 'bb' },
        { value: 'a', label: 'aa' },
        { value: 'c', label: 'cc' }
      ])
    })
  })

  describe('convertTmpID', () => {
    const getLaneID = () => 'lane_id'
    const getStageID = () => 'stage_id'

    test('lanes の一時IDを変換すること', () => {
      const fridge = models.createFridge({ laneOrder: ['NEW_a', 'b'] })
      const lanes = {
        NEW_a: models.createLane(),
        b: models.createLane()
      }
      const result = models.convertTmpID({
        fridge,
        lanes,
        stages: {},
        getLaneID,
        getStageID
      })
      expect(result.fridge.laneOrder).toEqual(['lane_id', 'b'])
      expect(result.lanes).toHaveProperty('lane_id')
      expect(result.lanes).not.toHaveProperty('NEW_a')
    })

    test('stages の一時IDを変換すること', () => {
      const fridge = models.createFridge({ stageOrder: ['NEW_a', 'b'] })
      const stages = {
        NEW_a: models.createLane(),
        b: models.createLane()
      }
      const result = models.convertTmpID({
        fridge,
        lanes: {},
        stages,
        getLaneID,
        getStageID
      })
      expect(result.fridge.stageOrder).toEqual(['stage_id', 'b'])
      expect(result.stages).toHaveProperty('stage_id')
      expect(result.stages).not.toHaveProperty('NEW_a')
    })
  })

  describe('getRemovedItemIDList', () => {
    test('所属する lane がない item のid一覧を取得すること', () => {
      const items = {
        a: models.createItem({ stageID: 'aa', laneID: 'aaa' }),
        b: models.createItem({ stageID: 'aa', laneID: 'bbb' })
      }
      const stages = { aa: models.createLane() }
      const lanes = { aaa: models.createLane() }
      const result = models.getRemovedItemIDList({ items, lanes, stages })
      expect(result).toEqual(['b'])
    })

    test('所属する stage がない item のid一覧を取得すること', () => {
      const items = {
        a: models.createItem({ stageID: 'aa', laneID: 'aaa' }),
        b: models.createItem({ stageID: 'bb', laneID: 'aaa' })
      }
      const stages = { aa: models.createLane() }
      const lanes = { aaa: models.createLane() }
      const result = models.getRemovedItemIDList({ items, lanes, stages })
      expect(result).toEqual(['b'])
    })
  })

  describe('getItemIDListAt', () => {
    test('stageID laneID に対応する item の id 一覧が name 昇順で取得できること', () => {
      const items = {
        a: models.createItem({ stageID: 'a', laneID: '1', name: 'a' }),
        g: models.createItem({ stageID: 'c', laneID: '1', name: 'g' }),
        d: models.createItem({ stageID: 'b', laneID: '1', name: 'd' }),
        f: models.createItem({ stageID: 'b', laneID: '1', name: 'f' }),
        b: models.createItem({ stageID: 'a', laneID: '2', name: 'b' }),
        c: models.createItem({ stageID: 'b', laneID: '1', name: 'c' })
      }
      const result = models.getItemIDListAt({
        items,
        laneID: '1',
        stageID: 'b'
      })
      expect(result).toEqual(['c', 'd', 'f'])
    })
  })
})
