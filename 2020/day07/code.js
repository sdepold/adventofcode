const assert = require("assert");
const testRules = `light red bags contain 1 bright white bag, 2 muted yellow bags.
dark orange bags contain 3 bright white bags, 4 muted yellow bags.
bright white bags contain 1 shiny gold bag.
muted yellow bags contain 2 shiny gold bags, 9 faded blue bags.
shiny gold bags contain 1 dark olive bag, 2 vibrant plum bags.
dark olive bags contain 3 faded blue bags, 4 dotted black bags.
vibrant plum bags contain 5 faded blue bags, 6 dotted black bags.
faded blue bags contain no other bags.
dotted black bags contain no other bags.`;
const realInput = require("fs")
  .readFileSync(__dirname + "/input.txt")
  .toString();

function destructureBag(bag) {
  const bag2 = bag.replace("bags", "").replace("bag", "").trim();
  const [_, count, color] = bag2.match(/(\d)+ (.*)/);

  return { count, color };
}

function sanitizeBag(bag) {
  return bag.replace("bags", "").replace("bag", "").replace(/\d/g, "").trim();
}

function parseRules(rules) {
  const entries = rules.split("\n").map((line) => {
    const [_, outer, inner] = line.match(/(.*) contain (.*) /);

    if (inner === "no other") {
      return [sanitizeBag(outer), []];
    }

    return [sanitizeBag(outer), inner.split(", ").map(destructureBag)];
  });

  return Object.fromEntries(entries);
}

function resolve(rules, key) {
  return new Set([
    ...rules[key].map(e => e.color),
    ...rules[key].flatMap((subKey) => Array.from(resolve(rules, subKey.color))),
  ]);
}

function findOptionsFor(rules, bag) {
  let options = new Set();

  Object.entries(rules).forEach(([outer, inners]) => {
    if (resolve(rules, outer).has(bag)) {
      options.add(outer);
    }
  });

  return options;
}

function countOptionsFor(rules, bag) {
  console.log(rules)
  return findOptionsFor(rules, bag).size;
}

assert.deepEqual(
  resolve(parseRules(testRules), "light red"),
  new Set([
    "bright white",
    "muted yellow",
    "shiny gold",
    "faded blue",
    "dark olive",
    "vibrant plum",
    "dotted black",
  ])
);
assert.equal(countOptionsFor(parseRules(testRules), "shiny gold"), 4);
// console.log(countOptionsFor(parseRules(realInput), "shiny gold"));
