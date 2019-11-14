import path from '../config/env';
import {
	wxShowToast
} from '../process/window';

const { REQUEST_HOST } = path;

export const http = function (params) {
	let { url = '', data = null, method = 'get', token = '', contentType = 'application/x-www-form-urlencoded', loading = true, showToast = true } = params
	return new Promise((resolve, reject) => {
		if (loading) {
			wx.showLoading({
				title: '火速加载...',
				mask: true
			})
		}
		wx.request({
			url: REQUEST_HOST + url,
			data,
			method,
			header: {
				'content-type': contentType,
				'token': token ? token : ''
			},
			success: function (res) {
				let _data = res.data;
				if (loading) {
					wx.hideLoading()
				}
				if (_data.code == '200') {
					resolve(_data.data);
				} else {
					reject(_data);

					if (_data.code == 5 || _data.code == 1) {
						wx.removeStorageSync('allUserInfo');
						wx.removeStorageSync('phoneNumber');
						wx.removeStorageSync('token');
						wx.reLaunch({
							url: '/pages/login/login?finish=true'
						})
					} else if(_data.code==401){

					}else {
						if (showToast) {
							wxShowToast({
								title: _data.message
							})
						}
					}
				}
			},
			fail: function (err) {
				if (loading) {
					wx.hideLoading();
				}
				// 处理超时或者失败的情况
				wxShowToast({
					title: '网络错误...'
				})
				reject(err);
			}
		})
	})
}