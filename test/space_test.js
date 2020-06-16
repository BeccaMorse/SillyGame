var Space = require('../space.js')

var assert = require('assert')

describe('Space', function() {
    it('has a title', function() {
        var space = new Space('Hello', 'Do something', 0, 0)
        assert.equal(space.title, "Hello")
    })

    it('must have a title', function() {
        assert.throws(function() {
            var space = new Space('', 'Do something', 0, 0)
        })
    })

    it('must have instructions', function() {
        assert.throws(function() {
            var space = new Space('Hello', '', 0, 0)
        })
    })
})