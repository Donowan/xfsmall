// 引入请求
import { http } from './http';
import { _login } from './data';

/********get请求*************/
// 默认get请求
const _get = (url, data) => http({ url, data });
// 无loading get
const _get_no_loading = (url, data) => http({ url, data, loading: false });

// 无showtostget
const _get_no_toast = (url, data) => http({ url, data, loading: false, showToast: false });

// get携带token
const $get = (url, data) => http({ url, data, token: wx.getStorageSync('token') });
// get 携带token无loading
const $get_no_loading = (url, data) => http({ url, data, token: wx.getStorageSync('token'), loading: false });


/****** * post请求*********/
// 默认post请求
const _post = (url, data) => http({ url, data, method: 'post' });
// 无loading post
const _post_no_loading = (url, data) => http({ url, data, loading: false, method: 'post' });
// post携带token
const $post = (url, data) => http({ url, data, token: wx.getStorageSync('token'), method: 'post' });
// post 携带token无loading
const $post_no_loading = (url, data) => http({ url, data, token: wx.getStorageSync('token'), loading: false, method: 'post' });


//delete 请求
const $del = (url, data) => http({ url, data, token: wx.getStorageSync('token'), method: 'delete' });
const $del_no_loading = (url, data) => http({ url, data, token: wx.getStorageSync('token'), loading: false, method: 'delete' });

// put请求
const $put = (url, data) => http({ url, data, token: wx.getStorageSync('token'), method: 'put' });
const $put_no_loading = (url, data) => http({ url, data, token: wx.getStorageSync('token'), loading: false, method: 'put' });


/***************对接接口***************************/
//登录接口
export const login = () => {
    return new Promise((resolve, reject) => {
        _login((res) => {
            if (res.code) {
                //发起请求
                _post_no_loading('/wxlogin', {
                    code: res.code
                }).then(data => {
                    resolve(data)
                }).catch(err => { reject(err) })
            } else {

            }
        })
    })
}


// 获取手机号失败调用接口
export const login_by_wx = (session_key, detail,pid) => {
    return new Promise((resolve, reject) => {
        _login((res) => {
            if (res.code) {
                //发起请求
                _post_no_loading('/loginByWx', {
                    wxCode: res.code,
                    session_key: session_key,
                    rawData: detail.rawData,
                    signature: detail.signature,
                    encryptedData: detail.encryptedData,
                    iv: detail.iv,
                    pid
                }
                ).then(data => { resolve(data) }).catch(err => { reject(err) })
            } else {

            }
        })
    })
}

// 解密手机号接口
export const get_phone_number = (iv, encryptedData, session_key, openid) => {
    return _post_no_loading('/verifyUserPhone', {
        iv,
        encryptedData,
        session_key,
        openid
    })
}


// 获取图片数据
export const get_image_data = (type) => {
    return _get_no_loading('/image', { type })
}


// 获取首页分类数据
export const get_index_kind = () => {
    return _get_no_loading('/kind')
}


// 获取所有模块数据
export const get_all_template = () => {
    return _get_no_loading('/defined_model', {
        page: 1,
        pageSize: 10
    })
}


// 获取商品信息
export const get_goods_data = (data = '', page = 1) => {
    return new Promise((resolve, reject) => {
        _get_no_loading(data ? '/spu/' + data : '/spu', data ? {} : {
            page,
            pageSize: 10
        }).then(res => {
            console.log(res)
            if (!data) {
                let length = res.rows.length;

                // 后期搜索出问题切换if判断条件
                if (length > 0) {
                    resolve(res)
                } else {
                    reject()
                }
            } else {
                resolve(res)
            }

        }).catch((err) => {
            console.log(err)
        })
    })
}


// 获取商品评论
export const get_evaluate_data = (spu_id, page) => {
    // let { page, spu_id } = params;
    return new Promise((resolve, reject) => {
        _get_no_loading('/evaluate', {
            page,
            spu_id,
            pageSize: 10
        }).then(res => {
            resolve(res)
            // console.log(res)
            // let length = res.rows.length;
            // if (length > 0) {
            //     resolve(res)
            // } else {
            //     reject()
            // }

        }).catch((err) => {
            console.log(err)
        })
    })
}


// 获取商品规格
export const get_specification_data = (spu_id) => {
    return new Promise((resolve, reject) => {
        $get_no_loading('/sku_v/' + spu_id).then(res => {
            console.log(res)
            let length = res.sku_info_list.length;
            if (length > 0) {
                resolve(res)
            } else {
                reject()
            }
        }).catch((err) => {
            console.log(err)
        })
    })
}


// 获取具体规则信息/sku_v
export const get_sku_data = (sku_v) => {
    return new Promise((resolve, reject) => {
        _get_no_loading('/sku_v', {
            sku_v
        }).then(res => {
            console.log(res);
            resolve(res)
        }).catch((err) => {
            reject(err)
        })
    })
}

// 添加购物车
// export const add_cart = (sku_v_id,count) => {
//     return $post('/cart', {
//         sku_v_id,
//         count,
//         isAddUp:0
//     })
// }

// 处理购物车
export const set_cart = (params) => {
    let {
        sku_v_id,
        count,
        cart_id,
        isAddUp = 0,
    } = params;
    return $post('/cart', cart_id ? {
        sku_v_id,
        count,
        isAddUp,
        cart_id
    } : {
            sku_v_id,
            count,
            isAddUp,
        }
    )
}

// 查询购物车
export const get_cart_data = (params) => {
    let { page } = params;
    return $get('/cart', {
        page,
        pageSize: 10
    })
}


// 更新购物车
export const update_cart_data = (id, sku_v_id, count) => {
    return $post('/cart', {
        id,
        sku_v_id,
        count
    })
}

// 删除购物车
export const delete_cart_data = (id) => {
    return $del(`/cart/${id}`)
}

// 查询收货地址
export const get_user_address = () => {
    return $get_no_loading('/shipaddress')
}

// 添加收货地址
export const add_user_address = (params) => {
    let {
        area,
        address,
        name,
        tel,
        isDefault = 1
    } = params
    return $post_no_loading('/shipaddress', {
        region: area.join('/'),
        detail: address,
        phone: tel,
        consignee: name,
        isDefault
    })
}

// 编辑收货地址
export const edit_user_address = (params, setDefault) => {
    let {
        area,
        address,
        name,
        tel,
        id,
        isDefault,
    } = params
    return $put('/shipaddress', {
        region: area.join('/'),
        detail: address,
        phone: tel,
        consignee: name,
        id,
        isDefault: setDefault ? 1 : isDefault
    })
}
// 删除收货地址
export const delete_user_address = (id) => {
    return $del(`/shipaddress/${id}`)
}
// 创建订单
export const add_user_order = (params) => {
    let {
        shipaddressId,
        skuVId,
        num,
        comment,
        isCreate = 1
    } = params
    return $post('/deal', {
        shipaddressId,
        skuVId,
        num,
        comment,
        isCreate
    })
}

// 购物车添加订单
export const add_user_order_by_cart = (params) => {
    let {
        cartIdArr,
        shipaddressId,
        comment,
        isCreate = 1
    } = params
    return $post('/dealByCart', {
        cartIdArr,
        shipaddressId,
        comment,
        isCreate
    })
}

// 查询订单
export const get_user_order = (order_id, order_status, page) => {
    // let {
    //     page,
    //     order_id,
    //     order_status
    // } = params;
    return $get_no_loading('/deal', {
        page,
        pageSize: 10,
        order_id,
        order_status
    })
}

// 调起支付
export const request_pay = (order_id) => {
    return $post('/orderPayByWx', {
        order_id
    })
}

// 取消订单
export const cancel_order = (order_id) => {
    return $post('/cancelOrder', {
        order_id
    })
}

// 确认收货
export const confirm_receipt = (order_id) => {
    return $post('/receiveGoods', {
        order_id
    })
}

// 统计订单状态数量
export const cal_order_count = () => {
    return $get('/orderCount')
}

// 添加商品评论
export const add_evaluate = (params) => {
    return $post('/evaluate', params)
}

// 获取用户的评论
export const get_user_evaluate = (page) => {
    return $get('/myEvaluate', {
        pageSize: 10,
        page
    })
}

// 上传图片
export const upLoadFile = (_value) => {
    return $post('/imgUpload', {
        fileBase64: _value
    })
}
/*****************爆款************************/
// 获取爆款模块佣金比例
export const get_template_rate = () => {
    return _get_no_loading('/cpsIndex')
}
// 获取爆款模块
export const get_template_commodity = (type, page) => {
    return _get_no_loading('/cpsChoicenessGoods', {
        type,
        pageSize: 10,
        page
    })
}
// 获取cps订单
export const get_template_order = (status, page) => {
    return $get_no_loading('/cpsOrderList', {
        status, page, pageSize: 10
    })
}
// 获取cps推广链接
export const get_template_promote_url = (params) => {
    return $get('/cpsPromotionUrl', params)
}

// 获取cps商品详情信息
export const get_template_commodity_detail = (params) => {
    let { type, goodsId } = params;
    return _get_no_loading('/goodsDetails', {
        type: Number(type) + 1, goodsId
    })
}

// cps搜索
// 搜索接口
export const get_search_template_commodity = (name, type, page) => {
    return new Promise((resolve, reject) => {
        _get_no_loading('/searchGoodsCps', {
            pageSize: 10,
            page,
            name,
            type
        }).then(res => {
            if (res.list.length > 0) {
                resolve(res)
            } else {
                reject()
            }
        }).catch(() => { })
    })
}
// cps分类列表
export const get_template_category = (type) => {
    return _get_no_loading('/getCatIdList', {
        type
    })
}

// cps分类数据查询
export const get_template_category_data = (cat_id, type, page) => {
    return new Promise((resolve, reject) => {
        return _get_no_loading('/getGoodsByCatId', {
            cat_id, type, page,
            pageSize: 10
        }).then(res => {
            console.log(res)
            if (res.length > 0) {
                resolve(res)
            } else {
                reject()
            }
        }).catch(() => { })
    })
}
/*******************爆款**********************/
//获取小程序码
export const get_qr_code = (params) => {
    return $get_no_loading('/getPoster', {
        ...params,
        width: 430
    })
}
// 商品搜索
export const get_search_commodity = (name, page) => {
    return new Promise((resolve, reject) => {
        return _get('/searchGoods', {
            pageSize: 10,
            page,
            name
        }).then(res => {

            if (res.rows.length > 0) {
                resolve(res)
            } else {
                reject()
            }
        }).catch(() => { })
    })
}
// 获取kind分类列表
export const get_commodity_by_kind = (kind_id, page) => {
    return new Promise((resolve, reject) => {
        return _get_no_loading('/getGoodsByKind', {
            kind_id, page,
            pageSize: 10
        }).then(res => {
            console.log(res)
            if (res.rows.length > 0) {
                resolve(res)
            } else {
                reject()
            }
        }).catch(() => { })
    })
}
// 更新用户信息
export const updateUserInfo = (storage) => {
    return new Promise((resolve, reject) => {
        return $get('/getUserInfoByToken').then(response => {
            Promise.all([storage('set', {
                key: 'allUserInfo',
                data: response.userInfo
            }), storage('set', {
                key: 'cpsUserInfo',
                data: response.cpsUserInfo
            }), storage('set', {
                key: 'phoneNumber',
                data: response.userInfo.phone
            })]).then(resolve())
        }).catch(() => { reject() })
    })
}

// 随机推荐商品
export const get_random_goods_data = ()=>{
    return new Promise((resolve, reject) => {
        return _get_no_loading('/randomGoods').then(res=>{
            if (res.rows.length > 0) {
                resolve(res)
            } else {
                reject()
            }
        }).catch(err=>{
            console.log(err);
        })    
    })
    
}