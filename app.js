const express = require("express");
const app = express();
const axios = require("axios");
const https = require("https");


app.get("/api", (req, res) => {
  //res.json({"users": ["userOne", "userTwo", "userThree"]})

  // const options = {
  //  headers: {'User-Agent': 'test'},
  //  host: "newsapi.org",
  //  path: "/v2/everything?q=+drone&apiKey=da280194eb264983b9bc524ff34e7b57"
  // }

    axios
    .get("https://newsapi.org/v2/everything?q=+drone&apiKey=da280194eb264983b9bc524ff34e7b57")
    .then((response) => {
      let data = response.data;
      res.send({data});
    })
    .catch((error) => {
      console.log(error);
    })
    // let data = "";

    // resp.on("data", chunk => {
    //   data += chunk;
    // });

    // resp.on("end", () => {
    //   let url = JSON.parse(data);
    //   console.log(url);
    // })
})

app.listen(5000, () => {console.log("Server started on port 5000")});



//------------------


// app.post("/post", (req, res) => {
// console.log("Connected to React", req.get('user-agent'));
// res.redirect("/");
// });

// const PORT = process.env.PORT || 8080;


// const options = {
//   headers: {'User-Agent': 'test'},
//   host: "newsapi.org",
//   path: "/v2/everything?q=+drone&apiKey=da280194eb264983b9bc524ff34e7b57"
// }

// app.get('/news', (options, resp) => {
//     let data = "";

//     resp.on("data", chunk => {
//       data += chunk;
//     });

//     resp.on("end", () => {
//       let url = JSON.parse(data);
//       console.log(url);
//     })
    
//   });

// app.listen(PORT, console.log(`Server started on port ${PORT}`));
