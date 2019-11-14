import ui from '../../../config/ui';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    bgImage: ui.incomeBgImage,
    moneyNum: null
  },
  inputedit(event) {
    this.setData({
      moneyNum: this.money(event.detail.value)  //money匹配金额输入规则，返回输入值
    });
  },

  money(val) {
    let num = val.toString(); //先转换成字符串类型
    if (num.indexOf('.') == 0) { //第一位就是 .
      num = '0' + num
    }
    num = num.replace(/[^\d.]/g, "");  //清除“数字”和“.”以外的字符
    num = num.replace(/\.{2,}/g, "."); //只保留第一个. 清除多余的
    num = num.replace(".", "$#$").replace(/\./g, "").replace("$#$", ".");
    num = num.replace(/^(\-)*(\d+)\.(\d\d).*$/, '$1$2.$3'); //只能输入两个小数
    if (num.indexOf(".") < 0 && num != "") {
      num = parseFloat(num);
    }
    return num
  },
  enterWithdrawalStatus(){
    wx.navigateTo({url: '/pages/userBranch/withdrawalStatus/withdrawalStatus'})
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

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