//const express = require('express');
//const app = express();

async function obtenerMonsters1() {
  const response = await fetch(
    `https://www.dnd5eapi.co/api/2014/monsters`
  );

  const data = await response.json();
  return data.results; // [{ name, url }]

}



async function obtenerMonsters2(limit = 1) {
  const response = await fetch(
    `https://www.dnd5eapi.co/api/2014/monsters?limit=${limit}`
  );
  
  const data = await response.json();
  const data2=data.results.slice(0, limit);
  return data2; // [{ name, url }]

}
let monsters= await obtenerMonsters2();
console.log(monsters);