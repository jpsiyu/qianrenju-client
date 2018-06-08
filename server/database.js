const MongoClient = require('mongodb').MongoClient
const ObjectId = require('mongodb').ObjectId
const mongoose = require('mongoose')

class Database {

    constructor(){
        this.db = null
    }

    err(err, errCallback){
        if(errCallback)
            errCallback()
        console.log('Err', err)
    }

    // connect to database
    connect(callback){
        //mongoose.connect('mongodb://localhost/tombstone-wx')
        mongoose.connect('mongodb://jpsiyu:123456Tombstone@ds151530.mlab.com:51530/tombstone')
        this.db = mongoose.connection
        this.db.on('error', err => this.err(err))
        this.db.on('open', () => {
            callback()
        })
    }

    // fetch stones
    fetchStones(owner, callback, errCallback){
        Stone.find({owner}, (err, stones) => {
            if(err)
                this.err(err, errCallback)
            else
                callback(stones)
        } )
    }

    // insert stone
    insertStone(stone, callback, errCallback){
        stone.save( (err, stone) => {
            if(err)
                this.err(err, errCallback)
            else
                callback(stone)
        })
    }

    // find stone by id
    findStoneById(id, callback, errCallback){
        Stone.findById(id, (err, stone) => {
            if(err)
                this.err(err, errCallback)
            else
                callback(stone)
        })
    }

    //delte stone by id
    deleteStoneById(id, owner, callback, errCallback){
        const objId = ObjectId(id)
        Stone.remove({_id: id, owner}, (err) => {
            if(err)
                this.err(err, errCallback)
            else
                callback()

        })
    }
}

const stoneSchema = mongoose.Schema({
    owner: Object,
    name: String,
    age: Number,
    gender: String,
    location: [Number],
    locationName: String,
})
const Stone = mongoose.model('Stone', stoneSchema)

module.exports = {
    Database,
    Stone,
}