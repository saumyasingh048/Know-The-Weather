const express = require("express");
const https = require("https");
const bodyParser = require("body-parser");
const app = express();
const port = 3000;
// This is a line of code, you need to input each time you need to have body-parser.
app.use(bodyParser.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  //   res.send("Hello World");
  res.sendFile(__dirname + "/index.html");
});
app.post("/", (req, res) => {
  let city = req.body.city;
  url =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    city +
    "&appid=86e74abc69ada87411197fc21f167b6d";
  https.get(url, (response) => {
    // console.log(response);
    response.on("data", (d) => {
      //   process.stdout.write(d);
      const weatherData = JSON.parse(d);
      console.log(weatherData);
      console.log(weatherData.weather[0].description);
      const weatherIcon = weatherData.weather[0].icon;
      const iconURL =
        "http://openweathermap.org/img/wn/" + weatherIcon + "@2x.png";
      // JSON.parse(data) is important to fetch the right JSON Formatted data
      // We cannot have more than one send method with app, otherwise the program would crash

      //   console.log(weatherData.main.temp);
      //   let temp = weatherData.main.temp;
      //   http://openweathermap.org/img/wn/10d@2x.png

      res.write("<h1>" + weatherData.weather[0].description + "</h1>");
      res.write("<img src=" + iconURL + ">");
      res.send();
    });
  });
  //   res.send("HEllo Client");
});

app.listen(port, () => {
  console.log("Server listening at port: " + port);
});
