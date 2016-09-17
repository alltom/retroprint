window.SAVED_VALUES = [];
function SAVE(id, name, start, end, value) {
  window.SAVED_VALUES.push(
      {id: id, name: name, start: start, end: end, value: clone(value)});
  return value;

  function clone(value) {
    if (value === null || typeof(value) !== 'object') return value;
    if (value instanceof Array) return value.slice();

    var copy = {};
    // shallow clone
    for (var key in value) {
      copy[key] = value[key];
    }
    return copy;
  }
}
