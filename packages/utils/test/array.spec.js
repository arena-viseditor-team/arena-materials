import chai from 'chai'
const expect = chai.expect
import {arrayEqual} from '../index'

describe('UTILS Array API', () => {
  describe('#arrayEqual', () => {
    it(`arrayEqual([1, 2, 3], [1, 2, 3]) should be true`, () => {
      expect(arrayEqual([1, 2, 3], [1, 2, 3])).to.be.equal(true)
    })

    it(`arrayEqual([1, 2, 3], [1, 2, 3, 4]) should be false`, () => {
      expect(arrayEqual([1, 2, 3], [1, 2, 3, 4])).to.be.equal(false)
    })

    it(`arrayEqual([1, 2, 3], [3, 2, 1]) should be false`, () => {
      expect(arrayEqual([1, 2, 3], [3, 2, 1])).to.be.equal(false)
    })

    let arr = [3, 2, 2]
    it(`arrayEqual(arr, arr) should be true`, () => {
      expect(arrayEqual(arr, arr)).to.be.equal(true)
    })
  })
})