// pages/map/map.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latidude: null,
    name: null,
  },

  /**
   * 获取位置
   */
  getLocation: function(){
    this.mapCtx.getCenterLocation({
      success: function(res){ console.log(res.longitude, res.latitude)}
    })
  },

  /**
   * 显示位置
   */
  showLocation: function(){
    if (this.data.longitude == null)
      console.log('no position')
    else
      wx.openLocation({
        latitude: this.data.latitude,
        longitude: this.data.longitude,
      })
  },

  chooseLocation: function(){
    fetch = this.data
    wx.chooseLocation({
      success: function(res) {
        fetch.longitude = res.longitude
        fetch.latitude = res.latitude
        fetch.name = res.name
      },
    })
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  
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
  
  }
})