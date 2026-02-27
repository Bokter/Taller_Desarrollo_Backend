//const express = require('express');
//const app = express();

async function obtenerMonsters(limit = 20) {
  const response = await fetch(
    `https://www.dnd5eapi.co/api/2014/monsters`
  );

  const data = await response.json();
  return data.results; // [{ name, url }]

}

let monsters= await obtenerMonsters();
console.log(monsters);