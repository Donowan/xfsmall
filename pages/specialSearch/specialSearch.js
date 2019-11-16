import ui from '../../config/ui';
import jump from '../../process/router';
import { getDataset, storage ,getUrlGoodsId} from '../../process/data';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    commodityData: [],
    inputValue: '',
    specialSearchRecord:[],
    copyText:'',
    bgImage:ui.searchBgImage
  },
  // 标签触发搜索按钮
  enterSearchDetal(e) {
    let tagTrigger = getDataset(e, 'keywords');
    console.log(tagTrigger)
    if(getUrlGoodsId(tagTrigger)=='000'){
      jump.jump_special_search_detail(`keyWords=${tagTrigger}&type=pdd`);
    }else{
      jump.jump_special_search_detail(`keyWords=${'skuid_'+getUrlGoodsId(tagTrigger).split('-')[0]}&type=${getUrlGoodsId(tagTrigger).split('-')[1]}`);
    }
    // console.log(tagTrigger);
      
  },
  // 触发联想功能
  // associate(e) {
  //   // console.log(e.detail.value);
  //   this.setData({
  //     inputValue: e.detail.value
  //   })
  // },
  removeStorage() { 
    storage('remove', { key: 'specialSearchRecord', data: [] }).then(() => { 
      this.setData({
        specialSearchRecord:[]
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
    if (!wx.getStorageSync('allUserInfo').uid || wx.getStorageSync('allUserInfo').level == 1) {
      wx.hideShareMenu()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    let _this = this;
    storage('get', { key: 'specialSearchRecord', data: [] }).then((res) => { 
      this.setData({
        specialSearchRecord : Array.from(new Set(res.data))
      },()=>{
        storage('set',{
          key:'specialSearchRecord',
          data:this.data.specialSearchRecord
        })
      })
    }).catch(()=>{
      this.setData({
        specialSearchRecord:[]
      })
    })
    wx.getClipboardData({
      success(res) {
        // console.log(res)
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
      imageUrl: 'https://cdn.hssapp.com.cn/ssdp/imgs/shareLogo.png'
    }
  }
})