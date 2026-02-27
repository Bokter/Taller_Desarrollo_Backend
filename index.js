//const express = require('express');
//const app = express();

async function obtenerMonsters(limit = 20) {
  const response = await fetch(
    `https://www.dnd5eapi.co/api/2014/monsters`
  );

  const data = await response.json();
  return data.results; // [{ name, url }]

}

// a

const resultFilter = monsters.filter((monster) => 
  monster.cr >= 15 && monster.hp >= 200
);

console.log(resultFilter);

// b

const resultFind = monsters.find((monster) =>
  monster.type === "dragon" && monster.cr >= 6
);

console.log(resultFind)

// find: primer monstruo que sea type === "dragon" y cr >= 6

// c

const isLegendary = (monster) => monster.HasLegendary = true;

console.log(monsters.some(isLegendary));

// d

console.log(monsters.every((monster) =>
  monster.hp > 0 && Object.keys(monster.stats).length === 6
));

// e

const result = monsters.reduce((accum, monster) => {
  const type = monster.type;

  if (!accum[type]) {
    accum[type] = { count: 0, totalCR: 0, avgCR: 0, maxHP: 0 };
  }

  accum[type].count += 1;
  accum[type].totalCR += monster.cr;
  accum[type].avgCR = Math.round((accum[type].totalCR / accum[type].count) * 10) / 10;
  accum[type].maxHP = Math.max(accum[type].maxHP, monster.hp);

  return accum;
}, {});

console.log(result)
// every: ¿todos tienen stats completos (6 atributos) y hp > 0?