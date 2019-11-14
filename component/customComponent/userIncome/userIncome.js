import {
  getDataset
} from '../../../process/data';
import {
  wxShowToast
} from '../../../process/window';
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    TabCur: 0,
    dayList: [
      {
        id: 0,
        title: '今日'
      },
      {
        id: 1,
        title: '昨日'
      },
      {
        id: 2,
        title: '七天'
      },
      {
        id: 3,
        title: '30天'
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _changeType(e) {
      this.setData({
        TabCur: e.currentTarget.dataset.id
      })
    },
    _showtip(e) {
      let tip = getDataset(e, 'tip');
      console.log(tip)
      switch (tip) {
        case '0':
          wxShowToast({
            title: '上个月已付款并且有效的订单数',
            duration: 1500
          })
          break;
        case '1':
          wxShowToast({
            title: '上个月已付款并且有效的预估收益',
            duration: 1500
          })
          break;
        case '2':
          wxShowToast({
            title: '上个月已确认收货并且有效的预估收益',
            duration: 1500
          })
          break;
        case '3':
          wxShowToast({
            title: '已付款并且有效的订单数',
            duration: 1500
          })
          break;
        case '4':
          wxShowToast({
            title: '已付款并且有效的订单预估收益',
            duration: 1500
          })
          break;

        case '5':
          wxShowToast({
            title: '已确认收货并且有效的订单预估收益',
            duration: 1500
          })
          break;
        case '00':
          wxShowToast({
            title: '累计从注册到今天下单并且已付款有效订单的预估收益',
            duration: 1500
          })
          break;
      }
    }
  }
})
