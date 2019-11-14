import { getDataset } from "../../../process/data";
const app = getApp()
Component({
	/**
	 * 组件的属性列表
	 */
	properties: {
		subsidyItem: {
			type: Array,
			value: ['综合', '佣金', '卷后价','销量','卷值']
		},
		salesVolume: {
			type: String,
			value: '销量'
		},
		coupon: {
			type: String,
			value: '升序排列'
		},
		checked: {
			type: Boolean,
			value: false
		}
	},

	/**
	 * 组件的初始数据
	 */
	data: {
		menuIndex: '',
		subsidyMenuIndex: '0',
		themeColor: app.globalData.themeColor,
		showDialog: false
	},

	/**
	 * 组件的方法列表
	 */
	methods: {
		// 点击主菜单改变索引（综合，销量）
		changeMenuIndex(e) {
			let _data = this.data;
			let menuIndex = getDataset(e, 'index');
			this.setData({
				menuIndex: menuIndex
			})
			if (menuIndex == '0') {
				this.setData({
					showDialog: !_data.showDialog
				})
			} else {
				if (menuIndex == '2') {
					this.setData({
						checked: !_data.checked
					})
				}
				this.setData({
					showDialog: false
				}, () => {
					let params = {
						subsidyIndex: _data.subsidyMenuIndex,
						salesVolume: _data.menuIndex == '1' ? true : false,
						checked: _data.checked
					}
					// 点击销量或者优惠券开关发送出去
					this.triggerEvent('filterHandle', params)
				})
			}
			
		},
		// 点击子菜单改变索引  and   收起dialog 
		changesubsidyMenuIndex(e) {
			let _data = this.data;
			let menuIndex = getDataset(e, 'index');
			this.setData({
				subsidyMenuIndex: menuIndex,
				showDialog: !_data.showDialog
			}, () => {
				let params = {
					subsidyIndex: _data.subsidyMenuIndex,
					salesVolume: _data.menuIndex == '1' ? true : false,
					checked: this.data.checked
				}
				// 点击补贴子菜单发送出去
				this.triggerEvent('filterHandle', params)
			})
		}
	}
})
