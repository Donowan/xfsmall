// component/customComponent/modal/modal.js
Component({
  options:{
    styleIsolation: 'isolated',
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },
  /**
   * 组件的属性列表
   */
  properties: {
    modalName: {
      type: String,
      value: ''
    },
    modalContent: {
      type: Array,
      value: []
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
    _hideModal() {
      this.triggerEvent('hideModalHandle')
    },
    _confirm(e) {
      console.log(e)
    },
    _RadioModalRadioChange(e) {
      let value = e.detail.value;
      // 传递选中的id以及value
      this.triggerEvent('confirmRadioModalHandle',{
        value
      }) 
    },
    // 阻止默认事件
    _preventHide(){
      return
    }
  }
})
