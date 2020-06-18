var Space = require('./space.js')
var Player = require('./player.js')

module.exports = class Board {
    constructor(space_data, player_data) {
        this.spaces = new Array
        for (i = 0; i < space_data.length; i++) {
            this.spaces.push(new Space(
              space_data[i].title,
              space_data[i].instructions,
              space_data[i].top,
              space_data[i].left)
            )
        }
        this.players = new Array
        for (i = 0; i < player_data.length; i++) {
            this.players.push(new Player(
                player_data[i].color,
                player_data[i].x,
                player_data[i].y
            ))
        }
    }
}