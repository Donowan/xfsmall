import ui from '../../../config/ui';
import {
  get_user_address
} from '../../../process/api';
import {
  setAddressData,
  getDataset 
} from '../../../process/data';
import jump from '../../../process/router';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.myAddressBgImage,
    addressList:null,
    baseImgUrl:app.globalData.baseImgUrl
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
    let requestQuene = [get_user_address()];
    Promise.all(requestQuene).then(res => {
      console.log(res[0].rows);
      // 地址初始化
      this.setData({
        addressList: res[0].rows && setAddressData(res[0].rows)
      })
    }).catch(() => { })
  },
  enterEditAddress(e){
    jump.jump_edit_address(JSON.stringify(getDataset(e, 'address')))
  },
  enterAddAdress() {
    jump.jump_add_address('')
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