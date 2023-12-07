const fs = require("node:fs");

const handToMap = (hand) => {
  return hand.split("").reduce((acc, letter) => {
    if (acc[letter]) {
      acc[letter] += 1;
      return acc;
    }
    acc[letter] = 1;
    return acc;
  }, {});
};

function isNumber(val) {
  return typeof val === "number";
}

const valueToForce = {
  A: 14,
  K: 13,
  Q: 12,
  J: 11,
  T: 10,
  9: 9,
  8: 8,
  7: 7,
  6: 6,
  5: 5,
  4: 4,
  3: 3,
  2: 2,
};
const sortWeakToStrong = (hand1, hand2, i = 0) => {
  const a = hand1[i];
  const b = hand2[i];
  if (i === 5) {
    return 0;
  }

  if (a === b) {
    return sortWeakToStrong(hand1, hand2, i + 1);
  }
  return valueToForce[a] < valueToForce[b] ? -1 : 1;
};

const getTypeForHand = (map) => {
  const numbers = Object.values(map).filter((v) => Boolean(v));
  const entropy = numbers.length;

  // ABCDE
  if (entropy === 5) {
    return 0;
  }
  // AABCD
  if (entropy === 4) {
    return 1;
  }
  // AAABC
  if (entropy === 3 && numbers.includes(3)) {
    return 3;
  }
  // AABBC
  if (entropy === 3) {
    return 2;
  }
  // AAAAB
  if (entropy === 2 && numbers.includes(4)) {
    return 5;
  }
  // AAABB
  if (entropy === 2) {
    return 4;
  }
  // AAAAA
  if (entropy === 1) {
    return 6;
  }
};

const main = (filename) => {
  fs.readFile(__dirname + filename, "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const content = data.split("\n").filter((e) => !!e);

    const handToType = Array.from({ length: 7 }, () => []);

    content.map((line) => {
      const [hand, bid] = line.split(" ");
      const map = handToMap(hand);

      handToType[getTypeForHand(map)].push([hand, parseInt(bid)]);
    });


    // sort per type
    handToType.forEach((type) => {
      type.sort(([a],[b])=>sortWeakToStrong(a,b));
    });

    console.log(handToType.flat().reduce((acc,[_,bid],idx)=>{
      return acc+bid*(idx+1)
    }, 0));

  });
};

main("/input.txt");

module.exports = { handToMap, main, sortWeakToStrong, getTypeForHand };
