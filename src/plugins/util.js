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

export function throttle (fn, time) {
  let exec = true
  return function (...rest) {
    if (exec) {
      fn.call(this, ...rest)
      exec = false
    }
    setTimeout(e => {
      exec = true
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

export function mergeObject (obj1, obj2) {
  return Object.entries(obj1).reduce((obj2, [key, value]) => {
    if (key in obj2) {
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        obj2[key] = mergeObject(obj1[key], obj2[key])
      }
    } else {
      obj2[key] = value
    }
    return obj2
  }, obj2)
}
export function limitRequest (ajax, apis, limit = 10) {}

export function numberRange (val, min, max) {
  return Math.max(min, Math.min(val, max))
}

export function calcRange ({ min, max }, props = {}) {
  const units = ['', '万', '亿']
  let step = parseInt((max - min) / 1).toString()
  step = step.slice(0, 1).padEnd(step.length, '0')
  const wei = parseInt(step.length / 5)
  props.base = 10 ** (wei * 4)
  props.unit = units[wei]
  props.min = Math.floor(min / props.base)
  props.max = Math.ceil(max / props.base)
  props.value = [props.min, props.max]
  props.step = 1
  props.formatTooltip = val => val + props.unit
  return props
}
