var Space = require('./space.js')

module.exports = class Board {
    constructor(spaceData) {
        this.spaces = new Array
        for (var i = 0; i < spaceData.length; i++) {
            this.spaces.push(new Space(
              spaceData[i].title,
              spaceData[i].instructions,
              spaceData[i].top,
              spaceData[i].left)
            )
        }
    }
}
    
