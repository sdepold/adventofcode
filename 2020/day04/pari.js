const fs = require('fs');
const input = fs.readFileSync(__dirname + '/input.txt').toString().split('\n');
// const testInput = fs.readFileSync('./inputs/test-input.txt').toString().split('\n').join(', ').split(', , ');
// console.log(testInput.map(i => i.split(' ')))
function createPpObjects(input) {
  const newInput = input.map(i => i.trim().split(' '));
//   console.log(newInput)
  const splitArr = newInput.map(item => item.map(arr => arr.split(",").join("")));
//   console.log(splitArr)
  const flattenedArr = splitArr.map(item => item.flat());
//   console.log(flattenedArr)
  const obj = flattenedArr.map(item => item.reduce((obj, str, index) => {
      let strParts = str.split(':');
      if (strParts[0] && strParts[1]) {
        obj[strParts[0]] = strParts[1];
      }
      return obj
    }, {})
  );
  return obj;
}

function checkValidityOfPp(input) {
  const passportsArray = createPpObjects(input);
  let counter = 0;
  passportsArray.map(passport => {
    if (Object.entries(passport).length === 8) {
      counter++
    } else if (Object.entries(passport).length === 7 && !Object.keys(passport).includes('cid')) {
      counter++
    } else {
      return;
    }
  });
  return counter;
}

console.log(createPpObjects(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`.split('\n')))

console.log(createPpObjects(`iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929`.split('\n')));

console.log(createPpObjects(`hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm`.split('\n')));

console.log(createPpObjects(`hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`.split('\n')))

// console.log(checkValidityOfPp(input));