import {
  get_search_template_commodity,
  get_classify_data,
  get_search_commodity_by_link
} from '../../../process/api';
import {
  pageShare,
  storage,
  setTemplateCommodity,
  KeepTwoDecimals,
  checkPhoneNumber,
  lower,
  onScrollTopFn
} from '../../../process/data';
import ui from '../../../config/ui';
import {
  wxShowToast
} from '../../../process/window';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    baseImgUrl: app.globalData.baseImgUrl,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    visual: false,
    commodityData: null,
    inputValue: '',
    page: 1,
    loading: false,
    bgImage: ui.searchDetailBgImage,
    curreyActive: 0,
    complete: false,
    userInFoDialog: {
      title: '为更好体验小程序，请授权个人头像',
      type: 'getUserInfo',
      src: '../../../public/images/logo.png',
      show: false
    },
    phoneNumberlDialog: {
      title: '亲，你还未登录哦，请先授权再登录',
      type: 'getPhoneNumber',
      src: '../../../public/images/logo.png',
      show: false
    }
  },
  getPhoneNumber(event) {
    let showUserInFo = `userInFoDialog.show`;
    // let phoneNumberl = `phoneNumberlDialog.show`;
    // console.log(event);

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
      wx.reLaunch({ url: '/pages/index/index' });
      if (wx.getStorageSync('pid')) {
        updateUser()
      }
    }
  },
  getUserInfo() {
    wx.reLaunch({ url: '/pages/index/index' });
    if (wx.getStorageSync('pid')) {
      updateUser()
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _type = options.type == 'pdd' ? 2 : options.type == 'jd' ? 3 : options.type == 'vph' ? 4 : options.type == 'sn' ? 5 : 0;
    let curreyActive = Number(_type) - 2;
    this.setData({
      curreyActive,
      keyWords: options.keyWords
    })
    let _request;
    _request = get_search_template_commodity(options.keyWords, _type, this.data.page);
    _request.then(res => {
      console.log(res.list);
      let commodityData = setTemplateCommodity(res.list,_type);
      this.setData({
        commodityData
      })
    }).catch((err) => {
      console.log(err);
      this.setData({
        commodityData: []
      })
      wxShowToast({ title: '您搜索的商品不存在哦' })
    })
  },
  changeCurreyActive(e) {
    this.setData({
      page: 1,
      curreyActive: e.detail.index
    }, () => {
      let _type = this.data.curreyActive == 0 ? 2 : this.data.curreyActive == 1 ? 3 : this.data.curreyActive == 2 ? 4 : this.data.curreyActive == 3 ? 5 : '';
      get_search_template_commodity(this.data.keyWords, _type, this.data.page).then(res => {
        let commodityData = setTemplateCommodity(res.list,_type);
        this.setData({
          commodityData
        })
      }).catch(() => {
        this.setData({
          commodityData: []
        })
        wxShowToast({ title: '您搜索的商品不存在哦' })
      })
    })
  },
  scrolling(e) {
    let scrollTop = e.detail.scrollTop
    if (scrollTop < this.data.scrollHeight / 2) {
      this.setData({
        visual: false
      })
    } else {
      this.setData({
        visual: true
      })
    }
  },
  getSearchCommodity(e) {
    //拿到组件传递出来的数据进行筛选
    let keyWord = e.detail.keyWord;
    // console.log('搜索的数据' + e.detail.keyWord);
    this.setData({
      inputValue: keyWord
    }, () => {

      //模拟数据接口

    })
  },
  // filter(e) {
  //   // console.log(e.detail);
  //   // 向后台发送数据筛选
  //   get_classify_data(1, 1, { sortfield: e.detail.subsidyIndex, sortmode: e.detail.checked ? 1 : 0 }).then(res => {
  //     let commodityData = setCommodity(res);
  //     this.setData({
  //       commodityData
  //     })
  //   }).catch(() => { })
  // },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!wx.getStorageSync('allUserInfo').uid || wx.getStorageSync('allUserInfo').level == 1) {
      wx.hideShareMenu()
    }
  },
  awaken() {
    checkPhoneNumber(this, app.globalData.rawData, () => {
      checkUserInfo(that)
    });
  },
  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
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
    lower({
      _this: this,//this
      request: get_search_template_commodity,//调用api
      array: [this.data.keyWords, this.data.curreyActive+2],//传递参数
      key: 'commodityData',//处理的数据key值
      fn: setTemplateCommodity,//需要某种函数进行处理
      rows:'list'
    },this.data.curreyActive + 2);
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    if (res.from === 'button') {
      let { price, currentprice, coupon, link, goods_id, rate } = res.target.dataset;
      if (coupon == 0) {
        return {
          title: `【拼多多/京东】${currentprice}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(currentprice / 100 * rate) * wx.getStorageSync('rates')[3])}元`,
          path: `/pages/index/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${goods_id}`,
          imageUrl: link
        }
      } else {
        return {
          title: `【拼多多/京东】领${coupon}元内部券，${currentprice}元到手，最高再返${KeepTwoDecimals(KeepTwoDecimals(currentprice / 100 * rate) * wx.getStorageSync('rates')[3])}元`,
          path: `/pages/index/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${goods_id}`,
          imageUrl: link
        }
      }

    } else {
      return {
        title: `${wx.getStorageSync('allUserInfo').nickname} 邀请您使用`,
        path: `/pages/index/index?pid=${wx.getStorageSync('allUserInfo').uid}`,
        imageUrl: 'https://cdn.hssapp.com.cn/ssdp/imgs/shareLogo.png'
      }
    }
  }
})