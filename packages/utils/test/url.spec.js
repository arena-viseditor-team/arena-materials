import chai from 'chai'
const expect = chai.expect
import {parseQueryString, param} from '../index'

describe('UTILS Url API', () => {
  describe('#parseQueryString', () => {
    it(`parseQueryString(地址) should be 地址的参数`, () => {
      let url = `https://www.renrenche.com/bj/car/15e153071f3df593?plog_id=ed0869c68b1556b09fc69a7061b3204f`
      expect(parseQueryString(url)).to.have.all.keys({
        plog_id: 'ed0869c68b1556b09fc69a7061b3204f'
      })
    })
  })

  describe('#param', () => {
    it(`param({name: 'xx', c: 'aa'}) should be name=xx&c=aa`, () => {
      let params = {
        name: 'xx',
        c: 'aa'
      }
      expect(param(params)).to.equal('name=xx&c=aa')
    })

    it(`param({name: 'xx', c: {a: 'cc', n: 1}}) should be name=xx&c%5Ba%5D=cc&c%5Bn%5D=1`, () => {
      let params = {
        name: 'xx',
        c: {
          a: 'cc',
          n: 1
        }
      }
      expect(param(params)).to.equal('name=xx&c%5Ba%5D=cc&c%5Bn%5D=1')
    })
    
    it(`param({name: 'xx', c: [1, 2, 3]}) should be name=xx&c%5B0%5D=1&c%5B1%5D=2&c%5B2%5D=3`, () => {
      let params = {
        name: 'xx',
        c: [1, 2, 3]
      }
      expect(param(params)).to.equal('name=xx&c%5B0%5D=1&c%5B1%5D=2&c%5B2%5D=3')
    })

  })
})
