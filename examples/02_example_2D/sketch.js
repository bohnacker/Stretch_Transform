// KEYS:
// + :                      add new anchor at mouse position
// - :                      delete selected anchor
// q/a :                    increase/decrease exponent for matrix distance weighting
// w/s :                    increase/decrease exponent for point weighting
//
// MOUSE:
// click or drag:           drag anchor origin or target

'use strict';


var myTransform = new StretchTransform();


var tileSize = 10;
var margin = 100;

var anchorColor;
var anchorHiColor;

var anchorNum = -1;
var dragOrigin = false;
var dragTarget = false;


function setup() {
  canvas = createCanvas(700, 700);
  canvas.parent('#sketch-holder');

  anchorColor = color(0, 150, 0);
  anchorHiColor = color(200, 100, 0);

  myTransform.addAnchor([margin, margin]);
  myTransform.addAnchor([width - margin, margin]);
  myTransform.addAnchor([width - margin, height - margin]);
  myTransform.addAnchor([margin, height - margin]);
  myTransform.addAnchor([300, 300], [350, 330]);
  myTransform.addAnchor([400, 400], [350, 370]);

}


function draw() {

  noFill();
  stroke(0);
  strokeWeight(0.5);
  background(255);

  if (anchorNum >= 0) {
    if (dragOrigin) {
      myTransform.setAnchorOrigin(anchorNum, [mouseX, mouseY]);
    }
    if (dragTarget) {
      myTransform.setAnchorTarget(anchorNum, [mouseX, mouseY]);
    }
  }

  // horizontal lines
  for (var y = margin; y <= height - margin; y += tileSize) {
    for (var x = margin; x < width - margin; x += tileSize) {
      var p1 = myTransform.transform([x, y]);
      if (isNaN(p1[1])) noLoop();
      var p2 = myTransform.transform([x + tileSize, y]);
      line(p1[0], p1[1], p2[0], p2[1]);
    }
  }
  // vertical lines
  for (var y = margin; y < height - margin; y += tileSize) {
    for (var x = margin; x <= width - margin; x += tileSize) {
      var p1 = myTransform.transform([x, y]);
      var p2 = myTransform.transform([x, y + tileSize]);
      line(p1[0], p1[1], p2[0], p2[1]);
    }
  }

  for (var i = 0; i < myTransform.getAnchorCount(); i++) {
    stroke(anchorColor);
    if (i == anchorNum) stroke(anchorHiColor);

    var anchorOrig = myTransform.getAnchorOrigin(i);
    var anchorDest = myTransform.getAnchorTarget(i);
    line(anchorOrig[0], anchorOrig[1], anchorDest[0], anchorDest[1]);
  }

  strokeWeight(1);
  fill(255);
  for (var i = 0; i < myTransform.getAnchorCount(); i++) {
    stroke(anchorColor);
    if (i == anchorNum) stroke(anchorHiColor);

    var anchorOrig = myTransform.getAnchorOrigin(i);
    ellipse(anchorOrig[0], anchorOrig[1], 13, 13);
  }

  noStroke();
  for (var i = 0; i < myTransform.getAnchorCount(); i++) {
    fill(anchorColor);
    if (i == anchorNum) fill(anchorHiColor);

    var anchorDest = myTransform.getAnchorTarget(i);
    ellipse(anchorDest[0], anchorDest[1], 7, 7);
  }

}


function mousePressed() {
  dragOrigin = false;
  dragTarget = false;
  anchorNum = -1;

  var io = myTransform.getAnchorByOriginPos([mouseX, mouseY], 10);
  var it = myTransform.getAnchorByTargetPos([mouseX, mouseY], 10);

  if (it >= 0) {
    anchorNum = it;
    dragTarget = true;
  } else if (io >= 0) {
    anchorNum = io;
    dragOrigin = true;
  } else {
    myTransform.addAnchor(mouseX, mouseY);
    anchorNum = myTransform.anchors.length - 1;
    dragTarget = true;
  }
}

function mouseReleased() {
  dragOrigin = false;
  dragTarget = false;
}



function keyTyped() {

  if (key == '+') {
    myTransform.addAnchor([mouseX, mouseY]);
    anchorNum = myTransform.getAnchorCount() - 1;
  }

  if (key == '-') {
    if (anchorNum >= 0) {
      myTransform.removeAnchor(anchorNum);
      anchorNum = -1;
    }
  }

  if (key == 'q' || key == 'Q') {
    myTransform.setWeightingExponent1(myTransform.getWeightingExponent1() + 0.5);
    console.log("exponent1 = " + myTransform.getWeightingExponent1());
  }
  if (key == 'a' || key == 'A') {
    myTransform.setWeightingExponent1(myTransform.getWeightingExponent1() - 0.5);
    console.log("exponent1 = " + myTransform.getWeightingExponent1());
  }
  if (key == 'w' || key == 'W') {
    myTransform.setWeightingExponent2(myTransform.getWeightingExponent2() + 0.5);
    console.log("exponent2 = " + myTransform.getWeightingExponent2());
  }
  if (key == 's' || key == 'S') {
    myTransform.setWeightingExponent2(myTransform.getWeightingExponent2() - 0.5);
    console.log("exponent2 = " + myTransform.getWeightingExponent2());
  }

  // return false;
}