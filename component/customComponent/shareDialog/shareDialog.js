const app = getApp();
import {
  getDataset
} from '.././../../process/data'
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    // 弹出菜单
    list:{
      type:[Array,Object],
      value:[
        {
          title:'转发',
          openType:'share',
          color:app.globalData.themeColor
        },
        {
          title:'生成分享海报',
          color:app.globalData.themeColor
        }
      ]
    },
    // 是否需要取消按钮
    showCancel:{
      type:Object,
      value:{
        show:true,
        // 取消按钮颜色
        color:'#000'
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    show: false,
  },
  lifetimes: {
    ready: function () {
      this.setData({
        show: true
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 关闭遮罩层
    _hideModal(e) {
      let tabIndex = getDataset(e,'index') 
      this.setData({
        show: false
      }, () => {
        setTimeout(() => {
          this.triggerEvent('closeShareDialogHandle',{
            tabIndex
          })
        }, 200)
      })
    },
    _preventHide(){
      return
    }
  }
})
