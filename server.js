const express = require('express')
const http = require('http')
const path = require('path')
var spdy = require('spdy');
// var CDN = require('express-simple-cdn');
var app = express();
var fs = require('fs');
const critical = require("critical");
const compression = require('compression')
app.use(compression())

// module.exports = app;
var credentials = {
    key: fs.readFileSync('../certs/key.pem'),
    cert: fs.readFileSync('../certs/cert.pem'),
    ca: fs.readFileSync('../certs/csr.pem'),
    spdy: {
        protocols: ['h2', 'spdy/3.1', 'http/1.1']
    }
};


critical.generate({
    /* The path of the Webpack bundle */
    base: path.join(path.resolve(__dirname), 'dist/'),
    src: 'index.html',
    dest: 'index.html',
    inline: true,
    extract: true,
    /* Ensure that bundled JS file is called */
    penthouse: {
      blockJSRequests: false,
    }
  });

app.use(express.static(__dirname + '/dist'))

app.get('/*',(req,res) => res.sendFile(path.join(__dirname + '/dist/index.html')));

// const server = http.createServer(app);
var server = spdy.createServer(credentials, app);

const port = process.env.PORT || 3010;
server.listen(port);
console.log("Server listening on https://", port);
