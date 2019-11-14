import {
  getDataset
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
    template: {
      type: Array,
      value: [
        {
          id: 0,
          prevIconName: 'icongouwuchezhengpin',
          nextIconName: 'iconright',
          branchName: '购物车',
          branch: 'myCart'
        },
        {
          id: 1,
          prevIconName: 'iconyouhuiquan',
          nextIconName: 'iconright',
          branchName: '优惠券',
          branch: 'coupon'
        },
        {
          id: 2,
          prevIconName: 'iconmembership-card_icon',
          nextIconName: 'iconright',
          branchName: '会员卡',
          branch: 'vipCard'
        }, {
          id: 3,
          prevIconName: 'iconicon-test',
          nextIconName: 'iconright',
          branchName: '我的收货地址',
          branch: 'myAddress'
        },
        {
          id: 4,
          prevIconName: 'iconweibiaoti527',
          nextIconName: 'iconright',
          branchName: '我的评价',
          branch: 'myEvaluate'
        },
        // {
        //   id:5,
        //   prevIconName:'iconshouyi1',
        //   nextIconName:'iconright',
        //   branchName:'我的收益',
        //   branch:'income'
        // },
        {
          id: 5,
          prevIconName: 'iconfenxiaozhongxin',
          nextIconName: 'iconright',
          branchName: '分销中心',
          branch: 'distribution'
        },
        {
          id: 6,
          prevIconName: 'iconbangzhuguanyuwomen',
          nextIconName: 'iconright',
          branchName: '关于我们',
          branch: 'aboutUs'
        },
        
      ]
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
    _enterUserBranch(e) {
      if (wx.getStorageSync('phoneNumber')) {
        let branch = getDataset(e, 'branch');
        if (branch == "myCart") {
          jump.jump_my_cart();
          return false
        }
        jump.jump_user_branch(branch);
      } else {
       this.triggerEvent('awakenHandle')
      }
    }
  }
})
