const app = getApp();
import ui from '../../config/ui';
import {
  get_user_order
} from '../../process/api';
import {
  lower,
  onScrollTopFn
} from '../../process/data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.orderListBgImage,
    page:1,
    CustomBar: app.globalData.CustomBar,
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    loading: false,
    complete: false,
    orderListNav: [
      {
        id: -1,
        title: '全部'
      },
      {
        id: 0,
        title: '待付款'
      },
      {
        id: 1,
        title: '待发货'
      },
      {
        id: 2,
        title: '待收货'
      }, {
        id: 3,
        title: '待评价'
      },
      {
        id: 12,
        title: '售后/维权'
      },
      {
        id: 14,
        title: '已失效'
      }
    ],
    curreyId: 0,
    orderList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
    this.setData({
      curreyId: options.field,
      scrollLeft: (options.field - 1) * 60,
      order_status:options.field
    });
    // 初始化订单
    get_user_order('',options.field==-1?'':options.field,this.data.page).then(res=>{
      console.log(res);
      this.setData({
        orderList:res.orderInfoList
      })
    })
  },

  tabSelect(e) {
    let targrtId = e.currentTarget.dataset.id;
    if (targrtId == this.data.curreyId) return;
    this.setData({
      curreyId: targrtId,
      page:1,
      order_status:targrtId==-1?'':targrtId,
      scrollLeft: (e.currentTarget.dataset.index - 1) * 60
    }, () => {
      console.log(`当前状态值为${this.data.curreyId}`);
      get_user_order('',targrtId==-1?'':targrtId,this.data.page).then(res=>{
        console.log(res);
        this.setData({
          orderList:res.orderInfoList
        })
      })
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
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
  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
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
      request: get_user_order,//调用api
      array: ['',this.data.order_status],//传递参数
      key: 'orderList',//处理的数据key值
      fn: '',//需要某种函数进行处理
      rows:'orderInfoList'//rows键名
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})