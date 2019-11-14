import jump from '../../../process/router';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    _buy(){
      console.log('立即购买');
      if(wx.getStorageSync('token')){
        this.triggerEvent('buyNowHandle')
      }else{
        this.triggerEvent('awakenHandle')
      }
    },
    _addCart(){
      console.log('商品详情页点击加入购物车');
      if(wx.getStorageSync('token')){
        this.triggerEvent('addCartHandle')
      }else{
        this.triggerEvent('awakenHandle')
      }
    },
    _enterShop(){
      jump.jump_sort()
    },
    _enterIndex(){
      jump.jump_home()
    }
  }
})
