function addNonNullValueToArray(array, value) {
  if (value !== null && value !== undefined) {
    array.push(value);
  }
}

module.exports = { addNonNullValueToArray };
