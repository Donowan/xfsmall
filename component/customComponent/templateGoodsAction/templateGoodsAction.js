import {
  wxShowToast
} from '../../../process/window'
import jump from '../../../process/router';
import {
  get_qr_code
} from '../../../process/api';
import {
  storage
} from '../../../process/data';
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shareGain: {
      type: String,
      value: '100'
    },
    gain: {
      type: String,
      value: '100'
    },
    goods_id: {
      type: String,
      value: ''
    },
    isPhoneNumber: {
      type: Boolean,
      value: false
    }
  },
  // pageLifetimes: {
  //   show: function () {
  //     console.log('show')
  //     storage('get', { key: 'phoneNumber' }).then(res => {
  //       if (res.data) {
  //         this.setData({
  //           isPhoneNumber: true,

  //         })
  //       }
  //     }).catch(() => {

  //     })
  //   },
  // },
  /**
   * 组件的初始数据
   */
  data: {
    baseImgUrl: app.globalData.baseImgUrl,
    themeColor: app.globalData.themeColor,
    isPhoneNumber: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    goingBuy() {
      // 传递参数出去
      this.triggerEvent('goingBuyHandle')
    },
    _share() {
      this.triggerEvent('shareHandle')
    },
    goHome() {
      wx.switchTab({ url: '/pages/template/template' })
    },
    creatCommodityPost() {
      // console.log(wx.getStorageSync('cpsUserInfo'))  
      if (!wx.getStorageSync('cpsUserInfo')) {
        this.triggerEvent('awakenHandle');
        return false
      }
      // 限制初级会员分享
      if (wx.getStorageSync('cpsUserInfo').level <= 1) {
        wxShowToast({title: '升级会员等级即可解锁此功能哦'})
        return false
      }
      let that = this;
      let fs = wx.getFileSystemManager();
      wx.showLoading({
        title: '加载中...',
        mask:true
      })
      // 检测各个平台类型以及goods_id,如果查得到就直接进入,查不到就请求接口存到手机
      wx.getStorage({
        key: `QRcode${that.data.goods_id}--${app.globalData.commodityType}`,
        success: function (res) {
          wx.hideLoading();
          jump.jump_create_poster('type=shareCommodity&goods_id=' + that.data.goods_id + '&commodityType=' + app.globalData.commodityType)
        },
        fail(err) {
          let uid = wx.getStorageSync('allUserInfo').uid
          let goods_id = that.data.goods_id
          get_qr_code({
            path: `pages/template/commodityDetail/commodityDetail`,
            scene: `${goods_id}+${uid}+${app.globalData.commodityType}`
          }).then(res => {
            // 'data:image/png;base64,' + 
            const showImgData = res.replace(/\ +/g, "").replace(/[\r\n]/g, "");
            if (showImgData.length < 10000) {
              wxShowToast({title: '微信系统错误'})
              return;
            }
            let _time = new Date().getTime();
            fs.writeFile({
              filePath: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
              data: showImgData,
              encoding: 'base64',
              success() {
                wx.setStorage({
                  key: `QRcode${that.data.goods_id}--${app.globalData.commodityType}`,
                  data: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
                  success() {
                    wx.hideLoading();
                    jump.jump_create_poster('type=shareCommodity&goods_id=' + that.data.goods_id + '&commodityType=' + app.globalData.commodityType)
                  }
                })
              },
              fail(err) {
                
              }
            })
          }).catch(err => {
            console.log(err)
          })
        }
      })

    }

  }
})
