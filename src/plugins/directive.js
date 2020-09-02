'use strict'

import Vue from 'vue'
import { wait } from '@/plugins/util'

Vue.mixin({
  directives: {
    mutate: {
      inserted (el, { arg }) {
        const MO = new MutationObserver(function (mutations, observe) {
          console.log(mutations)
          console.log(observe)
        })
        MO.observe(el, {
          childList: true, // 子节点的变动（新增、删除或者更改）
          attributes: true, // 属性的变动
          characterData: true, // 节点内容或节点文本的变动
          subtree: true, // 是否将观察器应用于该节点的所有后代节点
          attributeFilter: ['class', 'style'], // 观察特定属性
          attributeOldValue: true, // 观察 attributes 变动时，是否需要记录变动前的属性值
          characterDataOldValue: true // 观察 characterData 变动，是否需要记录变动前的值
        })
      }
    },
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
    },
    lazy: {
      inserted (el, { arg, value }) {
        const cb = entries => {
          if (entries[0].isIntersecting) {
            el[arg] = value
            io.disconnect()
          }
        }
        const io = new IntersectionObserver(cb)
        io.observe(el)
      }
    }
  }
})
