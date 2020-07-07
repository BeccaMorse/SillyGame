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
    it('moves player in a loop', function() {
        var space_data = [{
            "title": "Space",
            "instructions": "do something",
            "top": 0,
            "left": 0
        }, {
            "title": "Second space",
            "instructions": "do something else",
            "top": 0,
            "left": 1
        }, {
            "title": "Third space",
            "instructions": "do something else",
            "top": 0,
            "left": 2
        }, {
            "title": "Fourth space",
            "instructions": "do something else",
            "top": 0,
            "left": 3
        }, {
            "title": "Fifth space",
            "instructions": "do something else",
            "top": 0,
            "left": 4
        }]
        var player_data = [{
            "color": "blue",
            "x": 0,
            "y": 0
        }]
        var gameEngine = new GameEngine(space_data, player_data)
        gameEngine.movePlayer(0, 8)
        assert.equal(gameEngine.players[0].location, 3)
    })
})