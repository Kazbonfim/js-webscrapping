var express = require("express");
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");

/* GET home page. */
router.get("/scrapp", async function (req, res) {
  try {
    const response = await axios.get(
      "https://www.scrapethissite.com/pages/simple/"
    );

    const $ = cheerio.load(response.data);

    const paises = [];

    $(".country-name").each((index, element) => paises.push({ nome: $(element).text().trim() }));
    $(".country-capital").each((index, element) => paises[index].capital = $(element).text().trim());

    console.log("Fazendo Scrapping do site, por favor, aguarde...");

    res.json({ "listagem": paises });
  } catch (error) {
    console.error(
      "😭Aconteceu algum problema, verifique os logs de erro: ",
      error
    );

    res.status(500).send("Erro ao fazer Scrapping");
  }
});

module.exports = router;
