// pages/main/main.js
var util = require('../../lib/util.js')
var app = getApp()

Page({

  /**
   * 页面的初始数据
   */
  data: {
    cemetery: null,
    pageHide: false,
    loading: true,
  },

  isCemeteryOpen(stoneid){
    console.log("check", stoneid)
    const s = this.data.cemeteryStatus[stoneid]
    return s === true
  },

  updateView: function(){
    if(this.data.pageHide) return
    let cemetery = app.dataholder.getAllCemetery()
    if(!cemetery) cemetery = []
    this.setData({ cemetery: cemetery })
  },

  onBtnDel: function(event){
    const stoneid = event.currentTarget.dataset.id
    app.communicate.postDelStone(stoneid, ()=>{this.updateView()})
  },

  onBtnMap: function(event){
    const stoneid = event.currentTarget.dataset.id
    const cemetery = this.findCemetery(stoneid)
    if(!cemetery){
      console.log('cannot find cemetery', stoneid)
      return
    }
    this.showLocation(cemetery.locationName, cemetery.location[0], cemetery.location[1])
  },

    /**
   * 显示位置
   */
  showLocation: function(addressName,longitude, latitude){
    const failFun = res => console.log(res)
    wx.openLocation({
      latitude,
      longitude,
      scale: 28,
      address: addressName,
      fail: failFun,
    })
  },


  findCemetery: function(stoneid){
    const res = this.data.cemetery.find((item) => item._id === stoneid)
    return res
  },

  onBtnCemetery: function(event){
    const stoneid = event.currentTarget.dataset.id
    const cemetery = this.findCemetery(stoneid)
    if(cemetery){
      cemetery.show = !(cemetery.show === true)
    }
    this.setData({cemetery: this.data.cemetery})
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function () {
    const receive = () => {
      this.setData({loading: !app.dataholder.receive})
      this.updateView()
    }
    app.eventListener.addEvent('receStones', this, receive)
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
    this.setData({
      pageHide: false,
      loading: !app.dataholder.receive
    })
    this.updateView()
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    this.setData({pageHide: true})
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