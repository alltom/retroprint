var myList = [1, 2, 3, 4, 5, 6, 7];
myList.sort(function() { return Math.random() - 0.5; });
mergeSort(myList);

function mergeSort(a) {
  if (a.length <= 1) return a;
  var pivot = Math.floor(a.length / 2);
  return merge(mergeSort(a.slice(0, pivot)), mergeSort(a.slice(pivot)));

  function merge(a, b) {
    var r = [];
    while (a.length > 0 && b.length > 0) {
      if (a[0] < b[0])
        r.push(a.shift());
      else
        r.push(b.shift());
    }
    while (a.length > 0) r.push(a.shift());
    while (b.length > 0) r.push(b.shift());
    return r;
  }
}
