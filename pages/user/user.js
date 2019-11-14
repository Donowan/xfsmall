import ui from '../../config/ui';
import {
	storage,
	checkPhoneNumber,
	checkUserInfo,
	getDataset
} from '../../process/data';
import {
	cal_order_count,
	updateUserInfo
} from '../../process/api';
const app = getApp();
Page({

	/**
	 * 页面的初始数据
	 */
	data: {
		CustomBar: app.globalData.CustomBar,
		bgImage: ui.userBgImage,
		showUserInfoMation: false,
		calOrderStatus:'',
		information: '',
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
			wx.reLaunch({ url: '/pages/user/user' });
		}
	},
	getUserInfo() {
		wx.reLaunch({ url: '/pages/user/user' });
	},
	awaken() {
		checkPhoneNumber(this, app.globalData.rawData, () => {
			checkUserInfo(this)
		});
	},
	
	/**
	 * 生命周期函数--监听页面显示
	 */
	onShow: function () {
		this.setData({
			showUserInfoMation: wx.getStorageSync('allUserInfo') ? true : false
		});
		if (wx.getStorageSync('allUserInfo')) {
			cal_order_count().then(res=>{
				this.setData({
					calOrderStatus:res
				})
			})
			updateUserInfo(storage).then(()=>{
				this.setData({
					information: wx.getStorageSync('allUserInfo')
				})
			})
		}
	},
	exit(){
		wx.clearStorage()
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