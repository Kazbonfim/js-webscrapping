var express = require("express");
var router = express.Router();
const axios = require("axios");
const cheerio = require("cheerio");
const path = require('path');

/* GET home page. */
router.get("/scrapp-countries", async function (req, res) {

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

    // try {
    //   res.sendFile(path.join(__dirname, '../public/countries.html'));
    // } catch (error) {
    //   res.status(500).json({ message: "Ops! Não encontramos a página em questão, tente novamente..." });
    // }

  } catch (error) {
    console.error(
      "😭Aconteceu algum problema, verifique os logs de erro: ",
      error
    );

    res.status(500).send("Erro ao fazer Scrapping");
  }
});

router.get('/countries', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/countries.html'));
});

module.exports = router;
