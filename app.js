const packageJson = require('./package.json');
const express = require('express');
const fs = require('fs');
const path = require('path');
const queryString = require('query-string');


const app = express();
app.set('views', __dirname + '/views');
app.set('view engine', 'pug');
const ip = process.env.IP || packageJson.config.ip;
const port = process.env.PORT || packageJson.config.port;
const appleAppSiteAssociationContent = fs.readFileSync(path.resolve(__dirname, './public/', 'apple-app-site-association'));

app.get('/apple-app-site-association', (req, res) => {
  res.set('Content-Type', 'application/json');

  return res.status(200).send(appleAppSiteAssociationContent);
});

app.get('/', function (req, res) {
  let myURL = 'https://circlus.herokuapp.com/'
  const query = queryString.stringify(req.query);
  if(query) {
  	myURL += `?${query}`;
  }

  res.render('index', { myURL })
})

app.use(express.static(path.resolve(__dirname, 'public/')));

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
