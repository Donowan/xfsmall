import {
  getDataset
} from '../../../process/data';
import jump from '../../../process/router';
Component({
  options: {
    addGlobalClass: true
  },
  /**
   * 组件的属性列表
   */
  properties: {
    evaluate: {
      type: [Array, Object],
      value: []
    },
    clickAvatarType: {
      type: String,
      value: 'preview'
    },
    haveCommodityCard:{
      type:Boolean,
      value:false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    isCard: true
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _previewHeadimg(e) {
      
      if (this.data.clickAvatarType == 'preview') {
        // 预览头像
        let url = getDataset(e, 'url');
        wx.previewImage({
          current: url,
          urls: [url]
        })
      }else{
        // 跳转我的页面
        jump.jump_user()
      }
    },
    _previewImage(e) {
      let url = getDataset(e, 'url');
      let urls = getDataset(e, 'urls');
      console.log(urls)
      wx.previewImage({
        current: url,
        urls: urls.map(item => {
          return item.image
        })
      })
    },
    _enterCommodityDetail(e){
      jump.jump_commodity_detail(`goods_id=${getDataset(e,'id')}`)
    }
  }
})
