var test = require('tape')
var ArrayGrid = require('../')

// some tests from https://github.com/mikolalysenko/ndarray/test/test.js

test("ndarray", function(t) {

  var p = ArrayGrid(new Float32Array([1,2,3,4]), [2,2])

  // t.equals(p.dtype, "float32") // fail
  t.equals(p.shape.length, 2)
  t.equals(p.shape[0], 2)
  t.equals(p.shape[1], 2)
  t.equals(p.stride[0], 2)
  t.equals(p.stride[1], 1)
  
  t.end()
})

test("index", function(t) {

  var p = ArrayGrid(new Float32Array([1,2,3,4]), [2,2])

  t.equals(p.index(0,0), 0)
  t.equals(p.index(0,1), 1)
  t.equals(p.index(1,0), 2)
  t.equals(p.index(1,1), 3)
  t.end()
})

test("get/set", function(t) {

  var p = ArrayGrid(new Float32Array([1,2,3,4]), [2,2])

  t.equal(p.get(0,1), 2)
  t.equal(p.get(1,0), 3)
  t.equal(p.get(1,1), 4)

  p.set(0,1, 5)
  p.set(1,0, 6)
  p.set(1,1, 7)

  t.equal(p.data[1], 5)
  t.equal(p.data[2], 6)
  t.equal(p.data[3], 7)

  t.equal(p.get(0,1), 5)
  t.equal(p.get(1,0), 6)
  t.equal(p.get(1,1), 7)

  t.end()
})

test("get/set Array", function(t) {

  var p = ArrayGrid([1,2,3,4], [2,2])

  t.equal(p.get(0,1), 2)
  t.equal(p.get(1,0), 3)
  t.equal(p.get(1,1), 4)

  p.set(0,1, 'A')
  p.set(1,0, 'B')
  p.set(1,1, 'C')

  t.equal(p.data[1], 'A')
  t.equal(p.data[2], 'B')
  t.equal(p.data[3], 'C')

  t.equal(p.get(0,1), 'A')
  t.equal(p.get(1,0), 'B')
  t.equal(p.get(1,1), 'C')

  t.end()
})

test("empty Array", function(t) {
  var p = ArrayGrid([], [2,2])

  p.set(0,1, 'A')
  p.set(1,0, 'B')
  p.set(1,1, 'C')

  t.equal(p.data[1], 'A')
  t.equal(p.data[2], 'B')
  t.equal(p.data[3], 'C')

  t.equal(p.get(0,1), 'A')
  t.equal(p.get(1,0), 'B')
  t.equal(p.get(1,1), 'C')

  t.end()
})