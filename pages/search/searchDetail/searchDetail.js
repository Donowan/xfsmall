import ui from '../../../config/ui';
import {
  get_search_commodity
} from '../../../process/api';
import {
  setCommodity,
  onScrollTopFn,
  lower,
  checkPhoneNumber,
  checkUserInfo
} from '../../../process/data';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    baseImgUrl:app.globalData.baseImgUrl,
    bgImage:ui.searchDetailBgImage,
    page:1,
    commodityData:null,
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    loading: false,
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
	},
	getUserInfo() {
		
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
    this.setData({
      keyWords: options.keyWords
    },()=>{
      get_search_commodity(this.data.keyWords,this.data.page).then(res=>{
        let _commodityData = setCommodity(res.rows);
        this.setData({
          commodityData:_commodityData
        })
      }).catch(err=>{
        this.setData({
          commodityData:[]
        })
      })
    })
  },
  filter(e) {
    console.log(e.detail);
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
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
      request: get_search_commodity,//调用api
      array: [this.data.keyWords],//传递参数
      key: 'allCommodity',//处理的数据key值
      fn: setCommodity//需要某种函数进行处理
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function (res) {
    
  }
})