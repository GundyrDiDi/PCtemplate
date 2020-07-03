export default {
  name: '鲸宸数据',
  description: '淘宝主播商家、主播、MCN优选的淘宝直播AI数据平台',
  company: {
    email: 'XXXXXXX@thechenfan.com',
    tel: 'XXXXXXXXXXXXX',
    addr: '浙江省杭州市滨江区秋溢路606号2号楼402室',
    name: '杭州瀚斯科技有限公司',
    icp: '浙ICP备19017467号',
    gip: '浙公网安备 33010602010329号'
  },
  keywords: [],
  info: [
    {
      title: '大盘数据，一目了然',
      msg:
        '为用户提供简洁明了的大盘数据，可视化展现，支持数据下钻，帮助用户探寻数字背后的真相',
      tabs: []
    },
    {
      title: '主播实力\n一览无余',
      msg:
        '日常监控主播直播数据，对主播实力进行全面分析，综合各方面因素为主播评分',
      tabs: [],
      buttons: [{ name: '登录查看更多', link: '' }],
      class: 'flex-col-rev'
    },
    {
      title: '专业团队为您服务',
      msg:
        '为用户提供简洁明了的大盘数据，可视化展现，支持数据下钻，帮助用户探寻数字背后的真相',
      tabs: []
    }
  ],
  imgs: {},
  icons: {},
  routes: [
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/views/Home/home.vue'),
      children: 'treemenu'
    },
    {
      path: '/enter',
      name: 'Enter',
      component: () => import('@/views/Enter/index.vue'),
      meta: { title: '首页' }
      // children: 'enternavs'
    },
    {
      path: '/',
      redirect: to => ({ name: 'Enter', hash: '#entermain' })
    }
  ],
  enternavs: [
    {
      path: '/enter/entermain',
      name: 'entermain',
      component: () => import('@/views/Enter/components/entermain.vue'),
      meta: { title: '首页' }
    },
    {
      path: '/enter/info',
      name: 'info',
      component: () => import('@/views/Enter/components/info.vue'),
      meta: { title: '产品介绍' }
    },
    {
      path: '/enter/ask',
      name: 'ask',
      component: () => import('@/views/Enter/components/ask.vue'),
      meta: { title: '合作咨询' }
    }
  ],
  treemenu: []
}
