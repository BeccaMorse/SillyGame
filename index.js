var fabric = require('fabric').fabric

document.addEventListener("DOMContentLoaded", () => { 
    var canvas = new fabric.Canvas('myCanvas');
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 50,
      top: 50,
      stroke: 'red',
      fill: 'white',
      width: 200,
      height: 200
    });
    // "add" rectangle onto canvas
    canvas.add(rect);
    // var c = document.getElementById("myCanvas");
    // var ctx = c.getContext("2d");
    // ctx.moveTo(0, 0);
    // ctx.lineTo(1600, 800);
    // ctx.stroke();

    var spaceTitle = new fabric.Textbox("Standing Ovation: ", {
      fontWeight: 'bold',
      fontSize: 20,
      width: 200,
      height: 30,
      textAlign: 'center',
      top: 50,
      left: 50
    });
    var spaceInstruction = new fabric.Textbox("All the other family members " + 
    "will applaud and cheer while you take a bow. ", {
      fontWeight: 'normal',
      fontSize: 18,
      top: 80,
      left: 55,
      width: 200,
      height: 170
    });
    canvas.add(spaceTitle);
    canvas.add(spaceInstruction);
})