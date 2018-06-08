const Cemetery = require('./cemetery.js')

class Dataholder{
  constructor(){
    this.cemeteryList = null
  }

  initCemetery(stones){
    this.cemeteryList = stones.map( item => new Cemetery(item))
  }

  addCemetery(stone){
    this.cemeteryList.push(new Cemetery(stone)) 
  }

  deleteCemetery(stoneid){
    const filterFun = item => item._id !== stoneid
    const updateList = this.cemeteryList.filter(filterFun)
    this.cemeteryList = updateList
  }

  getAllCemetery(){
    return this.cemeteryList
  }

  getOneCemetery(itemid){
    const itemMatch = element => element._id === itemid
    const res = this.cemeteryList.find(itemMatch)
    return res
  }
}

module.exports = Dataholder