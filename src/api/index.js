import store from '@/store'
export default {
  baseURL: 'http://10.228.88.46:8000/api',
  get: {
    charts: {
      watch: {
        url: 'liveRoom/getLiveOverViewByDay'
      },
      liveofflow: {
        url: 'liveRoom/getLiveFlow'
      },
      hostvalue: {},
      fanspicture: {
        url: 'anchor/findFansPortrait',
        _params () {
          return {
            anchorId: store.state.host.hostId
          }
        },
        gender: {
          _params: v => ({
            tagType: 'gender'
          })
        },
        age: {
          _params: v => ({
            tagType: 'age'
          })
        },
        career: {
          _params: v => ({
            tagType: 'career'
          })
        },
        interest: {
          _params: v => ({
            tagType: 'interest'
          })
        },
        area: {
          _params: v => ({
            tagType: 'area'
          })
        }
      },
      ring: {
        typeofhost: {
          url: 'anchor/findAnchorType'
        },
        levelofhost: {
          url: 'anchor/findAnchorLevel'
        }
      },
      map: {
        district: {
          url: 'liveRoom/liveRoomArea'
        }
      },
      keyword: {
        roomtitle: {
          url: 'liveRoom/liveKeywords'
        }
      }
    },
    forms: {
      range: {
        url: 'anchor/getFilterData'
      },
      options: {
        url: 'anchor/getDropDownList',
        catalog: {
          url: 'catalog'
        }
      },
      catalog: {
        first: {
          url: 'goods/getRootCategoryName'
        }
      }
    },
    tables: {
      hostslist: {
        url: 'anchor/queryAll'
      },
      inslist: {
        url: 'org/findByMonthByPage'
      },
      goodlist: {
        url: 'goods/findByMonthByPage'
      }
    },
    user: {
      followlist: {
        url: 'followlist'
      }
    },
    host: {
      _params () {
        return {
          anchorId: store.state.host.hostId
        }
      },
      search: {
        url: 'hostslist'
      },
      brief: {
        url: 'anchor/findAllById'
      },
      value: {
        url: 'anchor/findByIdAndDay'
      },
      fans: {
        url: 'anchor/findFansPortrait'
      },
      record: {
        url: 'anchor/findLiveInfoByPage'
      },
      good: {
        url: 'goods/queryAnalysis'
      }
    }
  },
  post: {}
}
