import { wxShowToast } from "./window"

// 获取code
export const _login = (cb) => {
    wx.login({
        success: function (res) {
            cb(res)
        },
        fail: function () { }
    })
}

// 监听回到顶部按钮函数
export const onScrollTopFn = (that, scrollTop) => {
    if (scrollTop < that.data.scrollHeight * 2 / 3) {
        that.setData({
            visual: false
        })
    } else {
        that.setData({
            visual: true
        })
    }
}

// 选择图片
export const chooseImage = (count = 4) => {
    return new Promise((resolve, reject) => {
        wx.chooseImage({
            count: count,
            sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
            sourceType: ['album', 'camera'], //从相册选择
            success: (res) => {
                resolve(res)
            },
            fail: (err) => {
                reject(err)
            }
        });
    })
}

// 加载更多函数
// 页面this指向，request请求api，array参数数组，key处理数据的键值，使用fn处理key作为键值的函数
export const lower = (params,type) => {
    let {
        _this,
        request,
        array,
        key,
        fn,
        rows = 'rows'
    } = params;
    // 请求数据
    _this.setData({
        page: _this.data.page + 1,
        loading: true
    }, () => {

        request(...array, _this.data.page).then(res => {
           
            let _rows = rows == '' ? [...res] : res[rows];
            let allCommodity = fn ? type?fn(_rows,type):fn(_rows) : _rows;
            let curreyCommodity = [..._this.data[key], ...allCommodity]; 
            _this.setData({
                loading: false,
                [key]: curreyCommodity,
                complete: false
            })
        }).catch(() => {
            //如果没有更多了
            _this.setData({
                page: _this.data.page - 1,
                loading: false,
                complete: true
            })
        })
    })
}

// 根据url获取goods_id
export const getUrlGoodsId = (url) => {
    let str = decodeURIComponent(url);
    str = str.replace(/\s/g, '');

    // 拼多多
    if (str.indexOf('yangkeduo.com') > 0) {
        if (str.match(/goods_id=(\S*)&page/)) {
            if (str.match(/goods_id=(\S*)&page/).length) {
                str = parseInt(str.match(/goods_id=(\S*)&page/)[1], 10) + '-pdd'
            }
        }
    }
    // 京东 
    else if (str.indexOf('jd.com') > 0) {
        if (str.match(/com\/product\/(\S*)\.html/)) {
            if (str.match(/com\/product\/(\S*)\.html/).length) {
                str = parseInt(str.match(/com\/product\/(\S*)\.html/)[1], 10) + '-jd'
            }
        }
    }
    // 苏宁
    else if (str.indexOf('suning.com') > 0) {
        if (str.match(/product\/(\S*)\.html\?/) && str.match(/product\/(\S*)\.html\?/).length) {
            str = str.match(/product\/(\S*)\.html\?/)[1];
            if (str.indexOf("/") != -1) {
                str = parseInt(str.split('/')[1], 10) + '-sn'
            }
        }
    }
    // 唯品会
    else if (str.indexOf('vip.com') > 0) {
        if (str.match(/product\-(\S*)\.html\?/) && str.match(/product\-(\S*)\.html\?/).length) {
            str = str.match(/product\-(\S*)\.html\?/)[1].split('-')[1] + '-vph'
        }
    }
    else {
        str = '000'
    }
    return str
}

// 监测授权手机号逻辑
export const checkPhoneNumber = (_this, rawData, cb) => {
    let showPhoneNumber = `phoneNumberlDialog.show`;
    wx.getStorage({
        key: 'phoneNumber',
        complete(res) {
            if (res.data || rawData) {
                _this.setData({
                    [showPhoneNumber]: false
                })
                cb()
            } else {
                _this.setData({
                    [showPhoneNumber]: true
                })
            }
        }
    })
}

// 监测授权用户信息逻辑
export const checkUserInfo = (_this) => {
    let showUserInfo = `userInFoDialog.show`;
    storage('get', { key: 'allUserInfo' }).then(res => {
        _this.setData({
            [showUserInfo]: false
        })
    }).catch(() => {
        _this.setData({
            [showUserInfo]: true
        })
    })
}

// 获取自定义参数
export const getDataset = (params, target) => {
    let obj = params.currentTarget.dataset[target];
    return obj;
}


//获取小程序授权信息
export const getAuthSetting = (scope) => {
    return new Promise((resolve, reject) => {
        wx.getSetting({
            success(res) {
                if (res.authSetting[scope]) {
                    resolve(res.authSetting[scope])
                } else {
                    reject(res.authSetting[scope])
                }
            }
        })
    });
}

// 获取元素节点
export const getElement = (element) => {
    return new Promise((resolve, reject) => {
        const query = wx.createSelectorQuery()
        query.select(element).boundingClientRect()
        query.selectViewport().scrollOffset()
        query.exec(function (res) {
            if (res) {
                resolve(res[0])
            } else {
                reject()
            }

        })
    })
}
/****绘制自动换行,缩进,的字符串****/
export const textEllipsis = (ctx, text, x, y, options) => {
    if (typeof text !== 'string' || typeof x !== 'number' || typeof y !== 'number') {
        return;
    }
    let defaultOpt = {
        maxWidth: 100,
        lineHeight: 14,
        row: 1000,
        textIndent: 10,
        fontSize: 14
    };
    let params = Object.assign({}, defaultOpt, options);
    // 分割文本
    let textArr = text.split('');
    // 文本最终占据高度
    let textHeight = 0;
    // 每行显示的文字
    let textOfLine = '';
    // 控制行数
    let limitRow = params.row;
    let rowCount = 0;
    // 循环分割的文字数组
    for (let i = 0; i < textArr.length; i++) {
        // 获取单个文字或字符
        let singleWord = textArr[i];
        // 连接文字
        let connectText = textOfLine + singleWord;
        // 计算接下来要写的是否是最后一行
        let isLimitRow = limitRow ? rowCount === (limitRow - 1) : false;
        // 最后一行则显示省略符,否则显示连接文字
        let measureText = isLimitRow ? (connectText + '...') : connectText;
        // 设置字体并计算宽度,判断是否存在首行缩进
        ctx.font = `${params.fontSize}px "MicroSoft YaHei"`;
        let width = ctx.measureText(measureText).width;
        // 首行需要缩进满足条件
        let conditionIndent = (params.textIndent && rowCount === 0);
        let measureWidth = conditionIndent ? (width + params.textIndent) : width;
        // 大于限制宽度且已绘行数不是最后一行，则写文字
        if (measureWidth > params.maxWidth && i > 0 && rowCount !== limitRow) {
            // 如果是最后一行，显示计算文本
            let canvasText = isLimitRow ? measureText : textOfLine;
            let xPos = conditionIndent ? (x + params.textIndent) : x;
            // 写文字
            ctx.fillStyle = '#000';
            ctx.fillText(canvasText, xPos, y);
            // 下一行文字
            textOfLine = singleWord;
            // 记录下一行位置
            y += params.lineHeight;
            // 计算文本高度
            textHeight += params.lineHeight;
            rowCount++;

            if (isLimitRow) {
                break;
            }
        } else {
            // 不大于最大宽度
            textOfLine = connectText;
        }
    }
    if (rowCount !== limitRow) {
        let xPos = (params.textIndent && rowCount === 0) ? (x + params.textIndent) : x;
        ctx.fillStyle = '#000';
        ctx.fillText(textOfLine, xPos, y);
    }
    // 计算文字总高度
    let textHeightVal = rowCount < limitRow ? (textHeight + params.lineHeight) : textHeight;
    return textHeightVal;
}

// 下载图片
export const downLoadImage = (url) => {
    return new Promise((resolve, reject) => {
        wx.downloadFile({
            url,
            success(res) {
                if (res.statusCode === 200) {
                    resolve(res)
                }
            }, fail() {
                reject()
            }
        })
    })

}

// 获取图片信息
export const getImageInfo = (src) => {
    return new Promise((resolve, reject) => {
        wx.getImageInfo({
            src,
            success: function (res) {
                resolve(res)
            }, fail() {
                reject()
            }
        })
    });
}

// 绘制圆角矩形
export const drawRoundRect = (cxt, x, y, width, height, radius) => {
    cxt.beginPath();
    cxt.arc(x + radius, y + radius, radius, Math.PI, Math.PI * 3 / 2);
    cxt.lineTo(width - radius + x, y);
    cxt.arc(width - radius + x, radius + y, radius, Math.PI * 3 / 2, Math.PI * 2);
    cxt.lineTo(width + x, height + y - radius);
    cxt.arc(width - radius + x, height - radius + y, radius, 0, Math.PI * 1 / 2);
    cxt.lineTo(radius + x, height + y);
    cxt.arc(radius + x, height - radius + y, radius, Math.PI * 1 / 2, Math.PI);
    cxt.closePath();
}
// hss保留小数算法
export const keepDecimals = (num, decimal = 2) => {
    let ten = Math.pow(10, decimal)
    try {
        num = Number(num) + 0.0000001
    } catch (e) {
        num = 0
    }
    return ((Math.floor(num * ten)) / ten).toFixed(decimal) * 1
}

// 处理小数
export const formatNum = (x) => {
    var f = parseFloat(x);
    if (isNaN(f)) {
        return false;
    }
    var f = Math.round(x * 100) / 100;
    var s = f.toString();
    var rs = s.indexOf('.');
    if (rs < 0) {
        rs = s.length;
        s += '.';
    }
    while (s.length <= rs + 2) {
        s += '0';
    }
    return s;
}

// 获取canvas数据
export const getCanvasData = (canvasId, x, y, width, height) => {
    return new Promise((resolve, reject) => {
        wx.canvasGetImageData({
            canvasId,
            x,
            y,
            width,
            height,
            success(res) {
                resolve(res)
            }, fail(err) {
                reject(err)
            }
        })
    })
}


// 保存分享海报
export const savePoster = (element, params) => {
    return new Promise((resolve, reject) => {
        let { width, height, destWidth, destHeight, quality } = params
        wx.canvasToTempFilePath({
            canvasId: element,
            width,
            height,
            destWidth,
            destHeight,
            quality,
            success: function success(res) {
                resolve(res)
            },
            complete: function complete(erro) {
                reject(erro)
            }
        })
    })
}

//保存到相册
export const saveToPhotosAlbum = (imageUrl, showTaost = true) => {
    return new Promise((resolve, reject) => {
        wx.saveImageToPhotosAlbum({
            filePath: imageUrl,
            success(res) {
                if (!showTaost) return;
                wx.showToast({
                    icon: 'success',
                    title: '保存成功',
                    duration: 800
                })
            },
            fail: function (res) {
                if (showTaost) {
                    wx.showToast({
                        icon: 'none',
                        title: '保存失败',
                        duration: 800
                    })
                }
                reject()
            }
        })
    })
}

// 复制文字
export const copyText = (data, callback) => {
    wx.setClipboardData({
        data: data,
        success: function (res) {
            callback(res)
        }
    });
}

// 处理本地存储
export const storage = (method, params) => {
    let { key, data } = params;
    return new Promise((resolve, reject) => {
        if (method == 'get') {
            wx.getStorage({
                key,
                complete(res) {
                    if (res.data) {
                        resolve(res)
                    } else {
                        reject()
                    }


                }
            })
        } else if (method == 'set') {
            wx.setStorage({
                key,
                data,
                success(res) {
                    resolve(res.data)
                }, fail(err) {
                    reject()
                }
            })
        } else if (method == 'remove') {
            wx.removeStorage({
                key,
                success(res) {
                    resolve()
                }
            })
        } else if (method == 'clear') {
            wx.clearStorage()
        }
    })
}

// 获取购物车数据指定goods_id和sku_id的索引
export const getValueIndexInObject = (obj, values, value) => {
    for (let indexs in obj.cartData) {
        if (obj.cartData[indexs].goods_id == values) {
            indexs = Number(indexs);
            for (let index in obj.cartData[indexs].cart) {
                if (obj.cartData[indexs].cart[index].sku_id == value) {
                    index = Number(index);
                    return [indexs, index]
                }
            }
        }
    }
}

// 计算购物车价格
export const calcPrice = (array) => {
    if (array == null) return 0;
    if (array.length == 0) return 0;
    let currryArray = [];
    array.forEach((items, indexs, arrays) => {
        currryArray.push(items.cart.filter((item) => {
            return item.checked == true
        }))
    })
    let concatArray = currryArray.reduce(function (prev, next) {
        return prev.concat(next);
    })
    console.log(concatArray)
    // 判断空数组
    if (concatArray.length > 0) {
        console.log(concatArray)
        let totalPrice = concatArray.reduce(function (_prev, _next) {
            return _prev + Number(_next.price) * Number(_next.cartNum);
        }, 0)
        console.log(totalPrice)
        return totalPrice;
    } else {
        return 0
    }
}

export const navigateBackField = (key, value) => {
    //当前页面选择的内容
    var pagelist = getCurrentPages();
    if (pagelist.length > 1) {
        //获取上一个页面实例对象
        let prevPage = pagelist[pagelist.length - 2];
        //修改上一个页面的变量  
        prevPage.setData({
            [key]: value
        })
        wx.navigateBack();
    }
}

// 处理轮播数据
export const setSwiperData = (data) => {
    return data.map(item => {
        let { img_url, ...baseObj } = item;
        return {
            ...baseObj,
            url: img_url
        }
    })
}

// 处理分类数据
export const setIconListData = (data) => {
    let _data = data.map(item => {
        let { title, img_url, ...baseObj } = item;
        return {
            ...baseObj,
            name: title,
            image: img_url
        }
    })
    if (data.length > 9) {
        return _data.slice(0, 9)
    } else {
        return _data
    }
}

// 处理商品展示数据
export const setCommodity = (_data) => {
    return _data.map(item => {
        let { price, final_price, ...baseObj } = item;
        if ((!price && price != 0) || !final_price && final_price != 0) {
            wxShowToast({ title: '价格参数错误，如有问题请联系商家...' })
        }
        price = price ? price : '0.1-0.2';
        final_price = final_price ? final_price : '0.01-0.02';
        return {
            ...baseObj,
            minPrice: price.indexOf("-") == -1 ? price : price.split('-')[0],
            minFinalPrice: final_price.indexOf("-") == -1 ? final_price : final_price.split('-')[0],
            maxPrice: price.indexOf("-") == -1 ? price : price.split('-')[1],
            maxFinalPrice: final_price.indexOf("-") == -1 ? final_price : final_price.split('-')[1]
        }
    })
}

// 处理详情页店铺信息
export const setShopInfoData = (data) => {
    console.log(data);
    console.log('+++++++++++++++++++');
    if ((!data.price && data.price != 0) || !data.final_price && data.final_price != 0) {
        wxShowToast({ title: '价格参数错误,如有问题请联系商家...' })
    }
    data.price = data.price ? data.price : '0.1-0.2';
    data.final_price = data.final_price ? data.final_price : '0.01-0.02';
    return {
        thumbnail: data.image_url,
        swiper: data.small_img,
        // data.images.filter((items) => {
        //     return items.type == 3
        // }).map(item => {
        //     return {
        //         url: item.image
        //     }
        // }),
        details: data.detail_img,
        //  data.images.filter((items) => {
        //     return items.type == 4
        // }).map(item => {
        //     return {
        //         url: item.image
        //     }
        // }),
        disctribe: data.disctribe,
        goods_id: data.id,
        inventory: data.stock_size,
        commodityTitle: data.title,
        salesVolume: data.volume,
        // shopName: data.shop.shop_name,
        minPrice: data.price.indexOf("-") == -1 ? data.price : data.price.split('-')[0],
        minFinalPrice: data.final_price.indexOf("-") == -1 ? data.final_price : data.final_price.split('-')[0],
        maxPrice: data.price.indexOf("-") == -1 ? data.price : data.price.split('-')[1],
        maxFinalPrice: data.final_price.indexOf("-") == -1 ? data.final_price : data.final_price.split('-')[1],
    }
}

// 处理规格信息
export const setSpecification = (data, edit_sku_id) => {
    // var map = {},
    //     dest = [];
    // for (var i = 0; i < data.length; i++) {
    //     var _i = data[i];
    //     // 如果dest为空
    //     if (!map[_i.standard_n]) {
    //         dest.push({
    //             standard_n: _i.standard_n,
    //             option: [_i]
    //         });
    //         map[_i.standard_n] = _i.standard_n;
    //     } else {
    //         for (var j = 0; j < dest.length; j++) {
    //             var _j = dest[j];
    //             // 如果属性相同
    //             if (_j.standard_n == _i.standard_n) {
    //                 _j.option.push(_i);
    //                 break;
    //             }
    //         }
    //     }
    // }
    // return dest.map(item => {
    //     return {
    //         option: item.option.map((_item, _index) => {
    //             let { mode, ...baseObj } = _item;
    //             return {
    //                 ...baseObj,
    //                 mode: _item.standard_v,
    //                 checked: false
    //             }
    //         }),
    //         name: item.standard_n
    //     }
    // })
    return data.map((items, indexs) => {
        return {
            name: items.name,
            option: items.list.map((item, index) => {
                if (edit_sku_id) {
                    console.log(edit_sku_id.split('-'))
                }
                return {
                    id: item.sku_bind_id,
                    mode: item.sku_bind_name,
                    checked: edit_sku_id ? item.sku_bind_id == edit_sku_id.split('-')[indexs] ? true : false : false
                }
            })
        }
    })
}

// 处理评价数据
export const setEvaluate = (data) => {
    console.log(data)
    // if (data) {
    //     return data
    // } else {
    return data.map(items => {
        let { create_time, content, ...baseObj } = items;
        return {
            ...baseObj,
            create_time: timeFormat(create_time, 'yyyy/mm/dd hh:MM:ss'),
            message: items.content,
            showAllBtn: items.content.length > 70 ? true : false,
            showCloseBtn: false
        }
    })
    // }
}


// 对象相同属性合并  key为标记,option为放置位置  是否解构
export const concatObj = (arr, key, option, deconstruct = true) => {
    var listArr = [];
    arr.forEach((el) => {
        for (var i = 0; i < listArr.length; i++) {
            if (listArr[i][key] == el[key]) {
                // 将每一项的option选项解构推到option
                if (deconstruct) {
                    listArr[i][option].push(...el[option]);
                } else {
                    listArr[i][option].push(el[option]);
                }
                return;
            }
        }
        listArr.push({
            [key]: el[key],
            [option]: deconstruct ? [...el[option]] : [el[option]]
        })
    })
    return listArr
}

// 处理购物车数据
export const setCartData = (data) => {
    return data.rows.map(items => {
        let _items = items.sku_v_info;
        return _items?{
            goods_id: _items.spu_id,
            cart: [items].map(item => {
                return {
                    sku_id: _items.id,
                    id: item.id,//购物车id
                    src: _items.image,
                    title: items.spu_title,
                    price: _items.price,
                    sku_v: _items.sku_v,
                    cartNum: items.count,
                    checked: true,
                    specification: item.sku_name.split(' ').slice(0, item.sku_name.split(' ').length - 1)
                    // items.sku.reduce((prev, next) => {
                    //     return prev.standard_v + ',' + next.standard_v;
                    // }),
                }
            })
        }:null
    }).filter(items=>{
        // 过滤掉sku_v_info为null的购物车数据
        return items!=null
    })
}

// 处理收货地址数据
export const setAddressData = (data) => {
    return data.map(item => {
        return {
            name: item.consignee,
            tel: item.phone,
            address: item.detail,
            area: item.region.split('/'),
            isDefault: item.isDefault,
            id: item.id
        }
    })
}
const timeFormat = (times, fmStr) => {
    var weekCN = '一二三四五六日';
    var weekEN = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];

    var time = new Date(times);
    var year = time.getFullYear();
    var month = time.getMonth() + 1;
    var day = time.getDate();
    var hours = time.getHours();
    var minutes = time.getMinutes();
    var seconds = time.getSeconds();
    var milliSeconds = time.getMilliseconds();
    var week = time.getDay();

    month = month >= 10 ? month : ('0' + month);
    day = day >= 10 ? day : ('0' + day);
    hours = hours >= 10 ? hours : ('0' + hours);
    minutes = minutes >= 10 ? minutes : ('0' + minutes);
    seconds = seconds >= 10 ? seconds : ('0' + seconds);

    if (fmStr.indexOf('yyyy') !== -1) {
        fmStr = fmStr.replace('yyyy', year);
    } else {
        fmStr = fmStr.replace('yy', (year + '').slice(2));
    }
    fmStr = fmStr.replace('mm', month);
    fmStr = fmStr.replace('dd', day);
    fmStr = fmStr.replace('hh', hours);
    fmStr = fmStr.replace('MM', minutes);
    fmStr = fmStr.replace('ss', seconds);
    fmStr = fmStr.replace('SSS', milliSeconds);
    fmStr = fmStr.replace('W', weekCN[week - 1]);
    fmStr = fmStr.replace('ww', weekEN[week - 1]);
    fmStr = fmStr.replace('w', week);

    return fmStr;
}
// 处理订单详情数据
export const setOrderDetail = (data) => {
    return data.map(items => {
        let { consignee, phone, detail, region, create_time, ...baseObj } = items
        return {
            ...baseObj,
            name: consignee,
            create_time: timeFormat(create_time, 'yyyy/mm/dd hh:MM:ss'),
            tel: phone,
            address: detail,
            area: region.split('/')
        }
    })
}

// 调起支付
export const requestPay = (params) => {
    let {
        timeStamp,
        nonceStr,
        paySign
    } = params;
    return new Promise((resolve, reject) => {
        console.log(`timeStamp:${timeStamp},nonceStr:${nonceStr},package:${params.package},paySign:${paySign}`)
        wx.requestPayment({
            timeStamp,
            nonceStr,
            package: params.package,
            signType: 'MD5',
            paySign,
            success(res) {
                resolve(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })
}
// 处理我的评论数据
export const setUserEvaluate = (data) => {
    return data.map(items => {
        let { create_time, ...baseObj } = items
        return {
            ...baseObj,
            create_time: timeFormat(create_time, 'yyyy/mm/dd hh:MM:ss')
        }
    })
}
/****爆款**/
// 处理模板轮博数据
export const setTemplateSwiper = (data) => {
    return data.map(items => {
        let { body, img_url, ...baseObj } = items
        return {
            ...baseObj,
            url: img_url,
            body: JSON.parse(body)
        }
    })
}

// 处理商品数据
export const setTemplateCommodity = (data, type = 2) => {
    const KeepTwoDecimals = (num) => {
        var ten = Math.pow(10, 2);
        num = num * 1 + 0.0000001;
        var _num = ((Math.floor(num * ten)) / ten);
        return _num.toFixed(2)
    }
    return data.map((data) => {
        return {
            brandLogoFull: data.brandLogoFull || '',
            goods_id: data.goods_id,
            commodityLink: data.pic_url,
            title: data.title,
            salesVolume: data.volume,
            shopName: data.shop_name,
            coupon: data.coupon_amount,
            couponCount: data.couponCount,
            price: data.goods_price,
            currentPrice: data.final_price,
            rate: data.commission_rate,
            gain: type == 2 ? wx.getStorageSync('rate') * KeepTwoDecimals(data.final_price * data.commission_rate / 100) : type == 3 ? wx.getStorageSync('rate2') * KeepTwoDecimals(data.final_price * data.commission_rate / 100) : type == 4 ? wx.getStorageSync('rate3') * KeepTwoDecimals(data.final_price * data.commission_rate / 100) : wx.getStorageSync('rate4') * KeepTwoDecimals(data.final_price * data.commission_rate / 100)
        }
    })
}
export const KeepTwoDecimals = (num) => {

    var ten = Math.pow(10, 2);
    num = num * 1 + 0.0000001;
    var _num = ((Math.floor(num * ten)) / ten);


    return _num.toFixed(2)

}

// 处理商品详情数据
export const setTemplateCommodityDetail = (data, type = 1) => {
    const goodsData = data.goodsInfo;
    // const mallData = data.mallInfo;
    const KeepTwoDecimals = (num) => {
        var ten = Math.pow(10, 2);
        num = num * 1 + 0.0000001;
        var _num = ((Math.floor(num * ten)) / ten);
        return _num.toFixed(2)
    }
    const formatTime = date => {
        let year = date.getFullYear()
        let month = date.getMonth() + 1 < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1
        let day = date.getDate() < 10 ? "0" + (date.getDate()) : date.getDate()

        return [year, month, day].join('.')
        // return [year, month, day].map(formatNumber).join('/') + ' ' + [hour, minute, second].map(formatNumber).join(':')
    }
    //    console.log(goodsData.priceTypeCode )
    return {
        goods_id: goodsData.goods_id,
        sellerId: goodsData.seller_id,
        // tag_icon: data.tag,
        coupon_url: goodsData.coupon_url,
        description: goodsData.description,
        couponStartTime: goodsData.coupon_start_time ? formatTime(new Date(goodsData.coupon_start_time)) : ' ',
        couponEndTime: goodsData.coupon_end_time ? formatTime(new Date(goodsData.coupon_end_time)) : ' ',
        originPrice: goodsData.goods_price,
        couponAmount: goodsData.coupon_amount ? Number(goodsData.coupon_amount) : 0,
        currentPrice: goodsData.final_price,
        // tagIcon: goodsData.coupon_url  && '',
        banner: goodsData.small_images.split(',').reverse(),
        goodsName: goodsData.title,
        gain: type == 1 ? Number(wx.getStorageSync('rate')) * KeepTwoDecimals(Number(goodsData.final_price) * Number(goodsData.commission_rate) / 100) : type == 2 ? Number(wx.getStorageSync('rate2')) * KeepTwoDecimals(Number(goodsData.final_price) * Number(goodsData.commission_rate) / 100) : type == 3 ? Number(wx.getStorageSync('rate3')) * KeepTwoDecimals(Number(goodsData.final_price) * Number(goodsData.commission_rate) / 100) : Number(wx.getStorageSync('rate4')) * KeepTwoDecimals(Number(goodsData.final_price) * Number(goodsData.commission_rate) / 100),
        // descTxt: mallData.desc_txt,
        // lgstTxt: mallData.lgst_txt,
        // servTxt: mallData.serv_txt,
        // avgDesc: goodsData.avg_desc,
        // avgLgst: goodsData.avg_lgst,
        // avgServ: goodsData.avg_serv,
        // shopPic: goodsInfo.img_url,
        sharePic: 'https://' + goodsData.pic_url.split('://')[1],
        mallName: goodsData.shop_name,
        // totalGoods: mallData.totalGoods,
        salesVolume: goodsData.volume,
        rate: goodsData.commission_rate,
        couponTotalCnt: goodsData.couponTotalCnt,
        priceTypeCode: goodsData.priceTypeCode,
        goodsDetailPictures: goodsData.small_images.length == 0 ? null : goodsData.small_images.split(','),
        commodityType: goodsData.commodityType || 1,
        priceTypeCode: goodsData.priceTypeCode || 0,
        baoyou: goodsData.baoyou || 0,
        saleStatus: goodsData.saleStatus || 0,
        pgUrl: goodsData.pgUrl || "",
        pgActionId: goodsData.pgActionId || 0,
        activityId: goodsData.activityId || 0,
        couponCount: goodsData.couponCount || 10000,
        activityDescription: goodsData.activityDescription || ""
    }
}

// 处理订单数据
export const setTemplateOrderList = (data) => {
    let uid = wx.getStorageSync('cpsUserInfo').uid;
    let originData = [...data];
    for (let i = 0; i < originData.length; i++) {
        var type = '' //购买类型
        var amount = 0 //最终显示的金额
        if (uid == originData[i].sp_id) {
            type = '会员推广'
            amount += originData[i].sp_price * 1
        }
        if (uid == originData[i].pid) {
            type = '直属推广'
            amount += originData[i].pid_price * 1
        }
        if (uid == originData[i].uid) {
            type = '自推自购'
            amount += originData[i].real_price * 1
        }
        originData[i].type = type;
        originData[i].platform = originData[i].orderType;
        originData[i].amount = amount;
        originData[i].create_time = timeFormat(new Date(originData[i].create_time.replace('/-/g', '/')), 'yyyy/mm/dd hh:MM:ss');
    }
    return originData
}
/****爆款**/
