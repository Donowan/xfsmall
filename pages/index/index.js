const app = getApp();
import ui from '../../config/ui';
import {
  getDataset,
  onScrollTopFn,
  setIconListData,
  setSwiperData,
  setCommodity,
  lower,
  checkUserInfo,
  checkPhoneNumber
} from '../../process/data';
import {
  get_index_kind,
  get_image_data,
  get_goods_data,
  get_all_template
} from '../../process/api';

Page({

  /**
   * 页面的初始数据
   */
  data: {
    require_goods_id: '',//选择的动态商品goods_id
    loading: false,
    complete: false,
    bgImage: ui.indexBgImage,
    baseImgUrl: app.globalData.baseImgUrl,
    visual: false,
    topColor: app.globalData.topColor,
    CustomBar: app.globalData.CustomBar,
    page: 1,
    scrollHeight: wx.getSystemInfoSync().windowHeight,
    // 规格弹窗
    // showModal: false,
    // 弹窗形式
    // bottomBar: 'addCart',
    // 轮博数据
    swiperList: [
      {
        id: 0,
        type: 'image',
        url: 'https://img.alicdn.com/tps/TB1j6iUMXXXXXapXFXXXXXXXXXX-750-318.jpg'
      }, {
        id: 1,
        type: 'image',
        url: 'https://img.alicdn.com/tps/i4/TB1Sa_HbEH1gK0jSZSySuttlpXa.jpg_240x240q90.jpg',
      }, {
        id: 2,
        type: 'image',
        url: 'https://img.alicdn.com/tps/i4/TB1wHWpHxYaK1RjSZFnSuu80pXa.jpg_240x240q90.jpg'
      }, {
        id: 3,
        type: 'image',
        url: 'https://gw.alicdn.com/bao/uploaded/i4/1122110005/O1CN017sjr091BuKXBCggp5_!!1122110005.jpg_180x180xz.jpg_.webp'
      }, {
        id: 4,
        type: 'image',
        url: 'https://gw.alicdn.com/bao/uploaded/i2/690679191/O1CN018BgJuc2HlWnGv8mlG_!!690679191.jpg_180x180xz.jpg_.webp'
      }, {
        id: 5,
        type: 'image',
        url: 'https://gw.alicdn.com/bao/uploaded/i3/1792267209/O1CN01rWeNNu237lmlyX6rl_!!1792267209.jpg_180x180xz.jpg_.webp'
      }, {
        id: 6,
        type: 'image',
        url: 'https://gw.alicdn.com/bao/uploaded/i2/59887686/O1CN0188KyI326eEi54jvDk_!!59887686.jpg_180x180xz.jpg_.webp'
      }
    ],

    // 标签列表数据
    iconList: [
      {
        kind_id: 1,
        name: '服装',
        image: 'https://img.alicdn.com/tps/TB1j6iUMXXXXXapXFXXXXXXXXXX-750-318.jpg'
      }, {
        kind_id: 2,
        name: '数码',
        image: 'https://img.alicdn.com/tps/i4/TB1Sa_HbEH1gK0jSZSySuttlpXa.jpg_240x240q90.jpg',
      }, {
        kind_id: 3,
        name: '厨卫',
        image: 'https://img.alicdn.com/tps/i4/TB1wHWpHxYaK1RjSZFnSuu80pXa.jpg_240x240q90.jpg'
      }, {
        kind_id: 4,
        name: '玩具',
        image: 'https://gw.alicdn.com/bao/uploaded/i4/1122110005/O1CN017sjr091BuKXBCggp5_!!1122110005.jpg_180x180xz.jpg_.webp'
      }, {
        kind_id: 1,
        name: '生鲜',
        image: 'https://img.alicdn.com/tps/TB1j6iUMXXXXXapXFXXXXXXXXXX-750-318.jpg'
      }, {
        kind_id: 2,
        name: '日用',
        image: 'https://img.alicdn.com/tps/i4/TB1Sa_HbEH1gK0jSZSySuttlpXa.jpg_240x240q90.jpg',
      }, {
        kind_id: 3,
        name: '女装',
        image: 'https://img.alicdn.com/tps/i4/TB1wHWpHxYaK1RjSZFnSuu80pXa.jpg_240x240q90.jpg'
      }, {
        kind_id: 4,
        name: '男装',
        image: 'https://gw.alicdn.com/bao/uploaded/i4/1122110005/O1CN017sjr091BuKXBCggp5_!!1122110005.jpg_180x180xz.jpg_.webp'
      }, {
        kind_id: 1,
        name: '时尚',
        image: 'https://img.alicdn.com/tps/TB1j6iUMXXXXXapXFXXXXXXXXXX-750-318.jpg'
      }, {
        kind_id: 2,
        name: '手表',
        image: 'https://img.alicdn.com/tps/i4/TB1Sa_HbEH1gK0jSZSySuttlpXa.jpg_240x240q90.jpg',
      }, {
        kind_id: 3,
        name: '化妆',
        image: 'https://img.alicdn.com/tps/i4/TB1wHWpHxYaK1RjSZFnSuu80pXa.jpg_240x240q90.jpg'
      }, {
        kind_id: 4,
        name: '游戏',
        image: 'https://gw.alicdn.com/bao/uploaded/i4/1122110005/O1CN017sjr091BuKXBCggp5_!!1122110005.jpg_180x180xz.jpg_.webp'
      }
    ],
    // 商品数据
    commodityData: [
      {
        model: {
          id: 1,
          short_title: '1111'
        },
        data: [
          {
            goods_id: 1,
            src: "https://t00img.yangkeduo.com/goods/images/2019-04-08/b8984baa8dc130335e41472c36a82676.jpeg",
            title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
            price: 12
          }
        ]
      },
      {
        model: {
          id: 1,
          short_title: '1111'
        },
        data: [
          {
            goods_id: 1,
            src: "https://t00img.yangkeduo.com/goods/images/2019-04-08/b8984baa8dc130335e41472c36a82676.jpeg",
            title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
            price: 12
          }
        ]
      },
      {
        model: {
          id: 1,
          short_title: '1111'
        },
        data: [
          {
            goods_id: 1,
            src: "https://t00img.yangkeduo.com/goods/images/2019-04-08/b8984baa8dc130335e41472c36a82676.jpeg",
            title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
            price: 12
          }
        ]
      }

    ],
    allCommodity: [{
      data: [
        {
          goods_id: 0,
          src: "https://t00img.yangkeduo.com/goods/images/2019-04-26/c793921865811cd8092398c111bfe80a.jpeg",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 1782
        },
        {
          goods_id: 1,
          src: "https://t00img.yangkeduo.com/goods/images/2019-04-08/b8984baa8dc130335e41472c36a82676.jpeg",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 12
        },
        {
          goods_id: 2,
          src: "https://t01img.yangkeduo.com/images/2018-04-02/e01697f1a8b0710e30e0ed9cdfaf3f71.jpeg",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 122
        },
        {
          goods_id: 3,
          src: "https://t00img.yangkeduo.com/goods/images/2018-08-25/d74cce1599e351809e6caa667c0c5c84.jpeg",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 12872
        },
        {
          goods_id: 4,
          src: "https://t00img.yangkeduo.com/goods/images/2018-12-17/d9f285332276e59a16f4eaa6f8f4fe37.jpeg",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 1822
        },
        {
          goods_id: 5,
          src: "https://gw.alicdn.com/bao/uploaded/i3/1792267209/O1CN01rWeNNu237lmlyX6rl_!!1792267209.jpg_180x180xz.jpg_.webp",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 1282
        },
        {
          goods_id: 6,
          src: "https://gw.alicdn.com/bao/uploaded/i1/903042542/O1CN01f6ikaE1UeHLmDl3cE_!!903042542.jpg_180x180xz.jpg_.webp",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 1228
        },
        {
          goods_id: 7,
          src: "https://img.alicdn.com/imgextra/i1/3793087379/O1CN0124Nd23QX7mb2sEZ_!!0-item_pic.jpg_.webp",
          title: '山野里 山楂条208g/袋 果干蜜饯 休闲零食 儿童零食 休闲食品 开胃零食 怀旧零食 山楂条208g*2袋装',
          price: 0.55
        }
      ]
    }],
    userInFoDialog: {
      title: '为更好体验小程序，请授权个人头像',
      type: 'getUserInfo',
      show: false
    },
    phoneNumberlDialog: {
      title: '点击授权登录即可体验完整功能',
      type: 'getPhoneNumber',
      show: false
    }
  },
  getPhoneNumber(event) {
		let showUserInFo = `userInFoDialog.show`;
		if (event.detail.code == 103) {
			let _this = this;
			setTimeout(() => {
				_this.setData({
					[showUserInFo]: true
				})
			}, 800);
		}
	},
	getUserInfo() {
		
	},

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    if (options.pid) {
      app.globalData.p_id = options.pid;
    }
    if (options.scene) {
      if (!options.scene.split('+')) return;
      const scene = decodeURIComponent(options.scene).split('+');
      let pid = scene[1];
      app.globalData.p_id = pid;
    }
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    if (!wx.getStorageSync('allUserInfo').uid || wx.getStorageSync('cpsUserInfo').level == 1) {
      wx.hideShareMenu()
    }
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    // let requestQuene = [get_image_data(1), get_image_data(2), get_all_template(), get_goods_data('', this.data.page)];
    let requestQuene = [get_all_template(), get_goods_data('', this.data.page)];
    Promise.all(requestQuene).then(res => {
      console.log(res)
      let swiperList = setSwiperData(res[0].swiperList);
      let iconList = setIconListData(res[0].iconList);
      let commodityData = res[0].commodityData.map((_item) => {
        return {
          model: {
            id: _item.id,
            short_title: _item.title,
            image: _item.img_url
          },
          data: setCommodity(_item.spu_info)
        }
      })

      let allCommodity = setCommodity(res[1].rows);
      let _allCommodity = `allCommodity[0].data`
      this.setData({
        swiperList,
        iconList,
        commodityData,
        [_allCommodity]: allCommodity
      })
    }).catch(err => {
      console.log(err)
    });
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

  onPageScroll(e) {
    // 监听回到顶部按钮
    onScrollTopFn(this, e.scrollTop)
  },
  // lower(e) {
  //   // 请求数据
  //   this.setData({
  //     page: this.data.page + 1,
  //     loading: true
  //   }, () => {
  //     get_goods_data('', this.data.page).then(res => {
  //       let allCommodity = res.rows;
  //       let curreyCommodity = [...this.data.allCommodity, ...allCommodity];
  //       this.setData({
  //         loading: false,
  //         allCommodity: curreyCommodity,
  //         complete: false
  //       })
  //     }).catch(() => {
  //       //如果没有更多了
  //       this.setData({
  //         page: this.data.page - 1,
  //         loading: false,
  //         complete: true
  //       })
  //     })
  //   })

  // },
  awaken() {
    checkPhoneNumber(this, app.globalData.rawData, () => {
      checkUserInfo(this)
    });
  },
  // showModalForAddCart(e){
  //   this.setData({
  //     require_goods_id:e.detail.goods_id
  //   },()=>{
  //     this.setData({
  //       showModal: true
  //     })
  //   })
  // },
  // _hideModal() {
  //   this.setData({
  //     showModal: false
  //   })
  // },
  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    lower({
      _this: this,//this
      request: get_goods_data,//调用api
      array: [''],//传递参数
      key: 'allCommodity',//处理的数据key值
      fn: setCommodity//需要某种函数进行处理
    });
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    return {
      title: `${wx.getStorageSync('allUserInfo').user_name} 邀请您使用`,
      path: `/pages/index/index?pid=${wx.getStorageSync('allUserInfo').uid}`,
      imageUrl: `${this.data.baseImgUrl}/shareLogo.png`
    }
  }
})