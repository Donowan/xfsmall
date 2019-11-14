import {
  getDataset,
  requestPay
} from '../../../process/data';
import {
  request_pay,
  confirm_receipt,
  cancel_order
} from '../../../process/api';
import jump from '../../../process/router';
import {
   wxShowToast,
   wxModal
} from '../../../process/window';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderDetail:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    // 去付款
    _payFor(e){
      let _order_id = getDataset(e,'order_id');
      request_pay(_order_id).then(_res => {
        console.log(_res)
        // 调起支付页面
        requestPay(_res).then(res => {
          console.log(res);
          // 支付成功
          jump.jump_pay_success(_order_id);
        }).catch(err => {
          // 支付失败
          wxShowToast({title:'还差一步就可以将宝贝带回家哦~~'})
          console.log(err)
        })
      }).catch(() => { })
    },
    // 取消订单
    _cancelOrder(e){
      let order_id = getDataset(e,'order_id');
      wxModal({
        content: '确认取消订单吗?',
        cancelText: '再想想',
        confirmText: '取消订单',
      }).then(() => {
        cancel_order(order_id).then(res=>{
          // 跳转到取消订单页
          jump.jump_pay_success(order_id)
        })
      }).catch(() => { })
    },
    // 申请退款
    _returnOrder(){
      wxShowToast({title:'开发中...',duration:3000})
    },
    // 确认收货
    _confirmReceipt(e){
      let order_id = getDataset(e,'order_id');
      wxModal({
        content: '确认收货之后钱款将打入商家账户',
        cancelText: '取消',
        confirmText: '确认收货',
      }).then(() => {
        confirm_receipt(order_id).then(res=>{
          // 跳转到订单成功页
          jump.jump_pay_success(order_id)
        })
      }).catch(() => { })
    },
    // 查看物流
    _searchTransInfo(e){
      let expressid = getDataset(e,'expressid');
      let order_id = getDataset(e,'order_id');
      console.log(expressid);
      jump.jump_trans_info(
        JSON.stringify({
          expressid,
          order_id
        })
      )
    },
    // 去评价
    _evaluate(e){
      let order_id = getDataset(e,'order_id');
      jump.jump_add_evaluate(order_id)
    }
  }
})
