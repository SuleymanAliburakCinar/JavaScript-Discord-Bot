function addNonNullValueToArray(array, value) {
  if (value) {
    array.push(value);
  }
}

module.exports = { addNonNullValueToArray };
