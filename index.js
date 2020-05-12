document.addEventListener("DOMContentLoaded", () => { 
    var canvas = new fabric.Canvas('c');
    // create a rectangle object
    var rect = new fabric.Rect({
      left: 100,
      top: 100,
      fill: 'red',
      width: 20,
      height: 20
    });
    // "add" rectangle onto canvas
    canvas.add(rect);
    // var c = document.getElementById("myCanvas");
    // var ctx = c.getContext("2d");
    // ctx.moveTo(0, 0);
    // ctx.lineTo(1600, 800);
    // ctx.stroke();
})