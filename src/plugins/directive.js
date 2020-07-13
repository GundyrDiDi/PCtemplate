'use strict'

import Vue from 'vue'
import { wait } from '@/plugins/util'

Vue.mixin({
  directives: {
    observe: {
      inserted (el, { arg, value, modifiers: { parent, hold, always } }) {
        const options = {
          threshold: 0.3
        }
        const delay = 200 + hold ? 300 : 0
        if (!Number.isNaN(Number(arg))) {
          options.threshold = Number(arg) / 10 ** arg.length
        }
        const ob = parent ? el.parentElement : el
        const cb = async entries => {
          if (entries[0].isIntersecting) {
            await wait(delay)
            ;[].concat(value).forEach(v => {
              if (typeof v === 'function') {
                v()
              } else if (typeof v === 'string') {
                el.classList.add(...v.split(' '))
                setTimeout(() => {
                  el.classList.remove(...v.split(' '))
                }, 5000)
              }
            })
            el.style.visibility = ''
            if (!always) {
              io.unobserve(ob)
              io.disconnect()
            }
          }
        }
        el.style.visibility = 'hidden'
        const io = new IntersectionObserver(cb, options)
        io.observe(ob)
      }
    }
  }
})
