var Space = require('./space.js')
var Player = require('./player.js')

module.exports = class Board {
    constructor(spaceData, playerData) {
        this.spaces = new Array
        for (var i = 0; i < spaceData.length; i++) {
            this.spaces.push(new Space(
              spaceData[i].title,
              spaceData[i].instructions,
              spaceData[i].top,
              spaceData[i].left)
            )
        }
        this.players = new Array
        for (var i = 0; i < playerData.length; i++) {
            this.players.push(new Player(
                playerData[i].color,
                playerData[i].x,
                playerData[i].y
            ))
        }
    }
    movePlayer(playerIndex,dieRoll) {
        this.players[playerIndex].location += dieRoll
        this.players[playerIndex].location %= this.spaces.length
    }
}
    
