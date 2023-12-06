const fs = require("node:fs");
const assert = require("assert");

const numbers = {
  one: 1,
  two: 2,
  three: 3,
  four: 4,
  five: 5,
  six: 6,
  seven: 7,
  eight: 8,
  nine: 9,
};
// lookahead to allow overlapping text
const numbersReg = "(?=(" + [...Object.keys(numbers), "[1-9]"].join("|") + "))";

const toNumber = (str) => {
  if (str.length > 1) {
    return numbers[str];
  }
  return parseInt(str);
};

const main = (line) => {
  const re = new RegExp(numbersReg, "g");
  const result = [...line.matchAll(re)];

  const first = toNumber(result[0][1]);

  // one number
  if (result.length === 1) {
    return parseInt(`${first}${first}`);
  }

  // 2+ numbers
  const last = toNumber(result[result.length - 1][1]);
  return parseInt(`${first}${last}`);
};

fs.readFile(__dirname + "/9sixsevenz3.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const result = data
    .split("\n")
    .filter((e) => !!e)
    .map(main)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(result);
});
