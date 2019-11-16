const app = getApp();
import ui from '../../config/ui';
import {
  onScrollTopFn,
  lower,
  storage,
  checkPhoneNumber,
  checkUserInfo,
  setTemplateSwiper,
  setTemplateCommodity,
  getDataset
} from '../../process/data';
import {
  get_template_rate,
  get_template_commodity
} from '../../process/api';
import jump from '../../process/router';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImgUrl: app.globalData.baseImgUrl,
    bgImage: ui.templateBgImage,
    CustomBar: app.globalData.CustomBar,
    themeColor: app.globalData.themeColor,
    curreyActive: 0,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    visual: false,
    page: 1,
    loading: false,
    curreyActive: 0,
    complete: false,
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
    swiperList: [
      //   {
      //   id: 0,
      //   type: 'image',
      //   url: 'https://img.alicdn.com/tps/TB1j6iUMXXXXXapXFXXXXXXXXXX-750-318.jpg'
      // }, {
      //   id: 1,
      //   type: 'image',
      //   url: 'https://img.alicdn.com/tps/i4/TB1Sa_HbEH1gK0jSZSySuttlpXa.jpg_240x240q90.jpg',
      // }, {
      //   id: 2,
      //   type: 'image',
      //   url: 'https://img.alicdn.com/tps/i4/TB1wHWpHxYaK1RjSZFnSuu80pXa.jpg_240x240q90.jpg'
      // }, {
      //   id: 3,
      //   type: 'image',
      //   url: 'https://gw.alicdn.com/bao/uploaded/i4/1122110005/O1CN017sjr091BuKXBCggp5_!!1122110005.jpg_180x180xz.jpg_.webp'
      // }, {
      //   id: 4,
      //   type: 'image',
      //   url: 'https://gw.alicdn.com/bao/uploaded/i2/690679191/O1CN018BgJuc2HlWnGv8mlG_!!690679191.jpg_180x180xz.jpg_.webp'
      // }, {
      //   id: 5,
      //   type: 'image',
      //   url: 'https://gw.alicdn.com/bao/uploaded/i3/1792267209/O1CN01rWeNNu237lmlyX6rl_!!1792267209.jpg_180x180xz.jpg_.webp'
      // }, {
      //   id: 6,
      //   type: 'image',
      //   url: 'https://gw.alicdn.com/bao/uploaded/i2/59887686/O1CN0188KyI326eEi54jvDk_!!59887686.jpg_180x180xz.jpg_.webp'
      // }
    ],
    iconList: [
      // {
      //   kind_id: 1,
      //   name: 'image',
      //   image: 'https://img.alicdn.com/tps/TB1j6iUMXXXXXapXFXXXXXXXXXX-750-318.jpg'
      // }, {
      //   kind_id: 2,
      //   name: 'image',
      //   image: 'https://img.alicdn.com/tps/i4/TB1Sa_HbEH1gK0jSZSySuttlpXa.jpg_240x240q90.jpg',
      // }, {
      //   kind_id: 3,
      //   name: 'image',
      //   image: 'https://img.alicdn.com/tps/i4/TB1wHWpHxYaK1RjSZFnSuu80pXa.jpg_240x240q90.jpg'
      // }, {
      //   kind_id: 4,
      //   name: 'image',
      //   image: 'https://gw.alicdn.com/bao/uploaded/i4/1122110005/O1CN017sjr091BuKXBCggp5_!!1122110005.jpg_180x180xz.jpg_.webp'
      // }
    ],
    commodityData: [
      // {
      //   goods_id: 1245898273,
      //   commodityLink: 'https://t00img.yangkeduo.com/goods/images/2019-10-08/a766d0a6c124deb2d0757df52b4bfd0e.jpeg',
      //   title: '柿饼2斤农家自制柿子饼500g霜降吊柿干非陕西富平特产特级3斤装',
      //   salesVolume: 17000,
      //   shopName: '不戒良仓零食旗舰店',
      //   coupon: 3,
      //   price: 16.9,
      //   currentPrice: 13.9,
      //   rate: 30,
      //   gain: 3.8364000000000003,
      // },
      // {
      //   goods_id: 1245898273,
      //   commodityLink: 'https://t00img.yangkeduo.com/goods/images/2019-10-08/a766d0a6c124deb2d0757df52b4bfd0e.jpeg',
      //   title: '柿饼2斤农家自制柿子饼500g霜降吊柿干非陕西富平特产特级3斤装',
      //   salesVolume: 17000,
      //   shopName: '不戒良仓零食旗舰店',
      //   coupon: 3,
      //   price: 16.9,
      //   currentPrice: 13.9,
      //   rate: 30,
      //   gain: 3.8364000000000003,
      // },
      // {
      //   goods_id: 1245898273,
      //   commodityLink: 'https://t00img.yangkeduo.com/goods/images/2019-10-08/a766d0a6c124deb2d0757df52b4bfd0e.jpeg',
      //   title: '柿饼2斤农家自制柿子饼500g霜降吊柿干非陕西富平特产特级3斤装',
      //   salesVolume: 17000,
      //   shopName: '不戒良仓零食旗舰店',
      //   coupon: 3,
      //   price: 16.9,
      //   currentPrice: 13.9,
      //   rate: 30,
      //   gain: 3.8364000000000003,
      // },
      // {
      //   goods_id: 1245898273,
      //   commodityLink: 'https://t00img.yangkeduo.com/goods/images/2019-10-08/a766d0a6c124deb2d0757df52b4bfd0e.jpeg',
      //   title: '柿饼2斤农家自制柿子饼500g霜降吊柿干非陕西富平特产特级3斤装',
      //   salesVolume: 17000,
      //   shopName: '不戒良仓零食旗舰店',
      //   coupon: 3,
      //   price: 16.9,
      //   currentPrice: 13.9,
      //   rate: 30,
      //   gain: 3.8364000000000003,
      // },
      // {
      //   goods_id: 1245898273,
      //   commodityLink: 'https://t00img.yangkeduo.com/goods/images/2019-10-08/a766d0a6c124deb2d0757df52b4bfd0e.jpeg',
      //   title: '柿饼2斤农家自制柿子饼500g霜降吊柿干非陕西富平特产特级3斤装',
      //   salesVolume: 17000,
      //   shopName: '不戒良仓零食旗舰店',
      //   coupon: 3,
      //   price: 16.9,
      //   currentPrice: 13.9,
      //   rate: 30,
      //   gain: 3.8364000000000003,
      // }
    ]
  },
  awaken() {
    checkPhoneNumber(this, app.globalData.rawData, () => {
      checkUserInfo(this)
    });
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pid) {
      app.globalData.p_id = options.pid;
    }
    if (options.scene) {
      if (!options.scene.split('+')) return;
      const scene = decodeURIComponent(options.scene).split('+');
      let pid = scene[1];
      app.globalData.p_id = pid;
    }
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
    console.log('show...');
    let curreyActive = this.data.curreyActive;
    let type = curreyActive == 0 ? 2 : curreyActive == 1 ? 3 : curreyActive == 2 ? 4 : curreyActive == 3 ? 5 : '';
    get_template_commodity(type, this.data.page).then(res => {
      console.log(res)
      let commodityData = setTemplateCommodity(res.list, type);
      console.log(commodityData);
      console.log(Number(res.type - 1), app.globalData.commodityType);
      if (Number(res.type - 1) == app.globalData.commodityType) {
        this.setData({
          commodityData
        })
      }
    }).catch(err => {
      console.log(err);
    })
    get_template_rate().then(res => {
      let { config, firstColumn, icon } = res;
      // 处理红松鼠会员登记
      storage('get', {
        key: 'allUserInfo'
      }).then(res => {
        // 获取红松鼠的会员等级
        let rate = wx.getStorageSync('cpsUserInfo').level;
        app.globalData.hss_rate = config.pdd_rate;
        app.globalData.hss_rate2 = config.jd_rate;
        app.globalData.hss_rate3 = config.vip_rate;
        app.globalData.hss_rate4 = config.sn_rate;
        wx.setStorageSync('rate', config.pdd_rate[rate]);
        wx.setStorageSync('rates', config.pdd_rate);
        wx.setStorageSync('rate2', config.jd_rate[rate]);
        wx.setStorageSync('rates2', config.jd_rate);
        wx.setStorageSync('rate3', config.vip_rate[rate]);
        wx.setStorageSync('rates3', config.vip_rate);
        wx.setStorageSync('rate4', config.sn_rate[rate]);
        wx.setStorageSync('rates4', config.sn_rate);
      }).catch(err => {
        app.globalData.hss_rate = config.pdd_rate;
        app.globalData.hss_rate2 = config.jd_rate;
        app.globalData.hss_rate3 = config.vip_rate;
        app.globalData.hss_rate4 = config.sn_rate;
        wx.setStorageSync('rate', config.pdd_rate[3]);
        wx.setStorageSync('rates', config.pdd_rate);
        wx.setStorageSync('rate2', config.jd_rate[3]);
        wx.setStorageSync('rates2', config.jd_rate);
        wx.setStorageSync('rate3', config.vip_rate[3]);
        wx.setStorageSync('rates3', config.vip_rate);
        wx.setStorageSync('rate4', config.sn_rate[3]);
        wx.setStorageSync('rates4', config.sn_rate);
      })

      // 处理轮博数据
      let swiperList = setTemplateSwiper(firstColumn);
      this.setData({
        swiperList,
        iconList: icon.map(_data_ => {
          let { body, ..._baseObj_ } = _data_;
          return {
            ..._baseObj_,
            Body: JSON.parse(body)
          }
        })
      })
    }).catch(err => { })
  },
  changeCurreyActive(e) {
    wx.pageScrollTo({
      scrollTop: 0,
      duration: 500
    })
    wx.showLoading({ title: '切换数据中...', mask: true })
    app.globalData.commodityType = e.detail.index + 1;
    console.log(app.globalData.commodityType);
    this.setData({
      curreyActive: e.detail.index,
      commodityData: null,
      page: 1
    }, () => {
      let curreyActive = this.data.curreyActive;
      let type = curreyActive == 0 ? 2 : curreyActive == 1 ? 3 : curreyActive == 2 ? 4 : curreyActive == 3 ? 5 : '';
      get_template_commodity(type, this.data.page).then(res => {
        console.log(res)
        let commodityData = setTemplateCommodity(res.list, type);
        console.log(commodityData)
        this.setData({
          commodityData
        }, () => {
          wx.hideLoading();
        })
      }).catch(err => {
        wx.hideLoading();
        console.log(err);
      })
    })

  },
  // 进入我的收益
  _enterIncome(_this) {
    if (wx.getStorageSync('allUserInfo')) {
      jump.jump_template_user();
      return false
    }
    checkPhoneNumber(_this, app.globalData.rawData, () => {
      checkUserInfo(_this)
    });
  },
  _enterSort(e) {
    let { open_way, Body } = getDataset(e, 'item');
    console.log(getDataset(e, 'item'));
    if (open_way == 4) {
      this._enterIncome(this);
    } else if (open_way == 3) {
      jump.jump_sort(`type=${Body.type}`)
    }

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
    if (event.detail.userInfo) {
      app.globalData.commodityType = 1;
      wx.reLaunch({ url: '/pages/template/template' });
    }
  },
  getUserInfo() {
    wx.reLaunch({ url: '/pages/template/template' });
    app.globalData.commodityType = 1;
  },
  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({
      page:1
    })
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
    let curreyActive = this.data.curreyActive;
    let type = curreyActive == 0 ? 2 : curreyActive == 1 ? 3 : curreyActive == 2 ? 4 : curreyActive == 3 ? 5 : '';
    lower({
      _this: this,//this
      request: get_template_commodity,//调用api
      array: [type],//传递参数
      key: 'commodityData',//处理的数据key值
      fn: setTemplateCommodity,//需要某种函数进行处理
      rows: 'list'
    }, this.data.curreyActive + 2);
  },
  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `${wx.getStorageSync('allUserInfo').user_name} 邀请您使用`,
      path: `/pages/template/template?pid=${wx.getStorageSync('allUserInfo').uid}`,
      imageUrl: `${this.data.baseImgUrl}/shareLogo.png`
    }
  }
})