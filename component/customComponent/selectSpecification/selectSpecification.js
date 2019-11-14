// component/customComponent/selectSpecification/selectSpecification.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    specification:{
      type:Object,
      value:{}
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    showModal:false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    _checkMode() {
      this.setData({
        showModal: true
      })
    },
    _hideModal(){
      this.setData({
        showModal:false
      })
    },
    _confirmSpecification(e){
      console.log(e);
      let _value =  e.detail.params.reduce((prev,next)=>{
        return prev.concat(next.option)
      },[])
      _value = _value.filter((item)=>{
        return item.checked==true
      }).reduce((_prev,_next)=>{
        return _prev.mode+','+_next.mode
      })
     this.triggerEvent('confirmSpecificationHandle',{
       _value
     })
    }
  }
})
