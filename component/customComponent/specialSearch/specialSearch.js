import jump from '../../../process/router';
import { storage ,getUrlGoodsId} from '../../../process/data';
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    searchType: {
      type: String,
      value: ''
    },
    inputValue: {
      type: String,
      value: ''
    }
  },
  options: {
    multipleSlots: true // 在组件定义时的选项中启用多slot支持
  },

  /**
   * 组件的初始数据
   */
  data: {
    inputValue:''
  },
  pageLifetimes: {
    hide: function() {
      this.setData({
        inputValue:''
      })
    }
  },
  /**
   * 组件的方法列表
   */
  methods: {
    // 触发搜索按钮
    enterSearchDetal(e) {
      let _inputValue = this.data.inputValue.replace(/\s{2,}/g," ");
      if (_inputValue == ' ' || _inputValue=='') return;
      if (this.data.searchType == 'jump') {
        let inputValue = this.data.inputValue;
        if(getUrlGoodsId(inputValue)=='000'){
          jump.jump_special_search_detail(`keyWords=${inputValue}&type=pdd`);
        }else{
          jump.jump_special_search_detail(`keyWords=${'skuid_'+getUrlGoodsId(inputValue).split('-')[0]}&type=${getUrlGoodsId(inputValue).split('-')[1]}`);
        }
      } else { 
        this.triggerEvent('searchHandle', {keyWord:this.data.inputValue})
      }
      storage('get', { key: 'specialSearchRecord', data: [] }).then(res => {

        let preRecord = res.data;
        let record = [this.data.inputValue, ...preRecord];

        // console.log(preRecord);
        storage('set', { key: 'specialSearchRecord', data: record }).then(res => {
          this.setData({ inputValue: '' })
        })
      }).catch(()=>{
        let preRecord = [];
        let record = [this.data.inputValue, ...preRecord];

        // console.log(preRecord);
        storage('set', { key: 'specialSearchRecord', data: record }).then(res => {
          this.setData({ inputValue: '' })
        })
      })
    },
    // 触发联想功能
    associate(e) {
      // console.log(e.detail.value);
      this.setData({
        inputValue: e.detail.value
      })
    },
  }
})
