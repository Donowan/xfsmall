import ui from '../../../config/ui';
import jump from '../../../process/router';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.incomeBgImage,
    type:'',
    template: [
      {
        id: 0,
        prevIconName: 'icongouwuchezhengpin',
        nextIconName: 'iconright',
        branchName: 'Donowan 购买的订单（交易完成）',
        price:'100.00',
        orderId: 12312
      },
      {
        id: 1,
        prevIconName: 'iconyouhuiquan',
        nextIconName: 'iconright',
        branchName: 'Donowan 购买的订单（交易完成）',
        price:'100.00',
        orderId: 12121
      }
    ],
    template2: [
      {
        id: 0,
        prevIconName: 'icongouwuchezhengpin',
        nextIconName: 'iconright',
        branchName: '2020-10-21申请提现（申请中）',
        price:'-100.00',
        orderId: 12312
      },
      {
        id: 1,
        prevIconName: 'iconyouhuiquan',
        nextIconName: 'iconright',
        branchName: '2020-10-21申请提现（申请中）',
        price:'-100.00',
        orderId: 12121
      }
    ]
  },
  enterOtherOrderDetail(){
    wx.navigateTo({url: '/pages/userBranch/otherOrderDetail/otherOrderDetail'})
  },
  enterwithdrawalDetail(){
    wx.navigateTo({url: '/pages/userBranch/withdrawalStatus/withdrawalStatus'})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      type:options.type
    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})