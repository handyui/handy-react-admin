const router = require('@koa/router')()
const moment = require('moment')
const _  = require('lodash')
const queryString = require( 'query-string')
const md5 = require(  'md5')

router.prefix('/track')

// async function getList () {
//   let tableName = 't_o_project'
//   let result = await Knex
//     .select(TABLE_COLUMN)
//     .from(tableName)
//     .where('is_delete', 0)
//     .catch(err => {
//       Logger.log(err.message, 'project_item    getlist   出错')
//       return []
//     })
//   return result
// }

//  async function getProjectMap () {
//   let projectList = await getList()
//   let projectMap = {}
//   for (let project of projectList) {
//     projectMap[project.project_name] = {
//       id: project.id,
//       rate: project.rate
//     }
//   }
//   console.log('项目列表获取成功 =>', projectMap)
//   return projectMap
// }

/**
   * 解析日志记录所在的时间戳, 取日志时间作为时间戳, 若日志时间不规范, 则返回0
   * 客户端时间不可信, 故直接忽略, 以日志时间为准
   * @param {String} data
   * @return {Number}
   */
 function  parseLogCreateAt (data) {
    let nowAt = moment().unix()
    if (_.isString(data) === false) {
      return nowAt
    }
    const info = data.split('\t')
    let url = _.get(info, [15], '')

    const urlQS = queryString.parseUrl(url)
    let record = _.get(urlQS, ['query', 'd'], '[]')

    try {
      record = JSON.parse(record)
    } catch (err) {
      return nowAt
    }
    if (_.has(record, ['pub'])) {
      // common是新sdk的字段值, pub是旧值, 这里做下兼容
      record.common = record.pub
    }

    let logAtMoment = moment(info[0], moment.ISO_8601)
    let logAt = 0
    if (moment.isMoment(logAtMoment) && logAtMoment.isValid()) {
      logAt = logAtMoment.unix()
    } else {
      console.log(`无法解析日志记录时间 => ${info[0]}, 自动跳过`)
    }
    return logAt
  }

  /**
   * 将日志解析为标准格式, 解析失败返回null
   * @param {string} data
   * @param {object} projectMap code => project_id格式的项目字典
   * @returns {object|null}
   */
 async function parseLog (data) {
    const info = data.split('\t')
    let url = _.get(info, [15], '')
    
    const urlQS = queryString.parseUrl(url)
    console.log(urlQS)
    let record = _.get(urlQS, ['query', 'd'], '[]')
// console.log('info==>')
console.log(record)
    // try {
    //   record = JSON.parse(record)
    // } catch (err) {
    //   console.log('==== 打点数据异常 ====', err)
    //   return null
    // }

    // // 记录日志md5
    // record.md5 = md5(data)
    // if (_.has(record, ['pub'])) {
    //   // common是新sdk的字段值, pub是旧值, 这里做下兼容
    //   record.common = record.pub
    // }
    // //  过滤不合法的打点数据
    // //  记录为空, 没有pid, pid没有注册过, 都是非法数据
    // if (_.isEmpty(record)) {
    //   console.log('record 不规范 =>', record)
    //   return null
    // }
    // if (_.has(record, ['common', 'pid']) === false) {
    //   console.log('pid 不存在 =>', record)
    //   return null
    // }
    // if (record.common.pid === '') {
    //   console.log('记录中没有record.common.pid  =>', record.common.pid)
    //   return null
    // }
    // if (_.has(projectMap, [record.common.pid]) === false) {
    //   console.log('项目尚未注册projectMap[record.common.pid] =>', projectMap, record.common.pid)
    //   return null
    // }
    // record.project_id = projectMap[record.common.pid]['id']
    // record.project_name = record.common.pid
    // let currentAt = moment().unix()
    // let logCreateAt = this.parseLogCreateAt(data)
    // // 如果入库时间距离现在大于10天, 则认为是不合法数据(kafka中只会存7天以内的数据, 入库时间超出上下10天, 都不正常)
    // if (Math.abs(logCreateAt - currentAt) > 864000) {
    //   console.log('入库时间超出阈值, 自动跳过 finialTimeAt=>', logCreateAt)
    //   return null
    // }
    // record.time = logCreateAt

    // // 新版中info[17] 里有%号, 是非法字符, 需要提前处理
    // let safeInfo17 = _.replace(info[17], '%', '')
    // record.ua = parser(decodeURIComponent(safeInfo17))

    // // 兼容处理saas系统打点UA问题, nwjs低版本下获取不到chrome的版本, 解析拿到的为chromium_ver
    // let browserVersion = _.get(record.ua, ['browser', 'version'], '')
    // if (browserVersion === 'chromium_ver') {
    //   _.set(record.ua, ['browser', 'version'], '50.0.2661.102')
    //   _.set(record.ua, ['browser', 'major'], '50')
    // }

    // // 解析IP地址，映射成城市
    // record.ip = info[3] || info[4]
    // const location = await Util.ip2Locate(record.ip)
    // record.country = location.country
    // record.province = location.province
    // record.city = location.city
    // return record
}



function base64Decode(input) {
    var output = "";
    var b64 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";
    var chr1, chr2, chr3;
    var enc1, enc2, enc3, enc4;
    var i = 0;

    input = input.replace(/[^A-Za-z0-9\+\/\=]/g, "");

    while (i < input.length) {

      enc1 = b64.indexOf(input.charAt(i++));
      enc2 = b64.indexOf(input.charAt(i++));
      enc3 = b64.indexOf(input.charAt(i++));
      enc4 = b64.indexOf(input.charAt(i++));

      chr1 = (enc1 << 2) | (enc2 >> 4);
      chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
      chr3 = ((enc3 & 3) << 6) | enc4;

      output = output + String.fromCharCode(chr1);

      if (enc3 != 64) {
        output = output + String.fromCharCode(chr2);
      }
      if (enc4 != 64) {
        output = output + String.fromCharCode(chr3);
      }

    }
    return output;

}

// router.get('/w', async (ctx, next) => {
//     console.log(ctx)
//     let {data, appKey} = ctx.query
//     console.log(appKey)
//     let obj = base64Decode(data)
//     console.log(obj)

//     ctx.body = { 'success': 'true', 'result': {name:"111",age:"222"} }
// })

function decodeBase64 (encodeStr) {
  return Buffer.from(encodeStr, 'base64').toString()
}


router.get('/w', async (ctx, next) => {
  console.log(ctx.originalUrl)
  let {d} = ctx.query
  // const info = d.split('\t')
  let obj = decodeURIComponent(d)
  console.log(obj)
  const {connectStart, navigationStart, loadEventEnd, domLoading, secureConnectionStart,
    fetchStart, domContentLoadedEventStart, responseStart, responseEnd, domInteractive, domainLookupEnd,
    redirectStart, requestStart, unloadEventEnd, unloadEventStart, domComplete, domainLookupStart,
    loadEventStart, domContentLoadedEventEnd, redirectEnd, connectEnd, url
  } = JSON.parse(obj).detail
  // console.log(connectStart)

  // const obj = await parseLog()
  ctx.body = {'success': 'true', 'result': {name:"111",age:"222"}}
})


module.exports = router
