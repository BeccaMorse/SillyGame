var Board = require('../board.js')

var assert = require('assert')

describe('Board', function() {
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
        var board = new Board(space_data, player_data)
        board.movePlayer(0, 8)
        assert.equal(board.players[0].location, 3)
    })
})