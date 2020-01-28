'use strict';

var packageInfo = require('./package.json');
var glm = require('gl-matrix');
var V = glm.vec3;
var M = glm.mat4;
var Q = glm.quat;

// var Quaternion = require('Quaternion');

// console.log("%c * " + packageInfo.name + " " + packageInfo.version + " * ", "background: #ccc; color: black");

// Constants 
var ORIGINS = 0;
var TARGETS = 1;

// Constants for weightingMode
var SIMPLE = 0;
var DIRECTIONAL = 1;


/**
 * new StretchTransform() create an empty StretchTransform. 
 */
function StretchTransform() {

  // Exponent of the weighting function for how the relations from one anchor
  // to all others are cumulated. The closer the other anchor lies, the
  // stronger it is weighted.
  this.weightingExponent1 = 1;
  // Exponent of the weighting function when applying all anchor matrices to a
  // point.
  this.weightingExponent2 = 2;

  this.anchors = [];

  this.matricesUpToDate = false;


  /**
   * Adds an Anchor. 
   * @param {Number} x
   *            X coordinate for origin and target position
   * @param {Number} y
   *            Y coordinate for origin and target position
   */

  /**
   * Adds an Anchor. 
   * @param {Array} p
   *            Array [x, y] that will be used for origin and target position
   */

  /**
   * Adds an Anchor. 
   * @param {Number} xOrigin
   *            X coordinate for origin position
   * @param {Number} yOrigin
   *            Y coordinate for origin position
   * @param {Number} xTarget
   *            X coordinate for target position
   * @param {Number} yTarget
   *            Y coordinate for target position
   */

  /**
   * Adds an Anchor. 
   * @param {Array} pOrigin
   *            Array [x, y] for origin position
   * @param {Array} pTarget
   *            Array [x, y] for target position
   */
  StretchTransform.prototype.addAnchor = function() {
    var pOrigin;
    var pTarget;

    if (arguments.length == 1) {
      arguments[0][2] = arguments[0][2] || 0;
      pOrigin = arguments[0];
      pTarget = arguments[0];
    }
    if (arguments.length == 2) {
      if (arguments[0] instanceof Float32Array || arguments[0] instanceof Array) {
        arguments[0][2] = arguments[0][2] || 0;
        pOrigin = arguments[0];
        arguments[1][2] = arguments[1][2] || 0;
        pTarget = arguments[1];
      } else {
        pOrigin = V.fromValues(arguments[0], arguments[1], 0, 1);
        pTarget = V.fromValues(arguments[0], arguments[1], 0, 1);
      }
    }
    if (arguments.length == 3) {
      if (arguments[0] instanceof Float32Array || arguments[0] instanceof Array) {
        arguments[0][2] = arguments[0][2] || 0;
        pOrigin = arguments[0];
        arguments[1][2] = arguments[1][2] || 0;
        pTarget = arguments[1];
      } else {
        pOrigin = V.fromValues(arguments[0], arguments[1], arguments[2], 1);
        pTarget = V.fromValues(arguments[0], arguments[1], arguments[2], 1);
      }
    }
    if (arguments.length == 4) {
      pOrigin = V.fromValues(arguments[0], arguments[1], 0, 1);
      pTarget = V.fromValues(arguments[2], arguments[3], 0, 1);
    }

    this.anchors.push(new Anchor(pOrigin, pTarget));
    this.matricesUpToDate = false;
  }

  /**
   * Removes an Anchor.
   * @param {Number} i  Index of the anchor
   */

  /**
   * Removes an Anchor.
   * @param {Anchor} anchor  Anchor to remove
   */

  StretchTransform.prototype.removeAnchor = function() {
    var a = arguments[0];
    if (a instanceof Anchor) {
      this.anchors.splice(this.anchors.indexOf(a), 1);
    } else {
      this.anchors.splice(a, 1);
    }
    this.matricesUpToDate = false;
  }

  /**
   * @return {Number} of anchors added to the MultiTransform
   */
  StretchTransform.prototype.getAnchorCount = function() {
    return this.anchors.length;
  }

  /**
   * @param {Number} i
   *            Index of the anchor to return.
   */
  StretchTransform.prototype.getAnchor = function(i) {
    return this.anchors[i];
  }

  /**
   * @param {Array} p
   *            point [x, y, z] to search for an anchor (either origin or target position). Z coordinate is optional.
   * @param {Number} tolerance
   *            Radius around Anchor
   * @return {Number} Index of the found anchor or -1 if nothing was found at the
   *         specified position
   */

  StretchTransform.prototype.getAnchorByPos = function(p, tolerance) {
    p[2] = p[2] || 0;
    for (var i = this.anchors.length - 1; i >= 0; i--) {
      if (H.dist(p[0], p[1], p[2], this.getAnchorOrigin(i)[0], this.getAnchorOrigin(i)[1], this.getAnchorOrigin(i)[2]) <= tolerance || H.dist(p[0], p[1], p[2], this.getAnchorTarget(i)[0], this.getAnchorTarget(i)[1], this.getAnchorTarget(i)[2]) <= tolerance) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @param {Array} p
   *            point [x, y, z] to search for the origin position of an anchor. Z coordinate is optional.
   * @param {Number} tolerance
   *            Radius around Anchor
   * @return {Number} Index of the found anchor or -1 if nothing was found at the
   *         specified position
   */
  StretchTransform.prototype.getAnchorByOriginPos = function(p, tolerance) {
    p[2] = p[2] || 0;
    for (var i = this.anchors.length - 1; i >= 0; i--) {
      if (H.dist(p[0], p[1], p[2], this.getAnchorOrigin(i)[0], this.getAnchorOrigin(i)[1], this.getAnchorOrigin(i)[2]) <= tolerance) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @param {Array} p
   *            point [x, y, z] to search for the target position of an anchor. Z coordinate is optional.
   * @param {Number} tolerance
   *            Radius around Anchor
   * @return {Number} Index of the found anchor or -1 if nothing was found at the
   *         specified position
   */
  StretchTransform.prototype.getAnchorByTargetPos = function(p, tolerance) {
    p[2] = p[2] || 0;
    for (var i = this.anchors.length - 1; i >= 0; i--) {
      if (H.dist(p[0], p[1], p[2], this.getAnchorTarget(i)[0], this.getAnchorTarget(i)[1], this.getAnchorTarget(i)[2]) <= tolerance) {
        return i;
      }
    }
    return -1;
  }

  StretchTransform.prototype.getAnchorOrigin = function(i) {
    return this.anchors[i].getOriginPosition();
  }


  /**
   * @param {Number} i
   *            Index of the anchor.
   * @param {Array} p
   *            New origin position [x, y, z]. Z coordinate is optional.
   */
  StretchTransform.prototype.setAnchorOrigin = function(i, p) {
    this.anchors[i].setOriginPosition(p);
    this.matricesUpToDate = false;
  }

  StretchTransform.prototype.getAnchorTarget = function(i) {
    return this.anchors[i].getTargetPosition();
  }

  /**
   * @param {Number} i
   *            Index of the anchor.
   * @param {Array} p
   *            New target position [x, y, z]. Z coordinate is optional.
   */
  StretchTransform.prototype.setAnchorTarget = function(i, p) {
    this.anchors[i].setTargetPosition(p);
    this.matricesUpToDate = false;
  }

  /**
   * @return {Number} 
   */
  StretchTransform.prototype.getWeightingExponent1 = function() {
    return this.weightingExponent1;
  }

  /**
   * Exponent of the weighting function. Defines how the relations from one anchor
   * to all others are cumulated. The closer the other anchor lies, the
   * stronger it is weighted.
   * 
   * @param {Number} val
   *            Usually something between 0 and 2. Default = 1.
   */
  StretchTransform.prototype.setWeightingExponent1 = function(val) {
    this.weightingExponent1 = val;
    this.matricesUpToDate = false;
  }

  /**
   * @return {Number} 
   */
  StretchTransform.prototype.getWeightingExponent2 = function() {
    return this.weightingExponent2;
  }

  /**
   * Exponent of the weighting function when applying all anchor matrices to a
   * point.
   * 
   * @param {Number} val
   *            Usually 1 or higher. Default = 2.
   */
  StretchTransform.prototype.setWeightingExponent2 = function(val) {
    this.weightingExponent2 = val;
    this.matricesUpToDate = false;
  }


  /**
   * Main function of the class. Transforms a point on the plane and returns
   * its new position.
   * 
   * @param {Number} x
   *            X coordinate of the point to be transformed
   * @param {Number} y
   *            Y coordinate of the point to be transformed
   * @return {Array} Transformed point as an Array [x, y]
   */
  /**
   * Main function of the class. Transforms a point on the plane and returns
   * its new position.
   * 
   * @param {Array} p
   *            Point given as an Array [x, y, z] to be transformed. Z coordinate is optional.
   * @return {Array} Transformed point as an Array [x, y]
   */

  StretchTransform.prototype.transform = function() {
    var p = arguments[0];
    var y = arguments[1];
    var z = arguments[2] || 0;
    if (y != undefined) p = V.fromValues(p, y, z, 0);

    return this.transformSimple(p);
  }

  StretchTransform.prototype.transformSimple = function(p) {
    if (this.matricesUpToDate == false) {
      this.updateAnchorMatrices();
    }

    var pTransformed = V.clone(p);
    var weights = this.calcWeights(p, ORIGINS, -1, this.weightingExponent2);

    // apply matrix-transforms to the point
    var dvecOffsetSum = V.create();
    for (var i = 0; i < this.anchors.length; i++) {
      // delta vector from orig-anchor to the point
      var dvec = V.create();
      V.sub(dvec, p, this.anchors[i].getOriginPosition());

      // apply the matrix of this anchor to that delta vector
      var dvecres = V.create();
      V.transformMat4(dvecres, dvec, this.anchors[i].getTransformMatrix());

      // offset between the delta vector and the transformed delta vector
      var dvecOffset = V.create();
      V.sub(dvecOffset, dvecres, dvec);

      // multiply this offset by the weight of this anchor
      V.scale(dvecOffset, dvecOffset, weights[i]);

      // add up all offset
      V.add(dvecOffsetSum, dvecOffsetSum, dvecOffset);
    }
    // add the sum of all offsets to the point
    V.add(pTransformed, pTransformed, dvecOffsetSum);

    return pTransformed;
  }

  /**
   * It's usually not necessary to call this method. If anchors and parameters
   * are always set with the given methods (setAnchorOrigin(), ...), this
   * method will be called automatically. It calculates a transformation
   * matrix for each anchor. This matrix reflects the translation of the
   * anchor and the rotation and scaling depending on the (possibly) changed
   * positions of all other anchors.
   */
  StretchTransform.prototype.updateAnchorMatrices = function() {
    for (var i = 0; i < this.anchors.length; i++) {
      //var matrix = this.anchors[i].getTransformMatrix();
      var t = V.fromValues(
        this.anchors[i].targetPosition[0] - this.anchors[i].originPosition[0],
        this.anchors[i].targetPosition[1] - this.anchors[i].originPosition[1],
        this.anchors[i].targetPosition[2] - this.anchors[i].originPosition[2],
        0);
      var matrix = M.create();
      M.fromTranslation(matrix, t);

      // calculate weights for this anchor so that closer anchors have
      // more influence on its rotation and scaling
      // could also be done with the origin positions, but I think that
      // it's far better to do it with the target positions.
      // float[] weights = calcWeights(anchors[i].getOriginPosition(),
      // ORIGINS, i, weightingExponent1);
      var weights = this.calcWeights(this.anchors[i].getTargetPosition(), TARGETS, i, this.weightingExponent1);

      var angles = [];
      var quaternions = [];

      var sFac = 1;

      for (var jj = 0; jj < 0 + this.anchors.length; jj++) {
        var j = jj % this.anchors.length;
        var fac = weights[j];

        if (i != j) {
          var originI = this.anchors[i].getOriginPosition();
          var originJ = this.anchors[j].getOriginPosition();
          var targetI = this.anchors[i].getTargetPosition();
          var targetJ = this.anchors[j].getTargetPosition();

          var w1 = Math.atan2(originJ[1] - originI[1], originJ[0] - originI[0]);
          var w2 = Math.atan2(targetJ[1] - targetI[1], targetJ[0] - targetI[0]);
          var w = H.angleDifference(w2, w1);
          angles.push(w);

          var v1 = V.create();
          V.sub(v1, originJ, originI);
          V.mul(v1, v1, [1, 1, 1]);
          V.normalize(v1, v1);
          var v2 = V.create();
          V.sub(v2, targetJ, targetI);
          V.mul(v2, v2, [1, 1, 1]);
          V.normalize(v2, v2);

          var q = Q.create();
          Q.rotationTo(q, v1, v2);
          // var q = Quaternion.fromBetweenVectors(v1, v2);
          quaternions.push(q);
          // // console.log(q);

          var d1 = V.dist(originJ, originI);
          var d2 = V.dist(targetJ, targetI);
          var s = d2 / d1;

          if (d1 == 0 && d2 == 0)
            s = 1;
          else if (d1 == 0)
            s = 10;

          s = pow(s, fac);
          sFac *= s;
        } else {
          angles.push(0);
          // quaternions.push(new Quaternion());
          quaternions.push(Q.create());
        }
      }

      // var quatAv = H.quaternionAverage(quaternions, weights);
      // var rotationMatrix = M.fromValues(...quatAv.toMatrix4());

      var quatAv = H.quaternionAverage(quaternions, weights);
      var rotationMatrix = M.create();
      M.fromQuat(rotationMatrix, quatAv);


      M.mul(matrix, matrix, rotationMatrix);
      // M.rotateZ(matrix, matrix, H.angleAverage(angles, weights));
      M.scale(matrix, matrix, [sFac, sFac, sFac]);

      this.anchors[i].setTransformMatrix(matrix);
    }

    this.matricesUpToDate = true;
  }

  StretchTransform.prototype.calcWeights = function(p, mode, excludeIndex, exponent) {

    // calc distances between point and all original anchors
    var dists = [];
    // dists.length = this.anchors.length;
    // dists.fill(0);

    var n = this.anchors.length;

    var k = -1;
    var minDist = Number.MAX_VALUE;

    for (var i = 0; i < n; i++) {
      var otherPoint;
      if (mode == ORIGINS) {
        otherPoint = this.anchors[i].getOriginPosition();
      } else {
        otherPoint = this.anchors[i].getTargetPosition();
      }

      dists[i] = V.dist(p, otherPoint);
      if (dists[i] < minDist && i != excludeIndex) {
        minDist = dists[i];
        k = i;
      }
    }

    // calc attraction weights (sum of all weights must be 1)
    var weights = [];
    weights.length = this.anchors.length;
    weights.fill(0);

    if (minDist == 0) {
      weights[k] = 1;
    } else {
      var distfacs = [];
      var sum = 0;

      for (var i = 0; i < n; i++) {
        if (i != excludeIndex) {
          distfacs[i] = 1 / (pow(dists[i], exponent));
          sum += distfacs[i];
        } else {
          distfacs[i] = 0;
        }
      }

      for (var i = 0; i < n; i++) {
        if (sum == 0) weights[i] = 0;
        else weights[i] = distfacs[i] / sum;
      }
    }

    return weights;
  }


}



// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



function Anchor(pOrigin, pTarget) {
  this.originPosition = V.create();
  this.targetPosition = V.create();
  this.transformMatrix = M.create();
  this.directionalMatrices = [];

  if (pTarget == undefined) pTarget = pOrigin;

  this.originPosition = V.clone(pOrigin);
  this.targetPosition = V.clone(pTarget);


  Anchor.prototype.getOriginPosition = function() {
    return V.clone(this.originPosition);
  }

  Anchor.prototype.setOriginPosition = function() {
    if (arguments.length == 1) {
      arguments[0][2] = arguments[0][2] || 0;
      this.originPosition = V.clone(arguments[0]);
    } else {
      this.originPosition[0] = arguments[0];
      this.originPosition[1] = arguments[1];
    }
  }

  Anchor.prototype.getTargetPosition = function() {
    return V.clone(this.targetPosition);
  }

  Anchor.prototype.setTargetPosition = function() {
    if (arguments.length == 1) {
      arguments[0][2] = arguments[0][2] || 0;
      this.targetPosition = V.clone(arguments[0]);
    } else {
      this.targetPosition[0] = arguments[0];
      this.targetPosition[1] = arguments[1];
    }
  }


  Anchor.prototype.getTransformMatrix = function() {
    return M.clone(this.transformMatrix);
  }

  Anchor.prototype.setTransformMatrix = function(matrix) {
    this.transformMatrix = matrix;
  }


  Anchor.prototype.updateDirectionalMatrices = function(anchors) {
    this.directionalMatrices = [];

    for (var i = 0; i < anchors.length; i++) {
      var otherAnchor = anchors[i];
      var matrix = M.create();
      var matrixDirection = V.create();

      if (otherAnchor != this) {
        var originI = this.getOriginPosition();
        var originJ = otherAnchor.getOriginPosition();
        var targetI = this.getTargetPosition();
        var targetJ = otherAnchor.getTargetPosition();

        // translation
        M.fromTranslation(matrix, V.fromValues(this.targetPosition[0] - this.originPosition[0], this.targetPosition[1] - this.originPosition[1], 0, 0));

        // rotation
        var w1 = Math.atan2(originJ[1] - originI[1], originJ[0] - originI[0]);
        var w2 = Math.atan2(targetJ[1] - targetI[1], targetJ[0] - targetI[0]);
        var w = H.angleDifference(w2, w1);

        M.rotate(matrix, matrix, w);

        // scaling
        var d1 = V.dist(originJ, originI);
        var d2 = V.dist(targetJ, targetI);
        var s = d2 / d1;

        if (d1 == 0 && d2 == 0)
          s = 1;
        else if (d1 == 0)
          s = 10;

        M.scale(matrix, matrix, [s, s]);

        // direction for this directionalMatrix
        matrixDirection = V.clone(originJ);
        V.sub(matrixDirection, matrixDirection, originI);
        V.normalize(matrixDirection, matrixDirection);

        this.directionalMatrices.push(new DirectionalMatrix(matrix, matrixDirection));
      } else {
        this.directionalMatrices.push(null);
      }
    }
  }

  Anchor.prototype.applyCumulatedMatrix = function(aToP, exponent, distweights) {
    var aToPResult = V.create();

    var aToPNorm = V.clone(aToP);
    V.normalize(aToPNorm, aToPNorm);

    var weights = [];
    var sum = 0;

    for (var i = 0; i < this.directionalMatrices.length; i++) {
      if (this.directionalMatrices[i] != null) {
        var w = 1;

        // weight depending on direction from anchor to point
        if (V.len(this.directionalMatrices[i].matrixDirection) > 0 && V.len(aToPNorm) > 0) {
          w = V.dot(this.directionalMatrices[i].matrixDirection, aToPNorm) + 1;
          if (w < 0) w = 0;
          w = Math.pow(w, exponent);
        }

        // weight depending on distance
        w *= distweights[i];
        // w *= (0.5 + 0.5 * distweights[i]);

        weights[i] = w;
        sum += weights[i];
      }
    }

    for (var i = 0; i < this.directionalMatrices.length; i++) {
      if (this.directionalMatrices[i] != null) {
        var matrix = this.directionalMatrices[i].matrix;

        weights[i] = weights[i] / sum;

        var aToPTrans = V.create();
        V.transformMat4(aToPTrans, aToP, matrix);

        // offset between the delta vector and the transformed delta vector
        var dvecOffset = V.create();
        V.sub(dvecOffset, aToPTrans, aToP);

        // multiply this offset by the weight of this anchor
        V.scale(dvecOffset, dvecOffset, weights[i]);

        // add up all offset
        V.add(aToPResult, aToPResult, dvecOffset);
      }
    }

    return aToPResult;
  }



  /*
   * float[] calcWeights(PVector p, ArrayList<Anchor> anchors, int mode) {
   * 
   * // calculate distances between point and all original anchors float[]
   * dists = new float[anchors.length]; int n = dists.length;
   * 
   * int k = -1; float minDist = 10000000;
   * 
   * for (int i = 0; i < n; i++) { PVector otherPoint; if (mode ==
   * MultiTransform.ORIGINS) { otherPoint =
   * anchors[i].getOriginPosition(); } else { otherPoint =
   * anchors[i].getTargetPosition(); }
   * 
   * dists[i] = PVector.dist(p, otherPoint); if (dists[i] < minDist && i !=
   * excludeIndex) { minDist = dists[i]; k = i; } }
   * 
   * // calc attraction weights (sum of all weights must be 1) float[] weights
   * = new float[n];
   * 
   * if (minDist == 0) { weights[k] = 1; } else { float[] distfacs = new
   * float[n]; float sum = 0;
   * 
   * for (int i = 0; i < n; i++) { if (i != excludeIndex) { distfacs[i] = 1f /
   * (pow(dists[i], 1)); sum += distfacs[i]; } }
   * 
   * for (int i = 0; i < n; i++) { weights[i] = distfacs[i] / sum; } }
   * 
   * return weights; }
   */
}




// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------
// -----------------------------------------------------------------------------------



// Math Helper functions
var H = {

  // helping function that calculates the difference of two angles
  angleDifference: function(theAngle1, theAngle2) {
    var a1 = (theAngle1 % TWO_PI + TWO_PI) % TWO_PI;
    var a2 = (theAngle2 % TWO_PI + TWO_PI) % TWO_PI;

    if (a2 > a1) {
      var d1 = a2 - a1;
      var d2 = a1 + TWO_PI - a2;
      if (d1 <= d2) {
        return -d1;
      } else {
        return d2;
      }
    } else {
      var d1 = a1 - a2;
      var d2 = a2 + TWO_PI - a1;
      if (d1 <= d2) {
        return d1;
      } else {
        return -d2;
      }
    }
  },

  // calculates the weighted average from a list of angles
  angleAverage: function(angles, weights) {
    var res = new V.create();

    for (var i = 0; i < angles.length; i++) {
      var v = V.fromValues(Math.cos(angles[i]), Math.sin(angles[i]), 0, 0);
      V.scale(v, v, weights[i]);
      V.add(res, res, v);
    }

    return Math.atan2(res[1], res[0]);
  },

  // calculates the weighted sperical interpolation from a list of quaternions
  quaternionAverage: function(quaternions, weights) {
    var len = weights.length;

    // sumarize weights
    var weightSums = [];
    weightSums[0] = weights[0];
    for (var i = 1; i < len; i++) {
      weightSums[i] = weightSums[i - 1] + weights[i];
    }
    // if all weights are 0, return the first quaternion
    if (weightSums[len - 1] == 0) {
      return quaternions[0];
    }

    // interpolate quaternions
    // var res = quaternions[0].clone();
    var res = Q.clone(quaternions[0]);
    for (i = 1; i < len; i++) {
      var amount = weights[i] / float(weightSums[i]);
      // res = res.slerp(quaternions[i])(amount)
      Q.slerp(res, res, quaternions[i], amount);
    }
    return res;
  },

  dist: function() {
    let x1, y1, z1, x2, y2, z2
    if (arguments.length == 4) {
      x1 = arguments[0];
      y1 = arguments[1];
      z1 = 0;
      x2 = arguments[2];
      y2 = arguments[3];
      z2 = 0;
    } else {
      x1 = arguments[0];
      y1 = arguments[1];
      z1 = arguments[2];
      x2 = arguments[3];
      y2 = arguments[4];
      z2 = arguments[5];
    }
    return Math.sqrt((x1 - x2) * (x1 - x2) + (y1 - y2) * (y1 - y2) + (z1 - z2) * (z1 - z2));
  }

}


module.exports = StretchTransform;