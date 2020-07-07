var fabric = require('fabric').fabric
var spaceData = require('./spaces.json')
var playerData = require('./players.json')
var GameEngine = require('./gameEngine.js')
var gameEngine = new GameEngine(spaceData, playerData)

var spaceSize = window.innerWidth / 8

var addToCanvas = function(canvas, fabricElement) {
  fabricElement.selectable = false
  canvas.add(fabricElement)
  return fabricElement
}

var makeSpace = function (canvas, space) {
  var fontSize = spaceSize / 12
  var padding  = spaceSize / 20

  var titleHeight = spaceSize / 10
  var instructionHeight = spaceSize / 2

  var offsetLeft = space.left * spaceSize
  var offsetTop = space.top * spaceSize

  addToCanvas(canvas, new fabric.Rect({
    left: offsetLeft,
    top: offsetTop,
    stroke: 'black',
    fill: 'white',
    width: spaceSize,
    height: spaceSize
  }))
  addToCanvas(canvas, new fabric.Textbox(space.title, {
    fontWeight: 'bold',
    fontSize: fontSize * 1.10,
    width: spaceSize,
    textAlign: 'center',
    originY: 'center',
    top: offsetTop + titleHeight,
    left: offsetLeft
  }))
  addToCanvas(canvas, new fabric.Textbox(space.instructions, {
    fontWeight: 'normal',
    fontSize: fontSize,
    top: offsetTop + instructionHeight,
    left: offsetLeft + padding,
    width: spaceSize - (padding * 2),
    textAlign: 'center',
    originY: 'center'
  }))
}

var makePlayer = function (canvas, player) {
  return addToCanvas(canvas, new fabric.Rect({
    left: player.x * spaceSize,
    top: player.y * spaceSize,
    stroke: 'black',
    fill: player.color,
    width: spaceSize / 18,
    height: spaceSize / 18
  }))
}
var movePlayerMarker = function (currentPlayer, playerMarker) {
  var spaceIndex = gameEngine.players[currentPlayer].location
  playerMarker.top = (spaceData[spaceIndex].top + gameEngine.players[currentPlayer].y) * spaceSize
  playerMarker.left = (spaceData[spaceIndex].left + gameEngine.players[currentPlayer].x) * spaceSize
}
document.addEventListener("DOMContentLoaded", () => { 
    var canvas = new fabric.Canvas('myCanvas')
    addToCanvas(canvas, new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'white',
      width: 1082,
      height: 722
    }))
    var gameName = addToCanvas(canvas, new fabric.Text('Silly Game', {
      top: 2 * spaceSize,
      left: 3 * spaceSize,
      originX: 'center',
      originY: 'center',
      fontSize: spaceSize / 3,
      fontFamily: 'Comic Sans MS',
      fill: 'Grey'
    }))
    gameName.rotate(-25)

    var turnIndicator = addToCanvas(canvas, new fabric.Textbox("Click to start", {
      top: 1.22 * spaceSize,
      left: 1.11 * spaceSize,
      height: 3.33 * spaceSize,
      width: 2.22 * spaceSize,
      originX: 'left',
      originY: 'top',
      fontSize: spaceSize / 7.5,
      fontFamily: 'Comic Sans MS'
    }))
    for (i = 0; i < gameEngine.board.spaces.length; i++) {
      makeSpace(canvas, gameEngine.board.spaces[i])
    }
    var playerMarkers = []
    for (i = 0; i < gameEngine.players.length; i++) {
      playerMarkers.push(makePlayer(canvas, gameEngine.players[i]))
    }
    canvas.on('mouse:down',function () {
      turnIndicator.text = gameEngine.next()
      var currentPlayer = gameEngine.currentPlayer
      movePlayerMarker(currentPlayer, playerMarkers[currentPlayer])
    })
  })