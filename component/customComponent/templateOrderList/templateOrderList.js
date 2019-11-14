const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderListData:Array
  },

  /**
   * 组件的初始数据
   */

  data: {
    uid:wx.getStorageSync('allUserInfo').uid,
    themeColor:app.globalData.themeColor
  },
  
  /**
   * 组件的方法列表
   */
  methods: {

  }
})
