 // 路由跳转
 const jump = function(methods,path) { 
    return new Promise((resolve, reject) => { 
        if (methods == 'navigation') {
            wx.navigateTo({
                url: path,
                success: function (res) {
                    resolve()
                },
                fail: function () {
                    reject()
                }
            })
        } else if (methods == 'switchTable') {
            wx.switchTab({
                url: path,
                success: function (res) {
                    resolve()
                },
                fail: function () {
                    reject()
                }
            })
        } else if (methods == 'redirectTo') {
            wx.redirectTo({
                url: path,
                success: function (res) {
                    resolve()
                },
                fail: function () {
                    reject()
                }
            })
        } else if (methods == 'reLaunch') { 
            wx.showLoading({ title: '更新中...' });         
            wx.reLaunch({
               url: path,
                success: function (res) {
                    resolve()
                    wx.hideLoading()
               },
               fail: function () {
                   reject()
               }
            })
        }
   })
}

// 下面处理页面跳转模块
export default {
    // 跳转到我的页面
    jump_user(methods='switchTable'){
        jump(methods, '/pages/user/user')
    },
    // 跳转搜索页面
    jump_search(methods='navigation') { 
        jump(methods, '/pages/search/search')
    },

    // 跳转搜索内容展示页
    jump_searchDetail(params,methods='navigation') { 
        jump(methods, `/pages/search/searchDetail/searchDetail?${params}`)
    },

    // 跳转special搜索页
    jump_special_search_detail(params,methods='navigation') { 
        jump(methods, `/pages/specialSearch/specialSearchDetail/specialSearchDetail?${params}`)
    },

    // 跳转首页
    jump_home(method='switchTable') { 
        jump(method, '/pages/index/index')
    },

    // 跳转商品详情页
    jump_commodity_detail(params,method='navigation'){
        jump(method,`/pages/index/commodityDetail/commodityDetail?${params}`)
    },
    // 跳转活动列表页
    jump_active_list(params,method='navigation'){
        jump(method,`/pages/index/activeList/activeList?${params}`)
    },

    // 跳转模板商品详情页
    jump_template_commodity_detail(params,method='navigation'){
        jump(method,`/pages/template/commodityDetail/commodityDetail?${params}`)
    },
    // 跳转制作海报页面
    jump_create_poster(params){
        jump('navigation', `/pages/createPoster/createPoster?${params}`)
    },

    // 跳转到分类页面
    jump_sort(params,methods='navigation'){
        jump(methods, `/pages/sort/sort?${params}`)
    },

    // 跳转到购物车页面
    jump_my_cart(methods='navigation'){
        jump(methods, '/pages/myCart/myCart')
    },

    // 跳转到订单提交页面
    jump_edit_order(params,methods="navigation"){
        jump(methods, `/pages/editOrder/editOrder?${params}`)
    },

    // 跳转到选择地址页面
    jump_choose_address(params,methods="navigation"){
        jump(methods, `/pages/manageAddress/chooseAddress/chooseAddress?field=${params}`)
    },

    // 跳转到新增地址页面
    jump_add_address(params,methods="navigation"){
        jump(methods, `/pages/manageAddress/addAddress/addAddress?field=${params}`)
    },

    // 跳转到编辑地址页面
    jump_edit_address(params,methods="navigation"){
        jump(methods, `/pages/manageAddress/editAddress/editAddress?field=${params}`)
    },

    // 跳转到订单列表页
    jump_order_list(params,methods="navigation"){
        jump(methods, `/pages/orderList/orderList?field=${params}`)
    },

     // 跳转到订单详情页
     jump_order_detail(params,methods="navigation"){
        jump(methods, `/pages/orderList/orderDetail/orderDetail?field=${params}`)
    },

    // 跳转到物流信息页面
    jump_trans_info(params,methods="navigation"){
        jump(methods, `/pages/transInfo/transInfo?field=${params}`)
    },

    // 跳转到所有工具
    jump_all_tool(params,methods="navigation"){
        jump(methods, `/pages/allTool/allTool?field=${params}`)
    },
    // 跳转到支付成功页
    // 这里名字取错了，应该是跳转订单操作返回结果页面
    jump_pay_success(params,methods="redirectTo"){
        jump(methods, `/pages/paySuccess/paySuccess?order_id=${params}`)
    },
    
    // 跳转到评价页面
    jump_add_evaluate(params,methods="navigation"){
        jump(methods, `/pages/evaluate/addEvaluate/addEvaluate?order_id=${params}`)
    },

    // 跳转到我的分支页
    jump_user_branch(params,methods="navigation"){
        jump(methods, `/pages/userBranch/${params}/${params}`)
    },
    // 跳转到商品所有评价页
    jump_commodity_evaluate(params,methods="navigation"){
        jump(methods, `/pages/evaluate/allEvaluate/allEvaluate?goods_id=${params}`)
    },
    // 跳转至模板页面我的个人
    jump_template_user(params,methods='navigation'){
        jump(methods,`/pages/template/user/user`)
    },
    // 跳转模板我的分支
    jump_template_user_branch(params,methods="navigation"){
        jump(methods, `/pages/template/user/${params}/${params}`)
    }
}