// pages/modify/modify.js
const app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    itemid: null,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({itemid: options.itemid})
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  onBtnDel: function() {
    app.postDelStone(this.data.itemid, () => {
      wx.switchTab({url: '/pages/main/main'})
    })
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    const cemetery = app.dataholder.getOneCemetery(this.data.itemid)
    console.log('modify cemetery', cemetery)
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
  
  }
})