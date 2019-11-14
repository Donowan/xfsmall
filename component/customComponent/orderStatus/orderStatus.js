import jump from '../../../process/router';
import { 
  getDataset
} from '../../../process/data';
import {
	cal_order_count
} from '../../../process/api';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    calOrderStatus:{
      type:[Object,Array,String],
      value:''
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
    _enterOrderList(e){
      let status  = getDataset(e,'status');
      jump.jump_order_list(status)
    },
    _enterTransInfo(){
      jump.jump_trans_info(JSON.stringify({"order_id":"157105591769838401","expressid":"111"}))
    }
  }
})
