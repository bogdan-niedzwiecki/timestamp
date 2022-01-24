// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
var cors = require('cors');
app.use(cors({ optionsSuccessStatus: 200 }));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/views/index.html');
});

app.get("/api/:date", function (req, res) {
  const unix = new Date(Number(req.params.date));
  const utc = new Date(req.params.date);
  const date = isValidDate(unix) || isValidDate(utc);

  if (date) {
    res.json({
      "unix": Math.floor(date.getTime()),
      "utc": date.toUTCString()
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
});

app.get("/api", function (req, res) {
  const date = new Date();

  res.json({
    "unix": Math.floor(date.getTime()),
    "utc": date.toString()
  })
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});

isValidDate = (date) => {
  if (Object.prototype.toString.call(date) === "[object Date]") {
    if (isNaN(date.getTime())) {
      return false;
    } else {
      return date;
    }
  } else {
    return false;
  }
}
