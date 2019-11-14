import ui from '../../../config/ui';
import {
  wxShowToast
} from '../../../process/window';
import {
  copyText, onScrollTopFn, getDataset, storage, checkPhoneNumber, checkUserInfo, KeepTwoDecimals, setTemplateCommodityDetail
} from '../../../process/data';
import {
  get_template_commodity_detail,
  get_template_promote_url
} from '../../../process/api';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    visual: false,
    cityCode: "025",
    custNo: 7176074502,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    baseImgUrl:app.globalData.baseImgUrl,
    bgImage: ui.commodityDetailBgImage,
    commodityType: 1,
    admin: true,
    param: '',
    isPhoneNumber: false,
    phoneNumberlDialog: {
      title: '亲，你还未登录哦，请先授权在登录',
      type: 'getPhoneNumber',
      src: '../../../public/images/logo.png',
      show: false
    },
    userInFoDialog: {
      title: '为更好体验小程序，请授权个人头像',
      type: 'getUserInfo',
      src: '../../../public/images/logo.png',
      show: false
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this;
    // 分享卡片进入
    if (options.pid) {
      this.setData({
          goods_id: options.goods_id
      })
      wx.setStorage({
        key: 'pid',
        data: options.pid,
        success: function (res) {
          if (wx.getStorageSync('allUserInfo')) {
            updateUser()
          }
        },
        fail: function () {
          // fail
        },
        complete: function () {
          // complete
        }
      })
      app.globalData.p_id = options.pid;

    }
    // 正常进入
    if (options.goods_id) {
      let { goods_id, type } = options;
      app.globalData.commodityType = type;
      this.setData({
        goods_id, commodityType: type
      }, () => {
        get_template_commodity_detail({
          goodsId: goods_id,
          type: type
        }).then(res => {
          let commodityDetail = setTemplateCommodityDetail(res, app.globalData.commodityType);
          wx.setStorageSync('templateCommodityDetail', commodityDetail)
          this.setData({
            commodityDetail
          });
          this.isPhoneNumber(this);
        }).catch(err => {
          this.erroTip()
        })
      })
    }
    // 扫描二维码进入
    if (options.scene) {
      // +号分割参数 0goodsid  1pid
      const scene = decodeURIComponent(options.scene).split('+');
      app.globalData.commodityType = scene[2];
      that.setData({
        commodityType: scene[2]
      })
      app.globalData.p_id = scene[1];
      if (scene[0]) {
        this.setData({
          goods_id: scene[0],
          globalData: app.globalData
        }, () => {
          get_template_commodity_detail({
            goodsId: that.data.goods_id,
            type: app.globalData.commodityType
          }).then(res => {
            let commodityDetail = setTemplateCommodityDetail(res, app.globalData.commodityType);
            wx.setStorageSync('templateCommodityDetail', commodityDetail)
            this.setData({
              commodityDetail
            });
            this.isPhoneNumber(this);
          }).catch(err => {
            this.erroTip()
          })
        })
      }
    }
  },
  isPhoneNumber(that) {
    storage('get', { key: 'phoneNumber' }).then(res => {

      that.setData({
        isPhoneNumber: true,

      })

    }).catch(() => {

    })
  },
  // 商品不再或者请求出错处理
  erroTip() {
    wx.showModal({
      title: '温馨提示',
      content: '此商品已抢光了！',
      showCancel: false,
      success: () => {
        console.log(getCurrentPages().length)
        if (getCurrentPages().length > 1) {
          wx.navigateBack({
            delta: 1, // 回退前 delta(默认为1) 页面
            success: function (res) {
              // success
            },
            fail: function () {
              // fail
            },
            complete: function () {
              // complete
            }
          })
        } else {
          wx.switchTab({ url: '/pages/template/template' })
        }
      }
    })
  },
  goingBuy() {
    let _this = this;
    checkPhoneNumber(this, app.globalData.rawData, () => {
      checkUserInfo(_this)
    });
    if (!this.data.admin) return;
    if (!wx.getStorageSync('cpsUserInfo')) return;
    this.setData({
      admin: false
    })
    if (app.globalData.commodityType == 1) {
      get_template_promote_url({
        type: 2,
        goods_id: this.data.goods_id
      }).then(data => {
        wx.navigateToMiniProgram({
          appId: 'wx32540bd863b27570',
          path: data.goods_promotion_url_generate_response.goods_promotion_url_list[0].we_app_info.page_path,
          extraData: {
            foo: 'bar'
          },
          envVersion: 'release',
          success(res) {
            _this.setData({
              admin: true
            })
          }, fail() {
            _this.setData({
              admin: true
            })
          }
        })
      })
    } else if (app.globalData.commodityType == 2) {
      // 获取京东的优惠券链接
      let { coupon_url, goods_id } = _this.data.commodityDetail;
      get_template_promote_url({
        coupon_url, goods_id, type: 3
      }).then((data) => {
        console.log(data);
        if(data.shortURL){
          wx.navigateToMiniProgram({
            appId: "wx13e41a437b8a1d2e",
            path: `/pages/proxy/union/union?spreadUrl=${encodeURIComponent(data.shortURL)}&customerinfo=20190715ssyp`,
            extraData: {
              foo: 'bar'
            },
            envVersion: 'release',
            success(res) {
              _this.setData({
                admin: true
              })
            },
            fail() {
              _this.setData({
                admin: true
              })
            }
          })
        }else{
          wxShowToast({title:'领取失败~'})
        }
      }).catch()
    } else if (app.globalData.commodityType == 3) {
      // 获取唯品会的优惠券链接
      get_template_promote_url({
        type: 4,
        goods_id: _this.data.goods_id
      }).then((data) => {
        console.log(data)
        wx.navigateToMiniProgram({
          appId: "wxe9714e742209d35f",
          path: `pages/productDetail/productDetail?brandId=${_this.data.commodityDetail.sellerId}&goodsId=${_this.data.commodityDetail.goods_id}&tra_from=${data.traFrom}`,
          extraData: {
            foo: 'bar'
          },
          envVersion: 'release',
          success(res) {
            _this.setData({
              admin: true
            })
          },
          fail() {
            _this.setData({
              admin: true
            })
          }
        })

      }).catch()
    } else if (app.globalData.commodityType == 4) {
      // 获取苏宁的优惠券链接
      let { goods_id, sellerId, activityId, pgActionId, priceTypeCode, couponCount } = _this.data.commodityDetail;
      let { custNo, cityCode } = _this.data;
      console.log(sellerId);
      get_template_promote_url({
        type: 5,
        seller_id: sellerId,
        goods_id
      }).then((data) => {
        console.log(data)
        let { union } = data
        if (priceTypeCode != 99) {
          //跳转苏宁易购 小程序
          if (couponCount != 0) {
            wx.navigateToMiniProgram({
              appId: "wx681b1e78da02dd16",
              path: `packageC/pages/tuike/quan/index?commodityCode=${goods_id}&supplierCode=${sellerId}&cityCode=${cityCode}&promoter=${custNo}&couponActivityId=${activityId}&isPromotionCoupon=1&union=${union}`,
              extraData: {
                foo: 'bar'
              },
              envVersion: 'release',
              success(res) {
                _this.setData({
                  admin: true
                })
              },
              fail() {
                _this.setData({
                  admin: true
                })
              }
            })
          } else {
            wx.navigateToMiniProgram({
              appId: "wx681b1e78da02dd16",
              path: `pages/fourth/fourth?productId=${goods_id}&shop=${sellerId}&union=${union}`,
              extraData: {
                foo: 'bar'
              },
              envVersion: 'release',
              success(res) {
                _this.setData({
                  admin: true
                })
              },
              fail() {
                _this.setData({
                  admin: true
                })
              }
            })
          }
        } else {
          //苏宁拼购的商品
          if (couponCount != 0) {
            wx.navigateToMiniProgram({
              appId: "wxe964260af9330942",
              path: `packageB/pages/tuike/quan/index?commodityCode=${goods_id}&supplierCode=${sellerId}&cityCode=${cityCode}&promoter=${custNo}&couponActivityId=${activityId}&source=cust_15&pgActionId=${pgActionId}&union=${union}`,
              extraData: {
                foo: 'bar'
              },
              envVersion: 'release',
              success(res) {
                _this.setData({
                  admin: true
                })
              },
              fail() {
                _this.setData({
                  admin: true
                })
              }
            })
          } else {
            wx.navigateToMiniProgram({
              appId: "wxe964260af9330942",
              path: `pages/fourth/fourth/fourth?actId=${pgActionId}&union=${union}`,
              extraData: {
                foo: 'bar'
              },
              envVersion: 'release',
              success(res) {
                _this.setData({
                  admin: true
                })
              },
              fail() {
                _this.setData({
                  admin: true
                })
              }
            })
          }
        }
      }).catch()
    }
  },

  // 获取电话号码回调
  getPhoneNumber(event) {
    let showUserInFo = `userInFoDialog.show`;
    // let phoneNumberl = `phoneNumberlDialog.show`;
    console.log(event);
    if (event.detail.code == 103) {
      let _this = this;
      setTimeout(() => {
        _this.setData({
          [showUserInFo]: true,
          // [phoneNumberl]:false
        })
      }, 800);
    }
    if (event.detail.userInfo) {
      wx.showLoading({ title: '数据更新中...', mask: true })
      // updateUser();
      setTimeout(() => {
        console.log(this.data.goods_id);
        get_template_commodity_detail({
          goodsId: this.data.goods_id,
          type: this.data.commodityType
        }).then(res => {
          console.log(res)
          let commodityDetail = setTemplateCommodityDetail(res, app.globalData.commodityType);
          console.log(commodityDetail);
          wx.setStorageSync('templateCommodityDetail', commodityDetail);
          console.log(this.data)
          this.setData({
            commodityDetail
          });
          this.isPhoneNumber(this);
          wx.hideLoading();
        }).catch(err => {
          this.erroTip();
          wx.hideLoading();
        })
      }, 800)
    }
  },
  // 获取用户信息回调
  getUserInfo() {
    wx.showLoading({ title: '数据更新中...', mask: true })
    // updateUser();
    setTimeout(() => {
      get_template_commodity_detail({
        goodsId: this.data.goods_id,
        type: this.data.commodityType
      }).then(res => {
        let commodityDetail = setTemplateCommodityDetail(res, app.globalData.commodityType);
        wx.setStorageSync('templateCommodityDetail', commodityDetail)
        this.setData({
          commodityDetail
        });
        this.isPhoneNumber(this);
        wx.hideLoading();
      }).catch(err => {
        this.erroTip();
        wx.hideLoading();
      })
    }, 500)

  },
  goLogin() {
    let that = this;
    checkPhoneNumber(this, app.globalData.rawData, () => {
      checkUserInfo(that)
    });
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!wx.getStorageSync('allUserInfo').uid || wx.getStorageSync('cpsUserInfo').level == 1) {
      wx.hideShareMenu()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },
  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    let _data = this.data.commodityDetail;
    console.log(res);
    if (app.globalData.commodityType == 1) {
      console.log( `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=1`);
      if (_data.couponAmount == 0) {
        return {
          title: `【拼多多】${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=1`,
          imageUrl: _data.sharePic
        }
      } else {
        return {
          title: `【拼多多】领${KeepTwoDecimals(_data.couponAmount)}元内部券，${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=1`,
          imageUrl: _data.sharePic
        }
      }
    } else if (app.globalData.commodityType == 2) {
      if (_data.couponAmount == 0) {
        return {
          title: `【京东】${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=2`,
          imageUrl: _data.sharePic
        }
      } else {
        return {
          title: `【京东】领${KeepTwoDecimals(_data.couponAmount)}元内部券，${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=2`,
          imageUrl: _data.sharePic
        }
      }
    } else if (app.globalData.commodityType == 3) {
      if (_data.couponAmount == 0) {
        return {
          title: `【唯品会】${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=3`,
          imageUrl: _data.sharePic
        }
      } else {
        return {
          title: `【唯品会】领${KeepTwoDecimals(_data.couponAmount)}元内部券，${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=3`,
          imageUrl: _data.sharePic
        }
      }
    } else if (app.globalData.commodityType == 4) {
      if (_data.couponAmount == 0) {
        return {
          title: `【苏宁】${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=4`,
          imageUrl: _data.sharePic
        }
      } else {
        return {
          title: `【苏宁】领${KeepTwoDecimals(_data.couponAmount)}元内部券，${KeepTwoDecimals(_data.currentPrice)}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3])}元`,
          path: `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.goods_id}&type=4`,
          imageUrl: _data.sharePic
        }
      }
    }
  }
})