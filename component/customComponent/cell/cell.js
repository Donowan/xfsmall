import jump from '../../../process/router';
import { getDataset, storage } from '../../../process/data'
import {
  get_qr_code
} from '../../../process/api';
Component({
  /**
   * 组件的属性列表
   */
  options: {
    "multipleSlots": true
  },
  properties: {
    leftIcon: String,
    navigationBarName: String,
    borderBottom: {
      type: Boolean,
      value: true
    },
    marginBottom: {
      type: Boolean,
      value: false
    },
    branch: String,
    type: {
      type: String,
      value: 'view'
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    enterBranchPage(e) {
      let branch = getDataset(e, 'branch');
      storage('get', { key: 'cpsUserInfo' }).then(res => {

        if (branch) {
          jump.jump_template_user_branch(branch)
        } else {
          if (this.data.type == 'view' && this.data.navigationBarName == "分享邀请") {
            wx.showLoading({ title: '加载中...' });
            // 限制初级会员分享
            if (wx.getStorageSync('cpsUserInfo').level <= 1) {
              wx.hideLoading()
              wx.showToast({
                icon: 'none',
                title: '升级会员等级即可解锁此功能哦',
                duration: 800
              })
              return false
            }
            storage('get', { key: 'cpsUserInfo' }).then(res => {
              let fs = wx.getFileSystemManager();
              wx.getStorage({
                key: 'QRcode',
                success: function (res) {
                  wx.hideLoading();
                  jump.jump_create_poster('type=shareMiniProgram')
                },
                fail(err) {
                  get_qr_code({
                    path: 'pages/index/index',
                    scene: `pid+${wx.getStorageSync('cpsUserInfo').uid}`
                  }).then(res => {
                    // 'data:image/png;base64,' + 
                    // console.log('data:image/png;base64,' +res.replace(/\ +/g, "").replace(/[\r\n]/g, ""));
                    const showImgData = res.replace(/\ +/g, "").replace(/[\r\n]/g, "");
                    // const buffer = wx.base64ToArrayBuffer(showImgData);
                    if (showImgData.length < 10000) {
                      wx.showToast({
                        icon: 'none',
                        title: '微信系统错误'
                      })
                      return;
                    }
                    let _time = new Date().getTime();
                    // console.log(_time)
                    fs.writeFile({
                      filePath: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
                      data: showImgData,
                      encoding: 'base64',
                      success(e) {
                        // console.log('读取手机成功')
                        wx.setStorage({
                          key: "QRcode",
                          data: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
                          success() {
                            wx.hideLoading();
                            jump.jump_create_poster('type=shareMiniProgram')
                          }
                        })
                      },
                      fail(err) {

                      }
                    })
                  }).catch(err => {

                  })
                }
              })

            }).catch(() => { })
          }
        }
      }).catch(err => {
        wx.showToast({
          title: '请先登录哦',
          duration: 800,
          icon: 'none'
        })
      })
    }
  }
})
