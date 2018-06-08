var app = getApp()

// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    name: '',
    age: '',
    gender: 'male',
    location: [],
    locationName:'未设置', 
    radioItems: [
      {value: 'male', name: '男性', checked: true},
      {value: 'female', name: '女性', checked: false},
    ],
    lngLat: '',
    showTopTips: false,
    errMsg: '',
  },
  timeoutHandler: null,

  chooseLocation: function () {
    const successCallback = res => {
      this.data.locationName = res.address ? `${res.name} ${res.address}` : '所选位置未命名' 
      this.data.location = [res.longitude, res.latitude]
      if(res.longitude && res.latitude)
        this.data.lngLat = `${Math.floor(res.longitude)}, ${Math.floor(res.latitude)}`
      this.setData(this.data )
    }
    wx.chooseLocation({success: successCallback})
  },

  fromCheck(){
    let msg = ''
    let ok = false
    const nameLen = this.data.name.length
    const reg=/^[0-9]+.?[0-9]*$/
    const isNumber = reg.test(this.data.age)

    if(nameLen <=0 || nameLen > 6){
      msg = '名字长度0到6个字符'
    }else if(!isNumber){
      msg = '年龄字段输入有误'
    }else if(!this.data.location[0]|| !this.data.location[1]){
      msg = '位置未正确设置'
    }else{
      ok = true
    }
    return {ok, msg}
  },

  showTopTips: function(){
    this.setData({showTopTips: true})
    if(this.timeoutHandler) clearTimeout(this.timeoutHandler)
    this.timeoutHandler = setTimeout(() => {this.setData({showTopTips: false})}, 3000)
  },

  /**
   * 表单提交
   */
  formSubmit: function(event){
    const checkRes = this.fromCheck()
    if(!checkRes.ok){
      this.setData({errMsg: checkRes.msg})
      this.showTopTips()
      return
    }
    const age = Number(this.data.age)
    const successCallback = () => {
      wx.switchTab({url: '/pages/main/main'})
      this.resetStatus()
    }

    app.requestAddStone(
      this.data.name, 
      age,
      this.data.gender,
      this.data.location,
      this.data.locationName,
      successCallback,
    )
  },

  onNameChange(event){
    const v = event.detail.value
    this.data.name = v
  },

  onAgeChange(event){
    const v = event.detail.value
    this.data.age = v
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
  },


  radioChange: function(event){
    const choose = event.detail.value
    this.data.gender = choose
    this.changeRadioStatus(choose)
  },

  changeRadioStatus(choose){
    this.data.radioItems.map( item => {
      if(item.value === choose)
        item.checked = true
      else
        item.checked = false
    })
    this.setData({radioItems: this.data.radioItems})
  },

  resetStatus: function(){
    this.setData({
      name: '',
      age: '',
      gender: 'male',
      locationName: '未设置',
      lngLat: '',
      showTopTips: false,
    })
    this.changeRadioStatus(this.data.gender)
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