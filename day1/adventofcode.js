const fs = require("node:fs");

const main = (line) => {
  if (line.length === 0) {
    return 0;
  }

  const re = /[0-9]/g;
  const result = [...line.matchAll(re)];

  const first = result[0][0];

  // one number
  if (result.length === 1) {
    return parseInt(first + first); // js ;)
  }

  // 2+ numbers
  const last = result[result.length - 1][0];
  return parseInt(first + last);
};

fs.readFile(__dirname + "/9sixsevenz3.txt", "utf8", (err, data) => {
  if (err) {
    console.error(err);
    return;
  }

  const result = data
    .split("\n")
    .map(main)
    .reduce((acc, curr) => acc + curr, 0);

  console.log(result);
});

// console.log(main('1abc2')==='12')
// console.log(main('pqr3stu8vwx')==='38')
// console.log(main('a1b2c3d4e5f')==='15')
// console.log(main('treb7uchet')==='77')
