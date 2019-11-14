const app = getApp();
import ui from '../../../../config/ui';
import {
  lower,
  onScrollTopFn,
  setTemplateOrderList
} from '../../../../process/data';
import {
  get_template_order
} from '../../../../process/api';
import {
  wxShowToast
} from '../../../../process/window';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.templateOrderListBgImage,
    orderListData: [],
    page: 1,
    id: '0',
    loading: false,
    complete: false,
    refresh: false, //刷新
    curreyActive: 0,
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    get_template_order(this.data.id, this.data.page).then(res => {
      this.setData({
        orderListData: setTemplateOrderList(res.list)
      })
    }).catch(err => {
      console.log(err);
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  changeCurreyActive(e) {
    // console.log(e);
    this.setData({
      page: 1
    }, () => {
      let index = e.detail.index;
      let _index = index == 0 ? '0' : index == 1 ? '12' : index == 2 ? '14' : index == 3 ? '13' : '0';
      this.setData({
        id: _index
      }, () => {
        get_template_order(this.data.id, this.data.page).then(res => {
          this.setData({
            orderListData: setTemplateOrderList(res.list)
          })
        }).catch(err => {
          wxShowToast({ title: '暂无更多' })
          this.setData({
            orderListData: []
          })
        })
      })
    })
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
      request: get_template_order,//调用api
      array: [this.data.id],//传递参数
      key: 'orderListData',//处理的数据key值
      fn: setTemplateOrderList,//需要某种函数进行处理
      rows:'list'//rows键名
    });
  },
  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})