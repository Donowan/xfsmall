const app = getApp();
import ui from '../../../config/ui';
import {
  wxShowToast
} from '../../../process/window';
import {
  edit_user_address,
  delete_user_address
} from '../../../process/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.editAddressBgImage,
    formData: {}
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let field = JSON.parse(options.field);
      this.setData({
        formData: field
      })
    } catch (err) {

    }
  },

  edit_user_address_fn(data, setDefault) {
    let _quene = setDefault ? edit_user_address(data, true) : edit_user_address(data);
    _quene.then(() => {
      wxShowToast({
        title: '保存成功'
      })
    }).catch(() => {
      wxShowToast({
        title: '保存失败'
      })
    })
  },
  // 提交表单保存地址
  saveAddress(e) {
    console.log(e.detail.target);
    // 调用编辑地址接口
    if(e.detail.target.dataset.type=='stop'){
      // 设置为默认地址并且保存
      this.edit_user_address_fn(Object.assign(this.data.formData, e.detail.value),true);
    }else{
      this.edit_user_address_fn(Object.assign(this.data.formData, e.detail.value));
    }
    
    wx.navigateBack();
  },
  // 删除地址
  deleteAddress() {
    delete_user_address(this.data.formData.id).then(() => {
      console.log(app.globalData.checkId);
      // 如果删除的id跟checkID一致清空全局选中地址
      if(app.globalData.checkId==this.data.formData.id){
        app.globalData.userAddress='';
        app.globalData.checkId=''
      }
      wxShowToast({
        title: '删除成功'
      });
    }).catch(() => {
      wxShowToast({
        title: '删除失败'
      });
    })

    wx.navigateBack()
  },

  // 省市区的重新选择
  regionChange(e) {
    console.log(e);
    this.setData({
      'formData.area': e.detail.value
    })
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

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})