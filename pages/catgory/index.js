// pages/catgory/index.js

const interfaces = require("../../utils/urlconfig")
Page({

    /**
     * 页面的初始数据
     */
    data: {
        navLeftItems: [],
        navRightItems: [],
        curIndex: 0
    },

    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function (options) {
        let _this = this;
        wx.showLoading({
            title: '加载中',
        });

        wx.request({
            url: interfaces.productions,
            header: {
                "content-type": "application/json"
            },
            success(res) {
                // console.log(res.data)
                _this.setData({
                    navLeftItems: res.data.navLeftItems,
                    navRightItems: res.data.navRightItems
                })
                // console.log(_this.data.navRightItems, _this.data.navLeftItems)
                wx.hideLoading();
            }
        })
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

    },
    // 点击切换tab
    switchRightTab(e) {
        let index = parseInt(e.currentTarget.dataset.index);
        this.setData({
            curIndex: index
        })
    },
    showListView(e) {
        let txt = e.currentTarget.dataset.txt;
        // 调用导航跳转方法
        wx.navigateTo({
            url: '/pages/list/index?title=' + txt,
            success: (result) => {

            },
            fail: () => { },
            complete: () => { }
        });
    }
})