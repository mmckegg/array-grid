array-grid
===

Two-dimensional implementation of ndarray to avoid dynamic code generation eval.

This modules conforms to the same API as [ndarray](https://github.com/mikolalysenko/ndarray) except fixed at 2-dimensions. Use if you need to avoid the runtime eval code generation of ndarray (e.g. Chrome Packaged App).

## Install via [npm](https://npmjs.org/packages/array-grid)

```bash
$ npm install array-grid
```

## API

```js
var ArrayGrid = require('array-grid')
var array = ArrayGrid([1,2,3,4], [2, 2])
```

### `ArrayGrid(data[, shape, stride, offset])`

- `data` is a 1D array storage. It is either an instance of Array, a typed array, or an object that implements get(), set(), .length
- `shape` is the shape of the view (Default: `[data.length, 1]`)
- `stride` is the resulting stride of the new array. (Default: row major)
- `offset` is the offset to start the view (Default: 0)

Returns a 2-dimensional array view of the underlying data.

### array.get(x, y)

### array.set(x, y, value)

### array.index(x, y)