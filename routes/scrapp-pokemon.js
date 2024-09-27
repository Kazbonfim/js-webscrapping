var express = require("express");
var router = express.Router();
const axios = require("axios");
// const cheerio = require("cheerio");
const path = require('path');

async function scrappPokeApi(res) {

  try {

    // Fazer uma requisição dos dados, retornar em JSON, e reaproveitar o conteúdo no futuro - ou somente exibir
    const response = await axios.get("https://pokeapi.co/api/v2/version/");
    const results = response.data.results;

    // Para cada versão, fazemos uma nova req. para pegar a geração do jogo 
    const games = await Promise.all(
      results.map(async (game) => {
        const gameDetails = await axios.get(game.url);

        // Debug
        // console.log('Resultado 1', results);
        // console.log('Resultado 2', gameDetails);
        console.log(`Resultado JSON: Pokémon ${gameDetails.data.name}, Grupo: ${gameDetails.data.version_group.name}`);
        

        return {
          name: gameDetails.data.name,
          version: gameDetails.data.version_group.name
        };
      })
    );

    // Sucesso, vai retornar tudo em 'games'
    res.status(200).json({ games });

  } catch (error) {
    // Erro em caso de falha nas requisições, por algum motivo...
    console.log("Ops! Algum erro aconteceu, tente novamente...", error);
    res.status(500).json({ message: "Erro na busca dos dados" });
  }

}

// Função do pseudo back-end de buscar os dados HTML do link, retornar, e organizar eles antes de virarem JSON
router.get("/scrapp-pokemon", async function (req, res) {
  await scrappPokeApi(res);
});

// Aqui, ao acessar esse end-point, ele vai recuperar os dados do JSON acima, e aplicar no React 👌
// Sim, servir arquivos estáticos assim pode não ser tão legal, mas é pra ser SIMPLES.
router.get('/pokemon', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/pokemon.html'));
});

module.exports = router;
