// pages/cart/index.js

const interfaces = require('../../utils/urlconfig')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        prolist: [],
        page: 1,
        size: 5
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        console.log(options)
        wx.showLoading({
            title: '加载中',
        });
        let _this = this;
        wx.setNavigationBarTitle({
            title: options.title
        });
        wx.request({
            url: interfaces.productionsList,
            data: {},
            header: { 'content-type': 'application/json' },
            method: 'GET',
            dataType: 'json',
            responseType: 'text',
            success: (res) => {
                console.log(res.data)
                _this.setData({
                    prolist: res.data
                })
                wx.hideLoading();
            },
            fail: () => { },
            complete: () => { }
        });



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
        // 请求数据
        wx.showNavigationBarLoading() //在标题栏中显示加载
        this.setData({
            page: 1,
            noData: false
        })
        const self = this
        wx.request({
            url: interfaces.productionsList,
            success(res) {
                self.setData({
                    prolist: res.data
                })
                // 隐藏加载状态
                wx.hideNavigationBarLoading()
                wx.stopPullDownRefresh();
            }
        })
    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function () {
        // 判读数据是否加载完毕
        if (this.data.noData) return

        // 停止下拉刷新
        wx.stopPullDownRefresh();
        wx.showNavigationBarLoading() //在标题栏中显示加载

        const prolist = this.data.prolist
        let page = this.data.page
        this.setData({ // 每次下拉 page+1
            page: ++page
        })
        const _this = this
        wx.request({
            url: interfaces.productionsList + '/' + _this.data.page + '/' + _this.data.size,
            success(res) {
                if (res.data.length == 0) {
                    _this.setData({
                        noData: true
                    })
                } else {
                    res.data.forEach(item => {
                        prolist.push(item)
                    })
                    _this.setData({
                        prolist: prolist
                    })
                }
                // 隐藏加载状态
                wx.hideNavigationBarLoading()
            }
        })
    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function () {

    },
    onReachBottom: function () {
        // 判读数据是否加载完毕
        if (this.data.noData) return

        // 停止下拉刷新
        wx.stopPullDownRefresh();
        wx.showNavigationBarLoading() //在标题栏中显示加载

        const prolist = this.data.prolist
        let page = this.data.page
        this.setData({ // 每次下拉 page+1
            page: ++page
        })
        const self = this
        wx.request({
            url: interfaces.productionsList + '/' + self.data.page + '/' + self.data.size,
            success(res) {
                if (res.data.length == 0) {
                    self.setData({
                        noData: true
                    })
                } else {
                    res.data.forEach(item => {
                        prolist.push(item)
                    })
                    self.setData({
                        prolist: prolist
                    })
                }
                // 隐藏加载状态
                wx.hideNavigationBarLoading()
            }
        })
    },
    /**
     * 点击查看详情
    */
    switchProlistDetail: function (e) {
        var index = e.currentTarget.dataset.index
        console.log(this.data.prolist[index].id)
        console.log(this.data.prolist)
        let detail = '详情'
        wx.navigateTo({
            url: '/pages/detail/index?id=' + this.data.prolist[index].id+'&title='+detail
        })
    }
})