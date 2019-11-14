import jump from '../../../process/router';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bottom: {
      type: Number,
      value: 10
    },
    show: {
      type: Boolean,
      value: true
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    admin: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _enterMyCart() {
      if (!wx.getStorageSync('token')) {
        this.triggerEvent('awakenHandle');
        return false
      }
      // 阻止多次跳转
      if (!this.data.admin) return;
      this.setData({
        admin: false
      }, () => {
        jump.jump_my_cart()
        this.setData({
          admin: true
        })
      })
    }
  }
})
