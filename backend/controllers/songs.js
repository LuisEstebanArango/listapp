var express = require('express');
var router = express.Router();

// packages
var _ = require('lodash');

router.get('/', function(req, res) {
  var page = req.query.page;
  var itemPerPage = req.query.itemPerPage;
  var order = req.query.order;

  var songs = req.app.locals.data.songs;
  if (order)
    songs = _.orderBy(songs, [order, 'id'], ['asc', 'asc']);
  else
    songs = _.orderBy(songs, ['id'], ['asc']);
  if (page && itemPerPage)
    songs = _.chunk(songs, itemPerPage)[page-1];
  res.json(songs);
});

router.get('/:id', function(req, res) {
  res.json(_.find(req.app.locals.data.songs, function(o) { return o.id == req.params.id; }));
});

module.exports = router;
