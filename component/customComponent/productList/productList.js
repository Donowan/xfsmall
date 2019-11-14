const app = getApp();
// setTimeout(() => { 
//   let _rate = rates.rate[rate];
// },200)


import { getDataset, storage } from '../../../process/data';
import jump from '../../../process/router';

Component({
  externalClasses: ['custom-image', 'custom-right-content-height'],
  /**
   * 组件的属性列表
   */
  properties: {
    productData: {
      type: [Array, null],
      value: []
    },
    showVolum: {
      type: Boolean,
      value: true
    },
    shopIcon: {
      type: String,
      value: 'title_tag_icon'
    },
    isPhoneNumber: {
      type: Boolean,
      value: false
    },
    hideShopName: {
      type: Boolean,
      value: true
    },
    showSale: {
      type: Boolean,
      value: true
    },
    type: {
      type: [Number, String],
      value: 1//1拼多多2京东
    }
  },
  pageLifetimes: {
    show: function () {
      storage('get', { key: 'phoneNumber' }).then(res => {
        if (res.data) {
          this.setData({
            isPhoneNumber: true,

          })
        }
      }).catch(() => {

      })
    },
  },
  lifetimes: {
    detached: function () {
      this.setData({
        productData: []
      })
    },
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
    enterCommodityDetail(e) {
      console.log(this.data.type);
      let goods_id = getDataset(e, 'commodity');
      jump.jump_template_commodity_detail(`goods_id=${goods_id}&type=${this.data.type}`)
      // storage('get', { key: 'phoneNumber' }).then(res => {
      // if (res.data) {
      // jump.jump_template_commodity_detail(`goods_id=${goods_id}&type=${this.data.type}`)
      // } else {
      // console.log('未授权点击')
      // this.triggerEvent('awakenHandle')
      // }
      // }).catch(() => {

      // })


    },
    showGetUserInfoDialog() {
      // 处理切换页面瞬间点击问题
      console.log('未授权点击')
      this.triggerEvent('awakenHandle')
    }
  }
})
