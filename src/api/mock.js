import Mock from 'mockjs'
const mockdata = {
  uvpv: [
    {
      name: '观看人数(UV)',
      data: [
        {
          name: '2020-06-10',
          value: '150'
        },
        {
          name: '2020-06-11',
          value: '170'
        },
        {
          name: '2020-06-12',
          value: '210'
        },
        {
          name: '2020-06-13',
          value: '240'
        },
        {
          name: '2020-06-14',
          value: '320'
        },
        {
          name: '2020-06-15',
          value: '272'
        },
        {
          name: '2020-06-16',
          value: '220'
        },
        {
          name: '2020-06-17',
          value: '160'
        }
      ]
    },
    {
      name: '观看次数(PV)',
      data: [
        {
          name: '2020-06-10',
          value: '2240'
        },
        {
          name: '2020-06-11',
          value: '2220'
        },
        {
          name: '2020-06-12',
          value: '1285'
        },
        {
          name: '2020-06-13',
          value: '1275'
        },
        {
          name: '2020-06-14',
          value: '2220'
        },
        {
          name: '2020-06-15',
          value: '3210'
        },
        {
          name: '2020-06-16',
          value: '2222'
        },
        {
          name: '2020-06-17',
          value: '2135'
        }
      ]
    }
  ],
  shownum: [
    {
      name: '开播场次',
      data: [
        {
          name: '2020-06-10',
          value: '150'
        },
        {
          name: '2020-06-11',
          value: '170'
        },
        {
          name: '2020-06-12',
          value: '210'
        },
        {
          name: '2020-06-13',
          value: '240'
        },
        {
          name: '2020-06-14',
          value: '320'
        },
        {
          name: '2020-06-15',
          value: '272'
        },
        {
          name: '2020-06-16',
          value: '220'
        },
        {
          name: '2020-06-17',
          value: '160'
        }
      ]
    },
    {
      name: '开播主播数',
      data: [
        {
          name: '2020-06-10',
          value: '240'
        },
        {
          name: '2020-06-11',
          value: '220'
        },
        {
          name: '2020-06-12',
          value: '185'
        },
        {
          name: '2020-06-13',
          value: '175'
        },
        {
          name: '2020-06-14',
          value: '220'
        },
        {
          name: '2020-06-15',
          value: '310'
        },
        {
          name: '2020-06-16',
          value: '222'
        },
        {
          name: '2020-06-17',
          value: '135'
        }
      ]
    }
  ],
  typeofhost: [
    {
      name: '纯达人',
      value: '1372',
      unit: '位'
    },
    {
      name: '纯店铺',
      value: '1292',
      unit: '位'
    },
    {
      name: '达人有店铺',
      value: '1220',
      unit: '位'
    }
  ],
  levelofhost: [
    {
      name: 'Lv1',
      value: '372',
      unit: '位'
    },
    {
      name: 'Lv2',
      value: '292',
      unit: '位'
    },
    {
      name: 'Lv3',
      value: '220',
      unit: '位'
    },
    {
      name: 'Lv4',
      value: '220',
      unit: '位'
    },
    {
      name: 'Lv5',
      value: '220',
      unit: '位'
    }
  ],
  district: [
    { name: '广东', value: 1247 },
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
  ],
  roomtitle: [
    { name: 'sffwer', value: 200 },
    { name: 'werwerwrw', value: 181 },
    { name: 'wrwrwfsdfsd', value: 386 },
    { name: '供应商04', value: 155 },
    { name: '供应商05', value: 467 },
    { name: '供应商06', value: 244 },
    { name: '供应商07', value: 898 },
    { name: '供应商08', value: 484 },
    { name: '供应商09', value: 112 },
    { name: '供应商10', value: 465 },
    { name: '供应商11', value: 447 },
    { name: '供应商12', value: 582 },
    { name: '供应商13', value: 555 },
    { name: '供应商14', value: 550 },
    { name: '供应商15', value: 462 },
    { name: '供应商16', value: 366 },
    { name: '供应商17', value: 360 },
    { name: '供应商18', value: 282 },
    { name: '供应商19', value: 273 },
    { name: '供应商20', value: 265 },
    { name: '供应商21', value: 265 },
    { name: '供应商22', value: 265 }
  ],
  options: [
    { label: 'Lv1', value: 1 },
    { label: 'Lv2', value: 2 },
    { label: 'Lv3', value: 3 },
    { label: 'Lv4', value: 4 },
    { label: 'Lv5', value: 5 }
  ],
  range: {
    name: '',
    min: 36543,
    max: 34567876
  },
  hostslist: {
    data: new Array(1).fill({
      name: '谢广坤',
      fansnum: '1',
      favonum: '1',
      prainum: '1',
      district: '1',
      type: '1',
      goodat: '1',
      money30day: '1',
      amount30day: '1',
      price30day: '1'
    }),
    total: 10
  },
  hostrecord: {
    data: new Array(1).fill({
      liveinfo: '谢广坤',
      livetime: '1',
      uv: '1',
      pv: '1',
      fansofraise: '1',
      goodnum: '1',
      money: '1',
      amount: '1',
      price: '1'
    }),
    total: 10
  },
  catalog: [
    { label: '女装' },
    { label: '潮店' },
    { label: '母婴' },
    { label: '生活' },
    { label: '买全球' },
    { label: '男士' },
    { label: '珠宝' },
    { label: '鲜花萌宠' },
    { label: '活动' },
    { label: '村播' },
    { label: '家电' }
  ]
}
Object.entries(mockdata).forEach(([api, redata]) => {
  Mock.mock(api, redata)
})
