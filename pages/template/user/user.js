import ui from '../../../config/ui';
import {
  wxShowToast
} from '../../../process/window';
import {
  copyText, getDataset,storage
} from '../../../process/data';
import {
  updateUserInfo
} from '../../../process/api';
import jump from '../../../process/router';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    refresh:false,
    CustomBar: app.globalData.CustomBar,
    bgImage: ui.userBgImage,
    personalCardData: '',
    incomeCardData: {
			panelTitle: '我的收益',
			panelTip: '提现相关问题请联系专属客服',
      themeColor: app.globalData.themeColor
    },
    navBarList: [
			{
				navigationBarName: '我的订单',
				branch: 'order',
				type: 'view',
				leftIcon: 'iconorder_icon',
				// leftIcon: 'https://ps.ssl.qhimg.com/dmsmty/74_74_100/t013c5b3055310d62d7.png',
        tagContent: '',
        marginBottom: true
				// borderBottom: true
			},

		
			{
				navigationBarName: '在线客服',
				branch: '',
				type: 'button',
				leftIcon: 'iconlianxikefu',
				// leftIcon: 'https://ps.ssl.qhimg.com/dmsmty/74_74_100/t013c5b3055310d62d7.png',
				tagContent: '',
				// borderBottom: true,
				marginBottom: true
			},

			{
				navigationBarName: '分享邀请',
				branch: '',
				type: 'view',
				leftIcon: 'iconinvite-disease',
				// leftIcon: 'https://ps.ssl.qhimg.com/dmsmty/74_74_100/t013c5b3055310d62d7.png',
				tagContent: '',
				// borderBottom: false,
			}
		]
    // copyWechatPopUpData: {
		// 	id: '0',
		// 	title: '您的专属客服',
		// 	wechatNum: 'w13242793912',
		// 	popUpImg: '/public/images/logo.png',
		// 	tip1: `如有问题请联系`,
		// 	tip2: '专属客服'
		// }
  },
  // 提现轻提示
	answerQuestion() {
    wxShowToast({
      title: '*每月25号后可提现上个月内确认收货的结算收益',
			duration: 2000
    })
  },
  showPop() {
    wxShowToast({
      title: '提现相关问题请联系专属客服',
			duration: 2000
    })
  },
  clickAvatar(e){
    let url = getDataset(e,'url')
    wx.previewImage({
      current: url, 
      urls: [url]
    })
  },
  copyPhoneNum(){
    copyText(this.data.personalCardData.phoneNum,()=>{})
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
    updateUserInfo(storage).then(()=>{
      this.setData({
        personalCardData:{
          headimgurl: wx.getStorageSync('cpsUserInfo').headimgurl,
          nickname:wx.getStorageSync('cpsUserInfo').nickname,
          phoneNum:wx.getStorageSync('cpsUserInfo').phone,
          level:wx.getStorageSync('cpsUserInfo').level,
        },
        incomeCardData:{...wx.getStorageSync('cpsUserInfo').evaluat,...this.data.incomeCardData}
      })
    }).catch(()=>{})
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
   this.setData({
     refresh:true
   },()=>{
    // 更新收益
   })
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