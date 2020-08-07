import chai from 'chai'
import {amoutUppercase} from '../index'
const expect = chai.expect

describe('UTILS String API', () => {
  describe('#amoutUppercase', () => {

    it(`amoutUppercase(5.5) should be string`, () => {
      expect(amoutUppercase(5.5)).to.equal('伍元伍角')
    })

    it(`amoutUppercase(100) should be string`, () => {
      expect(amoutUppercase(100)).to.be.a('string')
    })

    it(`amoutUppercase(100) should be 壹佰元`, () => {
      expect(amoutUppercase(100)).to.equal('壹佰元整')
    })

    it(`amoutUppercase(100.1) should be 壹佰元壹角`, () => {
      expect(amoutUppercase(100.1)).to.equal('壹佰元壹角')
    })

    it(`amoutUppercase(1000) should be 壹佰元壹角`, () => {
      expect(amoutUppercase(1000)).to.equal('壹仟元整')
    })

    it(`amoutUppercase(10000) should be 壹万元整`, () => {
      expect(amoutUppercase(10000)).to.equal('壹万元整')
    })

    it(`amoutUppercase(20000.22) should be 贰万元贰角贰分`, () => {
      expect(amoutUppercase(20000.22)).to.equal('贰万元贰角贰分')
    })

    it(`amoutUppercase(2000000) should be 贰佰万元整`, () => {
      expect(amoutUppercase(2000000)).to.equal('贰佰万元整')
    })

    it(`amoutUppercase(-12) should be 欠壹拾贰元整`, () => {
      expect(amoutUppercase(-12)).to.equal('欠壹拾贰元整')
    })

    it(`amoutUppercase(-1300.22) should be 欠壹仟叁佰元贰角贰分`, () => {
      expect(amoutUppercase(-1300.22)).to.equal('欠壹仟叁佰元贰角贰分')
    })

  })

})