import ui from '../../config/ui';
import jump from '../../process/router';
import { getDataset, storage } from '../../process/data';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityData: [],
    inputValue: '',
    bgImage:ui.searchBgImage,
    searchRecord:[],
    copyText:''
  },
  // 标签触发搜索按钮
  enterSearchDetal(e) {
    let tagTrigger = getDataset(e, 'keywords');
      jump.jump_searchDetail(`keyWords=${tagTrigger}`);   
  },
  // 触发联想功能
  // associate(e) {
  //   console.log(e.detail.value);
  //   this.setData({
  //     inputValue: e.detail.value
  //   })
  // },
  removeStorage() { 
    storage('remove', { key: 'searchRecord', data: [] }).then(() => { 
      this.setData({
        searchRecord:[]
      })
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
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
    let _this = this;
    storage('get', { key: 'searchRecord', data: [] }).then((res) => { 
      this.setData({
        searchRecord : Array.from(new Set(res.data))
      })
    }).catch(()=>{
      this.setData({
        searchRecord:[]
      })
    })
    wx.getClipboardData({
      success(res) {
        console.log(res)
        let copyText = res.data;
        _this.setData({
          copyText
        })
      }
    })
  },
  copyText(){
    this.setData({
      inputValue:this.data.copyText
    })
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
    return {
      title: `${wx.getStorageSync('allUserInfo').nickname} 邀请您使用`,
      path: `/pages/index/index?pid=${wx.getStorageSync('allUserInfo').uid}`,
      imageUrl: '/public/images/shareLogo.png'
    }
  }
})