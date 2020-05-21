var fabric = require('fabric').fabric

var data = require('./data.json')

var makeSpace = function (canvas, title, instructions, left, top) {
  var spaceSize = 180

  var fontSize = spaceSize / 12
  var padding  = spaceSize / 20

  var titleHeight = spaceSize / 10
  var instructionHeight = spaceSize / 2

  var startLeft = 50
  var startTop = 50
  var offsetLeft = left * spaceSize
  var offsetTop = top * spaceSize
  var totalLeft = startLeft + offsetLeft
  var totalTop = startTop + offsetTop
  var space = new fabric.Rect({
    left: totalLeft,
    top: totalTop,
    stroke: 'black',
    fill: 'white',
    width: spaceSize,
    height: spaceSize
  });
  var spaceTitle = new fabric.Textbox(title, {
    fontWeight: 'bold',
    fontSize: fontSize * 1.10,
    width: spaceSize,
    textAlign: 'center',
    originY: 'center',
    top: totalTop + titleHeight,
    left: totalLeft
  });
  var spaceInstruction = new fabric.Textbox(instructions, {
    fontWeight: 'normal',
    fontSize: fontSize,
    top: totalTop + instructionHeight,
    left: totalLeft + padding,
    width: spaceSize - (padding * 2),
    textAlign: 'center',
    originY: 'center'
  });
  canvas.add(space);
  canvas.add(spaceTitle);
  canvas.add(spaceInstruction);
}

document.addEventListener("DOMContentLoaded", () => { 
    var canvas = new fabric.Canvas('myCanvas')
    var gameName = new fabric.Text('Silly Game', {
      top: 50 + 360,
      left: 50 + 540,
      originX: 'center',
      originY: 'center',
      fontSize: 80,
      fontFamily: 'Comic Sans MS'
    })
    gameName.rotate(-25)
    canvas.add(gameName)
    for (i = 0; i < data.length; i++) {
      console.log(data[i])
      makeSpace(canvas,
        data[i].title,
        data[i].instructions,
        data[i].left,
        data[i].top)
    }
})