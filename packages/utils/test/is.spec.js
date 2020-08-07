import chai from 'chai'
import {isBoolean, isFunction, isLength, isNumber, isUndefined} from '../index'
const expect = chai.expect

describe('UTILS IS API', () => {
  describe('#isBoolean', () => {
    it(`isBoolean(false) should be true`, () => {
      expect(isBoolean(false)).to.be.equal(true)
    })

    it(`isBoolean(null) should be false`, () => {
      expect(isBoolean(null)).to.be.equal(false)
    })
  })

  describe('#isFunction', () => {
    it(`isFunction(() => {}) should be true`, () => {
      expect(isFunction(() => {})).to.be.equal(true)
    })

    it(`isFunction(/abc/) should be false`, () => {
      expect(isFunction(/abc/)).to.be.equal(false)
    })

    it(`isFunction([]) should be false`, () => {
      expect(isFunction([])).to.be.equal(false)
    })

    it(`isFunction('1111') should be false`, () => {
      expect(isFunction('1111')).to.be.equal(false)
    })
  })

  describe('#isLength', () => {
    it(`isLength(3) should be true`, () => {
      expect(isLength(3)).to.be.equal(true)
    })

    it(`isLength(Number.MIN_VALUE) should be false`, () => {
      expect(isLength(Number.MIN_VALUE)).to.be.equal(false)
    })
  
    it(`isLength('3') should be false`, () => {
      expect(isLength('3')).to.be.equal(false)
    })
  })

  describe('#isNumber', () => {
    it(`isNumber(8.4) should be  true`, () => {
      expect(isNumber(8.4)).to.be.equal(true)
    })

    it(`isNumber(Number.MIN_VALUE) should be  true`, () => {
      expect(isNumber(Number.MIN_VALUE)).to.be.equal(true)
    })

    it(`isNumber(Infinity) should be  true`, () => {
      expect(isNumber(Infinity)).to.be.equal(true)
    })

    it(`isNumber('3') should be  false`, () => {
      expect(isNumber('3')).to.be.equal(false)
    })
  
  })

  describe('#isUndefined', () => {
    it(`isUndefined(undefined) should be  true`, () => {
      expect(isUndefined(undefined)).to.be.equal(true)
    })

    it(`isUndefined('aa') should be  false`, () => {
      expect(isUndefined('aa')).to.be.equal(false)
    })
  
  })

})