const assert = require("assert");
const fs = require("fs");
const { parse } = require("path");
const input = fs.readFileSync(__dirname + "/input.txt").toString();

const parseProgram = (program) => {
  return program
    .trim()
    .split("\n")
    .map((line) => {
      const [command, value] = line.trim().split(" ");

      return { command, value: Number(value) };
    });
};

const evalProgram = (lines) => {
  let acc = 0;
  const path = [];

  for (let i = 0; i < lines.length; i++) {
    if (path.includes(i)) {
      return { result: acc, finite: false };
    }
    path.push(i);

    const line = lines[i];

    switch (line.command) {
      case "nop":
        break;
      case "acc":
        acc += line.value;
        break;
      case "jmp":
        i += line.value - 1; // -1 because the loop will increase it by 1 as well
        break;
    }
  }

  return { result: acc, finite: true };
};

const fixProgram = (instructions) => {
  const alternations = instructions.map((instruction, i) => {
    let newProgram = [...instructions];

    if (instruction.command === "nop") {
      newProgram[i] = { ...instruction, command: "jmp" };
    } else if ((instruction.command === "jmp")) {
      newProgram[i] = { ...instruction, command: "nop" };
    }

    return newProgram;
  });
  return alternations.find((program) => evalProgram(program).finite);
};

const testProgram = `
  nop +0
  acc +1
  jmp +4
  acc +3
  jmp -3
  acc -99
  acc +1
  jmp -4
  acc +6
`;

assert.deepStrictEqual(evalProgram(parseProgram(testProgram)), {
  result: 5,
  finite: false,
});
console.log(evalProgram(parseProgram(input)));

assert.deepStrictEqual(evalProgram(fixProgram(parseProgram(testProgram))), {
  result: 8,
  finite: true,
});
console.log(evalProgram(fixProgram(parseProgram(input))));
