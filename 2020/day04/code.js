const assert = require("assert");
const fs = require('fs');

function isValidPassport(blob) {
  const requiredProperties = ["byr", "iyr", "eyr", "hgt", "hcl", "ecl", "pid"];
  const optionalProperties = ["cid"];

  return requiredProperties.every((property) => blob.includes(`${property}:`));
}

function countValidPassports(passports) {
    return passports.filter(isValidPassport).length;
}

function splitInput(input) {
    return input.split('\n\n');
}

assert(
  isValidPassport(
    `ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm`
  )
);

assert(
  !isValidPassport(
    `iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929`
  )
);

assert(
  isValidPassport(
    `hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm`
  )
);

assert(
  !isValidPassport(
    `hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in`
  )
);

assert.strictEqual(countValidPassports(splitInput(`ecl:gry pid:860033327 eyr:2020 hcl:#fffffd
byr:1937 iyr:2017 cid:147 hgt:183cm

iyr:2013 ecl:amb cid:350 eyr:2023 pid:028048884
hcl:#cfa07d byr:1929

hcl:#ae17e1 iyr:2013
eyr:2024
ecl:brn pid:760753108 byr:1931
hgt:179cm

hcl:#cfa07d eyr:2025 pid:166559648
iyr:2011 ecl:brn hgt:59in
`)), 2)

console.log(countValidPassports(splitInput(fs.readFileSync(__dirname + '/input.txt').toString())));