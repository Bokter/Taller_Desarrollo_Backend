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