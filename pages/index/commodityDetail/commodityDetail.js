const app = getApp();
import ui from '../../../config/ui';
import {
  getDataset,
  setEvaluate,
  setShopInfoData,
  checkPhoneNumber,
  checkUserInfo,
  onScrollTopFn
} from '../../../process/data';
import {
  get_image_data,
  get_goods_data,
  get_evaluate_data,
  get_qr_code
} from '../../../process/api';
import {
  wxActionSheet
} from '../../../process/window';
import jump from '../../../process/router';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.commodityDetailBgImage,
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    // 规格弹窗
    showModal: false,
    userInFoDialog: {
      title: '为更好体验小程序，请授权个人头像',
      type: 'getUserInfo',
      show: false
    },
    phoneNumberlDialog: {
      title: '点击授权登录即可体验完整功能',
      type: 'getPhoneNumber',
      show: false
    },
    // 弹窗形式
    bottomBar: 'addCart',
    showShareDialog: false,
    commodityDetailData: {
      evaluateLength: 0,
      evaluate: [],
      shopInfo: {
        thumbnail: "https://gw.alicdn.com/bao/uploaded/i3/1792267209/O1CN01rWeNNu237lmlyX6rl_!!1792267209.jpg_180x180xz.jpg_.webp",
        swiper: [
          {
            id: 4,
            type: 'image',
            url: 'https://gw.alicdn.com/bao/uploaded/i2/690679191/O1CN018BgJuc2HlWnGv8mlG_!!690679191.jpg_180x180xz.jpg_.webp'
          }, {
            id: 5,
            type: 'image',
            url: 'https://gw.alicdn.com/bao/uploaded/i3/1792267209/O1CN01rWeNNu237lmlyX6rl_!!1792267209.jpg_180x180xz.jpg_.webp'
          }, {
            id: 6,
            type: 'image',
            url: 'https://gw.alicdn.com/bao/uploaded/i2/59887686/O1CN0188KyI326eEi54jvDk_!!59887686.jpg_180x180xz.jpg_.webp'
          }
        ],
        goods_id: 0,
        commodityTitle: '小时候那一双大手牵着温柔的对我讲，长大以后要去流浪，一定会看到远方',
        price: 100,
        transmode: '免运费',
        salesVolume: 1000,
        service: ['天猫国际', '天猫国际', '天猫国际', '天猫国际', '天猫国际', '天猫国际', '天猫国际'],
        maxPrice: 200,
        inventory: 1000,
        details: [
          {
            type: 'image',
            url: 'https://gw.alicdn.com/bao/uploaded/i2/690679191/O1CN018BgJuc2HlWnGv8mlG_!!690679191.jpg_180x180xz.jpg_.webp'
          },
          {
            type: 'image',
            url: 'https://img.alicdn.com/tps/i4/TB1wHWpHxYaK1RjSZFnSuu80pXa.jpg_240x240q90.jpg'
          },
          {
            type: 'image',
            url: 'https://img.alicdn.com/tps/TB1j6iUMXXXXXapXFXXXXXXXXXX-750-318.jpg'
          }
        ]
      },

      transMode: {
        name: '物流',
        type: 'transmode',
        modalName: 'RadioModal',//选择弹框
        showCheck: '天天快递',
        options: [
          {
            id: 0,
            mode: '天天快递',
            checked: true
          },
          {
            id: 1,
            mode: '到店自提',
            checked: false
          },
          {
            id: 2,
            mode: '圆通快递',
            checked: false
          }
        ]
      },
      specification: {
        name: '规格',
        type: 'specification',
        modalName: 'bottomModal',
        showCheck: '大包,1000ml',
        options: [
          {
            name: '大小',
            option:
              [
                {
                  id: 0,
                  mode: '小包',
                  checked: false
                },
                {
                  id: 1,
                  mode: '中包',
                  checked: false
                },
                {
                  id: 2,
                  mode: '大包',
                  checked: true
                }
              ],
          },
          {
            name: '容量',
            option:
              [
                {
                  id: 0,
                  mode: '100ml',
                  checked: false
                },
                {
                  id: 1,
                  mode: '200ml',
                  checked: false
                },
                {
                  id: 2,
                  mode: '1000ml',
                  checked: true
                }
              ]
          }
        ]
      }
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    // 绑定关系
    if (options.pid) {
      // wx.setStorage({
      //   key: 'pid',
      //   data: options.pid,
      //   success: function (res) {
      //     if (wx.getStorageSync('allUserInfo')) {
      //       updateUser()
      //     }
      //   },
      //   fail: function () {
      //     // fail
      //   },
      //   complete: function () {
      //     // complete
      //   }
      // })
      app.globalData.p_id = options.pid;
      console.log(app.globalData.p_id);
    }
    // 扫码进入
    if (options.scene) {
      // +号分割参数 0goodsid  1pid
      const scene = decodeURIComponent(options.scene).split('+');
      app.globalData.commodityType = scene[2];
      this.setData({
        commodityType: scene[2]
      })
      console.log(scene);
      // wx.setStorage({
      //   key: 'pid',
      //   data: scene[1],
      //   success: function (res) {
      //     if (wx.getStorageSync('allUserInfo')) {
      //       updateUser()
      //     }
      //   },
      //   fail: function () {
      //     // fail
      //   },
      //   complete: function () {
      //     // complete
      //   }
      // })
      app.globalData.p_id = scene[1];
      if (scene[0]) {
        this.setData({
          goods_id: scene[0],
          globalData: app.globalData
        }, () => {
          // 解除限制
          // if (!wx.getStorageSync('allUserInfo')) return;
          // Promise.all([get_promotion_url(that.data.param.goods_id), get_commodity_detail(that.data.param.goods_id)]);
          let requestQuene = [get_goods_data(this.data.goods_id), get_evaluate_data(this.data.goods_id, 1)];
          Promise.all(requestQuene)
            .then(res => {
              console.log(res)
              //   let commodityDetail = setCommodityDetail(res[0], app.globalData.commodityType);
              //   wx.setStorageSync('commodityDetail', commodityDetail)
              //   this.setData({
              //     // app_info: res[0].we_app_info,
              //     commodityDetail
              //   })
              //   this.isPhoneNumber(this);
              // }).catch(err => {
              //   wx.showModal({
              //     title: '温馨提示',
              //     content: '此商品已抢光了！',
              //     showCancel: false,
              //     success: () => {
              //       console.log(getCurrentPages().length)
              //       if (getCurrentPages().length > 1) {
              //         wx.navigateBack({
              //           delta: 1, // 回退前 delta(默认为1) 页面
              //           success: function (res) {
              //             // success
              //           },
              //           fail: function () {
              //             // fail
              //           },
              //           complete: function () {
              //             // complete
              //           }
              //         })
              //       } else {
              //         jump.jump_home()
              //       }

              //     }
              //   })
              let shopInfo = setShopInfoData(res[0].rows[0]);
              wx.setStorageSync('commodityDetail', shopInfo)
              let evaluate = res[1].list.length > 0 ? setEvaluate([res[1].list[0]]) : [];
              this.setData({
                'commodityDetailData.shopInfo': shopInfo,
                'commodityDetailData.evaluate': evaluate,
                'commodityDetailData.evaluateLength': res[1].list.length,
                // 'commodityDetailData.evaluate': setEvaluate([
                //   {
                //     id: 0,
                //     content:'263222226226'
                //   }
                // ])
              })
            })

        })
      }

    }

    // 正常进入
    if (options.goods_id) {
      let goods_id = options.goods_id;
      let requestQuene = [get_goods_data(goods_id), get_evaluate_data(goods_id, 1)];
      // let requestQuene = [get_goods_data(goods_id)]
      console.log(goods_id);
      Promise.all(requestQuene).then(res => {
        console.log(res)
        let shopInfo = setShopInfoData(res[0].rows[0]);
        wx.setStorageSync('commodityDetail', shopInfo)
        let evaluate = res[1].list.length > 0 ? setEvaluate([res[1].list[0]]) : [];
        this.setData({
          'commodityDetailData.shopInfo': shopInfo,
          'commodityDetailData.evaluate': evaluate,
          'commodityDetailData.evaluateLength': res[1].list.length,
          // 'commodityDetailData.evaluate': setEvaluate([
          //   {
          //     id: 0,
          //     content:'263222226226'
          //   }
          // ])
        })
      }).catch(err => {
        console.log(err)
      });
    }

  },
  // 分享调起sheet
  openActionSheet() {
    if (!wx.getStorageSync('token')) {
      this.awaken();
      return false
    }
    this.setData({
      showShareDialog: true
    }, () => {
      console.log('....')
    })
    // wxActionSheet({
    //   list:['转发','生成海报'],
    //   fontColor:app.globalData.themeColor
    // }).then(res=>{
    //   let _index = res.tapIndex;
    //   if(_index==0){
    //     wx.updateShareMenu({
    //       withShareTicket: true,
    //       success () { }
    //     })
    //   }
    //   console.log(_index)
    // }).catch(err=>{
    //   console.log(err)
    // })
  },

  // 确认物流改变展示
  confirmTransMode(e) {
    let data = e.detail.value.split('--');
    let id = data[0];
    let showCheck = data[1];
    let value = this.data.commodityDetailData.transMode.options.map((item) => {
      let { checked, ...baseObject } = item;
      return {
        ...baseObject,
        checked: id == item.id ? true : false
      }
    })
    this.setData({
      'commodityDetailData.transMode.showCheck': showCheck,
      'commodityDetailData.transMode.options': value
    })
  },

  previewSwiper(e) {
    let url = getDataset(e, 'url');
    console.log(url);
    wx.previewImage({
      current: url,
      urls: this.data.commodityDetailData.shopInfo.swiper.map(item => {
        return item.image
      })
    })
  },

  // 确认规格改变展示
  confirmSpecification(e) {
    let _value = e.detail._value;
    this.setData({
      'commodityDetailData.specification.showCheck': _value
    })
  },

  // 加入购物车
  addCartByGoodsAction() {
    this.setData({
      showModal: true,
      bottomBar: 'addCart'
    })
  },
  // 关闭商品规格弹窗
  _hideModal() {
    this.setData({
      showModal: false
    })
  },
  // 接收分享按钮回调
  closeShareDialog(e) {
    // 关闭actionSheet
    this.setData({
      showShareDialog: false
    })
    // 获取点击actionSheet的索引值
    let tabIndex = e.detail.tabIndex;
    if (tabIndex == 1) {
      let that = this;
      let fs = wx.getFileSystemManager();
      let goods_id = that.data.commodityDetailData.shopInfo.goods_id;
      wx.showLoading({
        title: '加载中...'
      })
      // 限制初级会员分享
      if (wx.getStorageSync('allUserInfo').level == 1 || !wx.getStorageSync('allUserInfo').level) {
        wx.hideLoading();
        wxShowToast({ title: '升级会员等级即可解锁此功能哦' })
        return false
      }
      wx.getStorage({
        key: `QRcode${that.data.goods_id}--0}`,
        success: function (res) {
          wx.hideLoading();
          jump.jump_create_poster('type=shareCommodity&goods_id=' + goods_id + '&commodityType=0')
        },
        fail(err) {
          let uid = wx.getStorageSync('allUserInfo').uid;
          get_qr_code({
            path: `pages/index/commodityDetail/commodityDetail`,
            scene: `${goods_id}+${uid}+0`
          }).then(res => {
            // 'data:image/png;base64,' + 
            const showImgData = res.replace(/\ +/g, "").replace(/[\r\n]/g, "");
            if (showImgData.length < 10000) {
              wxShowToast({ title: '微信系统错误' })
              return;
            }
            let _time = new Date().getTime();
            fs.writeFile({
              filePath: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
              data: showImgData,
              encoding: 'base64',
              success() {
                wx.setStorage({
                  key: `QRcode${goods_id}--0`,
                  data: wx.env.USER_DATA_PATH + `/buffer_${_time}.jpg`,
                  success() {
                    wx.hideLoading();
                    jump.jump_create_poster('type=shareCommodity&goods_id=' + goods_id + '&commodityType=0')
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
  },
  // 立即购买
  buyNow() {
    this.setData({
      showModal: true,
      bottomBar: 'next'
    })
  },
  awaken() {
    checkPhoneNumber(this, app.globalData.rawData, () => {
      checkUserInfo(this)
    });
  },
  getPhoneNumber(event) {
    let showUserInFo = `userInFoDialog.show`;
    if (event.detail.code == 103) {
      let _this = this;
      setTimeout(() => {
        _this.setData({
          [showUserInFo]: true
        })
      }, 800);
    }
  },
  getUserInfo() {

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
  onShareAppMessage: function () {
    let goodsData = this.data.commodityDetailData.shopInfo;
    console.log(`/pages/index/commodityDetail/commodityDetail?goods_id=${goodsData.goods_id}&pid=${wx.getStorageSync('allUserInfo').uid}`);
    return {
      title: goodsData.commodityTitle,
      path: `/pages/index/commodityDetail/commodityDetail?goods_id=${goodsData.goods_id}&pid=${wx.getStorageSync('allUserInfo').uid}`,
      imageUrl: goodsData.thumbnail
    }
  }
})