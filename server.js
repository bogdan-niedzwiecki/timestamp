// server.js
// where your node app starts

// init project
var express = require('express');
var app = express();
var moment = require('moment');

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
  if (moment(req.params.date, 'X', true).isValid()) {
    res.json({
      "unix": moment(Number(req.params.date)).valueOf(),
      "utc": moment(Number(req.params.date)).toDate().toUTCString()
    })
  } else if (moment(req.params.date, 'YYYY-MM-DD', true).isValid()) {
    res.json({
      "unix": moment(`${req.params.date} +0000`, "YYYY-MM-DD Z").valueOf(),
      "utc": moment(`${req.params.date} +0000`, "YYYY-MM-DD Z").toDate().toUTCString()
    })
  } else {
    res.json({
      "error": "Invalid Date"
    })
  }
});

// listen for requests :)
var listener = app.listen(process.env.PORT || 3000, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
