import fs from "fs";
let number_of_names = 7;

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

let FD = (fs.readFileSync("./data/testData.txt", "utf8")).split("\n");

let names = [];

for (let i = 0; i < number_of_names; i++) {
    names.push(FD[getRandomInt(FD.length)]);
};

for (let i = 0; i < names.length; i++) {
    console.log(`Name is ${names[i]}!`);
}