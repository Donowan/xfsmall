import jump from '../../../process/router';
import {
  wxShowToast
} from '../../../process/window';
import {
  getDataset
} from '../../../process/data';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    iconList: {
      type: Array,
      value: []
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    gridCol: 5
  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 进入更多分类
    _enterSort(e) {
      let item = getDataset(e, 'item');
      let _id = getDataset(e, 'id');
      //  当id为0跳到主分类
      if (_id == 0) {
        jump.jump_sort()
      } else {
        let {body,open_way} = item;
        if(open_way==2){
          // 跳转详情
          jump.jump_commodity_detail(`goods_id=${body.spu_id}`)
        }else if(open_way==4){
          // 跳转某种分类
          jump.jump_active_list(`kind_id=${body.kind_id}&title=${item.name}`)
        }
      }
    },
  }
})
