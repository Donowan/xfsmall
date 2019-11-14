import {
  getDataset,
  calcPrice,
  getValueIndexInObject,
  setCommodity
} from '../../../process/data';
import jump from '../../../process/router';
import {
  update_cart_data,
  delete_cart_data,
  set_cart,
  get_random_goods_data
} from '../../../process/api';
import {
  wxModal,
  wxShowToast
} from '../../../process/window';
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    myCartData: {
      type: [Object, null],
      value: null
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    baseImgUrl: app.globalData.baseImgUrl,
    adminChangeStepper: true,
    commodityData: null
  },
  lifetimes: {
    ready: function () {
      get_random_goods_data().then(res => {
        let commodityData = setCommodity(res.rows);
        this.setData({
          commodityData
        })
      }).catch(() => {
        this.setData({
          commodityData: []
        })
      })
    }
  },
  // 监听购物车总价以及全选
  observers: {
    'myCartData.cartData.**': function (e) {
      let checkAll = true;
      let totalPrice = calcPrice(e);
      console.log(totalPrice);
      if (this.data.myCartData.cartData) {
        this.data.myCartData.cartData.forEach((items, indexs, array) => {
          items.cart.forEach((item, index, array, _this) => {
            if (!item.checked) {
              checkAll = false
            }
          })
        });
      }

      this.setData({
        'myCartData.totalPrice': totalPrice,
        'myCartData.checkAll': checkAll
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 打开编辑规格窗口
    _editSpecification(e) {
      let goods_id = getDataset(e, 'goods_id');
      let info = getDataset(e, 'info');
      console.log(goods_id, info);
      // 将goods_id传达出去请求规格
      this.triggerEvent('editSpecificationHandle', {
        goods_id,
        info
      })
    },

    // 步进器改变购物车和改变购物车选中状态
    _changeCheckStatusOrNumber(e) {
      if (!this.data.adminChangeStepper) return;
      wx.showLoading({
        title: '更改中...',
        mask: true
      })
      console.log(e)
      // 获取点击的goods_id和sku_id
      let goods_id = getDataset(e, 'goods_id');
      let sku_id = getDataset(e, 'sku_id');
      // 获取点击事件带的事件名
      let handle = getDataset(e, 'handle');
      // 获取改变值的两层索引
      let data = getValueIndexInObject(this.data.myCartData, goods_id, sku_id);
      // 获取索要改变的选项
      let targetObject = `myCartData.cartData[${data[0]}].cart[${data[1]}].${handle}`;
      let value = this.data.myCartData.cartData[data[0]].cart[data[1]].checked;
      // 改变购物车的数量或者状态将事件传递出去
      this.setData({
        [targetObject]: handle == "cartNum" ? Number(e.detail) : !value
      }, () => {
        wx.hideLoading();
        if (handle == 'cartNum') {
          // wx.showLoading({
          //   title: '更改中...',
          //   mask: true
          // })
          this.setData({
            adminChangeStepper: false
          })
          let item = getDataset(e, 'item');
          console.log(item);
          set_cart({
            // cart_id:item.id,
            count: item.cartNum,
            sku_v_id: item.sku_id
          }).then(() => {
            this.setData({
              adminChangeStepper: true
            });
            // wx.hideLoading()
          }).catch(() => {
            this.setData({
              adminChangeStepper: true
            });
            // wx.hideLoading()
          })
        }
        this.triggerEvent('updateCartHandle', {
          myCartData: this.data.myCartData
        })
      })
    },

    // 删除按钮改变购物车
    _deleteCart(e) {
      wxModal({
        content: '确认删除吗?',
        cancelText: '再想想',
        confirmText: '删除',
      }).then(() => {
        // 获取点击的goods_id和sku_id
        let goods_id = getDataset(e, 'goods_id');
        let sku_id = getDataset(e, 'sku_id');
        let id = getDataset(e, 'id');
        // 获取改变值的两层索引
        let data = getValueIndexInObject(this.data.myCartData, goods_id, sku_id);
        let curreyCartData = this.data.myCartData.cartData;
        curreyCartData[data[0]].cart.splice(data[1], 1);
        if (curreyCartData[data[0]].cart.length == 0) {
          curreyCartData.splice(data[0], 1)
        }
        // 删除购物车传递事件出去
        this.setData({
          'myCartData.cartData': curreyCartData
        }, () => {
          console.log(this.data.myCartData);
          // 调用删除接口
          delete_cart_data(id);
          this.triggerEvent('updateCartHandle', {
            myCartData: this.data.myCartData
          })
        })
      }).catch(() => { })
    },

    // 购物车全选功能
    _checkAll() {
      let curreyCartData = this.data.myCartData.cartData;
      let _this = this;
      curreyCartData.forEach((items, indexs, array) => {
        items.cart.forEach((item, index, array, _this) => {
          item.checked = !this.data.myCartData.checkAll
        })
      });
      console.log(curreyCartData)
      this.setData({
        'myCartData.cartData': curreyCartData,
        'myCartData.checkAll': !this.data.myCartData.checkAll
      }, () => {
        this.triggerEvent('updateCartHandle', {
          myCartData: this.data.myCartData
        })
      })
    },

    // 购物车删除全部
    _deleteAll() {
      wxModal({
        content: '确认删除全部吗?',
        cancelText: '再想想',
        confirmText: '删除',
      }).then(() => {
        this.setData({
          'myCartData.cartData': []
        })
        delete_cart_data('all');
      }).catch(() => { })
    },

    // 购物车批量删除
    _deleteCheck() {
      // 获取选中商品
      let targetCartData = this.data.myCartData.cartData.map(items => {
        return {
          goods_id: items.goods_id,
          cart: items.cart.filter(item => {
            return item.checked == true
          })
        }
      }).filter(array => {
        return array.cart.length != 0
      })
      console.log(targetCartData);
      let curreyCart = targetCartData.length > 1 ? targetCartData.reduce(function (prev, next) {
        return prev.cart.concat(next.cart);
      }) : targetCartData[0].cart;
      let cartIdArr = curreyCart.length > 1 ? curreyCart.reduce((prev, next) => {
        return `${prev},${next.id}`;
      }, 'init').replace('init,', '') : curreyCart[0].id;
      console.log(cartIdArr);
      delete_cart_data(cartIdArr).then(() => {
        wx.redirectTo({ url: '/pages/myCart/myCart' })
      });
    },

    // 跳转订单确认页
    _enterEditOrder() {
      if (this.data.myCartData.totalPrice == 0) {
        wxShowToast({
          title: '请选择至少一个商品!'
        })
        return false;
      };
      // 将选择的商品传递到订单列表页面
      let targetCartData = this.data.myCartData.cartData.map(items => {
        return {
          goods_id: items.goods_id,
          cart: items.cart.filter(item => {
            return item.checked == true
          })
        }
      }).filter(array => {
        return array.cart.length != 0
      })
      console.log(targetCartData);
      jump.jump_edit_order(`params=${encodeURIComponent(JSON.stringify(targetCartData))}&multiple=true`)
    }
  }
})
