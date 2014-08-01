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