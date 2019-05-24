# Stretch Transform

Stretch Transform is a geometric transformation that distorts a plane in a rubbery way. 

![Cover](/images/cover.png)

For a more detailed explanation of this project read [this](https://hartmut-bohnacker.de/projects/stretch-transform) on my website.

## Reference

<!-- Generated by documentation.js. Update this documentation by updating the source code. -->

### StretchTransform

`new StretchTransform()` create an empty StretchTransform.

### addAnchor

Adds an Anchor.

*Parameters*

-   `x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** X coordinate for origin and target position
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Y coordinate for origin and target position

### addAnchor

Adds an Anchor.

*Parameters*

-   `xOrigin` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** X coordinate for origin position
-   `yOrigin` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Y coordinate for origin position
-   `xTarget` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** X coordinate for target position
-   `yTarget` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Y coordinate for target position

### addAnchor

Adds an Anchor.

*Parameters*

-   `pOrigin` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array [x, y] for origin position
-   `pTarget` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array [x, y] for target position

### addAnchor

Adds an Anchor.

*Parameters*

-   `p` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Array [x, y] that will be used for origin and target position

### removeAnchor

Removes an Anchor.

*Parameters*

-   `anchor` **Anchor** Anchor to remove

### removeAnchor

Removes an Anchor.

*Parameters*

-   `i` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor

### getAnchorCount

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** of anchors added to the MultiTransform

### getAnchor

*Parameters*

-   `i` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor to return.

### getAnchorByPos

*Parameters*

-   `x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** x coordinate of the origin or target position of the anchor to return.
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** y coordinate of the origin or target position of the anchor to return.
-   `tolerance` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Radius around Anchor

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the found anchor or -1 if nothing was found at the
        specified position

### getAnchorByOriginPos

*Parameters*

-   `x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** x coordinate of the origin position of the anchor to return.
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** y coordinate of the origin position of the anchor to return.
-   `tolerance` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Radius around Anchor

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the found anchor or -1 if nothing was found at the
        specified position

### getAnchorByTargetPos

*Parameters*

-   `x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** x coordinate of the target position of the anchor to return.
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** y coordinate of the target position of the anchor to return.
-   `tolerance` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Radius around Anchor

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the found anchor or -1 if nothing was found at the
        specified position

### setAnchorOrigin

*Parameters*

-   `i` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor.
-   `x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** New x coordinate of the origin position.
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** New y coordinate of the origin position.

### setAnchorTarget

*Parameters*

-   `i` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Index of the anchor.
-   `x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** New x coordinate of the target position.
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** New y coordinate of the target position.

### setWeightingMode

*Parameters*

-   `weightingMode` **[String](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/String)** String, either 'simple' or 'directional'.

### isSimple

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true, if weightingMode is SIMPLE

### isDirectional

Returns **[Boolean](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Boolean)** true, if weightingMode is DIRECTIONAL

### getWeightingExponent1

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### setWeightingExponent1

Exponent of the weighting function. Defines how the relations from one anchor
to all others are cumulated. The closer the other anchor lies, the
stronger it is weighted.

*Parameters*

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Usually something between 0 and 2. Default = 1.

### getWeightingExponent2

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### setWeightingExponent2

Exponent of the weighting function when applying all anchor matrices to a
point.

*Parameters*

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Usually 1 or higher. Default = 2.

### getWeightingExponent3

Returns **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** 

### setWeightingExponent3

Exponent of the weighting function that factors in, if the direction
from anchor to point and from one anchor to another is quite similar.
Only applicable when weightingMode is DIRECTIONAL.

*Parameters*

-   `val` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Usually something between 0 and 2. Default = 1.

### transform

Main function of the class. Transforms a point on the plane and returns
its new position.

*Parameters*

-   `x` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** X coordinate of the point to be transformed
-   `y` **[Number](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Number)** Y coordinate of the point to be transformed

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Transformed point as an Array [x, y]

### transform

Main function of the class. Transforms a point on the plane and returns
its new position.

*Parameters*

-   `p` **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Point given as an Array [x, y] to be transformed

Returns **[Array](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Array)** Transformed point as an Array [x, y]

### updateAnchorMatrices

It's usually not necessary to call this method. If anchors and parameters
are always set with the given methods (setAnchorOrigin(), ...), this
method will be called automatically. It calculates a transformation
matrix for each anchor. This matrix reflects the translation of the
anchor and the rotation and scaling depending on the (possibly) changed
positions of all other anchors.
