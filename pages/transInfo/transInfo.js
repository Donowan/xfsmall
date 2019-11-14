import ui from '../../config/ui';
import {
  concatObj,
  copyText,
  getDataset
} from '../../process/data';
import {
  get_user_order
} from '../../process/api';
import jump from '../../process/router';
import {
  wxShowToast
} from '../../process/window';
const app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    baseImgUrl:app.globalData.baseImgUrl,
    bgImage: ui.transInfoBgImage,
    transInfo: '',
    orderDetail: ''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let _this = this;
    // 获取物流单号
    let field = JSON.parse(options.field);
    console.log(field);
    let {
      expressid,
      order_id
    } = field;
    get_user_order(order_id, '', 1).then(res => {
      this.setData({
        orderDetail: res.orderInfoList[0]
      })
    }).catch(err => { })
    console.log(expressid);
    // 模拟
    // let transInfo = {
    //   "status": 1,
    //   "msg": "",
    //   "data": {
    //     "nu": "611107236939827",
    //     "company": "",
    //     "code": "",
    //     "tel": "",
    //     "img": "",
    //     "url": "",
    //     "status": "派送中",
    //     "messages": [
    //       { "context": "【驻马店市】配送员李峰 15286875954正为您派送，感谢您的耐心等待", "time": "2019-10-15 10:50:46" },
    //       { "context": "【驻马店市】您的包裹已到达【驻马店城区站】，准备分配派送员", "time": "2019-10-15 10:50:28" },
    //       { "context": "【驻马店市】您的包裹已从【驻马店中心站JM】发出", "time": "2019-10-15 10:40:49" },
    //       { "context": "【驻马店市】您的包裹已到达【驻马店中心站JM】", "time": "2019-10-15 09:01:41" },
    //       { "context": "干线已揽收：干线司机【刘娟】", "time": "2019-10-15 01:58:32" },
    //       { "context": "【郑州市】您的订单已从【郑州分拨中心】发出", "time": "2019-10-14 23:41:55" },
    //       { "context": "包裹已完成分拨集包", "time": "2019-10-14 23:41:54" },
    //       { "context": "【郑州市】您的订单已进入【郑州分拨中心】，开始分拣", "time": "2019-10-14 23:20:23" },
    //       { "context": "包裹正在等待揽收", "time": "2019-10-14 21:48:02" },
    //       { "context": "包裹已出库", "time": "2019-10-14 21:05:03" },
    //       { "context": "打包完成", "time": "2019-10-14 21:05:02" },
    //       { "context": "打印完成", "time": "2019-10-14 20:22:40" },
    //       { "context": "仓库已接单", "time": "2019-10-14 20:16:16" },
    //       { "context": "商家正在处理您的订单", "time": "2019-10-14 20:16:13" },
    //       { "context": "商品已经下单", "time": "2019-10-14 19:55:04" }
    //     ],
    //     "arriveTime": "承诺今天送达",
    //     "expressMan": "15286875954",
    //     "expressManName": "李峰",
    //     "hasItem": "true",
    //     "source_name": "菜鸟裹裹",
    //     "source_url": "https:\/\/m.guoguo-app.com\/?source=10019857&from=sm"
    //   }
    // };
    // if(expressid.indexOf('YT')==-1){
    // 非圆通
    wx.request({
      url: 'https://api.m.sm.cn/rest',
      data: {
        method: 'kuaidi.getdata',
        sc: 'express_cainiao',
        q: '快递' + expressid,
        callback: 'jsonp2'
      },
      method: 'GET', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
      // header: {}, // 设置请求的 header
      success: function (res) {
        console.log(res.data);
        let _data = res.data.replace('jsonp2(', '');
        let transInfo = JSON.parse(_data.slice(0, _data.length - 2));
        console.log(transInfo, transInfo.data.messages.length);
        if (transInfo.data.messages.length == 0) {
          wxShowToast({ title: '查询不到订单哦,请前往官网查询', duration: 2000 })
          return false
        }
        let _messages = transInfo.data.messages.map(item => {
          let date = item.time.split(' ');
          let day = date[0].split('-').slice(1).join('-');
          let time = date[1]
          return {
            messages: {
              context: item.context,
              time
            },
            day
          }
        })
        console.log(_messages);
        let messages = concatObj(_messages, 'day', 'messages', false);
        transInfo.data.messages = messages;
        _this.setData({ transInfo })
      },
      fail: function () {
        // fail
      }
    })
    // }else{
    //   // 圆通
    //   wx.request({
    //     url: 'http://www.yto.net.cn/api/trace/waybill',
    //     data: {
    //       waybillNo: expressid
    //     },
    //     method: 'POST', // OPTIONS, GET, HEAD, POST, PUT, DELETE, TRACE, CONNECT
    //     header: {
    //       'content-type': 'application/x-www-form-urlencoded'
    //     }, // 设置请求的 header
    //     success: function (res) {
    //       console.log(res.data);
    //       let _data = res.data.data;
    //       let transInfo = _data.map(items=>{
    //         return {

    //         }
    //       })
    //       // console.log(transInfo);
    //       // if(transInfo.data.messages.length=0){
    //       //   wxShowToast({title:'查询不到订单哦',duration:2000})
    //       //   return false
    //       // }
    //       // let _messages = transInfo.data.messages.map(item=>{
    //       //   let date = item.time.split(' ');
    //       //   let day = date[0].split('-').slice(1).join('-');
    //       //   let time = date[1]
    //       //   return{
    //       //     messages:{
    //       //       context:item.context,
    //       //       time
    //       //     },
    //       //     day
    //       //   }
    //       // })
    //       // console.log(_messages);
    //       // let messages = concatObj(_messages,'day','messages',false);
    //       // transInfo.data.messages = messages;
    //       // _this.setData({transInfo})
    //     },
    //     fail: function () {
    //       // fail
    //     }
    //   })
    // }



  },
  // 进入商品详情
  enterComodityDetail(e) {
    let goods_id = getDataset(e, 'goods_id');
    jump.jump_commodity_detail(`goods_id=${goods_id}`)
  },
  // 进入订单详情
  enterOrderDetail(e) {
    let order_id = getDataset(e, 'order_id');
    jump.jump_order_detail(order_id)
  },
  // 复制运单号
  copyExpressid() {
    copyText(this.data.transInfo.data.nu, res => { })
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