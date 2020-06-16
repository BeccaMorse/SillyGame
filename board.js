var Space = require('./space.js')

module.exports = class Board {
    constructor(space_data) {
        this.spaces = new Array
        for (i = 0; i < space_data.length; i++) {
            this.spaces.push(new Space(
              space_data[i].title,
              space_data[i].instructions,
              space_data[i].top,
              space_data[i].left)
            )
        }
    }
}