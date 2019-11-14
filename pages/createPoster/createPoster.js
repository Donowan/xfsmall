const app = getApp();
import ui from '../../config/ui';
import jump from '../../process/router';
import {
  KeepTwoDecimals,
  getElement,
  downLoadImage,
  getImageInfo,
  savePoster,
  saveToPhotosAlbum,
  getAuthSetting,
  textEllipsis,
  drawRoundRect,
} from '../../process/data';
Page({

  /**
   * 页面的初始数据
   */
  data: {
    CustomBar: app.globalData.CustomBar,
    baseImgUrl: app.globalData.baseImgUrl,
    bgImage: ui.editOrderBgImage,
    canvasIndex: 0,
    posterBgImage: [`${app.globalData.baseImgUrl}/posterBg.png`],
    canvasWidth: '',
    canvasHeight: '',
    writePhotosAlbum: true,
    PosterTemporaryFile: '',
    posterImage: [],
    permission: true,
    invite: false,
    options: {}
  },
  // 定义绘制分享小程序函数
  drawMiniProgram(elements) {
    let _that = this;
    wx.showLoading({
      title: '生成中...',
      mask: true
    })
    // 获取节点宽高
    getElement('#' + elements).then(res => {
      let canvasWidth = res.width;
      let canvasHeight = res.height;
      //定义背景图片
      let posterBgImagePath = this.data.posterBgImage[this.data.canvasIndex];
      // 定义头像
      let headImgPath = wx.getStorageSync('allUserInfo').headimgurl;
      // 定义二维码
      let QRcodeImage = wx.getStorageSync('QRcode');
      // // console.log(wx.getStorageSync('QRcode'))
      this.setData({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
      }, () => {

        // 定义下载队列
        // let downloadQueue = [ downLoadImage(headImgPath)];
        let downloadQueue = [getImageInfo(posterBgImagePath), downLoadImage(headImgPath)];
        // 设置canvas绘制的所需变量
        let headImgWidth = res.width / 8;
        let headImgHeight = res.width / 8;
        let QRCodeWidth = res.width * 28 / 100;
        let QRCodeHeigth = res.width * 28 / 100;
        let headImgMarginTop = canvasHeight - headImgWidth * 3 / 2 - 10;
        // let lineHeight = 14;
        let QRcodeTop = canvasHeight / 2 + headImgWidth;
        let name = wx.getStorageSync('allUserInfo').user_name;
        // console.log(name)
        //标题
        // let title = '邀请您适用松鼠多品';
        //提示
        let tip = '长按识别二维码';
        let fontColor = "#fff";
        // let fontSize = 26 / (app.globalData.clientInfo.pixelRatio);
        let fontSize = 14;
        // console.log(app.globalData)
        // console.log(canvasWidth, canvasHeight)
        // 使用 wx.createcxt 获取绘图上下文 cxt

        Promise.all(downloadQueue)
          .then(data => {
            // console.log(data)
            let posterBgImage = data[0].path;
            let headImg = data[1].tempFilePath;
            // let QRcodeImage = data[2].tempFilePath;
            let ctx = wx.createCanvasContext(elements);
            ctx.clearRect(0, 0, canvasWidth, canvasHeight)
            ctx.textAlign = 'center';


            ctx.drawImage(posterBgImage, 0, 0, canvasWidth, canvasHeight);
            // 绘制头像
            ctx.save()
            ctx.beginPath()
            // ctx.drawImage(headImg, (canvasWidth * 3) / 8, headImgMarginTop, headImgWidth, headImgHeight);
            console.log('******************************');


            // ctx.draw(true);
            ctx.setFillStyle('#000')
            ctx.arc(canvasWidth / 2, headImgMarginTop + headImgHeight / 2, headImgWidth / 2, 0, 2 * Math.PI)
            ctx.clip();
            // ctx.fill()
            ctx.drawImage(headImg, canvasWidth / 2 - headImgWidth / 2, headImgMarginTop, headImgWidth, headImgHeight);
            ctx.draw(true);
            ctx.closePath();
            ctx.restore();
            console.log('******************************');

            ctx.save();
            ctx.beginPath();
            ctx.setFillStyle('rgba(255,255,255,.2)');
            ctx.fillRect(0, headImgMarginTop - 5, canvasWidth, headImgHeight + 10);
            ctx.draw(true);
            ctx.closePath();
            ctx.restore();
            // 绘制文字
            ctx.save();
            ctx.setFontSize(fontSize);
            ctx.setFillStyle(fontColor);
            ctx.textAlign = 'center';
            ctx.textBaseline = 'middle';
            ctx.fillText(name, canvasWidth / 2, headImgMarginTop + headImgHeight + 15);
            // ctx.fillText(title, canvasWidth / 2, headImgHeight + 2 * headImgMarginTop + 2 * lineHeight);
            ctx.draw(true)
            ctx.restore();

            console.log('******************************');

            //绘制二维码
            ctx.save();
            ctx.beginPath()
            // ctx.arc(canvasWidth / 2, headImgHeight + 2 * headImgMarginTop + 5 * lineHeight + QRCodeHeigth / 2, QRCodeHeigth / 2, 0, 2 * Math.PI)
            // ctx.clip();
            ctx.drawImage(QRcodeImage, canvasWidth / 2 - QRCodeWidth / 2, QRcodeTop, QRCodeWidth, QRCodeHeigth);

            // ctx.drawImage(QRcodeImage, canvasWidth / 3, headImgHeight + 2 * headImgMarginTop + 4 * lineHeight, QRCodeWidth, QRCodeHeigth);
            ctx.closePath();
            ctx.draw(true);
            ctx.restore();

            // 绘制文字
            // ctx.save();
            // ctx.setFontSize(fontSize);
            // ctx.setFillStyle(fontColor);
            // // ctx.fillText(tip, canvasWidth / 2, headImgHeight + 2 * headImgMarginTop + 6 * lineHeight + QRCodeHeigth);
            // ctx.fillText(tip, canvasWidth / 2, canvasHeight * 19 / 20);
            // ctx.restore();
            // ctx.draw(true);
            setTimeout(function () {
              // _that._savePoster('posterCanvas' + _that.data.canvasIndex).then(res => { 
              //   // console.log(res.tempFilePath);
              //   let target = 'posterCanvas' + _that.data.canvasIndex
              //   _that.setData({
              //     [target]:res.tempFilePath
              //   })
              //   wx.setStorageSync(`posterCanvas${_that.data.canvasIndex}`, res.tempFilePath)
              // })
              wx.hideLoading();
            }, 1000)
          }).catch(() => {
            // 下载图片抛出异常处理
            _that.setData({
              permission: false
            })
            wx.hideLoading();
            wx.showToast({ icon: 'none', title: '生成失败', duration: 800 })
          })
      })
    })
  },
  // 定义绘制分享商品详情函数
  drawCommodity() {
    let _this = this;
    wx.showLoading({
      title: '生成中...',
      mask: true
    })
    // 获取节点宽高
    getElement('#posterCanvas').then(res => {
      // let rate = wx.getStorageSync('rate');
      let canvasWidth = res.width;
      let canvasHeight = res.height;
      this.setData({
        canvasWidth: canvasWidth,
        canvasHeight: canvasHeight,
        commodity: _this.data.options.commodityType == 0 ? wx.getStorageSync('commodityDetail') : wx.getStorageSync('templateCommodityDetail')
      }, () => {
        // console.log(app.globalData.themeColor);
        // 定义变量
        let _commodityType = _this.data.options.commodityType;
        let _goods_id = _this.data.options.goods_id;
        wx.getStorage({
          key: _commodityType == 0 ? 'commodityDetail' : 'templateCommodityDetail',
          success: function (res) {
            let _data = res.data;
            console.log(res.data);
            const optionSetting = _commodityType == 0 ? {
              commodityTitle: _data.commodityTitle,
              commodityUrl: _data.thumbnail,
              posterBgColor: app.globalData.topColor,
              posterTabWidth: 36,
              posterTabHeight: 36,
              QRcodeImagePath: wx.getStorageSync(`QRcode${_goods_id}--0`),
              QRcodeImageWidth: canvasWidth / 3,
              headimgurl: `${_this.data.baseImgUrl}/logo.png`,
              couponColor: 'red',
              subTitle: '#ccc',
              gain: KeepTwoDecimals('1000.00'),//先写死 wait Me ~_~
              // gain: _commodityType == 1 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates')[3]) : _commodityType == 2 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3]) : _commodityType == 3 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates3')[3]) : _commodityType == 4 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates4')[3]) : KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3]),
              padding: 10,
              longTapTip: '长按即可识别小程序二维码',
              lineHeight: 20,
              curreyPrice: KeepTwoDecimals(_data.minFinalPrice),
              originprice: KeepTwoDecimals(_data.minPrice),
            } : {
                commodityTitle: _data.goodsName,
                commodityUrl: _data.sharePic,
                posterBgColor: app.globalData.themeColor,
                posterTabWidth: 36,
                posterTabHeight: 36,
                QRcodeImagePath: wx.getStorageSync(`QRcode${_goods_id}--${_commodityType}`),
                QRcodeImageWidth: canvasWidth / 3,
                couponColor: 'red',
                coupon: KeepTwoDecimals(_data.couponAmount),
                discount: _data.discount,
                subTitle: '#ccc',
                couponHeight: 30,
                // gain: KeepTwoDecimals(_data.gain),
                gain: _commodityType == 1 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates')[3]) : _commodityType == 2 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3]) : _commodityType == 3 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates3')[3]) : _commodityType == 4 ? KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates4')[3]) : KeepTwoDecimals(KeepTwoDecimals(_data.currentPrice / 100 * _data.rate) * wx.getStorageSync('rates2')[3]),
                padding: 10,
                curreyPrice: KeepTwoDecimals(_data.currentPrice),
                originprice: KeepTwoDecimals(_data.originPrice),
                // salesVolume: KeepTwoDecimals(_data.salesVolume),
                // headimgurl: wx.getStorageSync('allUserInfo').headimgurl,
                headimgurl: `${_this.data.baseImgUrl}/logo.png`,
                headImgWidth: canvasWidth / 6,
                nickName: '星风尚全网爆品',
                tip: `先搜后购 都有返利`,
                longTapTip: '长按图片识别或扫码领券',
                lineHeight: 20
              }
            _this.setData({
              _gain: optionSetting.gain
            })
            console.log(optionSetting)
            // 定义下载队列
            console.log(_this.data.baseImgUrl);
            let _posterTab = _commodityType == 1 ? `${_this.data.baseImgUrl}/posterTabPdd.png` : _commodityType == 2 ? `${_this.data.baseImgUrl}/posterTabJd.png` : _commodityType == 3 ? `${_this.data.baseImgUrl}/posterTabVph.png` : _commodityType == 4 ? `${_this.data.baseImgUrl}/posterTabSn.png` : `${_this.data.baseImgUrl}/logo.png`;
            let downloadQueue = [downLoadImage(optionSetting.commodityUrl), downLoadImage(_posterTab)];
            Promise.all(downloadQueue).then(res => {
              console.log(res);
              let commodityUrl = res[0].tempFilePath;
              let posterTab = res[1].tempFilePath;
              console.log(posterTab);
              // let headImgUrl = res[1].tempFilePath;
              // 定义文字配置项
              let dealWords = {
                maxWidth: canvasWidth - 6 * optionSetting.padding - 35,
                lineHeight: optionSetting.lineHeight,
                row: 2,
                textIndent: 0,
                fontSize: 14
              }
              // let QRcodeImagePath = wx.getStorageSync('QRcode').data;
              // console.log(app.globalData)
              // console.log(canvasWidth, canvasHeight)
              // 使用 wx.createcxt 获取绘图上下文 cxt
              let ctx = wx.createCanvasContext('posterCanvas');

              // 绘制背景色
              ctx.save();
              ctx.beginPath();
              ctx.setFillStyle(optionSetting.posterBgColor);
              ctx.fillRect(0, 0, canvasWidth, canvasHeight)
              ctx.closePath();
              ctx.restore();
              ctx.draw();

              // 绘制paddiing内部内容
              ctx.save();
              ctx.beginPath();
              ctx.setFillStyle("#fff");
              ctx.fillRect(optionSetting.padding, optionSetting.padding, canvasWidth - 2 * optionSetting.padding, canvasHeight - 2 * optionSetting.padding);
              ctx.closePath();
              ctx.restore();
              ctx.draw(true);




              //移动中心点
              ctx.translate(optionSetting.padding * 2, optionSetting.padding * 2);
              //绘制商品标题

              ctx.save();
              ctx.beginPath();

              ctx.setFillStyle("#111");
              ctx.textBaseline = 'middle';
              textEllipsis(ctx, optionSetting.commodityTitle, 42, 10, dealWords)
              ctx.closePath();
              ctx.restore();
              ctx.draw(true);

              //绘制松鼠多品按钮
              ctx.save();
              ctx.beginPath();
              ctx.drawImage(posterTab, 0, 2, optionSetting.posterTabWidth, optionSetting.posterTabHeight)
              ctx.restore();
              ctx.draw(true);
              // ctx.save();
              // ctx.setFillStyle(optionSetting.couponColor);
              // drawRoundRect(ctx, 0, 0, 50, 18, 8);
              // ctx.fill();
              // ctx.draw(true);
              // ctx.setFontSize('12');
              // ctx.setFillStyle('#fff');
              // ctx.textBaseline = 'middle';
              // ctx.textAlign = 'center';
              // ctx.fillText('拼多多/京东', 25, 8);
              // ctx.draw(true);
              // ctx.restore();

              //绘制商品图
              ctx.save();
              // 这里定义商品图距离顶部距离
              // 两行文字加上marginTop  10处理文字间隙
              // let commodityUrlTop = 10 + 2 * optionSetting.lineHeight;
              let commodityUrlTop = canvasHeight / 10;

              ctx.drawImage(commodityUrl, 0, commodityUrlTop, canvasWidth - 4 * optionSetting.padding, canvasHeight / 2);
              ctx.draw(true);
              ctx.restore();
              if (_commodityType != 0) {


                //绘制优惠券信息
                ctx.save();
                ctx.beginPath();
                ctx.setFillStyle(optionSetting.couponColor);
                // 定义优惠券位置
                let cunponTop = commodityUrlTop + canvasHeight / 2 + 10;
                drawRoundRect(ctx, 0, cunponTop, canvasWidth - 4 * optionSetting.padding, optionSetting.couponHeight, 8);
                ctx.fill();
                ctx.draw(true);
                ctx.closePath();
                ctx.restore();
                ctx.beginPath();
                ctx.setFontSize('12');
                ctx.setFillStyle('#fff');
                ctx.textBaseline = 'middle';
                ctx.textAlign = 'center';
                if (optionSetting.coupon == 0) {
                  ctx.fillText(`最高  ${optionSetting.gain}  返利`, canvasWidth / 2 - 2 * optionSetting.padding, cunponTop + optionSetting.couponHeight / 2);
                } else {
                  ctx.fillText(`${optionSetting.coupon}  元内部券  + 最高  ${optionSetting.gain}  返利`, canvasWidth / 2 - 2 * optionSetting.padding, cunponTop + optionSetting.couponHeight / 2);
                }

                //绘制商品价格销量
                ctx.textAlign = 'left';
                ctx.setFillStyle(optionSetting.couponColor);
                ctx.setFontSize('16');
                ctx.fillText(`￥ ${optionSetting.curreyPrice}`, 0, cunponTop + optionSetting.couponHeight + optionSetting.lineHeight);
                ctx.setFillStyle(optionSetting.subTitle);
                ctx.setFontSize('12');
                ctx.setStrokeStyle(optionSetting.subTitle);
                if (optionSetting.discount != 1) {
                  ctx.fillText(`￥${optionSetting.originprice}`, 80, cunponTop + optionSetting.couponHeight + optionSetting.lineHeight);
                  ctx.moveTo(80, cunponTop + optionSetting.couponHeight + optionSetting.lineHeight);
                  ctx.lineTo(140, cunponTop + optionSetting.couponHeight + optionSetting.lineHeight);
                  ctx.stroke();
                }

                ctx.textAlign = 'right';
                // ctx.fillText(`已售${optionSetting.salesVolume}件`, canvasWidth - 4 * optionSetting.padding, cunponTop + optionSetting.couponHeight + optionSetting.lineHeight)
                ctx.closePath();
                ctx.draw(true);
              }
              if (_commodityType == 0) {
                ctx.save();
                ctx.beginPath();
                ctx.textAlign = 'left';
                ctx.setFontSize('15');
                ctx.setFillStyle(optionSetting.couponColor);
                ctx.fillText(`￥${optionSetting.curreyPrice}  起`, 0, canvasHeight / 10 * 8);
                ctx.closePath();
                ctx.restore();
                ctx.draw(true);
              }

              // 绘制头像
              ctx.save()
              ctx.beginPath();
              //定义头像位置
              let headImgTop = canvasHeight * 74 / 100;
              ctx.arc(optionSetting.headImgWidth / 2, headImgTop + optionSetting.headImgWidth / 2, optionSetting.headImgWidth / 2, 0, 2 * Math.PI)
              ctx.clip();
              ctx.setFillStyle('red');
              // ctx.drawImage(headImgUrl, 0, headImgTop, optionSetting.headImgWidth, optionSetting.headImgWidth);
              ctx.closePath();
              ctx.restore();
              ctx.draw(true)



              // 绘制昵称
              ctx.save();
              ctx.beginPath();
              // ctx.setFillStyle(optionSetting.posterBgColor);
              // ctx.fillRect(0, 0, canvasWidth, canvasHeight)
              if (_commodityType != 0) {
                ctx.textAlign = 'left';
                ctx.setFillStyle('#000');
                ctx.fillText(`${optionSetting.nickName}`, 0, headImgTop + optionSetting.headImgWidth / 2);
                // ctx.setFillStyle('#ccc');
                // ctx.setFontSize(15);
                // ctx.fillText(`为你推荐`, canvasWidth / 2, headImgTop + optionSetting.headImgWidth / 2);
                ctx.setFillStyle('#000');
                ctx.setFontSize('12');
                // 定义提示文字的位置
                let tipTop = canvasHeight * 83 / 100;

                ctx.fillText(`${optionSetting.tip}`, 0, tipTop);
                ctx.setFillStyle(optionSetting.subTitle);
              }
              ctx.setFontSize(13);
              ctx.fillText(`${optionSetting.longTapTip}`, 0, canvasHeight * 90 / 100);
              ctx.closePath();
              ctx.restore();
              ctx.draw(true);


              // 绘制二维码
              ctx.save();
              let QRcodeImageTop = _commodityType == 0 ? canvasHeight * 65 / 100 : canvasHeight * 70 / 100;
              ctx.drawImage(optionSetting.QRcodeImagePath, canvasWidth / 2, QRcodeImageTop, optionSetting.QRcodeImageWidth, optionSetting.QRcodeImageWidth);
              ctx.draw(true);
              ctx.restore();
              /************************************************************************************** */
              if (_commodityType != 0) {
                // 绘制分享商品隐藏canvas
                let ctxs = wx.createCanvasContext('shareCanvas');
                // 绘制背景色
                ctxs.save();
                ctxs.beginPath();
                ctxs.setFillStyle(optionSetting.posterBgColor);
                ctxs.fillRect(0, 0, canvasWidth, canvasWidth * 4 / 5)
                ctxs.closePath();
                ctxs.restore();
                ctxs.draw(true);

                // 绘制paddiing内部内容
                ctxs.save();
                ctxs.beginPath();
                ctxs.setFillStyle("#fff");
                ctxs.fillRect(optionSetting.padding, optionSetting.padding, canvasWidth - 2 * optionSetting.padding, canvasWidth * 4 / 5 - 2 * optionSetting.padding);
                ctxs.closePath();
                ctxs.restore();
                ctxs.draw(true);

                //移动中心点
                ctxs.translate(optionSetting.padding * 2, optionSetting.padding * 2);

                //绘制商品图
                ctxs.save();
                ctxs.drawImage(commodityUrl, 0, 0, canvasWidth / 2 - 2 * optionSetting.padding, canvasWidth / 2 - 2 * optionSetting.padding);
                ctxs.draw(true);
                ctxs.restore();

                // 绘制标题
                ctx.save();
                ctx.beginPath();
                // 定义文字配置项
                let sDealWords = {
                  maxWidth: canvasWidth / 2 - 4 * optionSetting.padding,
                  lineHeight: optionSetting.lineHeight,
                  row: 2,
                  textIndent: 0,
                  fontSize: 12
                }
                ctxs.setFillStyle("#000");
                ctxs.textBaseline = 'middle';
                ctxs.textAlign = 'left';
                textEllipsis(ctxs, optionSetting.commodityTitle, canvasWidth / 2 - optionSetting.padding, 10, sDealWords);
                if (_commodityType != 0) {


                  ctxs.setFillStyle(optionSetting.subTitle);
                  ctxs.setFontSize(10);
                  // ctxs.fillText(`已售 ${optionSetting.salesVolume} 件`, canvasWidth / 2 - optionSetting.padding, 3 * optionSetting.lineHeight)
                  ctxs.setFillStyle(optionSetting.couponColor);
                  ctxs.setFontSize(14);
                  ctxs.fillText(`￥${optionSetting.curreyPrice}`, canvasWidth / 2 - optionSetting.padding, 4 * optionSetting.lineHeight)
                  ctxs.setFillStyle(optionSetting.subTitle);
                  ctxs.setFontSize(10);
                  if (optionSetting.coupon != 0) {
                    ctxs.fillText(`￥${optionSetting.originprice}`, canvasWidth / 2 - optionSetting.padding + 10, canvasWidth / 2 - 3 * optionSetting.padding)
                    ctxs.setStrokeStyle(optionSetting.subTitle);
                    ctxs.moveTo(canvasWidth / 2 - optionSetting.padding + 10, canvasWidth / 2 - 3 * optionSetting.padding);
                    ctxs.lineTo(canvasWidth / 2 + 60 - optionSetting.padding + 10, canvasWidth / 2 - 3 * optionSetting.padding);
                    ctxs.stroke();
                  }
                }

                ctxs.closePath();
                ctxs.restore();
                ctxs.draw(true);

                if (_commodityType != 0) {


                  //绘制优惠券
                  ctxs.save();
                  ctxs.setFillStyle(optionSetting.couponColor);
                  // 定义优惠券位置
                  let _couponTop = canvasWidth / 2 - optionSetting.padding;
                  drawRoundRect(ctxs, 0, _couponTop, canvasWidth - 4 * optionSetting.padding, canvasWidth / 4 - 2 * optionSetting.padding, 8);
                  ctxs.fill();
                  ctxs.draw(true);
                  ctxs.setFontSize('15');
                  ctxs.setFillStyle('#fff');
                  ctxs.textBaseline = 'middle';
                  ctxs.textAlign = 'center';

                  if (optionSetting.coupon == 0) {
                    ctxs.fillText(`最高  ${optionSetting.gain}  返利`, canvasWidth / 2 - 2 * optionSetting.padding, _couponTop + canvasWidth / 8 - optionSetting.padding);
                  } else {
                    ctxs.fillText(`${optionSetting.coupon} 元内部券`, canvasWidth / 2 - 2 * optionSetting.padding, _couponTop + canvasWidth / 8 - optionSetting.padding);
                  }

                  ctxs.draw(true);
                  ctxs.restore();
                }
              }

              console.log('*********************');
              setTimeout(function () {
                savePoster('shareCanvas', {
                  width: _this.data.canvasWidth,
                  height: _this.data.canvasWidth * 4 / 5,
                  // 处理图片模糊
                  destWidth: _this.data.canvasWidth * 4,
                  destHeight: _this.data.canvasWidth * 16 / 5,
                  quality: 1
                }).then(res => {
                  wx.hideLoading();
                  _this.setData({
                    invite: true,
                    PosterTemporaryFile: res.tempFilePath
                  })
                })
                // getCanvasData('posterCanvas',optionSetting.padding,optionSetting.padding, canvasWidth - 2*optionSetting.padding , headImgTop+2)
              }, 1000)
            }).catch(() => {
              
              // 下载图片抛出异常处理
              _this.setData({
                permission: false
              })
              wx.hideLoading();
              wx.showToast({ icon: 'none', title: '生成失败', duration: 800 })
            })
          },
        })

      })

    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  changeCanvas(e) {
    let _that = this;
    // console.log(e.detail.current)
    this.setData({
      canvasIndex: e.detail.current
    }, () => {
      // // console.log(e.detail.current)
      // let _index_ = `posterCanvas${e.detail.current}`;
      // // // console.log(_index_);
      // let $data = _that.data;
      // // console.log($data[_index_])
      // if ($data[_index_]) return;
      _that.drawMiniProgram('posterCanvas' + e.detail.current);
      // console.log('eee')
      // wx.getStorage({
      //   key: `posterCanvas${e.detail.current}`,
      //   success: function (res) {
      //     // console.log(res)
      //     let target = `posterImage[${e.detail.current}]`
      //     _that.setData({
      //       [target]:res.data
      //     })
      //   },
      //   fail: function() {

      //   },
      //   complete: function() {
      //     // complete
      //   }
      // })
    })

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    this.setData({
      options,
      // posterImage:[wx.getStorageSync('posterCanvas0'),wx.getStorageSync('posterCanvas1'),wx.getStorageSync('posterCanvas2')]
    });
    let _this = this;
    if (options.type == 'shareMiniProgram') {
      _this.drawMiniProgram('posterCanvas' + _this.data.canvasIndex);
    } else if (options.type == 'shareCommodity') {
      _this.drawCommodity();
    }
  },
  _savePoster(canvas) {
    return new Promise((resolve, reject) => [
      savePoster(canvas, {
        width: this.data.canvasWidth,
        height: this.data.canvasHeight,
        // 处理图片模糊
        destWidth: this.data.canvasWidth * 4,
        destHeight: this.data.canvasHeight * 4,
        quality: 1
      }).then((res) => {

        resolve(res)
      })
    ])

  },
  saveMiniProgramPoster() {
    if (!this.data.permission) return;
    let _this = this;
    this._savePoster('posterCanvas' + this.data.canvasIndex).then((data) => {
      // console.log(data)
      saveToPhotosAlbum(data.tempFilePath).catch(() => {
        //处理用户拒绝授权
        getAuthSetting('scope.writePhotosAlbum').catch(() => {
          _this.setData({
            writePhotosAlbum: false
          })
        }).then(() => {

        })
      })
    })
  },
  savePoster() {
    if (!this.data.permission) return;
    let _this = this;
    this._savePoster('posterCanvas').then((data) => {
      // console.log(data)
      saveToPhotosAlbum(data.tempFilePath).catch(() => {
        //处理用户拒绝授权
        getAuthSetting('scope.writePhotosAlbum').catch(() => {
          _this.setData({
            writePhotosAlbum: false
          })
        }).then(() => {

        })
      })
    })
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
    let _this = this;
    // console.log('show');
    getAuthSetting('scope.writePhotosAlbum').then((res) => {
      _this.setData({
        writePhotosAlbum: res
      })
    }).catch(() => { })
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
  onShareAppMessage: function (res) {
    // console.log(res)
    let _this = this;
    let _data = this.data;
    let _commodityType = _data.options.commodityType;
    // let _commodityType_ = _data.commodity;
    if (res.from === 'button') {
      let targetLink = _commodityType == 0 ? _data.commodity.thumbnail : _data.PosterTemporaryFile;
      let _obj = {
        title: _commodityType == 0 ? `${wx.getStorageSync('allUserInfo').user_name} 邀请您使用` : `${wx.getStorageSync('cpsUserInfo').nickname} 邀请您使用`,
        path: '',
        imageUrl: `${_this.data.baseImgUrl}/shareLogo.png`
      }
      // 分享小程序进入首页
      if (_data.options.type == 'shareMiniProgram') {
        _obj.path = `/pages/index/index?pid=${wx.getStorageSync('allUserInfo').uid}`
      }
      // 分享小程序进入详情页
      else if (_data.options.type = 'shareCommodity') {
        if (_commodityType != 0) {
          // let rate = wx.getStorageSync('rate');
          if (_data.commodity.couponAmount == 0) {
            _obj.title = `【${_commodityType == 1 ? '拼多多' : _commodityType == 2 ? '京东' : _commodityType == 3 ? '唯品会' : _commodityType == 4 ? '苏宁' : '星风尚'}】${KeepTwoDecimals(_commodityType_.currentPrice)}元到手，最高再返${_this.data._gain}元`
          } else {
            _obj.title = `【${_commodityType == 1 ? '拼多多' : _commodityType == 2 ? '京东' : _commodityType == 3 ? '唯品会' : _commodityType == 4 ? '苏宁' : '星风尚'}】领${KeepTwoDecimals(_data.commodity.couponAmount)}元内部券，${KeepTwoDecimals(_data.commodity.currentPrice)}元到手，最高再返${_this.data._gain}元`
          }
        }
        _obj.imageUrl = targetLink;
        _obj.path = _commodityType == 0 ? `/pages/index/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.options.goods_id}` : `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.options.goods_id}&type=${_commodityType}`
      }
      console.log(_obj);
      return _obj
    } else {
      return {
        title: `${_commodityType == 0 ? wx.getStorageSync('allUserInfo').user_name : wx.getStorageSync('cpsUserInfo').nickname} 邀请您使用`,
        path:_commodityType == 0 ? `/pages/index/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.options.goods_id}` : `/pages/template/commodityDetail/commodityDetail?pid=${wx.getStorageSync('allUserInfo').uid}&goods_id=${_data.options.goods_id}&type=${_commodityType}`,
        imageUrl: _commodityType == 0 ?_data.commodity.thumbnail : _data.PosterTemporaryFile
      }
    }
  }
})