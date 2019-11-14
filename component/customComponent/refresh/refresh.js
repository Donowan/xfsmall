const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      type: Boolean,
      value: false
    },
    themeColor: {
      type: String,
      value:app.globalData.themeColor
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes: {
   
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
