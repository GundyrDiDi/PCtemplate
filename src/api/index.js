import store from '@/store'
export default {
  baseURL: 'http://10.228.88.46:8000/api',
  // baseURL: 'http://10.228.88.9:8000/api',
  get: {
    _params () {
      return {
        openid: store.state.user.openid
      }
    },
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
      },
      brands: {
        url: 'goods/getBrandName'
      },
      hotfilter: {
        url: 'liveRoom/getFilterData'
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
      },
      hotlive: {
        url: 'liveRoom/findPopularLiveInfoByPage'
      }
    },
    host: {
      _params () {
        return {
          anchorId: store.state.host.hostId
        }
      },
      brief: {
        url: 'anchor/queryAll'
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
    },
    user: {
      search: {
        url: 'premiere/queryAll'
      },
      auths: {
        _params: {},
        url: 'members/selectMemberAll'
      }
    }
  },
  post: {
    user: {
      _params () {
        return {
          openid: '123'
        }
      },
      followme: {
        url: 'premiere/focusHost'
      },
      followlist: {
        url: 'premiere/selectPremiereInfo'
      },
      notfollow: {
        url: 'premiere/updateFocusStatus'
      },
      isnotice: {
        url: 'premiere/updateById'
      }
    }
  }
}
