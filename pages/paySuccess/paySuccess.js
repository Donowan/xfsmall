import ui from '../../config/ui';
import jump from '../../process/router';
import {
  get_user_order,
  get_goods_data
} from '../../process/api';
import {
  setCommodity,
  lower
} from '../../process/data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.paySuccessBgImage,
    order_id: '',
    page:1,
    loading: false,
    complete: false,
    tip: '',
    // 商品数据
    commodityData: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    get_goods_data('',this.data.page).then(res=>{
      let commodityData = setCommodity(res.rows);
      this.setData({
        commodityData
      })
    }).catch(()=>{
      this.setData({
        commodityData:[]
      })
    })
    this.setData({
      order_id: options.order_id
    }, () => {
      get_user_order(this.data.order_id, '', 1).then(res => {
        // 获取当前订单的状态码
        let curreyOrderStatus = res.orderInfoList[0].order_status;
        console.log(res.orderInfoList[0].order_status);
        if (curreyOrderStatus == 1) {
          this.setData({
            tip: '支付成功'
          })
        } else if (curreyOrderStatus == 3) {
          this.setData({
            tip: '收货成功'
          })
        } else if (curreyOrderStatus == 4) {
          this.setData({
            tip: '评价成功'
          })
        } else if (curreyOrderStatus == 12) {
          this.setData({
            tip: '申请售后成功'
          })
        } else if (curreyOrderStatus == 15) {
          this.setData({
            tip: '取消订单成功'
          })
        }
      }).catch(() => { })
    })
  },
  enterIndex() {
    jump.jump_home()
  },
  enterOrderDetail() {
    jump.jump_order_detail(this.data.order_id)
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
    lower({
      _this: this,//this
      request: get_goods_data,//调用api
      array: [''],//传递参数
      key: 'commodityData',//处理的数据key值
      fn: setCommodity//需要某种函数进行处理
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})