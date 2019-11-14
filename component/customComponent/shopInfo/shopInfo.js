import jump from '../../../process/router';
import {
  getDataset
} from '../../../process/data';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    shopInfo:{
      type:Object,
      value:{}
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
    _enterShop(){
      jump.jump_sort()
    },
    _previewDetail(e){
      let url = getDataset(e,'url');
      console.log(url,this.data.shopInfo);
      wx.previewImage({
        current: url, 
        urls: this.data.shopInfo.details.map(item=>{
          return item.image
        })
      })
    }
  }
})
