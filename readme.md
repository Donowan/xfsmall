#### 项目结构

~~~javascript
│  app.js
│  app.json
│  app.wxss
│  jsconfig.json
│  project.config.json
│  readme.md
│  sitemap.json
│
├─component
│  ├─colorui  //刘海屏组件
│  │  │  animation.wxss
│  │  │  icon.wxss
│  │  │  main.wxss
│  │  │
│  │  └─components 
│  │          cu-custom.js
│  │          cu-custom.json
│  │          cu-custom.wxml
│  │          cu-custom.wxss
│  │
│  ├─customComponent //自定义组件
│  │  │  common.wxss
│  │  │
│  │  ├─addTip
│  │  │  │  index.js
│  │  │  │  index.json
│  │  │  │  index.wxml
│  │  │  │  index.wxss
│  │  │  │
│  │  │  └─assets
│  │  │          fav-1.jpg
│  │  │          fav-2.jpg
│  │  │          fav-3.jpg
│  │  │
│  │  ├─backTopBtn
│  │  │      backTopBtn.js
│  │  │      backTopBtn.json
│  │  │      backTopBtn.wxml
│  │  │      backTopBtn.wxss
│  │  │
│  │  ├─categoryList
│  │  │      categoryList.js
│  │  │      categoryList.json
│  │  │      categoryList.wxml
│  │  │      categoryList.wxss
│  │  │
│  │  ├─cell
│  │  │      cell.js
│  │  │      cell.json
│  │  │      cell.wxml
│  │  │      cell.wxss
│  │  │
│  │  ├─commodityCard
│  │  │      commodityCard.js
│  │  │      commodityCard.json
│  │  │      commodityCard.wxml
│  │  │      commodityCard.wxss
│  │  │
│  │  ├─dialog
│  │  │      dialog.js
│  │  │      dialog.json
│  │  │      dialog.wxml
│  │  │      dialog.wxss
│  │  │
│  │  ├─editCommodity
│  │  │      editCommodity.js
│  │  │      editCommodity.json
│  │  │      editCommodity.wxml
│  │  │      editCommodity.wxss
│  │  │
│  │  ├─enterMyCart
│  │  │      enterMyCart.js
│  │  │      enterMyCart.json
│  │  │      enterMyCart.wxml
│  │  │      enterMyCart.wxss
│  │  │
│  │  ├─evaluate
│  │  │      evaluate.js
│  │  │      evaluate.json
│  │  │      evaluate.wxml
│  │  │      evaluate.wxss
│  │  │
│  │  ├─evaluateList
│  │  │      evaluateList.js
│  │  │      evaluateList.json
│  │  │      evaluateList.wxml
│  │  │      evaluateList.wxss
│  │  │
│  │  ├─goodsAction
│  │  │      goodsAction.js
│  │  │      goodsAction.json
│  │  │      goodsAction.wxml
│  │  │      goodsAction.wxss
│  │  │
│  │  ├─labelNavigation
│  │  │      labelNavigation.js
│  │  │      labelNavigation.json
│  │  │      labelNavigation.wxml
│  │  │      labelNavigation.wxss
│  │  │
│  │  ├─loading
│  │  │      loading.js
│  │  │      loading.json
│  │  │      loading.wxml
│  │  │      loading.wxss
│  │  │
│  │  ├─modal
│  │  │      modal.js
│  │  │      modal.json
│  │  │      modal.wxml
│  │  │      modal.wxss
│  │  │
│  │  ├─myCart
│  │  │      myCart.js
│  │  │      myCart.json
│  │  │      myCart.wxml
│  │  │      myCart.wxss
│  │  │
│  │  ├─necessaryTools
│  │  │      necessaryTools.js
│  │  │      necessaryTools.json
│  │  │      necessaryTools.wxml
│  │  │      necessaryTools.wxss
│  │  │
│  │  ├─operationOrder
│  │  │      operationOrder.js
│  │  │      operationOrder.json
│  │  │      operationOrder.wxml
│  │  │      operationOrder.wxss
│  │  │
│  │  ├─orderList
│  │  │      orderList.js
│  │  │      orderList.json
│  │  │      orderList.wxml
│  │  │      orderList.wxss
│  │  │
│  │  ├─orderStatus
│  │  │      orderStatus.js
│  │  │      orderStatus.json
│  │  │      orderStatus.wxml
│  │  │      orderStatus.wxss
│  │  │
│  │  ├─productList
│  │  │      productList.js
│  │  │      productList.json
│  │  │      productList.wxml
│  │  │      productList.wxss
│  │  │
│  │  ├─refresh
│  │  │      refresh.js
│  │  │      refresh.json
│  │  │      refresh.wxml
│  │  │      refresh.wxss
│  │  │
│  │  ├─search
│  │  │      search.js
│  │  │      search.json
│  │  │      search.wxml
│  │  │      search.wxss
│  │  │
│  │  ├─selectSpecification
│  │  │      selectSpecification.js
│  │  │      selectSpecification.json
│  │  │      selectSpecification.wxml
│  │  │      selectSpecification.wxss
│  │  │
│  │  ├─selectTransMode
│  │  │      selectTransMode.js
│  │  │      selectTransMode.json
│  │  │      selectTransMode.wxml
│  │  │      selectTransMode.wxss
│  │  │
│  │  ├─shareDialog
│  │  │      shareDialog.js
│  │  │      shareDialog.json
│  │  │      shareDialog.wxml
│  │  │      shareDialog.wxss
│  │  │
│  │  ├─sharePoster
│  │  │      sharePoster.js
│  │  │      sharePoster.json
│  │  │      sharePoster.wxml
│  │  │      sharePoster.wxss
│  │  │
│  │  ├─shopInfo
│  │  │      shopInfo.js
│  │  │      shopInfo.json
│  │  │      shopInfo.wxml
│  │  │      shopInfo.wxss
│  │  │
│  │  ├─sort
│  │  │      sort.js
│  │  │      sort.json
│  │  │      sort.wxml
│  │  │      sort.wxss
│  │  │
│  │  ├─specialSearch
│  │  │      specialSearch.js
│  │  │      specialSearch.json
│  │  │      specialSearch.wxml
│  │  │      specialSearch.wxss
│  │  │
│  │  ├─swiper
│  │  │      swiper.js
│  │  │      swiper.json
│  │  │      swiper.wxml
│  │  │      swiper.wxss
│  │  │
│  │  ├─templateGoodsAction
│  │  │      templateGoodsAction.js
│  │  │      templateGoodsAction.json
│  │  │      templateGoodsAction.wxml
│  │  │      templateGoodsAction.wxss
│  │  │
│  │  ├─templateOrderList
│  │  │      templateOrderList.js
│  │  │      templateOrderList.json
│  │  │      templateOrderList.wxml
│  │  │      templateOrderList.wxss
│  │  │
│  │  ├─topSearch
│  │  │      topSearch.js
│  │  │      topSearch.json
│  │  │      topSearch.wxml
│  │  │      topSearch.wxss
│  │  │
│  │  ├─userCard
│  │  │      userCard.js
│  │  │      userCard.json
│  │  │      userCard.wxml
│  │  │      userCard.wxss
│  │  │
│  │  ├─userCellTemplate
│  │  │      userCellTemplate.js
│  │  │      userCellTemplate.json
│  │  │      userCellTemplate.wxml
│  │  │      userCellTemplate.wxss
│  │  │
│  │  └─userIncome
│  │          userIncome.js
│  │          userIncome.json
│  │          userIncome.wxml
│  │          userIncome.wxss
│  │
│  └─dist //部分vant组件
│      ├─button
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─card
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─common
│      │  │  color.d.ts
│      │  │  color.js
│      │  │  component.d.ts
│      │  │  component.js
│      │  │  index.wxss
│      │  │  utils.d.ts
│      │  │  utils.js
│      │  │
│      │  └─style
│      │      │  clearfix.wxss
│      │      │  ellipsis.wxss
│      │      │  hairline.wxss
│      │      │  var.wxss
│      │      │
│      │      └─mixins
│      │              clearfix.wxss
│      │              ellipsis.wxss
│      │              hairline.wxss
│      │
│      ├─dialog
│      │      dialog.d.ts
│      │      dialog.js
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─loading
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─mixins
│      │  │  basic.d.ts
│      │  │  basic.js
│      │  │  button.d.ts
│      │  │  button.js
│      │  │  link.d.ts
│      │  │  link.js
│      │  │  open-type.d.ts
│      │  │  open-type.js
│      │  │  safe-area.d.ts
│      │  │  safe-area.js
│      │  │  touch.d.ts
│      │  │  touch.js
│      │  │  transition.d.ts
│      │  │  transition.js
│      │  │
│      │  └─observer
│      │          behavior.d.ts
│      │          behavior.js
│      │          index.d.ts
│      │          index.js
│      │          props.d.ts
│      │          props.js
│      │
│      ├─overlay
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─popup
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─rate
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─stepper
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─switch
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      ├─transition
│      │      index.d.ts
│      │      index.js
│      │      index.json
│      │      index.wxml
│      │      index.wxss
│      │
│      └─wxs
│              array.wxs
│              bem.wxs
│              memoize.wxs
│              object.wxs
│              utils.wxs
│
├─config //配置文件
│      env.js // 域名配置
│      ui.js // 全部刘海图片
│
├─pages //页面
│  ├─allTool
│  │      allTool.js
│  │      allTool.json
│  │      allTool.wxml
│  │      allTool.wxss
│  │
│  ├─createPoster
│  │      createPoster.js
│  │      createPoster.json
│  │      createPoster.wxml
│  │      createPoster.wxss
│  │
│  ├─editOrder
│  │      editOrder.js
│  │      editOrder.json
│  │      editOrder.wxml
│  │      editOrder.wxss
│  │
│  ├─evaluate
│  │  ├─addEvaluate
│  │  │      addEvaluate.js
│  │  │      addEvaluate.json
│  │  │      addEvaluate.wxml
│  │  │      addEvaluate.wxss
│  │  │
│  │  └─allEvaluate
│  │          allEvaluate.js
│  │          allEvaluate.json
│  │          allEvaluate.wxml
│  │          allEvaluate.wxss
│  │
│  ├─index
│  │  │  index.js
│  │  │  index.json
│  │  │  index.wxml
│  │  │  index.wxss
│  │  │
│  │  ├─activeList
│  │  │      activeList.js
│  │  │      activeList.json
│  │  │      activeList.wxml
│  │  │      activeList.wxss
│  │  │
│  │  └─commodityDetail
│  │          commodityDetail.js
│  │          commodityDetail.json
│  │          commodityDetail.wxml
│  │          commodityDetail.wxss
│  │
│  ├─login
│  │      login.js
│  │      login.json
│  │      login.wxml
│  │      login.wxss
│  │
│  ├─manageAddress
│  │  ├─addAddress
│  │  │      addAddress.js
│  │  │      addAddress.json
│  │  │      addAddress.wxml
│  │  │      addAddress.wxss
│  │  │
│  │  ├─chooseAddress
│  │  │      chooseAddress.js
│  │  │      chooseAddress.json
│  │  │      chooseAddress.wxml
│  │  │      chooseAddress.wxss
│  │  │
│  │  └─editAddress
│  │          editAddress.js
│  │          editAddress.json
│  │          editAddress.wxml
│  │          editAddress.wxss
│  │
│  ├─myCart
│  │      myCart.js
│  │      myCart.json
│  │      myCart.wxml
│  │      myCart.wxss
│  │
│  ├─orderList
│  │  │  orderList.js
│  │  │  orderList.json
│  │  │  orderList.wxml
│  │  │  orderList.wxss
│  │  │
│  │  └─orderDetail
│  │          orderDetail.js
│  │          orderDetail.json
│  │          orderDetail.wxml
│  │          orderDetail.wxss
│  │
│  ├─paySuccess
│  │      paySuccess.js
│  │      paySuccess.json
│  │      paySuccess.wxml
│  │      paySuccess.wxss
│  │
│  ├─search
│  │  │  search.js
│  │  │  search.json
│  │  │  search.wxml
│  │  │  search.wxss
│  │  │
│  │  └─searchDetail
│  │          searchDetail.js
│  │          searchDetail.json
│  │          searchDetail.wxml
│  │          searchDetail.wxss
│  │
│  ├─sort
│  │      sort.js
│  │      sort.json
│  │      sort.wxml
│  │      sort.wxss
│  │
│  ├─specialSearch
│  │  │  specialSearch.js
│  │  │  specialSearch.json
│  │  │  specialSearch.wxml
│  │  │  specialSearch.wxss
│  │  │
│  │  └─specialSearchDetail
│  │          specialSearchDetail.js
│  │          specialSearchDetail.json
│  │          specialSearchDetail.wxml
│  │          specialSearchDetail.wxss
│  │
│  ├─template
│  │  │  template.js
│  │  │  template.json
│  │  │  template.wxml
│  │  │  template.wxss
│  │  │
│  │  ├─commodityDetail
│  │  │      commodityDetail.js
│  │  │      commodityDetail.json
│  │  │      commodityDetail.wxml
│  │  │      commodityDetail.wxss
│  │  │
│  │  └─user
│  │      │  user.js
│  │      │  user.json
│  │      │  user.wxml
│  │      │  user.wxss
│  │      │
│  │      └─order
│  │              order.js
│  │              order.json
│  │              order.wxml
│  │              order.wxss
│  │
│  ├─transInfo
│  │      transInfo.js
│  │      transInfo.json
│  │      transInfo.wxml
│  │      transInfo.wxss
│  │
│  ├─user
│  │      user.js
│  │      user.json
│  │      user.wxml
│  │      user.wxss
│  │
│  └─userBranch
│      ├─aboutUs
│      │      aboutUs.js
│      │      aboutUs.json
│      │      aboutUs.wxml
│      │      aboutUs.wxss
│      │
│      ├─coupon
│      │      coupon.js
│      │      coupon.json
│      │      coupon.wxml
│      │      coupon.wxss
│      │
│      ├─income
│      │      income.js
│      │      income.json
│      │      income.wxml
│      │      income.wxss
│      │
│      ├─myAddress
│      │      myAddress.js
│      │      myAddress.json
│      │      myAddress.wxml
│      │      myAddress.wxss
│      │
│      ├─myEvaluate
│      │      myEvaluate.js
│      │      myEvaluate.json
│      │      myEvaluate.wxml
│      │      myEvaluate.wxss
│      │
│      └─vipCard
│              vipCard.js
│              vipCard.json
│              vipCard.wxml
│              vipCard.wxss
│
├─process 
│      api.js //api接口
│      data.js //处理数据函数
│      http.js 封装请求
│      router.js //路由跳转
│      window.js //封装窗口交互（提示和弹窗等等）
│
├─public  //公共资源
│  ├─images //图片
│  │  │  addressBar.png
│  │  │  top.png
│  │  │
│  │  └─tabbar
│  │          indexs.png
│  │          indexs_cur.png
│  │          myCart.png
│  │          myCart_cur.png
│  │          template.png
│  │          template_cur.png
│  │          user.png
│  │          user_cur.png
│  │
│  └─style //字体
│          iconfont.wxss
│
├─template //模板
│  ├─commodityDetail 
│  │      commodityDetail.wxml
│  │      commodityDetail.wxss
│  │
│  ├─cps 
│  │      cps.wxml
│  │      cps.wxss
│  │
│  ├─element
│  │      element.wxml
│  │      element.wxss
│  │
│  ├─smallElement
│  │      smallElement.wxml
│  │      smallElement.wxss
│  │
│  └─userCard
│          userCard.wxml
│          userCard.wxss
│
├─typings
│      wx.d.ts
│
├─utils
│      expressList.js
│      util.js
│
└─wxs //wxs函数
        filter.wxs

~~~

