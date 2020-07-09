var Board = require('./board.js')
var Player = require('./player.js')

module.exports = class GameEngine {
    constructor(spaceData, playerData) {
        this.board = new Board(spaceData, playerData)
        this.currentPlayer = 0
        this.gameState = "followInstructions"
        this.dieRoll = 0
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
      this.players[playerIndex].location %= this.board.spaces.length
    }
    next() {
        if (this.gameState == "clickToRoll") {
            this.dieRoll = Math.ceil(Math.random() * 6)
            this.gameState = "clickToMove"
            return "You rolled " + this.dieRoll + ": click to move."
          } else if (this.gameState == "clickToMove") {
            this.movePlayer(this.currentPlayer, this.dieRoll)
            var playerColor = this.players[this.currentPlayer].color
            var playerLocation = this.players[this.currentPlayer].location
            var instructions = this.board.spaces[playerLocation].instructions + " Click to end your turn."
            this.gameState = "followInstructions"
            return playerColor + " player: " + instructions
          } else if (this.gameState == "followInstructions") {
            this.currentPlayer += 1
            this.currentPlayer %= this.players.length
            var playerColor = this.players[this.currentPlayer].color
            this.gameState = "clickToRoll"
            return playerColor + " player: Click to roll."
          }
    }
}