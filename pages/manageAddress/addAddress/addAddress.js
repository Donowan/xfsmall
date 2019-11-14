const app = getApp();
import ui from '../../../config/ui';
import {
  getAuthSetting,
  navigateBackField
} from '../../../process/data';
import {
  wxShowToast
} from '../../../process/window';
import jump from '../../../process/router';
import {
  add_user_address
} from '../../../process/api';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.addAddressBgImage,
    getAddress: true,
    formData: {
      name: '',
      tel: '',
      area: ['选择省', '市', '区'],
      address: ''
    },
    prePageData: {},
    isDefault:true
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let field = JSON.parse(options.field);
      this.setData({
        prePageData: field
      })
    } catch (err) {

    }

  },
  // 设置为默认地址的按钮的开关
  changeDefaultAddress(e){
    wx.showLoading({
      title:'切换中',
      mask:true
    });
    this.setData({
      isDefault:e.detail.value
    },()=>{
      wx.hideLoading()
    })
  },

  // 获取微信收货地址
  getWechatAddress() {
    let _this = this;
    wx.chooseAddress({
      success(res) {
        console.log(res)
        //成功回调
        _this.setData({
          'formData.name': res.userName,
          'formData.tel': res.telNumber,
          'formData.area': [res.provinceName, res.cityName, res.countyName],
          'formData.address': res.detailInfo
        })
      }, fail() {
        // 处理拒绝授权的情况
        wxShowToast({
          title: '获取失败,请再次点击'
        })
        _this.setData({
          getAddress: false
        })
      }
    })
  },

  // 获取选择的省市区数据
  regionChange(e) {
    this.setData({
      'formData.area': e.detail.value
    })
  },

  // 保存并使用
  saveAddress(e) {
    let submitData = e.detail.value;
    console.log(e)
    this.setData({
      formData: submitData
    }, () => {
      let formData = this.data.formData;
      if (formData.name == '' || formData.tel == '' || formData.address == '' || formData.area[1] == '市') {
        if (formData.name == '') {
          wxShowToast({
            title: '姓名不能为空'
          })
        } else if (formData.tel == '') {
          wxShowToast({
            title: '收货电话不能为空'
          })
        } else if (formData.address == '') {
          wxShowToast({
            title: '地址未填写'
          })
        } else if (formData.area[1] == '市') {
          wxShowToast({
            title: '请选择省市区'
          })
        }
      } else {
        if (!/^(\(\d{3,4}\)|\d{3,4}-|\s)?\d{7,14}$/.test(formData.tel) || !/([0-9]{3,4}-)?[0-9]{7,8}/.test(formData.tel)) {
          wxShowToast({
            title: '手机格式不正确'
          })
        } else {
          wxShowToast({
            title: '保存成功'
          })
          // 请求更新地址数据
          console.log(' 请求更新地址数据');
          add_user_address(this.data.isDefault?this.data.formData:Object.assign({isDefault:0},this.data.formData)).then((res) => {
            let globalUserAddress = [res].map((items)=>{
              return {
                name:items.consignee,
                tel:items.phone,
                address:items.detail,
                area:items.region.split('/'),
                isDefault:items.isDefault,
                id:items.id
              }
            })[0]
            app.globalData.userAddress=globalUserAddress;
            console.log(app.globalData.userAddress)
            setTimeout(()=>{
              // navigateBackField('address', this.data.formData);
              wx.navigateBack()
            },300)
          }).catch(() => { })

        }
      }
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
    getAuthSetting('scope.address').then((res) => {
      console.log(res)
      this.setData({
        getAddress: res
      })
    }).catch((err) => {

    });
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