class EventListener{
    constructor(){
        this.events = {}
    }

    addEvent(eventName, obj, callback){
        if(!this.events[eventName]){
            this.events[eventName] = {}
        }
        const specifyEvent = this.events[eventName] 
        specifyEvent[obj] = callback
    }

    removeEvent(eventName, obj){
        if(!this.events[eventName]) return
        const specifyEvent = this.events[eventName] 
        specifyEvent[obj] = null
    }

    triggerEvent(eventName){
        if(!this.events[eventName]) return
        const specifyEvent = this.events[eventName] 
        for (const [key, callback] of Object.entries(specifyEvent)) {
            if(callback) {
                callback()
            }
        }
    }
}

module.exports = EventListener