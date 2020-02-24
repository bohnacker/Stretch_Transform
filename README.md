# Stretch Transform

Stretch Transform is a geometric transformation that distorts a plane or 3D space in a rubbery way. 

![Cover](/images/cover.png)

For a more detailed explanation of this project read [this](https://hartmut-bohnacker.de/projects/stretch-transform) on my website.


## Quick start

#### 1. Load the library to your html file:
``` html
<script src="StretchTransform.js"></script>
```

#### 2. Start creating a new StretchTransform:
``` javascript
var myTransform = new StretchTransform();
```

#### 3. Add some anchors.

Usually you'll give two points as parameters. The first point (origin) will be transformed exactly to the second point (target).
``` javascript
myTransform.addAnchor([100, 200], [300, 300]);
```

If you give only point as a parameter origin and target will be set to that position. You could change either of them later on.
``` javascript
myTransform.addAnchor([100, 200]);
```

StretchTransform also works in 3D space. In fact, it always does. 
``` javascript
myTransform.addAnchor([100, 200, -150], [300, 300, 0]);
```

#### 4. Transform any point you want.
``` javascript
var result = myTransform.transform([200, 200, 50]);
```

## Reference

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### Table of Contents

-   [StretchTransform](#stretchtransform)
    -   [addAnchor](#addanchor)
    -   [addAnchor](#addanchor-1)
    -   [removeAnchor](#removeanchor)
    -   [removeAnchor](#removeanchor-1)
    -   [getAnchorCount](#getanchorcount)
    -   [getAnchor](#getanchor)
    -   [getAnchorByPos](#getanchorbypos)
    -   [getAnchorByOriginPos](#getanchorbyoriginpos)
    -   [getAnchorByTargetPos](#getanchorbytargetpos)
    -   [getAnchorOrigin](#getanchororigin)
    -   [setAnchorOrigin](#setanchororigin)
    -   [getAnchorTarget](#getanchortarget)
    -   [setAnchorTarget](#setanchortarget)
    -   [getWeightingExponent1](#getweightingexponent1)
    -   [setWeightingExponent1](#setweightingexponent1)
    -   [getWeightingExponent2](#getweightingexponent2)
    -   [setWeightingExponent2](#setweightingexponent2)
    -   [transform](#transform)
    -   [updateAnchorMatrices](#updateanchormatrices)
-   [Anchor](#anchor)
    -   [getOriginPosition](#getoriginposition)
    -   [setOriginPosition](#setoriginposition)
    -   [getTargetPosition](#gettargetposition)
    -   [setTargetPosition](#settargetposition)
    -   [getTransformMatrix](#gettransformmatrix)

## StretchTransform

new StretchTransform() creates an empty StretchTransform.

### addAnchor

Adds an Anchor where origin and target is the same. You can change either of them later on.

**Parameters**

-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array [x, y, z] that will be used for origin and target position. Z coordinate is optional.

Returns **[Anchor](#anchor)** The new anchor

### addAnchor

Adds an Anchor. pOrigin will be transformed to pTarget.

**Parameters**

-   `pOrigin` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array [x, y, z] for the origin position. Z coordinate is optional.
-   `pTarget` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array [x, y, z] for the target position. Z coordinate is optional.

Returns **[Anchor](#anchor)** The new anchor

### removeAnchor

Removes an Anchor giving the anchor

**Parameters**

-   `anchor` **[Anchor](#anchor)** Anchor to remove

### removeAnchor

Removes an Anchor giving the index of the anchor.

**Parameters**

-   `i` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor

### getAnchorCount

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** of anchors added to the MultiTransform

### getAnchor

**Parameters**

-   `i` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor to return.

### getAnchorByPos

**Parameters**

-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** point [x, y, z] to search for an anchor (either origin or target position). Z coordinate is optional.
-   `tolerance` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Radius around Anchor

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the found anchor or -1 if nothing was found at the specified position

### getAnchorByOriginPos

**Parameters**

-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** point [x, y, z] to search for the origin position of an anchor. Z coordinate is optional.
-   `tolerance` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Radius around Anchor

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the found anchor or -1 if nothing was found at the
        specified position

### getAnchorByTargetPos

**Parameters**

-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** point [x, y, z] to search for the target position of an anchor. Z coordinate is optional.
-   `tolerance` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Radius around Anchor

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the found anchor or -1 if nothing was found at the
        specified position

### getAnchorOrigin

**Parameters**

-   `i` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** The origin position.

### setAnchorOrigin

**Parameters**

-   `i` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor.
-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** New origin position [x, y, z]. Z coordinate is optional.

### getAnchorTarget

**Parameters**

-   `i` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** The target position.

### setAnchorTarget

**Parameters**

-   `i` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor.
-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** New target position [x, y, z]. Z coordinate is optional.

### getWeightingExponent1

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### setWeightingExponent1

Exponent of the weighting function. Defines how the relations from one anchor to all others are cumulated. The closer the other anchor lies, the stronger it is weighted.

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Usually something between 0 and 2. Default = 1.

### getWeightingExponent2

Returns **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### setWeightingExponent2

Exponent of the weighting function when applying all anchor matrices to a
point.

**Parameters**

-   `val` **[Number](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Number)** Usually 1 or higher. Default = 2.

### transform

Main function of the class. Transforms a point on the plane and returns
its new position.

**Parameters**

-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Point given as an Array [x, y, z] to be transformed. Z coordinate is optional.

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** Transformed point as an Array.

### updateAnchorMatrices

It's usually not necessary to call this method. If anchors and parameters
are always set with the given methods (setAnchorOrigin(), ...), this
method will be called automatically. It calculates a transformation
matrix for each anchor. This matrix reflects the translation of the
anchor and the rotation and scaling depending on the (possibly) changed
positions of all other anchors.

### Anchor

An Anchor has an origin an a target position. Usually you won't have to deal with it directly. Still, there are some functions which could come handy.

**Parameters**

-   `pOrigin`  
-   `pTarget`  

### getOriginPosition

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** The origin position.

### setOriginPosition

**Parameters**

-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** New origin position [x, y, z]. Z coordinate is optional.

### getTargetPosition

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** The target position.

### setTargetPosition

**Parameters**

-   `p` **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** New target position [x, y, z]. Z coordinate is optional.

### getTransformMatrix

Returns **[Array](https://developer.mozilla.org/docs/Web/JavaScript/Reference/Global_Objects/Array)** The transformation matrix of this anchor.
