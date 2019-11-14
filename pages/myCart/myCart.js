import ui from '../../config/ui';
import {
  get_cart_data,
  update_cart_data
} from '../../process/api';

import {
  setCartData,
  calcPrice,
  concatObj
} from '../../process/data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.myCartBgImage,
    showModal: false,
    page:1,
    editData: {

    },
    myCartData: {
      shopName: '星风尚自营店',
      cartData: null,
      totalPrice: 100,
      checkAll: true
    }
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  // 接收购物车列表组件传递的goods_id进行规格的编辑
  editSpecification(e) {
    console.log(e)
    let info = e.detail.info;
    // 回填编辑内容
    this.setData({
      editData: {
        goods_id: e.detail.goods_id,
        thumbnail: info.src,
        price: info.price,
        commodityTitle: info.title,
        id:info.id,
        sku_id:info.sku_id,
        edit_sku_id:info.sku_v
      }
    }, () => {
      // 阻止异步bug
      this.setData({
        showModal: true
      })
    })
  },

  // 更新购物车数据
  updateCart(e) {
    console.log(e);
  },

  // 接收目前的规格
  _confirmSpecification(e) {
    console.log(e);
    this.setData({
      
    })
  },

  // 隐藏弹窗
  _hideModal() {
    this.setData({
      showModal: false
    })
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
    // if (wx.getStorageSync('token')) {
      get_cart_data({
        page:this.data.page
      }).then(res => {
        console.log(res)
        // 将goods_id作为标识，相同的数据push到cart作为购物车数据
        console.log(setCartData(res))
        let cartData = concatObj(setCartData(res), 'goods_id', 'cart');
        console.log(cartData);
        let totalPrice = calcPrice(cartData);
        this.setData({
          'myCartData.cartData': cartData,
          'myCartData.totalPrice':totalPrice
        })
      }).catch(() => { })
    // } else {
    //   this.setData({
    //     'phoneNumberlDialog.show': true
    //   })
    // }
  },
  // getPhoneNumber(event) {
  //   if (event.detail.userInfo) {
  //     wx.redirectTo({ url: '/pages/myCart/myCart' });
  //   }
  // },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    console.log('...');
    
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