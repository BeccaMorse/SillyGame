var fabric = require('fabric').fabric
var space_data = require('./spaces.json')
var player_data = require('./players.json')
var Board = require('./board.js')
var board = new Board(space_data, player_data)

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
  playerMarker.selectable = false
  canvas.add(playerMarker)
  return playerMarker
}
var movePlayerMarker = function (currentPlayer, playerMarker) {
  var spaceIndex = board.players[currentPlayer].location
  playerMarker.top = space_data[spaceIndex].top * 180 + board.players[currentPlayer].y
  playerMarker.left = space_data[spaceIndex].left * 180 + board.players[currentPlayer].x
  // 180 is hardcoded space size, refactor later
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
    var turnIndicator = new fabric.Text("Click to start", {
      top: 220,
      left: 200,
      originX: 'left',
      originY: 'center',
      fontSize: 24,
      fontFamily: 'Comic Sans MS'
    })
    turnIndicator.selectable = false
    canvas.add(turnIndicator)

    for (i = 0; i < board.spaces.length; i++) {
      makeSpace(canvas, board.spaces[i])
    }
    var playerMarkers = []
    for (i = 0; i < board.players.length; i++) {
      playerMarkers.push(makePlayer(canvas, board.players[i]))
    }
    var currentPlayer = 0
    var dieRoll = 0
    var gameState = "followInstructions"
    canvas.on('mouse:down',function () {
      if (gameState == "clickToRoll") {
        dieRoll = Math.ceil(Math.random() * 6)
        turnIndicator.text = "You rolled " + dieRoll + ", click to move"
        gameState = "clickToMove"
      } else if (gameState == "clickToMove") {
        board.movePlayer(currentPlayer, dieRoll)
        movePlayerMarker(currentPlayer, playerMarkers[currentPlayer])
        var playerColor = board.players[currentPlayer].color
        turnIndicator.text = playerColor + " player: Follow instructions"
        gameState = "followInstructions"
      } else if (gameState == "followInstructions") {
        currentPlayer += 1
        currentPlayer %= board.players.length
        var playerColor = board.players[currentPlayer].color
        turnIndicator.text = playerColor + " player: Click to roll"
        gameState = "clickToRoll"
      }
    })
  })