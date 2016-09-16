function listSum(numbers) {
  if (numbers.length == 0) {
    return 0;
  }
  var f = numbers[0];
  var rest = numbers.slice(1);
  return f + listSum(rest);
}

var myList = [1, 2, 3];
var total = listSum(myList);
