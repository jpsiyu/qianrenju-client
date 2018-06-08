const Authorize = require('./lib/authorize.js')
const Dataholder = require('./lib/dataholder.js')
const EventListener = require('./lib/eventListener.js')

App({
  userInfo: false,
  dataholder: false,
  authorize: false,
  eventListener: false,
  //serverUrl: 'https://v9kxdipu.qcloud.la',
  serverUrl: 'https://145783848.qianrenju.club',
  //serverUrl: 'http://localhost',

  onLaunch: function() {
    this.init()
    this.userLogin()
    this.getSetting()
  },

  init: function(){
    this.authorize = new Authorize()
    this.dataholder = new Dataholder()
    this.eventListener = new EventListener()

  },
  
  userLogin: function(){
    wx.login({
      success: res => {
        console.log('userLogin', res)
        this.requestOpenId(res.code)
      }
    })
  },
  
  requestOpenId: function(code){
    const successCallback = (res) => {
      const serverMsg = res.data
      if(serverMsg.ok){
        const openid = serverMsg.data.openid 
        this.authorize.setOpenId(openid)
        this.requestStones()
      }
    }

    const failCallback = (res) => {
      console.log('fail', res)
    }
    wx.request({
      //url: 'http://localhost/api/openid',
      url: this.serverUrl + '/api/openid',
      data: {code},
      header: {
          'content-type': 'application/json'
      },
      success: successCallback,
      fail: failCallback,
    })
  },
  
  getSetting: function(){
    wx.getSetting(res => {
      console.log('userSetting', res)
    })
  },
  
  getUserInfo: function(){
    wx.getUserInfo({
      success: res => {
        console.log('userInfo', res)
      }
    })
  },
  
  requestStones: function() {
    wx.request({
      //url: 'http://203.195.207.74/api/stones',
      url: this.serverUrl + '/api/stones',
      data: {openid: this.authorize.openid},
      success: (res) => {
        const serverMsg = res.data
        if(serverMsg.ok){
          this.dataholder.initCemetery(serverMsg.data.stones)
          this.eventListener.triggerEvent('receStones')
        }
      },
      fail: () => {console.log('err')}
    })
  },

  requestAddStone: function(name, age, gender, location, locationName, callback){
    const owner = this.authorize.openid
    wx.request({
      //url: 'http://localhost/api/stone',
      url: this.serverUrl + '/api/stone',
      data: {owner, name, age, gender, location, locationName},
      method: 'POST',
      success: (res) => {
        const serverMsg = res.data
        if(serverMsg.ok){
          console.log('success', serverMsg.data.stone)
          this.dataholder.addCemetery(serverMsg.data.stone)
          callback()
        }
      },
      fail: () => {console.log('err')}
    })
  },

  postDelStone: function(stoneid, callback){
    const owner = this.authorize.openid
    wx.request({
      //url: 'http://localhost/api/delete',
      url: this.serverUrl + '/api/delete',
      data: {owner, stoneid},
      method: 'DELETE',
      success: (res) => {
        const serverMsg = res.data
        if(serverMsg.ok){
          console.log('delete success')
          this.dataholder.deleteCemetery(stoneid)
          callback()
        }
      }
    })
  }
})
