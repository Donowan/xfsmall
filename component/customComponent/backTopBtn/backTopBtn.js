
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 控制显示与隐藏
    visual:{
      type:Boolean,
      value:false
    },
    isScrollView:{
      type:Boolean,
      value:false
    },
    icon:{
      type:String,
      value:'/public/images/top.png'
    },
    // 控制到底部的距离
    bottom:{
      type:[String,Number],
      value:30
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
    _scrollToTop() {
      if (wx.pageScrollTo) {
        if(this.data.isScrollView){
          this.triggerEvent('toTopHandle')
        }
        wx.pageScrollTo({
          scrollTop: 0,
          duration: 500
        })
      } else {
        wx.showModal({
          title: '提示',
          content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
        })
      }
    }
  }
})
