var fabric = require('fabric').fabric
var spaceData = require('./spaces.json')
var playerData = require('./players.json')
var GameEngine = require('./gameEngine.js')
var gameEngine = new GameEngine(spaceData, playerData)

var addToCanvas = function(canvas, fabricElement) {
  fabricElement.selectable = false
  canvas.add(fabricElement)
  return fabricElement
}

var makeSpace = function (canvas, space) {
  var spaceSize = 180

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
    left: player.x,
    top: player.y,
    stroke: 'black',
    fill: player.color,
    width: 10,
    height: 10
  }))
}
var movePlayerMarker = function (currentPlayer, playerMarker) {
  var spaceIndex = gameEngine.players[currentPlayer].location
  playerMarker.top = spaceData[spaceIndex].top * 180 + gameEngine.players[currentPlayer].y
  playerMarker.left = spaceData[spaceIndex].left * 180 + gameEngine.players[currentPlayer].x
  // 180 is hardcoded space size, refactor later
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
      top: 360,
      left: 540,
      originX: 'center',
      originY: 'center',
      fontSize: 80,
      fontFamily: 'Comic Sans MS'
    }))
    gameName.rotate(-25)

    var turnIndicator = addToCanvas(canvas, new fabric.Textbox("Click to start", {
      top: 220,
      left: 200,
      height: 600,
      width: 400,
      originX: 'left',
      originY: 'top',
      fontSize: 24,
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