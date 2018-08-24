const util = require('./util.js')

class CommunicateOptions{
    constructor(method, path, data, success){
        this.method = method
        this.path = path
        this.data = data
        this.success = success
    }
}

class Communicate {
    constructor(){
        this.serverUrl = 'https://qrj.qianrenju.club'
        //this.serverUrl = 'http://qrj.localhost'
        this.waiting = false
    }


    willSend2Server(){
        this.waiting = true
        wx.showLoading({title: '数据加载中', mask: true})
    }

    receFromServer(){
        this.waiting = false
        wx.hideLoading()
    }

    send2Server(options){
        if(this.waiting){
            console.log(`block ${options.path}, communicating...`)
            return
        }

        this.willSend2Server()
        wx.request({
            url: this.serverUrl + options.path,
            method: options.method,
            data: options.data,
            success: res => {
                this.receFromServer()
                options.success(res)
            },
            fail: res => {
                this.receFromServer()
                util.wxAlert(res)
            }
        })
    }

    requestOpenId(code){
        const options = new CommunicateOptions(
            'GET',
            '/api/openid',
            {code},
            res => {
                const serverMsg = res.data
                if(serverMsg.ok){
                  const openid = serverMsg.data.openid 
                  getApp().authorize.setOpenId(openid)
                  this.requestStones()
                }else{
                  util.alert(serverMsg.message)
                }
            }
        )
        this.send2Server(options)
    }

    requestStones() {
        const options = new CommunicateOptions(
            'GET',
            '/api/stones',
            {openid: getApp().authorize.openid},
            res => {
              const serverMsg = res.data
              if(serverMsg.ok){
                getApp().dataholder.initCemetery(serverMsg.data.stones)
                getApp().eventListener.triggerEvent('receStones')
              }else{
                util.alert(serverMsg.message)
              }
            }
        )
        this.send2Server(options)
    }
    
    requestAddStone(name, age, gender, location, locationName, callback){
        const owner = getApp().authorize.openid
        const options = new CommunicateOptions(
            'POST',
            '/api/stone',
            {owner, name, age, gender, location, locationName},   
            res => {
                const serverMsg = res.data
                if(serverMsg.ok){
                  getApp().dataholder.addCemetery(serverMsg.data.stone)
                  callback()
                }else{
                  util.alert(serverMsg.message)
                }
            }
        )
        this.send2Server(options)
    }
    
    postDelStone(stoneid, callback){
        const owner = getApp().authorize.openid
        const options = new CommunicateOptions(
            'DELETE',
            '/api/delete',
            {owner, stoneid},
            res => {
                const serverMsg = res.data
                if(serverMsg.ok){
                  getApp().dataholder.deleteCemetery(stoneid)
                  callback()
                }else{
                  util.alert(serverMsg.message)
                }
            }
        )
        this.send2Server(options)
    }
    
    postFeedback(msg, callback){
        const owner = getApp().authorize.openid
        const options = new CommunicateOptions(
            'POST',
            '/api/feedback',
            {owner, msg},
            res => {
                const serverMsg = res.data
                if(serverMsg.ok)
                  callback()
                else
                  util.alert(serverMsg.message)
            }
        )
        this.send2Server(options)
    }
}

module.exports = Communicate