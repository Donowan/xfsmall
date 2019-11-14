import {
  get_specification_data,
  get_sku_data,
  get_goods_data,
  set_cart
} from '../../../process/api';
import {
  getDataset,
  setShopInfoData,
  setSpecification
} from '../../../process/data';
import jump from '../../../process/router';
import {
  wxShowToast
} from '../../../process/window';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    bottomBar: {
      type: String,
      value: 'buy'
    },
    showStepper: {
      type: Boolean,
      value: true
    },
    goods_id: {
      type: [Number, String],
      value: ''
    },
    editData: {
      type: [Object, String],
      value: ''
    }
  },
  lifetimes: {
    ready: function () {
      let goods_id = this.data.goods_id;
      let _editData = this.data.editData;
      let requestQuene = [get_specification_data(goods_id), get_goods_data(goods_id)];
      // console.log(goods_id);
      Promise.all(requestQuene).then(res => {
        // 非单个规格
        let headerInfo = setShopInfoData(res[1].rows[0]);
        console.log(headerInfo);
        this.setData({
          show: true,
          showDoublePrice: false,
          sku_v: _editData ? _editData.edit_sku_id.split('-').slice(0, _editData.edit_sku_id.split('-').length - 1) : [],
          sku_id: _editData ? _editData.sku_id : '',
          cart_id: _editData ? _editData.id : '',
          'cartDetail.cartNum': 1,
          sku_v_list: res[0].sku_v_list,
          'cartDetail.commodityTitle': _editData ? _editData.commodityTitle : headerInfo.commodityTitle,
          'cartDetail.thumbnail': _editData.edit_sku_id ? res[0].sku_v_list[_editData.edit_sku_id].image : headerInfo.thumbnail,
          'cartDetail.price': _editData.edit_sku_id ? res[0].sku_v_list[_editData.edit_sku_id].price : headerInfo.minFinalPrice,
          'cartDetail.original_price': _editData.edit_sku_id ? res[0].sku_v_list[_editData.edit_sku_id].original_price : headerInfo.minPrice,
          'cartDetail.inventory': headerInfo.inventory,
          'cartDetail.maxPrice': _editData.edit_sku_id ? null : headerInfo.maxFinalPrice,
          'cartDetail.original_maxPrice': _editData.edit_sku_id ? null : headerInfo.maxPrice,
          'cartDetail.specification.options': _editData.edit_sku_id ? setSpecification(res[0].sku_info_list, _editData.edit_sku_id) : setSpecification(res[0].sku_info_list)
        }, () => {
          console.log(this.data.cartDetail.specification.options);
          // 单个规格（包括多项规则但是规格只有一种的情况）
          let _options_ = this.data.cartDetail.specification.options;
          let _length_ = _options_.reduce((prev, next) => {
            return prev.option ? prev.option.length : 0 + next.option ? next.option.length : 0
          }, 0);
          if (_length_ <= _options_.length) {
            console.log(_options_);
            if (_options_.length == 1) {
              this.clickTapBtn(0, 0, this);
            } else if (_options_.length == 2) {
              this.clickTapBtn(0, 0, this);
              this.clickTapBtn(1, 0, this);
            }
          }
        })
      }).catch(err => {

      });
      // this.setData({
      //   show: true,
      //   cartDetail: {
      //     thumbnail: '',
      //     commodityTitle: '标题',
      //     price: 200,
      //     salesVolume: 1000,
      //     maxPrice: 400,
      //     inventory: 100,
      //     cartNum: 2,
      //     specification: {
      //       name: '规格',
      //       type: 'specification',
      //       modalName: 'bottomModal',
      //       showCheck: '大包,1000ml',
      //       options: [
      //         {
      //           name: '大小',
      //           option:
      //             [
      //               {
      //                 id: 0,
      //                 mode: '小包',
      //                 checked: false
      //               },
      //               {
      //                 id: 1,
      //                 mode: '中包',
      //                 checked: false
      //               },
      //               {
      //                 id: 2,
      //                 mode: '大包',
      //                 checked: true
      //               }
      //             ],
      //         },
      //         {
      //           name: '容量',
      //           option:
      //             [
      //               {
      //                 id: 0,
      //                 mode: '100ml',
      //                 checked: false
      //               },
      //               {
      //                 id: 1,
      //                 mode: '200ml',
      //                 checked: false
      //               },
      //               {
      //                 id: 2,
      //                 mode: '1000ml',
      //                 checked: true
      //               }
      //             ]
      //         }
      //       ],
      //     }
      //   }
      // })
    }
  },
  /**
   * 组件的初始数据
   */
  data: {
    // 后期请求后台购物车数据
    cartDetail: {},
    show: false,
    isClick: false,//是否点击
    sku_v: [],//规格组合
    sku_id: '',//规则id
    cart_id: ''//购物车id
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _hideModal() {
      this.setData({
        show: false
      }, () => {
        setTimeout(() => {
          this.triggerEvent('hideModalHandle')
        }, 200)
      })
    },
    _preventHide() {
      return
    },
    clickTapBtn(indexs, index, _this) {
      let options = _this.data.cartDetail.specification.options;
      console.log(indexs, index);
      let sku_v = `sku_v[${indexs}]`
      let target = `cartDetail.specification.options[${indexs}].option`
      let _target = options[indexs].option.map((item, _index) => {
        let { checked, ...baseObj } = item;
        return {
          ...baseObj,
          checked: _index == index ? true : false
        }
      })
      console.log(_target);
      // 动态跟新规格id
      _this.setData({
        isClick: true,
        [sku_v]: options[indexs].option[index].id,
        [target]: _target
      }, () => {
        // 检测选中状态
        _this.isCheckSpecification(_this).then(() => {
          const _sku_v = (_this.data.sku_v.join('-') + '-');
          let newSkuInfo = _this.data.sku_v_list[_sku_v]
          console.log(newSkuInfo);
          // 检测商品规格是否存在
          if (newSkuInfo) {
            // 检测商品库存
            if (newSkuInfo.stock_size == 0) {
              _this.setData({
                sku_id: ''
              }, () => {
                wxShowToast({ title: '此种规格的宝贝库存不足哦...' })
              })
            } else {
              // 更新规则
              _this.setData({
                showDoublePrice: true,
                'cartDetail.thumbnail': newSkuInfo.image,
                'cartDetail.price': newSkuInfo.price,
                'cartDetail.original_price': newSkuInfo.original_price,
                'cartDetail.inventory': newSkuInfo.stock_size,
                'cartDetail.maxPrice': null,
                sku_id: newSkuInfo.id
              })
            }
          } else {
            _this.setData({
              sku_id: ''
            }, () => {
              wxShowToast({ title: '此种规则已下架...' })
            })
          }
        }).catch(() => { })

      })
    },
    _clickTapBtn(e) {
      let indexs = getDataset(e, 'indexs');
      let index = getDataset(e, 'index');
      console.log(indexs, index);
      this.clickTapBtn(indexs, index, this);
    },
    _changeCart(e) {
      this.setData({
        'cartDetail.cartNum': e.detail
      })
      console.log('updatePrice...')
    },
    // 确认规格
    _confirmSpecification() {
      this.isCheckSpecification(this).then(res => {
        console.log(this.data)
        console.log('发送数据到后台更新购物车规格..', this.data);
        let _data = this.data;
        // 更新
        set_cart({
          sku_v_id: _data.sku_id,
          count: 1,
          cart_id: _data.cart_id
        }).then(() => {
          // 一种是传递出去，一种是刷新,....
          if (this.data.isClick) {
            this.triggerEvent('confirmSpecificationHandle', {
              params: this.data.cartDetail.specification.options
            });
            wx.redirectTo({
              url: '/pages/myCart/myCart'
            })
          }
        }).catch()
        this._hideModal()
      }).catch(() => {
        wxShowToast({
          title: '请选择好规格~'
        })
      })
    },
    // 检测选择情况
    isCheckSpecification(that) {
      return new Promise((resolve, reject) => {
        let _options = that.data.cartDetail.specification.options;
        var permission;
        _options.forEach((items, index, arr) => {
          console.log(items.option.find(item => {
            return item.checked == false
          }))
          if (items.option.find(item => {
            return item.checked == true
          })) {
            permission = true
          } else {
            permission = false
          }
        })
        if (permission) {
          resolve()
        } else {
          reject()
        }
      })
    },
    // 加入购物车
    _addCart() {
      this.isCheckSpecification(this).then(res => {
        console.log('发送数据到后台更新购物车..');
        //添加购物车请求
        set_cart({
          sku_v_id: this.data.sku_id,
          count: this.data.cartDetail.cartNum
        }).then(res => {
          wxShowToast({ title: '已加入购物车' })
        }).catch(() => {
          this.triggerEvent('awakenHandle')
        })
        this._hideModal();
      }).catch(() => {
        wxShowToast({
          title: '请选择好规格~'
        })
      })
    },

    // 立即购买
    _buyNow() {
      this.isCheckSpecification(this).then(res => {
        console.log(this.data);
        let _data = this.data;
        let _data_ = this.data.sku_v_list[_data.sku_v.join('-') + '-'];
        // 将选择的数据设置到订单确认页面
        let _targetCommodity = [
          {
            goods_id: _data.goods_id,
            cart: [
              {
                cartNum: _data.cartDetail.cartNum,
                title: _data.cartDetail.commodityTitle,
                price: _data.cartDetail.price,
                sku_id: _data.sku_id,
                src: _data_.image,
                sku_v: _data.sku_v.join('-') + '-',
                specification: _data_.name.split(' ').slice(0, _data_.name.split(' ').length - 1)
              }
            ]
          }
        ]
        jump.jump_edit_order(`params=${encodeURIComponent(JSON.stringify(_targetCommodity))}&multiple=false`)
      }).catch(() => {
        wxShowToast({
          title: '请选择好规格~'
        })
      })
    }
  }
})
