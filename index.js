//const express = require('express');
//const app = express();


async function obtenerMonsters(limit = 2) {
  const response = await fetch(
    `https://www.dnd5eapi.co/api/2014/monsters`
  );
  
  const data = await response.json();
  const results=data.results.slice(0, limit);
  const urls=results.reduce((acum,m)=>{
    acum.push(m.url);
    return acum;
  },[])

  const promises = urls.map((url) => {
    const curl = ("https://www.dnd5eapi.co"+url)
    return fetch(curl)
  });

  const responses = await Promise.all(promises)
  const d = await Promise.all(responses.map(async r => r.json()));

  return d; // [{ name, url }]

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

// e

const resultBucket  = monsters.reduce((accum, monster) => {
  let bucket;

  if (monster.cr <= 1) bucket = "0-1";
  else if (monster.cr <= 4) bucket = "2-4";
  else if (monster.cr <= 9) bucket = "5-9";
  else bucket = "10+";

  accum[bucket] = (accum[bucket] || 0) + 1;

  return accum;
}, {});

console.log(resultBucket);
let response = await obtenerMonsters();

let monsters = response.reduce((accum, m) => {

  const max_speed = Object.values(m.speed).reduce((max_speed, s) => {
    const new_speed = parseFloat(s.split(" ")[0]);
    max_speed = new_speed > max_speed ? new_speed:max_speed;
    return max_speed;
  }, 0.0);

  accum.push(
    {
      index: m.index,
      name: m.name,
      size: m.size,
      type: m.type,
      alignment: m.alignment,
      cr: m.challenge_rating,
      ac: m.armor_class,
      hp: m.hit_points,
      speed: max_speed,
      stats: {
        str:m.strength,
        dex:m.dexterity,
        con:m.constitution,
        int:m.intelligence,
        wis:m.wisdom,
        cha:m.charisma
      },
      immuneCount: m.damage_immunities.length,
      resistCount: m.damage_resistances.length,
      vulCount: m.damage_vulnerabilities.length,
      hasLegendary: m.legendary_actions.length > 0 ? true:false
    }
  );
  
  return accum
}, []);

console.log( monsters);
