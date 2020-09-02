export function wait (time = 1000, promise) {
  let delay = new Promise(resolve => {
    setTimeout(e => {
      resolve()
    }, time)
  })
  if (promise instanceof Promise) {
    delay = Promise.all([promise, delay]).then(res => res[0])
  }
  return delay
}

export function loadimg (src, localSrc) {
  return new Promise(resolve => {
    const img = new Image()
    img.src = src
    img.onload = () => {
      resolve(src)
    }
    img.onerror = () => {
      resolve(localSrc)
    }
    setTimeout(() => {
      resolve(src)
    }, 3000)
  })
}

export function throttle (fn, time = 300) {
  let exec = true
  return function (...rest) {
    if (exec) {
      fn.call(this, ...rest)
      exec = false
      setTimeout(e => {
        exec = true
      }, time)
    }
  }
}

export function debounce (fn, time = 300) {
  let timer
  return function (...rest) {
    if (timer) {
      clearTimeout(timer)
    }
    timer = setTimeout(e => {
      fn.call(this, ...rest)
    }, time)
  }
}

export function delayVali (fn, vali, time) {
  setTimeout(e => {
    if (vali()) {
      fn()
    }
  }, time)
}

export function randomnum (max, min = 0) {
  return parseInt(min + Math.random() * (max - min))
}

export function colorRGBtoHex (rgb) {
  const [r, g, b] = rgb.match(/\d+/g).map(v => parseInt(v))
  return '#' + ((1 << 24) + (r << 16) + (g << 8) + b).toString(16).slice(1)
}

export function formatNumber (num) {
  return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
export function addNumberUnit (
  num,
  units = [
    { value: '万', wei: 4 },
    { value: '亿', wei: 8 }
  ],
  exceed = 1
) {
  const str = parseInt(num).toString()
  const unit = units.reverse().find(v => {
    return str.slice(exceed).length / v.wei >= 1
  })
  if (unit) {
    return (
      (num / 10 ** unit.wei).toFixed(2).replace(/\.0{1,2}$/, '') + unit.value
    )
  } else {
    return Number(num)
      .toFixed(2)
      .replace(/\.0{1,2}$/, '')
  }
}
export function isdeepsame (obj1, obj2) {
  let same = false
  if (typeof obj1 === typeof obj2) {
    if (typeof obj1 === 'object' && obj1 !== null && obj2 !== null) {
      same = Object.entries(obj1).every(([k, v]) => {
        return isdeepsame(v, obj2[k])
      })
    } else {
      same = obj1 === obj2
    }
  }
  return same
}
export function mixin (obj1, obj2 = {}) {
  if (obj1 === obj2) return obj1
  return Object.entries(obj1).reduce((obj2, [key, value]) => {
    if (key in obj2) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        obj2[key] = mixin(obj1[key], obj2[key])
      }
    } else {
      obj2[key] = value
    }
    return obj2
  }, obj2)
}
export function arraytoObject (arr, prop) {
  return arr.reduce((acc, v) => {
    acc[v[prop]] = v
    return acc
  }, {})
}
export function limitRequest (ajax, apis, limit = 10) {
  const head = apis.slice(0, limit)
  const rest = apis.slice(limit)
  const fn = res => {
    if (rest.length > 0) {
      return ajax(rest.shift()).then(fn)
    } else {
      return res
    }
  }
  return Promise.all(head.map(api => ajax(api).then(fn)))
}

export function numberRange (val, min, max) {
  return Math.max(min, Math.min(val, max))
}

/* 搬运 */
export function formatDate (date, fmt) {
  if (/(y+)/.test(fmt)) {
    fmt = fmt.replace(
      RegExp.$1,
      (date.getFullYear() + '').substr(4 - RegExp.$1.length)
    )
  }
  const padLeftZero = str => {
    return ('00' + str).substr(str.length)
  }
  const o = {
    'M+': date.getMonth() + 1,
    'd+': date.getDate(),
    'h+': date.getHours(),
    'm+': date.getMinutes(),
    's+': date.getSeconds()
  }
  for (const k in o) {
    if (new RegExp(`(${k})`).test(fmt)) {
      const str = o[k] + ''
      fmt = fmt.replace(
        RegExp.$1,
        RegExp.$1.length === 1 ? str : padLeftZero(str)
      )
    }
  }
  return fmt
}

/* not standard */
export function calcRange ({ min, max }, parent, props = {}) {
  const units = ['', '万', '亿']
  let step = parseInt((max - min) / 1).toString()
  step = step.slice(0, 1).padEnd(step.length, '0')
  const wei = parseInt((step.length - 1) / 4)
  props.base = 10 ** (wei * 4)
  props.unit = units[wei]
  props.min = Math.floor(min / props.base)
  props.max = Math.ceil(max / props.base)
  props.value = [props.min, props.max]
  props.step = 1
  props.formatTooltip = val => val + props.unit
  // 为了el-range中改变单位
  props.parent = parent
  props.initbase = 10 ** (wei * 4)
  return props
}
