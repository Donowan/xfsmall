const app = getApp();
import ui from '../../../config/ui';
import {
  getAuthSetting,
  navigateBackField,
  getDataset,
  setAddressData
} from '../../../process/data';
import {
  get_user_address
} from '../../../process/api';
import {
  wxShowToast
} from '../../../process/window';
import jump from '../../../process/router';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.chooseAddressBgImage,
    baseImgUrl:app.globalData.baseImgUrl,
    getAddress: true,
    formData: {},
    addressList: [
      // {
      //   id:0,
      //   name: 'Donowan111',
      //   tel: 51515151,
      //   area: ['天涯海角', '海市蜃楼', '缥缈仙境'],
      //   address: '蓬莱岛'
      // },
      // {
      //   id:1,
      //   name: 'Donowan222',
      //   tel: 51515151,
      //   area: ['天涯海角', '海市蜃楼', '缥缈仙境'],
      //   address: '蓬莱岛'
      // },
      // {
      //   id:2,
      //   name: 'Donowan333',
      //   tel: 51515151,
      //   area: ['天涯海角', '海市蜃楼', '缥缈仙境'],
      //   address: '蓬莱岛'
      // }
    ],
    checkId: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    try {
      let field = JSON.parse(options.field);
      let { id } = field;
      this.setData({
        checkId: id
      });
      app.globalData.checkId = id
    } catch (err) {

    }
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
    let requestQuene = [get_user_address()];
    Promise.all(requestQuene).then(res => {
      console.log(res[0].rows);
      // 地址初始化
      this.setData({
        addressList: res[0].rows && setAddressData(res[0].rows)
      })
    }).catch(() => { })
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
        }, () => {

          navigateBackField('address', _this.data.formData);
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
  chooseAddress(e) {
    app.globalData.checkId = getDataset(e, 'address').id;
    app.globalData.userAddress = getDataset(e, 'address');
    console.log(getDataset(e, 'address'));
    setTimeout(() => {
      navigateBackField('address', getDataset(e, 'address'));
    }, 100)
  },

  enterEditAddress(e) {
    jump.jump_edit_address(JSON.stringify(getDataset(e, 'address')))
  },
  enterAddAdress() {
    jump.jump_add_address('', 'redirectTo')
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