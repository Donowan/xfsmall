// component/customComponent/selectTransMode/selectTransMode.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    transMode: {
      type: Object,
      value: {}
    }
  },
  options: {
    styleIsolation: 'isolated',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的初始数据
   */
  data: {
    showModal: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _hideModal() {
      this.setData({
        showModal: false
      })
    },
    _checkMode() {
      this.setData({
        showModal: true
      })
    },
    _RadioModalRadioChange(e){
      let value = e.detail.value;
      // 传递选中的id以及value
      this.triggerEvent('confirmTransModeHandle',{
        value
      }) 
    }
  }
})
