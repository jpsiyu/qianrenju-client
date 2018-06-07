class Authorize{
    constructor(){
        this.openid = false
    }

    setOpenId(openid){
        this.openid = openid
        console.log('setopenid', this.openid)
    }
}

module.exports = Authorize