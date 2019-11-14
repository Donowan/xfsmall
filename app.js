import { login,get_template_rate ,get_user_address} from './process/api';
import { storage ,setAddressData} from './process/data';
import path from './config/env';
const {IMG_HOST} = path;
/**
 * 
 *  commodityType//平台类型
 * 0 sass
 * 1 拼多多  
 * 2 京东
 * 3 唯品会
 * 4 苏宁
 * 
 */
App({
  globalData: {
    userAddress:'',//用户选择收货地址
    checkId:'',//用户选择收货地址id
    isConnected: true,
    commodityType:1,//平台类型
    clientInfo:'',
    session_key:'',
    baseImgUrl:IMG_HOST,
    openid:'',
    p_id:'',
    StatusBar:'',
    Custom:'',
    CustomBar:'',
    rawData:'',
    hss_rate:'',
    hss_rate2:'',
    hss_rate3:'',
    hss_rate4:'',
    themeColor:'#ff3600',
    topColor:'#FF7E00',
    themeStyle:"background: rgba(0,0,0,.7);"//后期换成图片加上时间戳
  },
  onLaunch: function (options) {
    if(options.query){
      console.log(options.query);
      console.log('QRcode',decodeURIComponent(options.query.scene).split('+'));
    }
    let _that_ = this;
    login().then(data => {
      this.globalData.session_key = data.session_key;
      this.globalData.openid = data.openid;
      // // console.log(this.globalData)
    })
    // 全局地址初始化
    if(wx.getStorageSync('allUserInfo')){
      get_user_address().then(res=>{
        if(res.rows.length>0){
          this.globalData.userAddress = setAddressData(res.rows)[0] || ''
        }
      })
    }
    // wx.getClipboardData({
    //   success(res) {
    //     that.globalData.clipboardData = res.data;
    //     let goods_id = getUrlGoodsId(that.globalData.clipboardData);
    //     if (that.globalData.clipboardData && wx.getStorageSync('allUserInfo') && wx.getStorageSync('phoneNumber')) {
    //       wx.showModal({
    //         title: '是否搜索已下商品链接',
    //         content: that.globalData.clipboardData,
    //         confirmText: '查看商品',
    //         confirmColor: that.globalData.themeColor,
    //         success(res) {
    //           if (res.confirm) {
    //             get_commodity_detail(goods_id).then(data => {
    //               console.log(Object.keys(data.goodsInfo));
    //               if (Object.keys(data.goodsInfo) != 0) {
    //                 jump.jump_commodityDetail('goods_id=' + goods_id);
    //                 storage('get', { key: 'searchRecord', data: [] }).then(res => {

    //                   let preRecord = res.data ? res.data : [];
    //                   let record = [that.globalData.clipboardData, ...preRecord];
              
    //                   console.log(preRecord);
    //                   storage('set', { key: 'searchRecord', data: record });
    //                   that.globalData.clipboardData = ''
    //                 })
    //               } else {
    //                 wx.showToast({
    //                   icon: 'none',
    //                   title: '您搜索的商品不存在哦~',
    //                   duration: 1000
    //                 });
    //                 that.globalData.clipboardData = ''
    //               }
    //             }).catch(()=>{
    //               that.globalData.clipboardData = ''
    //             });
    //           } else if (res.cancel) {
    //             that.globalData.clipboardData = ''
    //           }
    //         }
    //       })
    //     }
    //   }
    // })
    wx.getSystemInfo({
      success: e => {
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = wx.getMenuButtonBoundingClientRect();
        this.globalData.Custom = custom;  
        this.globalData.CustomBar = custom.bottom + custom.top - e.statusBarHeight;
      }
    })


    // 检测内存溢出
    wx.onMemoryWarning(function () {
      wx.showModal({
        title: '提示',
        content: '微信内存不足，为了更好使用,请重新进入',
      })
    })
    // 检测新版本
    if (wx.canIUse('getUpdateManager')) {
      const updateManager = wx.getUpdateManager();
      updateManager.onCheckForUpdate(function (res) {
        if (res.hasUpdate) {
          updateManager.onUpdateReady(function () {
            updateManager.applyUpdate();
          })
          updateManager.onUpdateFailed(function () {
            // 新版本下载失败
            wx.showModal({
              title: '已经有新版本喽~',
              content: '请您删除当前小程序，到微信 “发现-小程序” 页，重新搜索打开哦~',
            })
          })
        }
      })
    } else {
      //TODO 此时微信版本太低（一般而言版本都是支持的）
      wx.showModal({
        title: '溫馨提示',
        content: '当前微信版本过低，无法使用该功能，请升级到最新微信版本后重试。'
      })
    }
    /**
     * 初次加载判断网络情况
     * 无网络状态下根据实际情况进行调整
     */
    wx.getNetworkType({
      success(res) {
        const networkType = res.networkType
        if (networkType === 'none') {
          _that_.globalData.isConnected = false
          wx.showToast({
            title: '当前无网络',
            icon: 'loading',
            duration: 2000
          })
        }
      }
    });
    /**
     * 监听网络状态变化
     * 可根据业务需求进行调整
     */
    wx.onNetworkStatusChange(function (res) {
      if (!res.isConnected) {
        _that_.globalData.isConnected = false
        wx.showToast({
          title: '网络已断开',
          icon: 'loading',
          duration: 2000,
          complete: function () {
            //根据业务处理,处理断网
          }
        })
      } else {
        _that_.globalData.isConnected = true
        wx.hideToast()
      }
    });
    get_template_rate().then(res => {
      let {config ,firstColumn , icon} = res;
      console.log(res)
      // 处理红松鼠会员等级
      storage('get', {
        key: 'allUserInfo'
      }).then(res => {
        // 获取红松鼠的会员等级
        let rate = wx.getStorageSync('cpsUserInfo').level;
        _that_.globalData.hss_rate = config.pdd_rate;
        _that_.globalData.hss_rate2 = config.jd_rate;
        _that_.globalData.hss_rate3 = config.vip_rate;
        _that_.globalData.hss_rate4 = config.sn_rate;
        wx.setStorageSync('rate', config.pdd_rate[rate]);
        wx.setStorageSync('rates', config.pdd_rate);
        wx.setStorageSync('rate2', config.jd_rate[rate]);
        wx.setStorageSync('rates2', config.jd_rate);
        wx.setStorageSync('rate3', config.vip_rate[rate]);
        wx.setStorageSync('rates3', config.vip_rate);
        wx.setStorageSync('rate4', config.sn_rate[rate]);
        wx.setStorageSync('rates4', config.sn_rate);
      }).catch(err => {
        _that_.globalData.hss_rate = config.pdd_rate;
        _that_.globalData.hss_rate2 = config.jd_rate;
        _that_.globalData.hss_rate3 = config.vip_rate;
        _that_.globalData.hss_rate4 = config.sn_rate;
        wx.setStorageSync('rate', config.pdd_rate[3]);
        wx.setStorageSync('rates', config.pdd_rate);
        wx.setStorageSync('rate2', config.jd_rate[3]);
        wx.setStorageSync('rates2', config.jd_rate);
        wx.setStorageSync('rate3', config.vip_rate[3]);
        wx.setStorageSync('rates3', config.vip_rate);
        wx.setStorageSync('rate4', config.sn_rate[3]);
        wx.setStorageSync('rates4', config.sn_rate);
      })

      // 处理轮博数据
      let swiperList = setTemplateSwiper(firstColumn);
      this.setData({
        swiperList,
        iconList:icon
      })
    }).catch(err => { })
  },
  onHide(){
    console.log('app hide+++++,编写购物车等数据保存更新代码');
    // 此处进行购物车等数据保存更新
  },
  getClienInfo() {
    let _this = this;
    wx.getSystemInfo({
      success(res) {
        _this.globalData.clientInfo = res;
      }
    })
  }
})