import {
  getDataset
} from '../../../process/data';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
   showLoginBtn:{
     type:Boolean,
     value:true
   },
   information:{
     type:Object,
     value:{}
   }
  },
  lifetimes:{
    attached(){
      console.log(this.data.information)
    }
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
    _awaken(){
      console.log('1111');
      this.triggerEvent('awakenHandle')
    },
    previewHeadImg(e){
      let url = getDataset(e,'url');
      wx.previewImage({
        current: url,
        urls: [url]
      })
    }
  }
})
