import ui from '../../../config/ui';
import {
  getDataset,
  chooseImage
} from '../../../process/data';
import {
  get_user_order,
  add_evaluate,
  upLoadFile
} from '../../../process/api';
import {
  wxShowToast,
  wxModal
} from '../../../process/window';
import jump from '../../../process/router';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.addEvaluateBgImage,
    modalName: null,
    evaluateIndex: null,
    orderList: []
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let order_id = options.order_id;
    this.setData({
      order_id
    });
    // 获取订单列表用以遍历评价和订单的数量
    get_user_order(order_id, '', 1).then(res => {
      console.log(res);
      this.setData({
        orderList: res.orderInfoList[0].saas_deal_spus.map(items => {
          return {
            ...items,
            rate: 5,
            content: '',
            imgList: []
          }
        })
      })
    }).catch(err => {
      console.log(err)
    })
  },

  // 点击评分,此时触发捕获阶段，获取点击的评分模板索引
  clickEvaluate(e) {
    wx.showLoading({
      title: '奋力加载中...',
      mask: true
    })
    this.setData({
      evaluateIndex: getDataset(e, 'evaluate_index')
    }, () => {
      wx.hideLoading()
    })
  },
  // 监听模板点击事件，用以改变星星的数量
  clickStar(e) {
    let rate = getDataset(e, 'index') + 1;
    let _target = `orderList[${this.data.evaluateIndex}].rate`;
    this.setData({
      [_target]: rate
    })
  },
  // 监听输入框评价内容
  textareaAInput(e) {
    let _index = getDataset(e, 'content_index');
    let _target = `orderList[${_index}].content`
    let _value = e.detail.value;
    this.setData({
      [_target]: _value
    })
  },
  // 选择要上传的图片
  ChooseImage(e) {
    let _index = getDataset(e, 'index');
    let _this = this;
    let imgList = this.data.orderList[_index].imgList;
    console.log(_index);
    let _target = `orderList[${_index}].imgList`;
    chooseImage().then(res => {
      wx.showLoading({
        title: '上传中...',
        mask: true
      });
      // 获取上传地址的请求队列
      let value = res.tempFilePaths.map(items => {
        return upLoadFile('data:image/png;base64,' + wx.getFileSystemManager().readFileSync(items, 'base64'));
      });
      // 判断已有图片数据长度
      if (imgList.length != 0) {
        console.log(res.tempFilePaths)
        if ((imgList.length + res.tempFilePaths.length) > 4) {
          wxShowToast({ title: '图片上传数量超出上限', duration: 1000 })
          return false
        }
        Promise.all(value).then(res => {
          let _value_ = res.map(items => {
            return items.path
          });
          _this.setData({
            [_target]: imgList.concat(_value_)
          }, () => {
            wx.hideLoading()
          })
        }).catch(() => {
          let _value_ = res.map(items => {
            return 'error'
          });
          _this.setData({
            [_target]: imgList.concat(_value_)
          }, () => {
            wx.hideLoading()
          })
        })
        // let _value_ = value;
        // let length = value.length
        // let exeLength =0
        // for(let i in value){
        //   upLoadFile(value[i]).then(res=>{
        //     _value_[i] = res.path;
        //     exeLength+=1
        //     if(exeLength >=length ){
        //       _this.setData({
        //         [_target]: imgList.concat(_value_)
        //       },()=>{
        //         wx.hideLoading()
        //       })
        //     }
        //   }).catch(err=>{
        //     exeLength+=1
        //     _value_[i] ='erro';
        //     if(exeLength >=length ){
        //       _this.setData({
        //         [_target]:imgList.concat(_value_)
        //       },()=>{
        //         wx.hideLoading()
        //       })
        //     }
        //   })
        // }
      } else {
        Promise.all(value).then(res => {
          let _value_ = res.map(items => {
            return items.path
          });
          _this.setData({
            [_target]: imgList.concat(_value_)
          }, () => {
            wx.hideLoading()
          })
        }).catch(() => {
          let _value_ = res.map(items => {
            return 'error'
          });
          _this.setData({
            [_target]: imgList.concat(_value_)
          }, () => {
            wx.hideLoading()
          })
        })
      }
    }).catch(() => { })
  },
  // 预览上传的图片
  ViewImage(e) {
    let _index = getDataset(e, 'index');
    let imgList = this.data.orderList[_index].imgList;
    let _target = `orderList[${_index}].imgList`;
    let url = getDataset(e, 'url')
    console.log(_index);
    wx.previewImage({
      urls: imgList,
      current: url
    });
  },
  // 删除上传的图片
  DelImg(e) {
    let _index = getDataset(e, 'index');
    let _indexs = getDataset(e, 'indexs');
    let imgList = this.data.orderList[_indexs].imgList;
    let _target = `orderList[${_indexs}].imgList`;
    console.log(_index);
    wxModal({
      content: '确定要删除这张照片吗？',
      confirmText: '确认删除',
    }).then(() => {
      imgList.splice(_index, 1);
      this.setData({
        [_target]: imgList
      })
    }).catch(() => { })
  },

  // 提交表单
  submitEvaluate(e) {
    let fs = wx.getFileSystemManager();
    console.log(this.data.orderList);
    let params = this.data.orderList.map(items => {
      let { id, rate, content, imgList } = items;
      return {
        id,
        rate,
        content,
        imgList
        // imgList.map(item => {
        //   console.log(fs.readFileSync(item,'binary'))
        //   // return 'data:image/png;base64,'+ fs.readFileSync(item,'base64');
        //   // return JSON.stringify(fs.readFileSync(item)) 
        //   return fs.readFileSync(item,'binary');
        // })
      }
    });
    console.log(JSON.stringify(params));

    // fs.readFile({
    //   filePath:this.data.orderList[0].imgList[0],
    //   success(res){
    //     console.log(res)
    //   }
    // });
    setTimeout(() => {
      if (params.find(item => {
        return item.content == ''
      })) {
        wxShowToast({ title: '有商品评价为空哦' })
      } else {
        wx.showLoading({
          title: '提交中...',
          mask: true
        })
        add_evaluate({ params: JSON.stringify(params), order_id: this.data.order_id }).then(res => {
          wx.hideLoading();
          jump.jump_pay_success(this.data.order_id);
        }).catch(err => {
          wx.hideLoading()
          console.log(err)
        })
      }
    }, 300)

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