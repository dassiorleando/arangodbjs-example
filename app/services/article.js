/**
 * ArticleService
 * @author dassiorleando
 */
var dbConfig = require('../config/db'),
  arangojs = require('arangojs'),
  DB = new arangojs.Database({ // Database connection
    url: dbConfig.url
  });

// Database selection
DB.useDatabase(dbConfig.database);

// Speficy the database user
DB.useBasicAuth(dbConfig.username, dbConfig.password);

// Collection to manage: Article
var Article = DB.collection('article');

exports.create = function (article) {
  if (!article.title || !article.description) return;

  return Article.save(article);
};

exports.update = function (article) {
  if (!article._key) return;

  return Article.update(article._key, article);
};

exports.remove = function (key) {
  if (!key) return;

  return Article.removeByKeys([key]);
};

exports.findAll = function () {
  return Article.all();
};

exports.findByKey = function (key) {
  if (!key) return;

  return Article.firstExample({_key: key});
};
