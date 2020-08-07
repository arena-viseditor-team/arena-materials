/**
 *
 * 格式化${startTime}距现在的已过时间
 * @export
 * @param {Date} startTime
 * @returns {String}
 */
export function formatPassTime(startTime) {
  let currentTime = Date.parse(new Date())
  let time = currentTime - startTime
  let day = parseInt(time / (1000 * 60 * 60 * 24))
  let hour = parseInt(time / (1000 * 60 * 60))
  let min = parseInt(time / (1000 * 60))
  let month = parseInt(day / 30)
  let year = parseInt(month / 12)
  switch (true) {
    case year > 0:
      return `${year}年前`
    case month > 0:
      return `${month}个月前`
    case day > 0:
      return `${day}天前`
    case hour > 0:
      return `${hour}小时前`
    case min > 0:
      return `${min}分钟前`
    default:
      return '刚刚'
  }
}
