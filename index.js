app.get('/api/pokemones/fuego', async (req, res) => {
  try {
    const pokemones = await obtenerPokemones(20);

    // múltiples llamados fetch
    const detalles = await Promise.all(
      pokemones.map(p =>
        fetch(p.url).then(r => r.json())
      )
    );

    const tipoFuego = detalles
      .filter(pokemon =>
        pokemon.types.some(t => t.type.name === 'fire')
      )
      .map(pokemon => ({
        nombre: pokemon.name,
        tipos: pokemon.types.map(t => t.type.name)
      }));

    res.json(tipoFuego);
  } catch (error) {
    res.status(500).json({ error: 'Error filtrando Pokémon' });
  }
});