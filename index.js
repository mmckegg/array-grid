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
  return this.data[(this.stride[0] * x) + (this.stride[1] * y)]
}

ArrayGrid.prototype.set = function(x, y, value){
  this.data[(this.stride[0] * x) + (this.stride[1] * y)] = value
}

ArrayGrid.prototype.index = function(x, y, value){
  return (this.stride[0] * x) + (this.stride[1] * y)
}