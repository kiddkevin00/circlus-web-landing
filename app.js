const packageJson = require('./package.json');
const express = require('express');
const path = require('path');


const app = express();
const ip = process.env.IP || packageJson.config.ip;
const port = process.env.PORT || packageJson.config.port;

app.use(express.static(path.resolve(__dirname, 'public/')));

app.get('/apple-app-site-association', (req, res) => {
  return res.json({
    "applinks": {
      "apps": [],
      "details": [
        {
          "appID": "AL3QQKJ8WD.com.circlus.consumer.main",
          "paths": [ "*" ]
        }
      ]
    }
  });
});

// All routes should direct to the index.html
app.route('/*')
  .get((req, res) => {
    res.sendFile(path.resolve(__dirname, './public/', 'index.html'));
  });

const server = app.listen(port, ip, () => {
  console.log('Express server listening on port: %d at IP: %s.',
    server.address().port, server.address().address);
});

module.exports = exports = app;
