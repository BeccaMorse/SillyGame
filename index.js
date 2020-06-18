var fabric = require('fabric').fabric
var space_data = require('./spaces.json')
var player_data = require('./players.json')
var Board = require('./board.js')

var makeSpace = function (canvas, space) {
  var spaceSize = 180

  var fontSize = spaceSize / 12
  var padding  = spaceSize / 20

  var titleHeight = spaceSize / 10
  var instructionHeight = spaceSize / 2

  var offsetLeft = space.left * spaceSize
  var offsetTop = space.top * spaceSize
  var spaceSquare = new fabric.Rect({
    left: offsetLeft,
    top: offsetTop,
    stroke: 'black',
    fill: 'white',
    width: spaceSize,
    height: spaceSize
  });
  var spaceTitle = new fabric.Textbox(space.title, {
    fontWeight: 'bold',
    fontSize: fontSize * 1.10,
    width: spaceSize,
    textAlign: 'center',
    originY: 'center',
    top: offsetTop + titleHeight,
    left: offsetLeft
  });
  var spaceInstruction = new fabric.Textbox(space.instructions, {
    fontWeight: 'normal',
    fontSize: fontSize,
    top: offsetTop + instructionHeight,
    left: offsetLeft + padding,
    width: spaceSize - (padding * 2),
    textAlign: 'center',
    originY: 'center'
  });
  spaceSquare.selectable = false
  spaceTitle.selectable = false
  spaceInstruction.selectable = false
  canvas.add(spaceSquare)
  canvas.add(spaceTitle)
  canvas.add(spaceInstruction)
}

var makePlayer = function (canvas, player) {
  var playerMarker = new fabric.Rect({
    left: player.x,
    top: player.y,
    stroke: 'black',
    fill: player.color,
    width: 10,
    height: 10
  })
  canvas.add(playerMarker)
  return playerMarker
}
var movePlayerMarker = function (spaceIndex, playerMarker) {
  playerMarker.top = space_data[spaceIndex].top * 180 + 150
  playerMarker.left = space_data[spaceIndex].left * 180 + 85
  // 180 is hardcoded space size, refactor later
}
var moveForward = function (playerLocation, dieRoll, playerMarker) {
  playerLocation += dieRoll
  playerLocation %= space_data.length
  movePlayerMarker(playerLocation, playerMarker)
  return playerLocation
}

document.addEventListener("DOMContentLoaded", () => { 
    var canvas = new fabric.Canvas('myCanvas')
    var background = new fabric.Rect({
      left: 0,
      top: 0,
      fill: 'white',
      width: 1082,
      height: 722
    })
    background.selectable = false
    canvas.add(background)
    var gameName = new fabric.Text('Silly Game', {
      top: 360,
      left: 540,
      originX: 'center',
      originY: 'center',
      fontSize: 80,
      fontFamily: 'Comic Sans MS'
    })
    gameName.rotate(-25)
    gameName.selectable = false
    canvas.add(gameName)

    var board = new Board(space_data, player_data)
    for (i = 0; i < board.spaces.length; i++) {
      makeSpace(canvas, board.spaces[i])
    }
    var playerMarkers = []
    for (i = 0; i < board.players.length; i++) {
      playerMarkers.push(makePlayer(canvas, board.players[i]))
    }
    var playerLocation = 0
    canvas.observe('mouse:up',function () {
      playerLocation = moveForward(playerLocation,3,playerMarkers[0])
      //hard-coded both movement and playermarker index, need to refactor
    })
  })