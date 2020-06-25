var Board = require('./board.js')

module.exports = class GameEngine {
    constructor(spaceData, playerData) {
        this.board = new Board(spaceData, playerData)
        this.currentPlayer = 0
        this.gameState = "followInstructions"
        this.dieRoll = 0
    }
    next() {
        if (this.gameState == "clickToRoll") {
            this.dieRoll = Math.ceil(Math.random() * 6)
            this.gameState = "clickToMove"
            return "You rolled " + this.dieRoll + ", click to move"
          } else if (this.gameState == "clickToMove") {
            this.board.movePlayer(this.currentPlayer, this.dieRoll)
            var playerColor = this.board.players[this.currentPlayer].color
            this.gameState = "followInstructions"
            return playerColor + " player: Follow instructions"
          } else if (this.gameState == "followInstructions") {
            this.currentPlayer += 1
            this.currentPlayer %= this.board.players.length
            var playerColor = this.board.players[this.currentPlayer].color
            this.gameState = "clickToRoll"
            return playerColor + " player: Click to roll"
          }
    }
}