var GameEngine = require('../gameEngine.js')

var assert = require('assert')

describe('GameEngine', function() {
    it('changes state on next', function() {
        var spaceData = [{
            "title": "Space",
            "instructions": "do something",
            "top": 0,
            "left": 0
        }]
        var playerData = [{
            "color": "blue",
            "x": 0,
            "y": 0
        }]
        var gameEngine = new GameEngine(spaceData, playerData)
        assert.equal(gameEngine.gameState, 'followInstructions')
        gameEngine.next()
        assert.equal(gameEngine.gameState, 'clickToRoll')
        gameEngine.next()
        assert.equal(gameEngine.gameState, 'clickToMove')
        gameEngine.next()
        assert.equal(gameEngine.gameState, 'followInstructions')
    })
})