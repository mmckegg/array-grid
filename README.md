array-grid
===

Two-dimensional implementation of ndarray with coordinate lookup and sub-array placement.

This modules conforms to the same API as [ndarray](https://github.com/mikolalysenko/ndarray) except fixed at 2-dimensions with a couple of other useful methods (`lookup` and `place`). Use if you need to avoid the runtime eval code generation of ndarray (e.g. Chrome Packaged App).

## Install via [npm](https://npmjs.org/package/array-grid)

```bash
$ npm install array-grid
```

## API

```js
var ArrayGrid = require('array-grid')
var array = ArrayGrid([1,2,3,4], [2, 2])
```

### `ArrayGrid(data[, shape, stride, offset])`

- `data` is a 1D array storage. It is either an instance of Array or a typed array.
- `shape` is the shape of the view (Default: `[data.length, 1]`)
- `stride` is the resulting stride of the new array. (Default: row major `[shape[1], 1]`)
- `offset` is the offset to start the view (Default: 0)

Returns a 2-dimensional array view of the underlying data.

### `array.get(row, col)`

Get the value at the position specified.

### `array.set(row, col, value)`

Set the value of the position specified.

### `array.index(row, col)`

Get the interal 1d `data` index of the specified coordinates.

### `array.lookup(value)`

Lookup the `[row,col]` coordinates of the specified `value`.

### `array.coordsAt(index)`

Lookup the `[row,col]` coordinates of the specified `index`.

### `array.place(originRow, originCol, array)`

Stamp another ArrayGrid or two-dimensional ndarray starting at the origin specified.

### `array.data` (attribute)

The underlying one-dimensional array holding the data.

### `array.shape` (attribute)

`[rows,columns]` of the grid.