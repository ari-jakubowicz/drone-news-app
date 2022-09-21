const express = require("express");
const app = express();
const axios = require("axios");
const https = require("https");
const cors = require("cors");

app.use(cors());

app.get("/api", (req, res) => {
  axios
    .get("https://newsapi.org/v2/everything?q=+drone&apiKey=da280194eb264983b9bc524ff34e7b57")
    .then((response) => {
      let data = response.data;
      res.send({data});
    })
    .catch((error) => {
      console.log(error);
    })
})

function findArticles(inputValue, allArticles) {
  return allArticles.filter((el, i) => {
    return el.title.toLowerCase().indexOf(inputValue.toLowerCase()) > -1;
  });
}

app.get("/search/:search", (req, res) => {
  axios
    .get("https://newsapi.org/v2/everything?q=+drone&apiKey=da280194eb264983b9bc524ff34e7b57")
    .then((response) => {
      // console.log(response.data)
      let allArticles = response.data.articles;
      let inputValue = req.params.search;

      let searchResult = findArticles(inputValue, allArticles);
      res.send({ articles: searchResult });
    })
    .catch((error) => {
      console.log(error);
    });
});

app.listen(5000, () => {console.log("Server started on port 5000")});
