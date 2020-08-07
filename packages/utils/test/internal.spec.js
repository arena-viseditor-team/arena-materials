import chai from 'chai'
const expect = chai.expect
import toSource from '../src/internal/to.source'
import objectToString from '../src/internal/object.to.string'

describe('UTILS Internal API', () => {
  describe('#toSource', () => {
    it(`toSource(function name(){}) include === 'name' should be true`, () => {
      expect(toSource(function name(){})).to.include('name')
    })
    it(`toSource(() => { let rrc = ''}) include === 'rrc'  should be true`, () => {
      expect(toSource(() => { let rrc = ''})).to.include('rrc')
    })
  })

  describe('#objectToString', () => {
    it(`objectToString([]) typeof === 'string' should be true`, () => {
      let arr = [1, 2, 3]
      let objString = objectToString(arr)
      expect(objString).to.be.a('string')
    })
  })
})
