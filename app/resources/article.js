/**
 * Infobutton API
 * @author dassiorleando
 */

var express = require('express'),
  router = express.Router(),
  ArticleService = require('../services/article');

/* POST an article */
router.post('/', function(req, res) {
  var article = {
    title: req.body.title,
    description: req.body.description
  };

  // Explicit save
  ArticleService
  .create(article)
  .then(function(doc) {
    console.log('Saved documents ' +  doc._key);

    return res.status(200).json(doc);
  })
  .catch(function(error) {
    console.error('Error saving document', error);
    return res.status(500).json(error);
  });
});

/* Update an article by his key */
router.put('/', function(req, res) {
  var article = {
    _key: req.body._key,
    title: req.body.title,
    description: req.body.description
  };

  // Explicit update
  ArticleService
  .update(article)
  .then(function(doc) {
    console.log('Updated document ' +  doc._key);

    return res.status(200).json(doc);
  })
  .catch(function(error) {
    console.error('Error updating document', error);
    return res.status(500).json(error);
  });
});

/* GET an article by his key. */
router.get('/:articleKey', function(req, res) {
  var articleKey = req.params.articleKey;

  ArticleService
  .findByKey(articleKey)
  .then(function(doc) {
    console.log(`Get a document by key "${req.params.articleKey}".`, doc._key);

    return res.status(200).json(doc);
  })
  .catch(function(error) {
    console.error('Error getting single document', error);
    return res.status(500).json(error);
  });
});

/**
 * GET all saved articles
 */
router.get('/', function(req, res) {
  ArticleService
  .findAll()
  .then(function(response) {
    console.log(`Load all saved documents.`, response._result);

    return res.status(200).json(response._result);
  })
  .catch(function(error) {
    console.error('Error getting documents', error);
    return res.status(500).json(error);
  });
});

/* DELETE: delete a article by key */
router.delete('/:articleKey', function(req, res) {
  var articleKey = req.params.articleKey;

  ArticleService
  .remove(articleKey)
  .then(function(doc) {
    if (doc.removed) console.log('Removed document' + doc);

    return res.status(200).json(doc);
  })
  .catch(function(error) {
    console.error('Error removing document', error);
    return res.status(500).json(error);
  });
});

module.exports = router;
