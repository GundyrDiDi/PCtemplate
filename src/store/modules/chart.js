import '@/plugins/map.js'
import echarts from 'echarts'
import config from '@/.config.js'
const line = () => ({
  tooltip: {
    trigger: 'axis'
  },
  xAxis: [
    {
      type: 'category',
      axisLine: {
        lineStyle: {
          color: '#999'
        }
      }
    }
  ],
  yAxis: [
    {
      type: 'value',
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#DDD'
        }
      },
      axisLine: {
        show: false
      }
    }
  ]
})
const map = () => ({
  tooltip: {
    trigger: 'item'
  },
  legend: {
    show: false
  },
  grid: {
    show: false
  },
  visualMap: {
    type: 'continuous',
    min: 0,
    max: 1000,
    seriesIndex: [0, 2],
    dimension: 0,
    realtime: false,
    left: -220,
    itemWidth: 18,
    itemHeight: 100,
    calculable: true,
    inRange: {
      color: ['rgba(159,205,253,0.50)', '#60ACFC'],
      symbolSize: [100, 100]
    },
    outOfRange: {
      color: ['#eeeeee'],
      symbolSize: [100, 100]
    }
  },
  toolbox: {
    show: false
  },

  xAxis: [
    {
      show: false
    }
  ],
  yAxis: [
    {
      show: false
    }
  ],

  series: [
    {
      name: 'Liver',
      type: 'map',
      map: 'china',
      left: '0',
      width: '100%',
      roam: 'move',
      mapValueCalculation: 'sum',
      zoom: 1,
      selectedMode: false,
      showLegendSymbol: false,
      label: {
        normal: {
          textStyle: {
            color: '#666'
          }
        },
        emphasis: {
          show: false
        }
      },
      itemStyle: {
        normal: {
          areaColor: '#EEEEEE',
          borderColor: '#FFFFFF',
          shadowColor: '#60ACFC',
          shadowBlur: 5,
          shadowOffsetY: 8
        },
        emphasis: {
          areaColor: '#E5F39B'
        }
      },
      data: [
        { name: '广东', value: 2747 },
        { name: '浙江', value: 978 },
        { name: '北京', value: 974 },
        { name: '江苏', value: 974 },
        { name: '上海', value: 834 },
        { name: '重庆', value: 683 },
        { name: '山东', value: 675 },
        { name: '陕西', value: 563 },
        { name: '天津', value: 532 },
        { name: '江西', value: 528 },
        { name: '广西', value: 448 },
        { name: '湖南', value: 389 },
        { name: '贵州', value: 373 },
        { name: '河南', value: 345 },
        { name: '黑龙江', value: 342 },
        { name: '河北', value: 283 },
        { name: '安徽', value: 267 },
        { name: '四川', value: 215 },
        { name: '山西', value: 203 },
        { name: '甘肃', value: 197 },
        { name: '辽宁', value: 194 },
        { name: '宁夏', value: 172 },
        { name: '吉林', value: 147 },
        { name: '湖北', value: 144 },
        { name: '台湾', value: 123 },
        { name: '福建', value: 112 },
        { name: '海南', value: 77 },
        { name: '内蒙古', value: 73 },
        { name: '云南', value: 72 },
        { name: '南海诸岛', value: 53 },
        { name: '澳门', value: 43 },
        { name: '青海', value: 38 },
        { name: '香港', value: 32 },
        { name: '新疆', value: 14 },
        { name: '西藏', value: 12 }
      ]
    }
  ]
})
const rose = () => ({
  title: {
    text: '等级\n分布',
    left: 'center',
    top: 'center',
    textStyle: {
      fontSize: 24
    }
  },
  color: [
    '#7eacea',
    '#e15777',
    '#95ea71',
    '#ea9b4f',
    '#7577df',
    '#be72d8',
    '#fff'
  ],
  tooltip: {
    trigger: 'item',
    formatter: '{a} <br/>{b} : {c} ({d}%)'
  },
  series: [
    {
      name: '统计',
      type: 'pie',
      radius: [55, 180],
      center: ['50%', '50%'],
      roseType: 'radius',
      label: {
        show: true,
        formatter: '{d}%'
      },
      emphasis: {
        label: {
          show: true
        }
      },
      data: [
        {
          value: 25,
          name: '等级1'
        },
        {
          value: 20,
          name: '等级2'
        },
        {
          value: 15,
          name: '等级3'
        },
        {
          value: 10,
          name: '等级4'
        },
        {
          value: 8,
          name: '等级5'
        },
        {
          value: 3,
          name: '等级6'
        }
      ]
    },
    {
      name: '占位',
      type: 'pie',
      silent: true,
      center: ['50%', '50%'],
      radius: 55,
      hoverAnimation: false,
      label: {
        show: false,
        position: 'center'
      },
      data: [
        {
          value: 1,
          name: '占位2'
        }
      ],
      itemStyle: {
        normal: {
          color: '#fff',
          shadowColor: 'rgba(0, 0, 0, 0.5)',
          shadowBlur: 10
        }
      }
    }
  ]
})
const lineBar = () => ({
  title: {
    text: '',
    x: 'center',
    y: 0,
    textStyle: {
      color: '#B4B4B4',
      fontSize: 22,
      fontWeight: 'normal'
    }
  },
  tooltip: {
    trigger: 'axis',
    backgroundColor: 'rgba(0,0,0,0.6)'
  },
  legend: {
    // 修改legend的高度宽度
    itemHeight: 5,
    itemWidth: 24,
    data: [
      {
        name: '观看人数(UV)',
        icon: 'rect' // ledend的icon
      },
      {
        name: '同比增长(%)',
        icon: 'rect'
      }
    ],
    textStyle: {
      color: '#aaa'
    },
    top: '20%',
    // 选择关闭的legend
    selected: {
      回温: false
    }
  },
  grid: {
    top: '42%',
    height: '57%'
  },
  xAxis: [
    {
      // type:'category',
      data: ['00:00', '06:00', '12:00', '18:00', '24:00', '00:00'],
      boundaryGap: true,
      axisLine: {
        lineStyle: {
          color: '#B4B4B4'
        }
      },
      axisTick: {
        show: false
      }
    }
  ],
  yAxis: [
    {
      name: '观看人数（UV）',
      nameTextStyle: {
        padding: [0, 0, 10, -20]
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#eee'
        }
      },
      axisLine: {
        show: true
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#333'
        },
        formatter: '{value} '
      }
    },
    {
      name: '同比增长(%)',
      nameTextStyle: {
        padding: [50, 4, 10, 30]
      },
      splitLine: {
        lineStyle: {
          type: 'dashed',
          color: '#ccc'
        }
      },
      axisLine: {
        show: false
      },
      axisTick: {
        show: false
      },
      axisLabel: {
        textStyle: {
          color: '#333'
        },
        formatter: '{value} '
      }
    }
  ],
  series: [
    {
      name: '观看人数(UV)',
      type: 'line',
      smooth: true,
      showSymbol: true,
      // 矢量画五角星
      symbol: 'path://M150 0 L80 175 L250 75 L50 75 L220 175 Z',
      symbolSize: 12,
      yAxisIndex: 0,
      areaStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: 'rgba(250,180,101,0.3)'
            },
            {
              offset: 1,
              color: 'rgba(250,180,101,0.1)'
            }
          ])
        }
      },
      itemStyle: {
        normal: {
          color: '#FF8000'
        }
      },
      // data中可以使用对象，value代表相应的值，另外可加入自定义的属性
      data: [
        {
          value: 1000,
          stationName: 's1'
        },
        {
          value: 3000,
          stationName: 's2'
        },
        {
          value: 4000,
          stationName: 's3'
        },
        {
          value: 9000,
          stationName: 's4'
        },
        {
          value: 10000,
          stationName: 's5'
        },
        {
          value: 20000,
          stationName: 's6'
        }
      ]
    },
    {
      name: '同比增长(%)',
      type: 'bar',
      barWidth: 30,
      yAxisIndex: 1,
      itemStyle: {
        normal: {
          color: new echarts.graphic.LinearGradient(0, 0, 0, 1, [
            {
              offset: 0,
              color: '#2b7acb9c'
            },
            {
              offset: 1,
              color: '#2b7acb22'
            }
          ]),
          // 柱状图圆角
          barBorderRadius: [30, 30, 0, 0]
        }
      },

      data: [
        {
          value: 11,
          stationName: 's1'
        },
        {
          value: 34,
          stationName: 's2'
        },
        {
          value: 54,
          stationName: 's3'
        },
        {
          value: 39,
          stationName: 's4'
        },
        {
          value: 63,
          stationName: 's5'
        },
        {
          value: 24,
          stationName: 's6'
        }
      ]
    }
  ]
})

export default {
  namespaced: true,
  state: {
    'line-money-total': line(),
    'map-liver-area': map(),
    'rose-liver-level': rose(),
    'lineBar-people-total': lineBar(),
    charts: config.charts
  },
  getters: {},
  mutations: {},
  actions: {
    _getdata (store, v) {
      console.log(v)
      return Axios.get(v.api)
    }
  }
}
