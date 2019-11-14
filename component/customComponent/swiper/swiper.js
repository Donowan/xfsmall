import {
  getDataset
} from '../../../process/data';
import jump from '../../../process/router';
import {
  wxShowToast
} from '../../../process/window';

Component({
  /**
   * 组件的属性列表
   */
  properties: {
    swiperList: {
      type: Array,
      value: []
    },
    isCps:{
      type:Boolean,
      value:false
    }
  },
  lifetimes: {
    ready: function () {

    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    cardCur: 0
  },

  /**
   * 组件的方法列表
   */
  methods: {
    cardSwiper(e) {
      this.setData({
        cardCur: e.detail.current
      })
    },
    // 直通车
    _train(e) {
      let item = getDataset(e, 'item');
      console.log(item)
      let {body, open_way } = item;
      if (open_way == 1) {
        // 不跳转的时候预览图片
        wx.previewImage({
          current: item.url, 
          urls: [item.url] 
        })
      } else if (open_way == 2) {
        if(this.data.isCps){
          jump.jump_template_commodity_detail(`goods_id=${body.goods_id}&type=${Number(body.type)-1}`);
        }else{
          jump.jump_commodity_detail(`goods_id=${body.spu_id}`);
        }
      } else if (open_way == 3) {
        wxShowToast({title:'跳转指定页面'})
      }

    },
    // 初始化轮播
    towerSwiper(name) {
      let list = this.data[name];
      for (let i = 0; i < list.length; i++) {
        list[i].zIndex = parseInt(list.length / 2) + 1 - Math.abs(i - parseInt(list.length / 2))
        list[i].mLeft = i - parseInt(list.length / 2)
      }
      this.setData({
        swiperList: list
      })
    }
  }
})
