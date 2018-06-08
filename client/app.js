const Authorize = require('./lib/authorize.js')
const Dataholder = require('./lib/dataholder.js')
const Communicate = require('./lib/communicate.js')
const EventListener = require('./lib/eventListener.js')
const util = require('./lib/util.js')

App({
  userInfo: false,
  dataholder: false,
  authorize: false,
  communicate : false,
  eventListener: false,

  onLaunch: function() {
    this.init()
    this.userLogin()
  },

  init: function(){
    this.authorize = new Authorize()
    this.dataholder = new Dataholder()
    this.communicate = new Communicate(this)
    this.eventListener = new EventListener()

  },
  
  userLogin: function(){
    wx.login({
      success: res => { this.communicate.requestOpenId(res.code)},
      fail: () => util.wxAlert(res)
    })
  },
})
