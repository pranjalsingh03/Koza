const express = require("express");
const app = express();

app.get("/api",(req, res)=>{
    res.json({"user":["one","two","three"]})
})

app.listen(4000, ()=>{
    console.log("server is running");
});