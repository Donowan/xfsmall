import ui from '../../../config/ui';
import {
  get_user_order,
  get_random_goods_data,
  request_pay
} from '../../../process/api';
import {
  setOrderDetail,
  concatObj,
  copyText,
  setCommodity,
  lower,
  requestPay
} from '../../../process/data';
import {
  wxShowToast
} from '../../../process/window'
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.orderDetailBgImage,
    orderDetail: '',
    page:1,
    loading: false,
    complete: false,
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    // 商品数据
    commodityData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    let order_id = options.field;
    get_user_order(order_id, '', 1).then(res => {
      console.log(res)
      let _orderDetail = setOrderDetail(res.orderInfoList);
      this.setData({
        orderDetail: _orderDetail[0]
      })
      console.log(_orderDetail)
    })
    get_random_goods_data().then(res=>{
      let commodityData = setCommodity(res.rows);
      this.setData({
        commodityData
      })
    }).catch(()=>{
      this.setData({
        commodityData:[]
      })
    })
  },
  // 复制订单号
  copyOrderNum() {
    copyText(this.data.orderDetail.order_id, res => { })
  },
  
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    // lower({
    //   _this: this,//this
    //   request: get_goods_data,//调用api
    //   array: [''],//传递参数
    //   key: 'commodityData',//处理的数据key值
    //   fn: setCommodity//需要某种函数进行处理
    // });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})

