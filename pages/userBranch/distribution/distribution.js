import ui from '../../../config/ui';
import jump from '../../../process/router';
import {
  getDataset
} from '../../../process/data'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.incomeBgImage,
    TabCur: 0,
    TabCur2: 0,
    scrollLeft: 0,
    scrollLeft2: 0,
    navList: [
      {
        name: '佣金',
      },
      {
        name: '盟友',
      }
    ],
    navList2: [
      {
        name: '一级盟友',
      },
      {
        name: '二级盟友',
      },
      {
        name: '三级盟友',
      }
    ],
    template: [
      {
        id: 0,
        prevIconName: 'icongouwuchezhengpin',
        nextIconName: 'iconright',
        branchName: '已提现 （元）',
        price:'100.00',
        branch: 'withdrawal'
      },
      {
        id: 1,
        prevIconName: 'iconyouhuiquan',
        nextIconName: 'iconright',
        branchName: '累计收益 （元）',
        price:'100.00',
        branch: 'inCome'
      }
    ]
  },
  tabSelect(e) {
    this.setData({
      TabCur: getDataset(e,'id'),
      scrollLeft: (getDataset(e,'id') - 1) * 60
    })
  },
  tabSelect2(e) {
    this.setData({
      TabCur2: getDataset(e,'id'),
      scrollLeft2: (getDataset(e,'id') - 1) * 60
    })
  },
  enterIncomeDetail(){
    wx.navigateTo({url: '/pages/userBranch/inComeDetail/inComeDetail?type=inCome'})
  },
  enterWithdrawalDetail(e){
    let branch = getDataset(e,'branch');
    if(branch=='inCome'){
      wx.navigateTo({url: '/pages/userBranch/inComeDetail/inComeDetail?type=inCome'})
    }else if(branch=='withdrawal'){
      wx.navigateTo({url: '/pages/userBranch/inComeDetail/inComeDetail?type=withdrawal'})
    }
  },
  enterToWithdrawal(){
    jump.jump_user_branch('withdrawal');
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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