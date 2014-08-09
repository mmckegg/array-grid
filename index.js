module.exports = ArrayGrid

function ArrayGrid(data, shape, stride, offset){
  
  if (!(this instanceof ArrayGrid)){
    return new ArrayGrid(data, shape, stride, offset)
  }

  this.data = data
  this.shape = shape || [data.length, 1]
  this.stride = stride || [this.shape[1], 1]
  this.offset = offset || 0
}

ArrayGrid.prototype.get = function(row, col){
  if (row < this.shape[0] && col < this.shape[1]){
    return this.data[this.index(row,col)]
  }
}

ArrayGrid.prototype.set = function(row, col, value){
  if (row < this.shape[0] && col < this.shape[1]){
    this.data[this.index(row, col)] = value
    return true
  } else {
    return false
  }
}

ArrayGrid.prototype.index = function(row, col){
  if (row < this.shape[0] && col < this.shape[1]){
    // handle negative stride
    row = this.stride[0] < 0 ? -this.shape[0] + row + 1 : row
    col = this.stride[1] < 0 ? -this.shape[1] + col + 1 : col
    return this.offset + (this.stride[0] * row) + (this.stride[1] * col)
  }
}

ArrayGrid.prototype.place = function(originRow, originCol, array){
  for (var r=0;r<array.shape[0];r++){
    for (var c=0;c<array.shape[1];c++){
      this.set(originRow + r, originCol + c, array.get(r, c))
    }
  }
}

ArrayGrid.prototype.lookup = function(value){
  var index = this.data.indexOf(value)
  if (~index){
    index = index - this.offset
    return [
      Math.floor(index / this.stride[0]) % this.shape[0],
      Math.floor(index / this.stride[1]) % this.shape[1]
    ]
  }
}