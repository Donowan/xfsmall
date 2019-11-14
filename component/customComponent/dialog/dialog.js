import jump from '../../../process/router';
import { login, get_phone_number, login_by_wx,get_user_address } from '../../../process/api';
import { storage,setAddressData } from '../../../process/data';
import {
	wxShowToast
} from '../../../process/window';

const app = getApp();
setTimeout(() => {

}, 100)
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		title: {
			type: String,
			value: '授权之后可以体验更多功能哦~'
		},
		type: {
			type: String,
			value: 'getUserInfo'
		},
		show: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		themeColor: app.globalData.themeColor
	},
	options: {
		multipleSlots: true
	},
	pageLifetimes: {
		show: function () {
			let _data = this.data;
			// // console.log(_data)
			this.setData({
				show: _data.show,
				title: _data.title,
				type: _data.type
			})
		},
		hide: function () {
			wx.hideToast();
		},
	},
	/**
	 * 组件的方法列表
	 */
	methods: {
		closeDialog(that) {
			that.setData({
				show: false
			}, () => {
				wxShowToast({ title: '授权之后才可以体验更多的功能' })
			})
		},
		_closeDialog() {
			this.closeDialog(this)
		},
		getInfo(event) {
			if (this.data.type == 'getUserInfo') {
				if (event.detail.userInfo) {
					login_by_wx(app.globalData.session_key, event.detail, app.globalData.p_id ? app.globalData.p_id : ' ').then(response => {
						console.log(response);
						// 处理成功的
						this.setData({
							show: false
						})
						Promise.all([storage('set', {
							key: 'allUserInfo',
							data: response.userInfo
						}),
						storage('set', {
							key: 'cpsUserInfo',
							data: response.cpsUserInfo
						}),
						storage('set', {
							key: 'rate',
							data: wx.getStorageSync('rates')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'rate2',
							data: wx.getStorageSync('rates2')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'rate3',
							data: wx.getStorageSync('rates3')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'rate4',
							data: wx.getStorageSync('rates4')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'phoneNumber',
							data: response.userInfo.phone
						}),
						storage('set', {
							key: 'token',
							data: response.token
						})]).then(() => {
							get_user_address().then(res => {
								if (res.rows.length > 0) {
									app.globalData.userAddress = setAddressData(res.rows)[0] || ''
								}
								this.triggerEvent('onGetInfoHandle', response)
							})
						})

					}).catch(err => {
						// console.log(err);
						if (err.code == 102) {
							//测一下102

							// login().then(data => {
							login_by_wx(app.globalData.session_key, event.detail, app.globalData.p_id ? app.globalData.p_id : ' ').then((response) => {
								this.setData({
									show: false
								})
								Promise.all([storage('set', {
									key: 'allUserInfo',
									data: response.userInfo
								}),
								storage('set', {
									key: 'cpsUserInfo',
									data: response.cpsUserInfo
								}),
								storage('set', {
									key: 'rate',
									data: wx.getStorageSync('rates')[response.cpsUserInfo.level]
								}),
								storage('set', {
									key: 'rate2',
									data: wx.getStorageSync('rates2')[response.cpsUserInfo.level]
								}),
								storage('set', {
									key: 'rate3',
									data: wx.getStorageSync('rates3')[response.cpsUserInfo.level]
								}),
								storage('set', {
									key: 'rate4',
									data: wx.getStorageSync('rates4')[response.cpsUserInfo.level]
								}),
								storage('set', {
									key: 'phoneNumber',
									data: response.userInfo.phone
								}),
								storage('set', {
									key: 'token',
									data: response.token
								})]).then(() => {
									get_user_address().then(res => {
										if (res.rows.length > 0) {
											app.globalData.userAddress = setAddressData(res.rows)[0] || ''
										}
										this.triggerEvent('onGetInfoHandle', response)
									})
								})

							}).catch(err => {

							})

						}
					})
				} else {
					// 处理拒绝授权
					this.closeDialog(this)
				}
			} else {
				if (event.detail.iv) {
					// 这里等待接口处理用户手机号码数据
					get_phone_number(event.detail.iv, event.detail.encryptedData, app.globalData.session_key, app.globalData.openid, app.globalData.p_id ? app.globalData.p_id : ' ').then(response => {
						console.log(response)
						this.setData({
							show: false
						});
						Promise.all([storage('set', {
							key: 'allUserInfo',
							data: response.userInfo
						}),
						storage('set', {
							key: 'cpsUserInfo',
							data: response.cpsUserInfo
						}),
						storage('set', {
							key: 'rate',
							data: wx.getStorageSync('rates')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'rate2',
							data: wx.getStorageSync('rates2')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'rate3',
							data: wx.getStorageSync('rates3')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'rate4',
							data: wx.getStorageSync('rates4')[response.cpsUserInfo.level]
						}),
						storage('set', {
							key: 'phoneNumber',
							data: response.userInfo.phone
						}),
						storage('set', {
							key: 'token',
							data: response.token
						})]).then(() => {
							get_user_address().then(res => {
								if (res.rows.length > 0) {
									app.globalData.userAddress = setAddressData(res.rows)[0] || ''
								}
								this.triggerEvent('onGetInfoHandle', response)
							})
						})
					}).catch(err => {
						// console.log(err);
						// 用户信息写入失败
						if (err.code == 103) {
							// 处理多次show
							app.globalData.rawData = event.detail;
							this.setData({
								show: false
							})
							// 调起用户信息授权窗口
							this.triggerEvent('onGetInfoHandle', err);
						} else if (err.code == 102) {
							//测一下102
							login().then(data => {
								app.globalData.session_key = data.session_key;
								app.globalData.openid = data.openid;
								get_phone_number(event.detail.iv, event.detail.encryptedData, data.session_key, data.openid, app.globalData.p_id ? app.globalData.p_id : ' ').then((response) => {
									// console.log(response);
								}).catch(err => {
									if (err.code == 103) {
										// 处理多次show
										app.globalData.rawData = event.detail
										this.setData({
											show: false
										})
										this.triggerEvent('onGetInfoHandle', err);
									}
								})
							})
						}
					})
				} else {
					// 处理拒绝授权
					this.closeDialog(this)
				}
			}
		}
	}
})
