module.exports = function extend(destination, other) {
  var props = Object.keys(other),
      idx = -1, length = props.length;
  while (++idx < length) {
    destination[props[idx]] = other[props[idx]];
  }
  return destination;
};
