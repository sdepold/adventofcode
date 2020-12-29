const assert = require("assert");
const fs = require("fs");

function find2020With2(list) {
  for (let i = 0; i <= list.length; i++) {
    for (let j = 0; j <= list.length; j++) {
      if (list[i] + list[j] === 2020) {
        return [list[i], list[j]];
      }
    }
  }
}

function find2020With3(list) {
  for (let i = 0; i <= list.length; i++) {
    for (let j = 0; j <= list.length; j++) {
      for (let k = 0; k <= list.length; k++) {
        if (list[i] + list[j] + list[k] === 2020) {
          return [list[i], list[j], list[k]];
        }
      }
    }
  }
}

function splitInput(lines) {
  return lines.trim().split("\n").map(Number);
}

assert.deepStrictEqual(find2020With2([1721, 979, 366, 299, 675, 1456]), [
  1721,
  299,
]);
assert.deepStrictEqual(find2020With3([1721, 979, 366, 299, 675, 1456]), [
  979,
  366,
  675,
]);
const input = splitInput(fs.readFileSync("./day01/input.txt").toString());
const pair2 = find2020With2(input);
const product2 = pair2[0] * pair2[1];
console.log(pair2, product2);

const pair3 = find2020With3(input);
const product3 = pair3[0] * pair3[1] * pair3[2];
console.log(pair3, product3);