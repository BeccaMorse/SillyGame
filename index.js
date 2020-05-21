var fabric = require('fabric').fabric

var data = require('./data.json')

var makeSpace = function (canvas, title, instructions, left, top) {
  var startLeft = 50
  var startTop = 50
  var offsetLeft = left * 200
  var offsetTop = top * 200
  var totalLeft = startLeft + offsetLeft
  var totalTop = startTop + offsetTop
  var space = new fabric.Rect({
    left: totalLeft,
    top: totalTop,
    stroke: 'black',
    fill: 'white',
    width: 200,
    height: 200
  });
  var spaceTitle = new fabric.Textbox(title, {
    fontWeight: 'bold',
    fontSize: 20,
    width: 200,
    height: 30,
    textAlign: 'center',
    top: totalTop,
    left: totalLeft
  });
  var spaceInstruction = new fabric.Textbox(instructions, {
    fontWeight: 'normal',
    fontSize: 18,
    top: totalTop + 60,
    left: totalLeft + 5,
    width: 190,
    height: 170
  });
  canvas.add(space);
  canvas.add(spaceTitle);
  canvas.add(spaceInstruction);
}

document.addEventListener("DOMContentLoaded", () => { 
    var canvas = new fabric.Canvas('myCanvas')
    for (i = 0; i < data.length; i++) {
      console.log(data[i])
      makeSpace(canvas,
        data[i].title,
        data[i].instructions,
        data[i].top,
        data[i].left)
    }
})