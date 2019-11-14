const app = getApp();
import { getDataset } from '../../../process/data';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    curreyActive: {
      type: String,
      value: '0'
    },
    tabsHeight: {
      type: Number,
      value: 100
    },
    tabs: {
      type: Array,
      value: []
    },
    styles: {
      type: String,
      value: `color:${app.globalData.themeColor};border-bottom:1rpx solid ${app.globalData.themeColor}`
    }
  },

  /**
   * 组件的初始数据
   */
  pageLifetimes: {

  },
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    changeIndex(e) {
      let index = getDataset(e, 'index');
      // 阻止重复点击
      if (this.data.curreyActive == index) return;
      this.setData({
        curreyActive: index
      }, () => {
        this.triggerEvent('onchange', { index: index })
      })
    }
  }
})
