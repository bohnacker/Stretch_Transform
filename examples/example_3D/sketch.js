// KEYS:
// + :                      add new anchor at mouse position
// - :                      delete selected anchor
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
  createCanvas(700, 700, WEBGL);

  anchorColor = color(120);
  anchorHiColor = color(0);

  myTransform.addAnchor([cubeW, cubeW, cubeW], [cubeW - offset, cubeW - offset, cubeW - offset]);
  myTransform.addAnchor([-cubeW, -cubeW, cubeW]);
  myTransform.addAnchor([-cubeW, cubeW, -cubeW]);
  myTransform.addAnchor([cubeW, -cubeW, -cubeW]);
  // myTransform.addAnchor([300, 0, 300], [350, 0, 330]);
  // myTransform.addAnchor([400, 0, 400], [350, 0, 370]);

  // myTransform.setWeightingMode(StretchTransform.DIRECTIONAL);

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
        var p1 = myTransform.transform(x, y, z);
        var p2 = myTransform.transform(x + tileSize, y, z);
        line(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
      }
    }
  }
  // y lines
  stroke(0, 170, 0);
  for (var z = -cubeW; z <= cubeW; z += tileSize) {
    for (var y = -cubeW; y < cubeW; y += tileSize) {
      for (var x = -cubeW; x <= cubeW; x += tileSize) {
        var p1 = myTransform.transform(x, y, z);
        var p2 = myTransform.transform(x, y + tileSize, z);
        line(p1[0], p1[1], p1[2], p2[0], p2[1], p2[2]);
      }
    }
  }
  // z lines
  stroke(40, 40, 255);
  for (var z = -cubeW; z < cubeW; z += tileSize) {
    for (var y = -cubeW; y <= cubeW; y += tileSize) {
      for (var x = -cubeW; x <= cubeW; x += tileSize) {
        var p1 = myTransform.transform(x, y, z);
        var p2 = myTransform.transform(x, y, z + tileSize);
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


// function mousePressed() {
//   dragOrigin = false;
//   dragTarget = false;
//   anchorNum = -1;

//   var io = myTransform.getAnchorByOriginPos([0, mouseX, mouseY], 10);
//   var it = myTransform.getAnchorByTargetPos([0, mouseX, mouseY], 10);

//   if (it >= 0) {
//     anchorNum = it;
//     dragTarget = true;
//   } else if (io >= 0) {
//     anchorNum = io;
//     dragOrigin = true;
//   } else {
//     myTransform.addAnchor([mouseX, 0, mouseY]);
//     anchorNum = myTransform.anchors.length - 1;
//     dragTarget = true;
//   }
// }

// function mouseReleased() {
//   dragOrigin = false;
//   dragTarget = false;
// }



function keyTyped() {

  if (key == '+') {
    myTransform.addAnchor([0, mouseX, mouseY]);
    anchorNum = myTransform.getAnchorCount() - 1;
  }

  if (key == '-') {
    if (anchorNum >= 0) {
      myTransform.removeAnchor(anchorNum);
      anchorNum = -1;
    }
  }

  if (key == 'q' || key == 'Q') {
    offset += 10;
    myTransform.setAnchorTarget(0, [cubeW - offset, cubeW - offset, cubeW - offset]);
  }
  if (key == 'a' || key == 'A') {
    offset -= 10;
    myTransform.setAnchorTarget(0, [cubeW - offset, cubeW - offset, cubeW - offset]);
  }

}