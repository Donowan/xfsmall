import jump from '../../../process/router';
const app = getApp()
import {
  getDataset
} from '../../../process/data'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderList:{
      type:Array,
      value:[]
    },
     refresh: {
      type: Boolean,
      value: false
    },
    loading: {
      type: Boolean,
      value: false
    },
    complete: {
      type: Boolean,
      value: false
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseImgUrl:app.globalData.baseImgUrl,
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _enterOrderDetail(e){
      jump.jump_order_detail(getDataset(e,'orderid'))
    },
    searchTransInfo(e){
      jump.jump_trans_info(getDataset(e,'expressid'))
    }
  }
})
