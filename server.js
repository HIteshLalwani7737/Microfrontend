const path = require('path');
const fs = require('fs');
const express = require('express');
const React = require('react');
var cors = require('cors');
const App = require('./transpiled/App.js').default;
const { renderToString } = require('react-dom/server');

const server = express();
server.use(cors());

server.get('/', (req, res) => {
  const htmlPath = path.resolve(__dirname, 'build', 'index.html');

  fs.readFile(htmlPath, 'utf8', (err, html) => {
    const rootElem = '<div id="header-root">';
    const renderedApp = renderToString(React.createElement(App, null));

    res.send(html.replace(rootElem, rootElem + renderedApp));
  });
});

server.use(express.static('build'));

const port = process.env.PORT || 8080;
server.listen(port, () => {
  console.log(`App listening on port ${port}`);
});
