// KEYS:
// q/a :                    increase/decrease offset of first anchor

'use strict';


var myTransform = new StretchTransform();


var tileSize = 50;
var cubeW = 125;

var anchorColor;
var anchorHiColor;

var anchorNum = -1;
var dragOrigin = false;
var dragTarget = false;

var offset = 150;

function setup() {
  var canvas = createCanvas(700, 700, WEBGL);
  canvas.parent('#sketch-holder');

  anchorColor = color(120);
  anchorHiColor = color(0);

  myTransform.addAnchor([cubeW, cubeW, cubeW], [cubeW - offset, cubeW - offset, cubeW - offset]);
  myTransform.addAnchor([-cubeW, -cubeW, cubeW]);
  myTransform.addAnchor([-cubeW, cubeW, -cubeW]);
  myTransform.addAnchor([cubeW, -cubeW, -cubeW]);
}


function draw() {

  noFill();
  stroke(0);
  strokeWeight(1);
  background(255);

  rotateY((mouseX - height / 2) / 100);
  rotateX((mouseY - width / 2) / 100);



  // x lines
  stroke(200, 50, 0);
  for (var z = -cubeW; z <= cubeW; z += tileSize) {
    for (var y = -cubeW; y <= cubeW; y += tileSize) {
      for (var x = -cubeW; x < cubeW; x += tileSize) {
        var p1 = myTransform.transform([x, y, z]);
        var p2 = myTransform.transform([x + tileSize, y, z]);
        line(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
      }
    }
  }
  // y lines
  stroke(0, 170, 0);
  for (var z = -cubeW; z <= cubeW; z += tileSize) {
    for (var y = -cubeW; y < cubeW; y += tileSize) {
      for (var x = -cubeW; x <= cubeW; x += tileSize) {
        var p1 = myTransform.transform([x, y, z]);
        var p2 = myTransform.transform([x, y + tileSize, z]);
        line(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
      }
    }
  }
  // z lines
  stroke(40, 40, 255);
  for (var z = -cubeW; z < cubeW; z += tileSize) {
    for (var y = -cubeW; y <= cubeW; y += tileSize) {
      for (var x = -cubeW; x <= cubeW; x += tileSize) {
        var p1 = myTransform.transform([x, y, z]);
        var p2 = myTransform.transform([x, y, z + tileSize]);
        line(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
      }
    }
  }

  for (var i = 0; i < myTransform.getAnchorCount(); i++) {
    stroke(anchorColor);
    if (i == anchorNum) stroke(anchorHiColor);

    var anchorOrig = myTransform.getAnchorOrigin(i);
    var anchorDest = myTransform.getAnchorTarget(i);
    line(anchorOrig[0], anchorOrig[1], anchorOrig[2], anchorDest[0], anchorDest[1], anchorDest[2]);
  }

  noStroke();
  for (var i = 0; i < myTransform.getAnchorCount(); i++) {
    push();
    fill(anchorColor);
    if (i == anchorNum) fill(anchorHiColor);

    var anchorOrig = myTransform.getAnchorOrigin(i);
    translate(anchorOrig[0], anchorOrig[1], anchorOrig[2])
    sphere(7);
    pop();
  }

  for (var i = 0; i < myTransform.getAnchorCount(); i++) {
    push();
    fill(anchorColor);
    if (i == anchorNum) fill(anchorHiColor);

    var anchorDest = myTransform.getAnchorTarget(i);
    translate(anchorDest[0], anchorDest[1], anchorDest[2])
    sphere(3);
    pop();
  }

}





function keyTyped() {

  if (key == 'q' || key == 'Q') {
    offset += 10;
    myTransform.setAnchorTarget(0, [cubeW - offset, cubeW - offset, cubeW - offset]);
  }
  if (key == 'a' || key == 'A') {
    offset -= 10;
    myTransform.setAnchorTarget(0, [cubeW - offset, cubeW - offset, cubeW - offset]);
  }

}