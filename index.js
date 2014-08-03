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

ArrayGrid.prototype.get = function(x, y){
  if (x < this.shape[0] && y < this.shape[1]){
    return this.data[this.offset + (this.stride[0] * x) + (this.stride[1] * y)]
  }
}

ArrayGrid.prototype.set = function(x, y, value){
  if (x < this.shape[0] && y < this.shape[1]){
    this.data[this.offset + (this.stride[0] * x) + (this.stride[1] * y)] = value
    return true
  } else {
    return false
  }
}

ArrayGrid.prototype.index = function(x, y, value){
  if (x < this.shape[0] && y < this.shape[1]){
    return this.offset + (this.stride[0] * x) + (this.stride[1] * y)
  }
}