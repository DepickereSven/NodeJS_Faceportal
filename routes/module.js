const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../Sql-data/sql-connection'));

const sqlFunctions = require('./sqlFunctions/sqlFunctions');

const index = require('./redirect/index');


router.get('/', function (req, res, next) {
    index.normalIndex(res);
});

router.post('/register', function (req, res, next) {
    let data = req.body;
    console.log(data);
    if (data.pass === data.passRepeat) {
        knex('login')
            .where('emailAddress', data.email)
            .orWhere('userName', data.user)
            .select('userID')
            .then(function (userID) {
                if (userID[0] === undefined) {
                    sqlFunctions.saveNewUser(knex, {
                        htmlFunctions: index,
                        userDetails: data,
                        res: res
                    })
                } else {
                    index.thisCombinationAlreadyExist(res);
                }
            })

    } else {
        index.passNotCorrect(res, data)
    }
});

module.exports = router;
