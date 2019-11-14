// component/donowan/loading/loading.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    loading: {
      type: Boolean,
      value: true
    },
    complete: {
      type: Boolean,
      value: true,
      observer: function(newVal, oldVal) {
        // 属性值变化时执行
      }
    }
  },
  observers: {
    
  } ,
  /**
   * 组件的初始数据
   */
  data: {

  },
  pageLifetimes: {
    
  },

  /**
   * 组件的方法列表
   */
  methods: {

  }
})
