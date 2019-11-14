import {
  getDataset
} from '../../../process/data';
import jump from '../../../process/router';
const app = getApp();
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    layOut:{
      type:String,
      value:"card"
    },
    modelId:{
      type:[String,Number],
      value:''
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
    },
    listData: {
      type: [Array,null],
      value: []
    },
    showTitle: {
      type: Boolean,
      value: true
    },
    title: {
      type: String,
      value: '每周上新'
    },
    image: {
      type: String,
      value: ''
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal: false,
    require_goods_id: '',
    bottomBar: 'addCart',
    baseImgUrl:app.globalData.baseImgUrl
  },
  pageLifetimes: {

  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 添加到购物车
    _addCart(e) {
      this.setData({
        require_goods_id:getDataset(e, "id")
      }, () => {
        this.setData({
          showModal: true
        })
      })
      // this.triggerEvent('showModalForAddCartHandle',{
      //   goods_id:getDataset(e, "id")
      // })
    },
    _awaken(){
      this.triggerEvent('awakenHandle')
    },
    _hideModal() {
      this.setData({
        showModal: false
      })
    },
    // 进入详情页
    _enterCommodityDetail(e) {
      let goods_id = getDataset(e, "goods_id");
      jump.jump_commodity_detail(`goods_id=${goods_id}`)
    },
    _enterActiveList(e){
      let model_id = getDataset(e, "model_id");
      let model = getDataset(e, "model");
      jump.jump_active_list(`model_id=${model_id}&title=${this.data.title}&data=${JSON.stringify(model)}`)
    }
  }
})
