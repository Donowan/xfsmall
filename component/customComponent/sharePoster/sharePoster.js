// component/donowan/sharePoster/sharePoster.js
const app = getApp();
import { storage } from '../../../process/data';
import { get_qr_code } from '../../../process/api'
import jump from '../../../process/router';
import {
  wxShowToast
} from '../../../process/window';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    show: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

    themeColor: app.globalData.themeColor
  },

  /**
   * 组件的方法列表
   */
  methods: {
    creatPosterHandle() {
      // 调起授权弹窗
      if(!wx.getStorageSync('allUserInfo')){
        this.triggerEvent('awakenHandle');
        return false
      }
      // 限制初级会员分享
      // if(wx.getStorageSync('allUserInfo').level <= 1){
      //   wxShowToast({title:'升级会员等级即可解锁此功能哦'})
      //   return false
      // }
      wx.showLoading({title:'加载中...'});
      storage('get', { key: 'allUserInfo' }).then(res => {
          let fs = wx.getFileSystemManager();
          wx.getStorage({
            key: 'QRcode',
            success: function (res) {
              // console.log(res)
              wx.hideLoading();
              jump.jump_create_poster('type=shareMiniProgram')
            },
            fail(err) {
              // console.log(err)
              get_qr_code({
                path:'pages/index/index',
                scene:`pid+${wx.getStorageSync('allUserInfo').uid}`
              }).then(res => {
                // 'data:image/png;base64,' + 
                // console.log('data:image/png;base64,' +res.replace(/\ +/g, "").replace(/[\r\n]/g, ""));
                const showImgData = res.replace(/\ +/g, "").replace(/[\r\n]/g, "");
                // const buffer = wx.base64ToArrayBuffer(showImgData);
                if(showImgData.length<10000){
                  wxShowToast({title:'微信系统错误'})
                  return;
                }
                let _time = new Date().getTime();
                // console.log(_time)
                fs.writeFile({
                  filePath: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
                  data: showImgData,
                  encoding: 'base64',
                  success(e) {
                    // console.log('写入手机成功...',e)
                    // wx.getImageInfo({
                    //   src: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
                    //   success: function (_data_) {
                    //     // console.log('读取手机成功')
                        wx.setStorage({
                          key: "QRcode",
                          data: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
                          success() {
                            wx.hideLoading();
                            jump.jump_create_poster('type=shareMiniProgram')
                          }
                        })
                    //   }
                    // })
                  },
                  fail(err) { 
                    // console.log('err')
                    // wx.removeStorageSync('QRcode')
                  }
                })
              }).catch(err => { 
                // console.log(err)
              })
            }
          })

        // } else {
        //   // this.triggerEvent('showGetUserInfoDialogHandle', {show:true})
        //   jump.jump_user()
        // }
      }).catch(() => { })
    }
  }
})
