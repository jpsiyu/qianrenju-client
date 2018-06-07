var app = getApp()

// pages/add/add.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    longitude: null,
    latitude: null,
    lngLat: '',
    addrName: '未设置',
    name: null,
    radioItems: [],
    showTopTips: false,
    errMsg: '',
  },

  timeoutHandler: null,

  chooseLocation: function () {

    const successCallback = res => {
      if(res.name) this.data.addrName = res.name
      else if(res.address) this.data.addrName = res.address
      else this.data.addrName = '所选位置未命名' 


      this.data.longitude = res.longitude
      this.data.latitude = res.latitude
      this.data.lngLat = `(${res.longitude}, ${res.latitude})`

      console.log(res, this.data)
      this.setData(this.data )
    }

    wx.chooseLocation({success: successCallback})
  },

  fromCheck(formData){
    let msg = ''
    let ok = false
    const nameLen = formData.name.length
    const reg=/^[0-9]+.?[0-9]*$/
    const isNumber = reg.test(formData.age)

    if(nameLen <=0 || nameLen > 6){
      msg = '名字长度0到6个字符'
    }else if(!isNumber){
      msg = '年龄字段输入有误'
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
    const checkRes = this.fromCheck(event.detail.value)
    if(!checkRes.ok){
      this.setData({errMsg: checkRes.msg})
      this.showTopTips()
      return
    }
    let inputName = event.detail.value.name
    if (inputName == '')
      inputName = "无名"
    const age = Number(event.detail.value.age)
    
    const successCallback = (stone) => {
      app.dataholder.addCemetery(stone)
      wx.switchTab({url: '/pages/main/main'})
    }

    app.requestAddStone(
      inputName, 
      age,
      [this.data.longitude, this.data.latitude],
      this.data.addrName,
      successCallback,
    )
  },


  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.setData({
      radioItems: [
        {value: 'male', name: '男性', checked: true},
        {value: 'female', name: '女性', checked: false},
      ]
    })
  },

  radioChange: function(event){
    const choose = event.detail.value
    this.data.radioItems.map( item => {
      if(item.value === choose)
        item.checked = true
      else
        item.checked = false
    })
    this.setData({radioItems: this.data.radioItems})
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