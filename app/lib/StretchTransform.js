/*
 * Hartmut Bohnacker, http://hartmut-bohnacker.de/ 
 * Copyright (c) 2012
 * 
 * This sourcecode is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 * 
 * This sourcecode is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA
 */



/**
 * Transform a 2-dimensional plane in the following way: define an arbitrary
 * number of points (called anchors) with an origin and target position. 
 */
class StretchTransform {

  /**
   * Create a new StretchTransform.
   */
  constructor() {

    // Exponent of the weighting function for how the relations from one anchor
    // to all others are cumulated. The closer the other anchor lies, the
    // stronger it is weighted.
    this.weightingExponent1 = 1;
    // Exponent of the weighting function when applying all anchor matrices to a
    // point.
    this.weightingExponent2 = 2;
    // Exponent of the weighting function that reflects if the direction from
    // anchor to point and from one anchor to another is quite similar.
    this.weightingExponent3 = 1;

    this.anchors = [];

    this.matricesUpToDate = false;

    this.ORIGINS = 0;
    this.TARGETS = 1;

    // Constants for weightingMode
    this.SIMPLE = 0;
    this.DIRECTIONAL = 1;

    this.weightingMode = this.SIMPLE;
    // this.weightingMode = this.DIRECTIONAL;

  }


  /**
   * Adds a new Anchor.
   * 
   * @param x
   *            X coordinate for origin and target position
   * @param y
   *            Y coordinate for origin and target position
   */

  /**
   * Adds a new Anchor.
   * 
   * @param p
   *            will be used for origin and target position
   */

  /**
   * Adds a new Anchor.
   * 
   * @param xOrigin
   *            X coordinate for origin position
   * @param yOrigin
   *            Y coordinate for origin position
   * @param xTarget
   *            X coordinate for target position
   * @param yTarget
   *            Y coordinate for target position
   */


  /**
   * Adds a new Anchor.
   * 
   * @param pOrigin
   *            Point for origin position
   * @param pTarget
   *            Point for target position
   */
  addAnchor() {
    var pOrigin;
    var pTarget;

    if (arguments.length == 1) {
      pOrigin = arguments[0];
      pTarget = arguments[0];
    }
    if (arguments.length == 2) {
      if (arguments[0] instanceof p5.Vector) {
        pOrigin = arguments[0];
        pTarget = arguments[1];
      } else {
        pOrigin = createVector(arguments[0], arguments[1]);
        pTarget = createVector(arguments[0], arguments[1]);
      }
    }
    if (arguments.length == 4) {
      pOrigin = createVector(arguments[0], arguments[1]);
      pTarget = createVector(arguments[2], arguments[3]);
    }

    this.anchors.push(new Anchor(pOrigin, pTarget));
    this.matricesUpToDate = false;
  }

  /**
   * Remove an Anchor.
   * 
   * @param i
   *            Index of the anchor
   */
  /**
   * Remove an Anchor.
   * 
   * @param anchor
   *            Anchor to remove
   */
  removeAnchor(a) {
    if (a instanceof Anchor) {
      this.anchors.splice(this.anchors.indexOf(a), 1);
    } else {
      this.anchors.splice(a, 1);
    }
    this.matricesUpToDate = false;
  }

  /**
   * @return Number of anchors added to the MultiTransform
   */
  getAnchorCount() {
    return this.anchors.length;
  }

  /**
   * @param i
   *            Index of the anchor to return.
   */
  getAnchor(i) {
    return this.anchors[i];
  }

  /**
   * @param p
   *            Origin or Target position of the anchor to return.
   * @param tolerance
   *            Radius around Anchor
   * @return Index of the found anchor or -1 if nothing was found at the
   *         specified position
   */

  getAnchorByPos(p, tolerance) {
    for (var i = this.anchors.length - 1; i >= 0; i--) {
      if (dist(p.x, p.y, this.getAnchorOrigin(i).x, this.getAnchorOrigin(i).y) <= tolerance || dist(p.x, p.y, this.getAnchorTarget(i).x, this.getAnchorTarget(i).y) <= tolerance) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @param p
   *            Origin position of the anchor to return.
   * @param tolerance
   *            Radius around Anchor
   * @return Index of the found anchor or -1 if nothing was found at the
   *         specified position
   */
  getAnchorByOriginPos(p, tolerance) {
    for (var i = this.anchors.length - 1; i >= 0; i--) {
      if (dist(p.x, p.y, this.getAnchorOrigin(i).x, this.getAnchorOrigin(i).y) <= tolerance) {
        return i;
      }
    }
    return -1;
  }

  /**
   * @param p
   *            Target position of the anchor to return.
   * @param tolerance
   *            Radius around Anchor
   * @return Index of the found anchor or -1 if nothing was found at the
   *         specified position
   */
  getAnchorByTargetPos(p, tolerance) {
    for (var i = this.anchors.length - 1; i >= 0; i--) {
      if (dist(p.x, p.y, this.getAnchorTarget(i).x, this.getAnchorTarget(i).y) <= tolerance) {
        return i;
      }
    }
    return -1;
  }

  getAnchorOrigin(i) {
    return this.anchors[i].getOriginPosition();
  }

  setAnchorOrigin(i, p, y) {
    if (y != undefined) p = createVector(p, y);
    this.anchors[i].setOriginPosition(p);
    this.matricesUpToDate = false;
  }

  getAnchorTarget(i) {
    return this.anchors[i].getTargetPosition();
  }

  setAnchorTarget(i, p, y) {
    if (y != undefined) p = createVector(p, y);
    this.anchors[i].setTargetPosition(p);
    this.matricesUpToDate = false;
  }

  getWeightingMode() {
    return this.weightingMode;
  }

  setWeightingMode(weightingMode) {
    this.weightingMode = weightingMode;
    this.matricesUpToDate = false;
  }

  getWeightingExponent1() {
    return this.weightingExponent1;
  }

  /**
   * Exponent of the weighting function for how the relations from one anchor
   * to all others are cumulated. The closer the other anchor lies, the
   * stronger it is weighted.
   * 
   * @param val
   *            Usually something between 0 and 2. Default = 1.
   */
  setWeightingExponent1(val) {
    this.weightingExponent1 = val;
    this.matricesUpToDate = false;
  }

  getWeightingExponent2() {
    return this.weightingExponent2;
  }

  /**
   * Exponent of the weighting function when applying all anchor matrices to a
   * point.
   * 
   * @param val
   *            Usually 1 or higher. Default = 2.
   */
  setWeightingExponent2(val) {
    this.weightingExponent2 = val;
    this.matricesUpToDate = false;
  }

  getWeightingExponent3() {
    return this.weightingExponent3;
  }

  /**
   * Set exponent of the weighting function that factors in, if the direction
   * from anchor to point and from one anchor to another is quite similar.
   * Only applicable for subclass MultiTransformDirectional.
   * 
   * @param val
   *            Usually something between 0 and 2. Default = 1.
   */
  setWeightingExponent3(val) {
    this.weightingExponent3 = val;
    this.matricesUpToDate = false;
  }

  /**
   * Main function of the class. Transforms a point on the plane and returns
   * its new position.
   * 
   * @param x
   *            X coordinate of the point to be transformed
   * @param y
   *            Y coordinate of the point to be transformed
   * @return Transformed point
   */
  /**
   * Main function of the class. Transforms a point on the plane and returns
   * its new position.
   * 
   * @param p
   *            Point to be transformed
   * @return Transformed point
   */

  transform(p, y) {
    if (y != undefined) p = createVector(p, y);
    if (this.weightingMode == this.DIRECTIONAL) {
      return this.transformDirectional(p);
    }

    return this.transformSimple(p);
  }

  transformSimple(p) {
    if (this.matricesUpToDate == false) {
      this.updateAnchorMatrices();
    }

    var pTransformed = p.copy();
    var weights = this.calcWeights(p, this.ORIGINS, -1, this.weightingExponent2);

    // apply matrix-transforms to the point
    var dvecOffsetSum = createVector();
    for (var i = 0; i < this.anchors.length; i++) {
      // delta vector from orig-anchor to the point
      var dvec = p5.Vector.sub(p, this.anchors[i].getOriginPosition());

      // apply the matrix of this anchor to that delta vector
      var dvecres = HBMath.multMatrixWithVector(this.anchors[i].getTransformMatrix(), dvec);

      // offset between the delta vector and the transformed delta vector
      var dvecOffset = p5.Vector.sub(dvecres, dvec);

      // multiply this offset by the weight of this anchor
      dvecOffset.mult(weights[i]);

      // add up all offset
      dvecOffsetSum.add(dvecOffset);
    }
    // add the sum of all offsets to the point
    pTransformed.add(dvecOffsetSum);

    return pTransformed;
  }

  transformDirectional(p) {
    if (this.matricesUpToDate == false) {
      for (var i = 0; i < this.anchors.length; i++) {
        this.anchors[i].updateDirectionalMatrices(this.anchors);
      }
      this.matricesUpToDate = true;
    }

    var pTransformed = p.copy();

    var weights = this.calcWeights(p, this.ORIGINS, -1, this.weightingExponent2);

    // apply matrix-transforms to the point
    var dvecOffsetSum = createVector();
    for (var i = 0; i < this.anchors.length; i++) {
      // delta vector from orig-anchor to the point
      var dvec = p5.Vector.sub(p, this.anchors[i].getOriginPosition());

      // apply the matrices of this anchor to that delta vector
      var distweights = this.calcWeights(this.anchors[i].getTargetPosition(), this.TARGETS, i, this.weightingExponent1);

      var dvecres = this.anchors[i].applyCumulatedMatrix(dvec, this.weightingExponent3, distweights);

      // multiply this offset by the weight of this anchor
      dvecres.mult(weights[i]);

      // add up all offset
      dvecOffsetSum.add(dvecres);
    }
    // add the sum of all offsets to the point
    pTransformed.add(dvecOffsetSum);

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
  updateAnchorMatrices() {
    for (var i = 0; i < this.anchors.length; i++) {
      //var matrix = this.anchors[i].getTransformMatrix();
      var matrix = new p5.Matrix();
      matrix.translate([this.anchors[i].targetPosition.x - this.anchors[i].originPosition.x, this.anchors[i].targetPosition.y - this.anchors[i].originPosition.y, 0]);

      // calculate weights for this anchor so that closer anchors have
      // more influence on its rotation and scaling
      // could also be done with the origin positions, but I think that
      // it's far better to do it with the target positions.
      // float[] weights = calcWeights(anchors[i].getOriginPosition(),
      // ORIGINS, i, weightingExponent1);
      var weights = this.calcWeights(this.anchors[i].getTargetPosition(), this.TARGETS, i, this.weightingExponent1);

      var angles = [];

      var sFac = 1;

      for (var j = 0; j < this.anchors.length; j++) {
        var fac = weights[j];

        if (i != j) {
          var originI = this.anchors[i].getOriginPosition();
          var originJ = this.anchors[j].getOriginPosition();
          var targetI = this.anchors[i].getTargetPosition();
          var targetJ = this.anchors[j].getTargetPosition();

          var w1 = atan2(originJ.y - originI.y, originJ.x - originI.x);
          var w2 = atan2(targetJ.y - targetI.y, targetJ.x - targetI.x);
          var w = HBMath.angleDifference(w2, w1);
          angles.push(w);

          var d1 = p5.Vector.dist(originJ, originI);
          var d2 = p5.Vector.dist(targetJ, targetI);
          var s = d2 / d1;

          if (d1 == 0 && d2 == 0)
            s = 1;
          else if (d1 == 0)
            s = 10;

          s = pow(s, fac);
          sFac *= s;
        } else {
          angles.push(0);
        }
      }

      matrix.rotateZ(HBMath.angleAverage(angles, weights));
      matrix.scale([sFac, sFac, sFac]);

      this.anchors[i].setTransformMatrix(matrix);
    }

    this.matricesUpToDate = true;
  }

  calcWeights(p, mode, excludeIndex, exponent) {

    // calc distances between point and all original anchors
    var dists = [];
    // dists.length = this.anchors.length;
    // dists.fill(0);

    var n = this.anchors.length;

    var k = -1;
    var minDist = Number.MAX_VALUE;

    for (var i = 0; i < n; i++) {
      var otherPoint;
      if (mode == this.ORIGINS) {
        otherPoint = this.anchors[i].getOriginPosition();
      } else {
        otherPoint = this.anchors[i].getTargetPosition();
      }

      dists[i] = p5.Vector.dist(p, otherPoint);
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
        weights[i] = distfacs[i] / sum;
      }
    }

    return weights;
  }


}



/*
 * Hartmut Bohnacker, http://hartmut-bohnacker.de/ 
 * Copyright (c) 2012
 * 
 * This sourcecode is free software; you can redistribute it and/or modify
 * it under the terms of the GNU Lesser General Public License as published
 * by the Free Software Foundation; either version 2.1 of the License, or
 * (at your option) any later version.
 * 
 * This sourcecode is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU Lesser
 * General Public License for more details.
 * 
 * You should have received a copy of the GNU Lesser General Public License
 * along with this library; if not, write to the Free Software Foundation,
 * Inc., 51 Franklin St, Fifth Floor, Boston, MA 02110, USA
 */



class Anchor {

  constructor(pOrigin, pTarget) {
    this.originPosition = createVector();
    this.targetPosition = createVector();
    this.transformMatrix = new p5.Matrix();
    this.directionalMatrices = [];

    if (pTarget == undefined) pTarget = pOrigin;

    this.originPosition = pOrigin;
    this.targetPosition = pTarget;
  }

  getOriginPosition() {
    return this.originPosition.copy();
  }

  setOriginPosition() {
    if (arguments.length == 1) {
      this.originPosition = arguments[0].copy();
    } else {
      this.originPosition.x = arguments[0];
      this.originPosition.y = arguments[1];
    }
  }

  getTargetPosition() {
    return this.targetPosition.copy();
  }

  setTargetPosition() {
    if (arguments.length == 1) {
      this.targetPosition = arguments[0].copy();
    } else {
      this.targetPosition.x = arguments[0];
      this.targetPosition.y = arguments[1];
    }
  }


  getTransformMatrix() {
    return this.transformMatrix.get();
  }

  setTransformMatrix(matrix) {
    this.transformMatrix = matrix;
  }


  updateDirectionalMatrices(anchors) {
    this.directionalMatrices = [];

    for (var i = 0; i < anchors.length; i++) {
      var otherAnchor = anchors[i];
      var matrix = new p5.Matrix();
      var matrixDirection = createVector();

      if (otherAnchor != this) {
        var originI = this.getOriginPosition();
        var originJ = otherAnchor.getOriginPosition();
        var targetI = this.getTargetPosition();
        var targetJ = otherAnchor.getTargetPosition();

        // translation
        matrix.translate([this.targetPosition.x - this.originPosition.x, this.targetPosition.y - this.originPosition.y, 0]);

        // rotation
        var w1 = atan2(originJ.y - originI.y, originJ.x - originI.x);
        var w2 = atan2(targetJ.y - targetI.y, targetJ.x - targetI.x);
        var w = HBMath.angleDifference(w2, w1);

        matrix.rotateZ(w);

        // scaling
        var d1 = p5.Vector.dist(originJ, originI);
        var d2 = p5.Vector.dist(targetJ, targetI);
        var s = d2 / d1;

        if (d1 == 0 && d2 == 0)
          s = 1;
        else if (d1 == 0)
          s = 10;

        matrix.scale([s, s, s]);

        // direction for this directionalMatrix
        matrixDirection = originJ.copy();
        matrixDirection.sub(originI);
        matrixDirection.normalize();

        this.directionalMatrices.push(new DirectionalMatrix(matrix, matrixDirection));
      } else {
        this.directionalMatrices.push(null);
      }
    }
  }

  applyCumulatedMatrix(aToP, exponent, distweights) {
    var aToPResult = createVector();

    var aToPNorm = aToP.copy();
    aToPNorm.normalize();

    var weights = [];
    var sum = 0;

    for (var i = 0; i < this.directionalMatrices.length; i++) {
      if (this.directionalMatrices[i] != null) {
        var w = 1;

        // weight depending on direction from anchor to point
        if (this.directionalMatrices[i].matrixDirection.mag() > 0 && aToPNorm.mag() > 0) {
          w = this.directionalMatrices[i].matrixDirection.dot(aToPNorm) + 1;
          if (w < 0) w = 0;
          w = pow(w, exponent);
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

        var aToPTrans = HBMath.multMatrixWithVector(matrix, aToP);

        // offset between the delta vector and the transformed delta vector
        var dvecOffset = p5.Vector.sub(aToPTrans, aToP);

        // multiply this offset by the weight of this anchor
        dvecOffset.mult(weights[i]);

        // add up all offset
        aToPResult.add(dvecOffset);
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


class DirectionalMatrix {
  constructor(mat, dir) {
    this.matrix = mat.get();
    this.matrixDirection = dir.copy();
  }
}



class HBMath {

  // helping function that calculates the difference of two angles
  static angleDifference(theAngle1, theAngle2) {
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
  }


  // calculates the weighted average from a list of angles
  static angleAverage(angles, weights) {
    var res = new createVector();

    for (var i = 0; i < angles.length; i++) {
      var v = createVector(cos(angles[i]), sin(angles[i]));
      v.mult(weights[i]);

      res.add(v);
    }

    return atan2(res.y, res.x);
  }

  static multMatrixWithVector(matrix, v) {
    var result = createVector();
    var m = matrix.mat4;

    result.x = m[0] * v.x + m[4] * v.y + m[8] * v.z + m[12];
    result.y = m[1] * v.x + m[5] * v.y + m[9] * v.z + m[13];
    result.z = m[2] * v.x + m[6] * v.y + m[10] * v.z + m[14];

    return result;
  }
}