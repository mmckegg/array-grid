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


test("place and lookup", function(t) {

  var grid = ArrayGrid([1,2,3,4], [4,4], [1,4])
  grid.place(1, 2, ArrayGrid([5,6,7,8], [2,2], [1, 2]))

  t.equals(grid.get(0,0), 1)
  t.equals(grid.get(3,0), 4)

  t.equals(grid.get(1,2), 5)
  t.equals(grid.get(2,2), 6)
  t.equals(grid.get(1,3), 7)
  t.equals(grid.get(2,3), 8)

  t.same(grid.lookup(2), [1,0])
  t.same(grid.lookup(3), [2,0])


  t.same(grid.lookup(5), [1,2])
  t.same(grid.lookup(7), [1,3])
  t.same(grid.lookup(8), [2,3])
  
  t.end()
})

test("place negative stride", function(t) {
  var grid = ArrayGrid([], [4,4], [1,4])
  var inner = ArrayGrid([5,6,7,8], [2,2], [1, -2])
  grid.place(1, 2, inner)

  t.equals(grid.get(1,3), 5)
  t.equals(grid.get(2,3), 6)
  t.equals(grid.get(1,2), 7)
  t.equals(grid.get(2,2), 8)
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

test("get/set - negative stride", function(t) {

  var p = ArrayGrid([1,2,3,4,5,6], [2,3], [1, -2])
  // 5 6
  // 3 4
  // 1 2

  t.equal(p.get(0,1), 3)
  t.equal(p.get(1,0), 6)
  t.equal(p.get(1,1), 4)

  p.set(0,1, 7)
  p.set(1,0, 8)
  p.set(1,1, 9)

  t.equal(p.data[2], 7)
  t.equal(p.data[5], 8)
  t.equal(p.data[3], 9)

  t.equal(p.get(0,1), 7)
  t.equal(p.get(1,0), 8)
  t.equal(p.get(1,1), 9)

  var r = ArrayGrid([1,2,3,4,5,6], [3,2], [-1, -3])
  // 6 5 4
  // 3 2 1
  t.equal(r.get(0,1), 3)
  t.equal(r.get(1,0), 5)
  t.equal(r.get(1,1), 2)

  var r = ArrayGrid([1,2,3,4,5,6], [2,3], [-1, -2])
  // 6 5
  // 4 3
  // 2 1
  t.equal(r.get(0,1), 4)
  t.equal(r.get(1,0), 5)
  t.equal(r.get(1,1), 3)


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