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
  return urls; // [{ name, url }]
}
let monsters= await obtenerMonsters();
console.log( monsters);