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

export function a () {}
