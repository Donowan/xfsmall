// 轻提示
export const wxShowToast = (params) => {
    let {
        icon = 'none',
        title,
        duration = 800
    } = params
    wx.showToast({
        icon,
        title,
        duration
    })
}

// actionSheet
export const wxActionSheet = (params) => {
    let { list, fontColor } = params;
    return new Promise((resove, reject) => {
        wx.showActionSheet({
            itemList: list,
            itemColor: fontColor,
            success(res) {
                resove(res)
            },
            fail(err) {
                reject(err)
            }
        })
    })

}

// 对话框
export const wxModal = (params) => {
    let { title = '提示', content ,cancelText='取消',showCancel=true,cancelColor='#333',confirmText='确认',confirmColor='#ff3600'} = params;
    return new Promise((resolve, reject) => {
        wx.showModal({
            title,content,cancelText,cancelColor,showCancel,confirmText,confirmColor,
            success(res) {
                if (res.confirm) {
                    resolve()
                } else if (res.cancel) {
                    reject()
                }
            }
        })
    })
}
