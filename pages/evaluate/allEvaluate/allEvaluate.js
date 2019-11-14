import ui from '../../../config/ui';
import { 
  get_evaluate_data
} from '../../../process/api';
import {
  setEvaluate,
  getDataset,
  onScrollTopFn,
  lower
} from '../../../process/data'
// import jump from '../../../process/router';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    loading: false,
    complete: false,
    page:1,
    evaluate:[],
    isCard:true,
    bgImage: ui.allEvaluateBgImage
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.goods_id);
    let goods_id = options.goods_id;
    get_evaluate_data( goods_id,  1 ).then(res=>{
      console.log(res)
      this.setData({
        evaluate:res.list.length>0?setEvaluate(res.list):[]
      })
    }).catch(()=>{})
  },
  // previewImage(e){
  //   let url = getDataset(e,'url');
  //   let urls= getDataset(e,'urls');
  //   console.log(urls)
  //   wx.previewImage({
  //     current: url,
  //     urls: urls.map(item=>{
  //       return item.image
  //     })
  //   })
  // },
  // previewHeadimg(e){
  //   let url = getDataset(e,'url');
  //   wx.previewImage({
  //     current: url,
  //     urls:[url]
  //   })
  // },

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
      request: get_evaluate_data,//调用api
      array: [this.data.evaluate[0].spu_id],//传递参数
      key: 'evaluate',//处理的数据key值
      fn: setEvaluate//需要某种函数进行处理
    });
  },
  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})