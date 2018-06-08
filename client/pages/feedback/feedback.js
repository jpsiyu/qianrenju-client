// pages/feedback/feedback.js
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    storageKey: 'feedback',
    showTopTips: false,
    tips: '',
    area: '',
    timeLimit: false,
    areaPlaceholder: ''
  },

  onAreaChange: function(event){
    this.data.area = event.detail.value
    this.checkAreaContent()
  },

  checkAreaContent(){
    if(this.data.area.length > 100){
      this.setData({
        tips: '字数超出100个哦！',
        showTopTips: true,
      })
      return false
    }else{
      this.setData({
        tips: '',
        showTopTips: false,
      })
      return true 
    }
  },

  // 2 hour limit
  isTimeLimit: function(){
    const value = wx.getStorageSync(this.data.storageKey)
    if (value) {
      const now = Date.now()
      const pass = new Date(value.submitTime)
      if ((now - pass) / (1000) > 7200) return false
      return true
    }
    return false
  },

  timeLimitCheck: function(){
    const limit = this.isTimeLimit()
    const placeholder = limit ? '鸽子去送信了,还没有回来!' : '你说你说...'
    this.setData({
      timeLimit: this.isTimeLimit(),
      areaPlaceholder: placeholder,
    })
  },

  onBtnSure: function(event){
    if(this.data.area.length == 0) return
    if(this.checkAreaContent()){
      const successFun = () => {
        this.setData({area: ''})
        wx.showToast({
          title: '已飞鸽传书',
          icon: 'success',
          duration: 1000
        })
        wx.setStorage({
          key: this.data.storageKey,
          data: {submitTime: new Date()},
          success: () => {this.timeLimitCheck()}
        })
      }
      app.postFeedback(this.data.area, successFun)
    }
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
    this.timeLimitCheck()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({area: ''})
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