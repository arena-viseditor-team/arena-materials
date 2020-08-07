import chai from 'chai'
import {formatRemainTime, formatPassTime, dateFormat} from '../index'
const expect = chai.expect

describe('UTILS Time API', () => {
  // 格式化当前时间距离 最后时间
  describe('#formatPassTime', () => {

    it(`formatPassTime(new Date().getTime() - 30000) should be 刚刚`, () => {
      let time = new Date().getTime() - 30000
      expect(formatPassTime(time)).to.be.equal('刚刚')
    })

    it(`formatPassTime(new Date().getTime() - 70000) should be 1分钟前`, () => {
      let time = new Date().getTime() - 70000
      expect(formatPassTime(time)).to.be.equal('1分钟前')
    })

    it(`formatPassTime(new Date().getTime() - 70000 * 60) should be 1小时前`, () => {
      let time = new Date().getTime() - 70000 * 60
      expect(formatPassTime(time)).to.be.equal('1小时前')
    })

    it(`formatPassTime(new Date().getTime() - 70000 * 60 * 24) should be 1天前`, () => {
      let time = new Date().getTime() - 70000 * 60 * 24
      expect(formatPassTime(time)).to.be.equal('1天前')
    })

    it(`formatPassTime(new Date().getTime() - 70000 * 60 * 24 * 30) should be 1个月前`, () => {
      let time = new Date().getTime() - 70000 * 60 * 24 * 30
      expect(formatPassTime(time)).to.be.equal('1个月前')
    })

    it(`formatPassTime(new Date().getTime() - 70000 * 60 * 24 * 30 * 12) should be 1年前`, () => {
      let time = new Date().getTime() - 70000 * 60 * 24 * 30 * 12
      expect(formatPassTime(time)).to.be.equal('1年前')
    })
    
  })

  // 格式化现在距结束时间的剩余时间
  describe('#formatRemainTime', () => {
    it(`formatRemainTime(new Date().getTime() + oneSecond + oneMinute + oneHour + oneDay) should be include 1天 1小时 1分钟`, () => {
      let time = new Date().getTime()
      let oneSecond = 1000
      let oneMinute = oneSecond * 60
      let oneHour = oneMinute * 60
      let oneDay = oneHour * 24
      let endTime = time + oneSecond + oneMinute + oneHour + oneDay
      expect(formatRemainTime(endTime)).to.include('1天 1小时 1分钟')
    })
  })

  // 时间格式化
  describe('#dateFormat', () => {

    it(`dateFormat(new Date(), 'yyyy-MM-dd') should be 2017-11-16`, () => {
      expect(dateFormat(1510846154955, 'yyyy-MM-dd')).to.be.equal('2017-11-16')
    })

    it(`dateFormat(new Date(), 'yyyy-MM-dd h') should be 2017-11-16 9`, () => {
      expect(dateFormat(1510796158563, 'yyyy-MM-dd h')).to.be.equal('2017-11-16 9')
    })

    it(`dateFormat(new Date(), 'yyyy-MM-dd hh') should be 2017-11-16 09`, () => {
      expect(dateFormat(1510796158563, 'yyyy-MM-dd hh')).to.be.equal('2017-11-16 09')
    })

    it(`dateFormat(new Date(), 'yyyy-MM-dd hh:mm') should be 2017-11-16 23:29`, () => {
      expect(dateFormat(1510846154955, 'yyyy-MM-dd hh:mm')).to.be.equal('2017-11-16 23:29')
    })

    it(`dateFormat(new Date(), 'yyyy-MM-dd hh:mm:ss') should be 2017-11-16 23:29:14`, () => {
      expect(dateFormat(1510846154955, 'yyyy-MM-dd hh:mm:ss')).to.be.equal('2017-11-16 23:29:14')
    })

    // 按季度格式化
    it(`dateFormat(new Date(), 'yyyy年q季度') should be 2017年4季度`, () => {
      expect(dateFormat(1510846154955, 'yyyy年q季度')).to.be.equal('2017年4季度')
    })

  })

})