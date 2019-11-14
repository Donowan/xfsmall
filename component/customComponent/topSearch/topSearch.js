// component/donowan/topSearch/topSearch.js
import jump from '../../../process/router';
const app = getApp();
Component({
  externalClasses: ['my-class'],
  /**
   * 组件的属性列表
   */
  properties: {
    placeHolder: {
      type: String,
      value: '请粘贴商品标题搜券'
    },
    styles: {
      type: String,
      value: 'border:1rpx solid #999'
    },
    color: {
      type: String,
      value: app.globalData.themeColor
    },
    jumpUrl: {
      type: String,
      value: ''
    }
  },
  // options: {
  //   multipleSlots: true
  // },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    jumpSearch() {
      if (!this.data.jumpUrl) {
        jump.jump_search()
      } else {
        wx.navigateTo({ url: this.data.jumpUrl })
      }
    }
  }
})
