const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const path = require("path");

app.use(express.static("style.css"));
app.use(bodyParser.urlencoded({extended: true}));

app.listen(3000,function(){
  console.log("Started server at port 3000");
})

app.get('/',function(req,res){
  const dirName = __dirname + "/index.html";
  res.sendFile(dirName);
})

app.post("/",function(req,res){
  const city = req.body.city;
  const state = req.body.state;
  const units = "imperial";
  const appId = "6418924b2fd49d6a130c267362664914";
  const url = "https://api.openweathermap.org/data/2.5/weather?q="+city+","+state+"&units="+units+"&appid="+appId;
  https.get(url,function(response){
    response.on("data",function(data){
      const weatherData = JSON.parse(data);
      const icon = weatherData.weather[0].icon;
      const imgURL = "<img src=' http://openweathermap.org/img/wn/"+icon+"@2x.png'>";
      res.write("<h1>"+weatherData.name+"</h1>");
      res.write("<p>The weather is "+weatherData.main.temp+" degree fahrenheit.</p>");
      res.write("<p>Weather outside: "+weatherData.weather[0].description+"</p>");
      res.write(imgURL);
      res.send();
    });
  });
});
