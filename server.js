/**
 * Setup the server
 * @author dassiorleando
 */
var express = require('express'),
  path = require('path'),
  http = require('http'),
  bodyParser = require('body-parser'),
  // Get some controllers (actions)
  articleAPI = require('./app/resources/article'),
  cors = require('cors'),
  app = express();

// Enable CORS
app.use(cors({ credentials: true, origin: true }));

/**
 * Create HTTP server.
 */
var server = http.createServer(app);

// Parsers for POST data
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

// Point static path to dist
app.use(express.static(path.join(__dirname, 'dist')));

// Set the static path to serve the upload folder (JSON & XML)
// app.use('/static', express.static(path.join(__dirname, 'server/static')));

// Set our api routes
app.use('/api/articles', articleAPI);

// Catch all other routes and return the index file
// app.get('*', (req, res) => {
//   res.sendFile(path.join(__dirname, 'dist/index.html'));
// });

/**
 * Get port from environment and store in Express.
 */
var port = process.env.PORT || '3000';
app.set('port', port);

/**
 * Listen on provided port, on all network interfaces.
 */
server.listen(port, function () {
  console.log(`ArangoDB Js Examples API started on localhost: ${port}`);

  // Initing the project
  init();
});

/**
 * To initialize some stuff when starting
 */
function init () {

}
