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
let monsters= await obtenerMonsters();
console.log( monsters);