const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../Sql-data/sql-connection'));

const index = require('./redirect/index');


router.get('/', function(req, res, next) {
    index.normalIndex(res);
});

module.exports = router;
