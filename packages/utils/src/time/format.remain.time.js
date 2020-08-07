/**
 *
 * 格式化现在距结束时间的剩余时间
 * @export
 * @param {Date} endTime 结束时间
 * @returns {String}
 */
export function formatRemainTime(endTime) {
  // 开始时间
  let startDate = new Date()
  // 结束时间
  let endDate = new Date(endTime)
  // 时间差
  let t = endDate.getTime() - startDate.getTime()
  let d = 0
  let h = 0
  let m = 0
  let s = 0
  if (t >= 0) {
    d = Math.floor(t / 1000 / 3600 / 24)
    h = Math.floor(t / 1000 / 60 / 60 % 24)
    m = Math.floor(t / 1000 / 60 % 60)
    s = Math.floor(t / 1000 % 60)
  }
  return d + '天 ' + h + '小时 ' + m + '分钟 ' + s + '秒'
}
