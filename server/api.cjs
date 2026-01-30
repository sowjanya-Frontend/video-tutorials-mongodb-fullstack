const express = require("express");
const app = express();

//req -- to request data from client - get somthing from client
//res -- if you want to send somthing to client then use response
app.get("/", (req, res) => {
  res.send("Welcome to API");
});

app.listen(4000);
console.log("server started :  http://localhost:4000");
