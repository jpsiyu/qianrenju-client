const startId = 1000

class Dataholder{
  constructor(){
    this.cemeteryList = null
  }

  initCemetery(cemetery){
    this.cemeteryList = cemetery
  }

  addCemetery(stone){
    this.cemeteryList.push(stone) 
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