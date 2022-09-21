// const https = require("https");

// const options = {
//   headers: {'User-Agent': 'test'},
//   host: "newsapi.org",
//   path: "/v2/everything?q=+drone&apiKey=da280194eb264983b9bc524ff34e7b57"
// }

// https
//   .get(options, resp => {
//     let data = "";

//     resp.on("data", chunk => {
//       data += chunk;
//     });

//     resp.on("end", () => {
//       let url = JSON.parse(data);
//       console.log(url);
//     })
    
//   });
