class Cemetery {
    constructor(stone){
        this._id = stone._id
        this.owner = stone.owner
        this.name = stone.name
        this.age = stone.age
        this.gender = stone.gender
        this.location = stone.location
        this.locationName = stone.locationName

        this.show = false
        this.lngLat = `${Math.floor(this.location[0])}, ${Math.floor(this.location[1])}`
        this.genderDesc = this.gender == 'male' ? '男' : '女'
        this.image = this.gender == 'male' ? '../../images/man.png':'../../images/woman.png'
    }
}

module.exports = Cemetery