import {
  getDataset
} from '../../../process/data';
import jump from '../../../process/router';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    showMore: {
      type: Boolean,
      value: false
    },
    evaluateData: {
      type: Array,
      value: []
    },
    length:{
      type:[String,Number],
      value:0
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    rate: 3
  },
  lifetimes: {
    ready() {
      console.log(this.data)
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 展开与收起
    _switchEvaluate(e) {
      let index = getDataset(e, 'index');
      let type = getDataset(e, 'type');
      let showAllBtn = `evaluateData[${index}].showAllBtn`;
      let showCloseBtn = `evaluateData[${index}].showCloseBtn`
      this.setData({
        [showAllBtn]: type == 'show' ? false : true,
        [showCloseBtn]: type == 'show' ? true : false
      })
    },
    // 打开所有评价页面
    _enterEvaluateList() {
      let spu_id = this.data.evaluateData[0].spu_id;
      // if(wx.getStorageSync('token')){
      //   jump.jump_user_branch('myEvaluate')
      // }else{
      //   this.triggerEvent('awakenHandle')
      // }
      jump.jump_commodity_evaluate(spu_id)
    },
    _previewEvaluateImage(e){
      let url = getDataset(e,'url');
      console.log(url,this.data);
      wx.previewImage({
        current: url, 
        urls: this.data.evaluateData[0].saas_images.map(item=>{
          return item.image
        })
      })
    }
  }
})

