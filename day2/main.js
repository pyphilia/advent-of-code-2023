const assert = require("assert");
const fs = require("node:fs");

const red = 12;
const blue = 14;
const green = 13;

const transformToMap = (game) => {
  const subsets = game
    .slice(game.indexOf(":") + 1)
    .split(";")
    .map((s) => s.trim());
  const mapPerColor = subsets
    .map((subset) => subset.split(",").map((s) => s.trim()))
    .map((nbAndColors) =>
      nbAndColors
        .map((nbAndColor) => nbAndColor.split(" "))
        .reduce((acc, [nb, color]) => ({ ...acc, [color]: nb }), {})
    );
  return mapPerColor;
};

const part1 = (game) => {
  const mapPerColor = transformToMap(game);

  return mapPerColor.every(
    (subset) =>
      (subset.red ?? 0) <= red &&
      (subset.green ?? 0) <= green &&
      (subset.blue ?? 0) <= blue
  );
};

const part2_1 = (game) => {
  const mapPerColor = transformToMap(game);

  const red = Math.max(...mapPerColor.map((subset) => subset.red ?? 0));
  const blue = Math.max(...mapPerColor.map((subset) => subset.blue ?? 0));
  const green = Math.max(...mapPerColor.map((subset) => subset.green ?? 0));

  return red * blue * green;
};

const part2 = (game) => {
  const g = game.slice(game.indexOf(":") + 1);

  const blue = Math.max(
    ...[...g.matchAll(/[0-9]+(?= blue)/g)].map(([v]) => parseInt(v))
  );
  const red = Math.max(
    ...[...g.matchAll(/[0-9]+(?= red)/g)].map(([v]) => parseInt(v))
  );
  const green = Math.max(
    ...[...g.matchAll(/[0-9]+(?= green)/g)].map(([v]) => parseInt(v))
  );

  return blue * red * green;
};

const main1 = () => {
  fs.readFile(__dirname + "/input-example.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const result = data
      .split("\n")
      .filter((e) => !!e)
      .map(part1)
      .reduce((acc, curr, idx) => {
        if (curr) {
          // game id
          return acc + idx + 1;
        }
        return acc;
      }, 0);

    console.log(result);
  });
};

const main2 = () => {
  fs.readFile(__dirname + "/input-example.txt", "utf8", (err, data) => {
    if (err) {
      console.error(err);
      return;
    }

    const result = data
      .split("\n")
      .filter((e) => !!e)
      .map(part2_1)
      .reduce((acc, curr) => acc + curr, 0);

    console.log(result);
  });
};

main1();
main2();

assert(part1("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green"));
assert(
  part1("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue")
);
assert(
  !part1(
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
  )
);
assert(
  !part1(
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
  )
);
assert(part1("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green"));

assert(part2("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green") === 48);
assert(
  part2("Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue") ===
    12
);
assert(
  part2(
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
  ) === 1560
);
assert(
  part2(
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
  ) === 630
);
assert(part2("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green") === 36);

assert(
  part2_1("Game 1: 3 blue, 4 red; 1 red, 2 green, 6 blue; 2 green") === 48
);
assert(
  part2_1(
    "Game 2: 1 blue, 2 green; 3 green, 4 blue, 1 red; 1 green, 1 blue"
  ) === 12
);
assert(
  part2_1(
    "Game 3: 8 green, 6 blue, 20 red; 5 blue, 4 red, 13 green; 5 green, 1 red"
  ) === 1560
);
assert(
  part2_1(
    "Game 4: 1 green, 3 red, 6 blue; 3 green, 6 red; 3 green, 15 blue, 14 red"
  ) === 630
);
assert(
  part2_1("Game 5: 6 red, 1 blue, 3 green; 2 blue, 1 red, 2 green") === 36
);
