const assert = require("assert");
const fs = require('fs');
const input = fs.readFileSync(__dirname+'/input.txt').toString().split('\n');

function findPlace(lowerHalfSign, upperHalfSign, lowerBoundary, upperBoundary, input) {
    let low = lowerBoundary;
    let high = upperBoundary;

    input.split("").forEach((char) => {
        if (char === upperHalfSign) {
          high = ~~(high - (high - low) / 2.0);
        } else if (char === lowerHalfSign) {
          low = Math.ceil(low + (high - low) / 2.0);
        }
    })

    return low;
} 

function getSeatId(input) {
    const row = findPlace('B', 'F', 0, 127, input.slice(0, 7))
    const col = findPlace('R', 'L', 0, 7, input.slice(7))

    return row * 8 + col;
}

assert.equal(getSeatId("FBFBBFFRLR"), 357);
assert.equal(getSeatId("BFFFBBFRRR"), 567);
assert.equal(getSeatId("FFFBBBFRRR"), 119);
assert.equal(getSeatId("BBFFBBFRLL"), 820);

console.log(Math.max(...input.map(getSeatId)))