'use strict'

import Vue from 'vue'
import datePick from '@/components/date-pick'
import watchCharts from '@/components/watch-charts'
import ringChart from '@/components/ring-chart'
import mapChart from '@/components/map-chart'
import wordChart from '@/components/word-chart'
import hybirdChart from '@/components/hybird-chart'
import richFilter from '@/components/rich-filter'
import elRange from '@/components/el-range'
import tablePaganation from '@/components/table-paganation'

Vue.mixin({
  components: {
    datePick,
    watchCharts,
    ringChart,
    mapChart,
    wordChart,
    hybirdChart,
    richFilter,
    elRange,
    tablePaganation
  }
})
