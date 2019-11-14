import ui from '../../../config/ui';
import { 
  get_user_evaluate
} from '../../../process/api';
import {
  setUserEvaluate,
  getDataset,
  onScrollTopFn,
  lower
} from '../../../process/data'
import jump from '../../../process/router';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    loading: false,
    complete: false,
    bgImage: ui.myEvaluateBgImage,
    isCard:true,
    page:1,
    myEvaluate:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    get_user_evaluate(this.data.page).then(res=>{
      console.log(res);
      this.setData({
        myEvaluate:res.list.length>0?setUserEvaluate(res.list):[]
      })
    }).catch(err=>{
      console.log(err);
    })
  },
  
  enterUser(){
    jump.jump_user()
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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
  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
  },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    lower({
      _this: this,//this
      request: get_user_evaluate,//调用api
      array: [],//传递参数
      key: 'myEvaluate',//处理的数据key值
      fn: setUserEvaluate//需要某种函数进行处理
    });
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
  // enterCommodityDetail(e){
  //   jump.jump_commodity_detail(`goods_id=${getDataset(e,'id')}`)
  // },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})