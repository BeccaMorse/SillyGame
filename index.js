var fabric = require('fabric').fabric

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
    top: totalTop + 30,
    left: totalLeft + 5,
    width: 200,
    height: 170
  });
  canvas.add(space);
  canvas.add(spaceTitle);
  canvas.add(spaceInstruction);
}

document.addEventListener("DOMContentLoaded", () => { 
    var canvas = new fabric.Canvas('myCanvas')
    makeSpace(canvas,"Title", "Instructions",0,0)
    makeSpace(canvas,"Title", "Instructions",0,1)
    makeSpace(canvas,"Title", "Instructions",0,2)
    makeSpace(canvas,"Title", "Instructions",0,3)
    makeSpace(canvas,"Title", "Instructions",0,4)
    makeSpace(canvas,"Title", "Instructions",1,0)
    makeSpace(canvas,"Title", "Instructions",2,0)
    makeSpace(canvas,"Title", "Instructions",3,0)
    makeSpace(canvas,"Title", "Instructions",4,0)
    makeSpace(canvas,"Title", "Instructions",1,4)
    makeSpace(canvas,"Title", "Instructions",2,4)
    makeSpace(canvas,"Title", "Instructions",3,4)
    makeSpace(canvas,"Title", "Instructions",4,4)
    makeSpace(canvas,"Title", "Instructions",4,1)
    makeSpace(canvas,"Title", "Instructions",4,2)
    makeSpace(canvas,"Title", "Instructions",4,3)


})