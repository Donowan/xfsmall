const app = getApp();
import ui from '../../config/ui';
import jump from '../../process/router';
import {
  get_user_address,
  add_user_order,
  add_user_order_by_cart,
  add_user_address,
  request_pay
} from '../../process/api';
import {
  setAddressData,
  requestPay
} from '../../process/data';
import {
  wxShowToast
} from '../../process/window';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.editOrderBgImage,
    formData: {
      couponType: '',
      message: ''
    },
    multiple: null,
    address: '',
    orderListData: [],
    calPrice: ''
  },
  changeTextarea(e) {
    console.log(e)
    this.setData({
      'formData.message': e.detail.value
    })
  },
  // 提交订单
  submitOrder() {
    let shipaddressId = this.data.address.id;
    let comment = this.data.formData.message || '';
    if (!shipaddressId) {
      wxShowToast({ title: '请选择收货地址~~~' });
      //这里收货地址要兼容一下，当没有存入数据库的时候没有shipAddrerssId 这个时候应该是可以创建订单的
      return false
    }
    console.log('提交订单并调起支付');
    if (this.data.multiple == 'true') {
      console.log('购物车类型生成订单');
      // 判断购物车类型进来的数量个数，如果单个ruduce失效
      let curreyCart = this.data.orderListData.length > 1 ? this.data.orderListData.reduce((prev, next) => {
        return prev.cart.concat(next.cart);
      }) : this.data.orderListData[0].cart;
      // 获取购物车列表字符串
      let cartIdArr = curreyCart.length > 1 ? curreyCart.reduce((prev, next) => {
        return `${prev},${next.id}`;
      }, 'init').replace('init,', '') : curreyCart[0].id;
      console.log(cartIdArr)
      add_user_order_by_cart({
        cartIdArr,
        shipaddressId,
        comment
      }).then((res) => {
        let _order_id = res.order_id;
        console.log(res);
        request_pay(_order_id).then(res => {
          requestPay(res).then(res => {
            console.log(res);
            // 支付成功
            jump.jump_pay_success(_order_id);
          }).catch(err => {
            // 支付失败
            jump.jump_order_detail(_order_id);
            console.log(err)
          })
        })
      })
    } else {
      console.log('单品购买类型生成订单');
      let skuVId = this.data.orderListData[0].cart[0].sku_id;
      let num = this.data.orderListData[0].cart[0].cartNum;
      add_user_order({
        shipaddressId,
        skuVId,
        num,
        comment
      }).then((res) => {
        let _order_id = res.order_id;
        // 掉起支付接口
        request_pay(_order_id).then(_res => {
          // 调起支付页面
          requestPay(_res).then(res => {
            console.log(res);
            // 支付成功
            jump.jump_pay_success(_order_id);
          }).catch(err => {
            // 支付失败
            jump.jump_order_detail(_order_id);
            console.log(err)
          })
        })
      })
    }

  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(JSON.parse(decodeURIComponent(options.params)));
    let orderListData = JSON.parse(decodeURIComponent(options.params));
    // 判断购买类型 multiple为false是单个购买
    let multiple = options.multiple;
    console.log(multiple)
    this.setData({
      orderListData,
      multiple
    }, () => {
      if (multiple == 'true') {
        console.log('购物车增加');
        // 判断购物车类型进来的数量个数，如果单个ruduce失效
        let curreyCart = this.data.orderListData.length > 1 ? this.data.orderListData.reduce((prev, next) => {
          return prev.cart.concat(next.cart);
        }) : this.data.orderListData[0].cart;
        console.log(curreyCart);
        // 获取cartIdArr字字符串
        let cartIdArr = curreyCart.length > 1 ? curreyCart.reduce((prev, next) => {
          return `${prev},${next.id}`;
        }, 'init').replace('init,', '') : curreyCart[0].id;
        console.log(cartIdArr);
        let shipaddressId = this.data.address.id || '';
        let comment = this.data.formData.message || ' ';
        let requestQuene = [add_user_order_by_cart(Object.assign({
          isCreate: 0
        }, {
          cartIdArr,
          shipaddressId,
          comment
        }))];
        wx.showLoading({
          title: '计算中...',
          mask: true
        })
        this.setData({
          requestQuene: Object.assign({
            isCreate: 0
          }, {
            cartIdArr,
            shipaddressId,
            comment
          })
        }, () => {
          wx.hideLoading();
          this.initPrice(this, requestQuene);
        })

      } else if (multiple == 'false') {
        console.log('直接购买');
        let orderListData = this.data.orderListData[0].cart;
        let shipaddressId = this.data.address.id || '';
        let skuVId = orderListData[0].sku_id;
        let num = orderListData[0].cartNum;
        let comment = this.data.formData.message || ' ';

        let requestQuene = [add_user_order(Object.assign({
          isCreate: 0
        }, {
          shipaddressId,
          skuVId,
          num,
          comment
        }))];
        wx.showLoading({
          title: '计算中...',
          mask: true
        })
        this.setData({
          requestQuene: Object.assign({
            isCreate: 0
          }, {
            shipaddressId,
            skuVId,
            num,
            comment
          })
        }, () => {
          wx.hideLoading();
          this.initPrice(this, requestQuene);
        })

      }
    });
  },
  // 价格初始化
  initPrice(_this, _requestQuene) {
    Promise.all(_requestQuene).then(res => {
      _this.setData({
        calPrice: res[0]
      })
    }).catch(() => { })
  },
  // 地址初始化
  initAddress(_this, _requestQuene) {
    Promise.all(_requestQuene).then(res => {
      // 地址初始化
      if (res[0].rows[0]) {
        _this.setData({
          address: setAddressData([res[0].rows[0]])[0]
          // setAddressData(res[0].rows.filter(item=>{
          //   return item.isDefault==1
          // }))[0]
        })
      } else {
        _this.setData({
          address: ''
        })
      }

    }).catch(() => { })
  },
  // 跳转到天添加收货地址
  enterAddAddress() {
    jump.jump_add_address(JSON.stringify(this.data.formData));
  },

  // 跳转到选择收货地址
  enterChooseAddress() {
    jump.jump_choose_address(this.data.address && JSON.stringify(this.data.address));
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    wx.hideShareMenu();
  },
  // 运费初始化函数
  _checkFreight(that) {
    if (that.data.requestQuene && that.data.multiple != null) {
      // 如果不是第一次更新
      if (that.data.multiple == 'true') {
        let _requestQuene_ = [add_user_order_by_cart(Object.assign(
          {
            isCreate: 0
          },
          Object.assign(
            {
              ...that.data.requestQuene
            },
            {
              comment: that.data.formData.message
            }
          )
        ))]
        that.initPrice(that, _requestQuene_);
      } else if (that.data.multiple == 'false') {
        let _requestQuene_ = [add_user_order(Object.assign(
          {
            isCreate: 0
          },
          Object.assign(
            {
              ...that.data.requestQuene
            },
            {
              comment: that.data.formData.message,
              shipaddressId: that.data.address.id
            }
          )
        ))]
        that.initPrice(that, _requestQuene_);
      }
    }
  },
  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    console.log('全局地址:', app.globalData.userAddress);
    // 处理页面回退触发show;根据全局选中状态判断是否需要重新请求此数据
    if (!app.globalData.userAddress) {
      // 地址初始化
      this.initAddress(this, [get_user_address()]);
      // 调用运费函数并且初始化
      this._checkFreight(this);
    } else {
      this.setData({
        address: app.globalData.userAddress
      }, () => {
        console.log(app.globalData.userAddress);
        // 判断地址列表是否为空
        // if (this.data.address.id) {
        // 调用运费函数并且初始化
          this._checkFreight(this);
        // }
      })
    }
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