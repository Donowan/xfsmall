import ui from '../../config/ui';
import {
  get_template_category,
  get_search_template_commodity,
  get_template_category_data
} from '../../process/api';
import {
  lower,
  setTemplateCommodity, getDataset
} from '../../process/data';
import jump from '../../process/router'
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    visual: false,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    baseImgUrl:app.globalData.baseImgUrl,
    topColor:app.globalData.topColor,
    bgImage:ui.sortBgImage,
    loading: false,
    complete: false,
    TabCur: 0,
    viewTop:0,
    MainCur: 0,
    VerticalNavTop: 0,
    load: true,
    id:1,
    page:1,
    list:[],
    swiper:[],
    options:{},
    commodityData:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    wx.showLoading({
      title:'模板加载中...'
    })
    this.setData({
      options
    },()=>{
      let quene = [get_template_category(this.data.options.type),get_template_category_data(this.data.id,this.data.options.type,this.data.page),get_search_template_commodity('护肤',this.data.options.type,this.data.page)];
      Promise.all(quene).then(res=>{ 
        let commodityData = setTemplateCommodity(res[1]);
        let swiper = setTemplateCommodity(res[2].list,Number(this.data.options.type)-1).slice(-4);
        console.log(swiper)
        this.setData({
          commodityData,
          swiper,
          list:res[0].map(data=>{
            let {opt_name,...baseObj} = data;
            return {
              ...baseObj,
              name:opt_name
            }
          }),
          listCur: res[0]
        },()=>{
          wx.hideLoading();
        })
      }).catch(err=>{
        this.setData({
          commodityData:[]
        },()=>{
          wx.hideLoading();
        })
      })
    })
  },
  tabSelect(e) {
    console.log(e);
    wx.showLoading({
      title:'切换类目中...'
    }) 
    this.setData({
      page:1,
      id:e.currentTarget.dataset.sqlid,
      TabCur: e.currentTarget.dataset.id,
      MainCur: e.currentTarget.dataset.id,
      VerticalNavTop: (e.currentTarget.dataset.id - 1) * 50
    },()=>{
      get_template_category_data(this.data.id,this.data.options.type,this.data.page).then(res=>{
        let commodityData = setTemplateCommodity(res);
        this.setData({
          commodityData
        },()=>{
          wx.hideLoading()
        })
      }).catch(()=>{
        this.setData({
          commodityData:[]
        },()=>{
          wx.hideLoading()
        })
      })
    })
  },
  VerticalMain(e) {
    console.log(e.detail.scrollTop);
    let scrollTop = e.detail.scrollTop
    if(scrollTop>500){
      this.setData({
        visual:true
      })
    }else{
      this.setData({
        visual:false
      })
    }
    // let that = this;
    // let list = this.data.list;
    // let tabHeight = 0;
    // if (this.data.load) {
    //   for (let i = 0; i < list.length; i++) {
    //     //使用 this.createSelectorQuery 来代替 wx.createSelectorQuery ，确保在正确的范围内选择节点!!!!!!!!!!!!!!!!!
    //     let view = this.createSelectorQuery().select("#main-" + list[i].id);
    //     view.fields({
    //       size: true
    //     }, data => {
    //       list[i].top = tabHeight;
    //       tabHeight = tabHeight + data.height;
    //       list[i].bottom = tabHeight;     
    //     }).exec();
    //   }
    //   that.setData({
    //     load: false,
    //     list: list
    //   })
    // }
    // let scrollTop = e.detail.scrollTop + 20;
    // for (let i = 0; i < list.length; i++) {
    //   if (scrollTop > list[i].top && scrollTop < list[i].bottom) {
    //     that.setData({
    //       VerticalNavTop: (list[i].id - 1) * 50,
    //       TabCur: list[i].id
    //     })
    //     return false
    //   }
    // }
  },
  enterCommodityDetail(e){
    let goods_id = getDataset(e,'goods_id');
    jump.jump_template_commodity_detail(`goods_id=${goods_id}&type=${Number(this.data.options.type) - 1}`)
  },
  _lower(){
    lower({
      _this: this,//this
      request: get_template_category_data,//调用api
      array: [this.data.id,this.data.options.type],//传递参数
      key: 'commodityData',//处理的数据key值
      fn: setTemplateCommodity,//需要某种函数进行处理
      rows:''
    });
  },
  toTop(e){
    this.setData({
      visual:false,
      viewTop:0
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu()
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})