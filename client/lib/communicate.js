const util = require('./util.js')

class Communicate {
    constructor(){
        this.serverUrl = 'https://145783848.qianrenju.club'
        //this.serverUrl = 'http://localhost'
    }

    requestOpenId(code){
        const successCallback = (res) => {
          const serverMsg = res.data
          if(serverMsg.ok){
            const openid = serverMsg.data.openid 
            getApp().authorize.setOpenId(openid)
            this.requestStones()
          }else{
            util.alert(serverMsg.message)
          }
        }
    
        wx.request({
          url: this.serverUrl + '/api/openid',
          data: {code},
          header: {
              'content-type': 'application/json'
          },
          success: successCallback,
          fail: res => util.wxAlert(res)
        })
    }

    requestStones() {
        wx.request({
          url: this.serverUrl + '/api/stones',
          data: {openid: getApp().authorize.openid},
          success: (res) => {
            const serverMsg = res.data
            if(serverMsg.ok){
              getApp().dataholder.initCemetery(serverMsg.data.stones)
              getApp().eventListener.triggerEvent('receStones')
            }else{
              util.alert(serverMsg.message)
            }
          },
          fail: res => util.wxAlert(res)
        })
    }
    
    requestAddStone(name, age, gender, location, locationName, callback){
        const owner = getApp().authorize.openid
        wx.request({
          url: this.serverUrl + '/api/stone',
          data: {owner, name, age, gender, location, locationName},
          method: 'POST',
          success: (res) => {
            const serverMsg = res.data
            if(serverMsg.ok){
              getApp().dataholder.addCemetery(serverMsg.data.stone)
              callback()
            }else{
              util.alert(serverMsg.message)
            }
          },
          fail: res => util.wxAlert(res)
        })
    }
    
    postDelStone(stoneid, callback){
        const owner = getApp().authorize.openid
        wx.request({
          url: this.serverUrl + '/api/delete',
          data: {owner, stoneid},
          method: 'DELETE',
          success: (res) => {
            const serverMsg = res.data
            if(serverMsg.ok){
              getApp().dataholder.deleteCemetery(stoneid)
              callback()
            }else{
              util.alert(serverMsg.message)
            }
          },
          fail: res => util.wxAlert(res)
        })
    }
    
    postFeedback(msg, callback){
        const owner = getApp().authorize.openid
        wx.request({
          url: this.serverUrl + '/api/feedback',
          data: {owner, msg},
          method: 'POST',
          success: (res) => {
            const serverMsg = res.data
            if(serverMsg.ok)
              callback()
            else
              util.alert(serverMsg.message)
          },
          fail: res => util.wxAlert(res)
        })
    }
}

module.exports = Communicate