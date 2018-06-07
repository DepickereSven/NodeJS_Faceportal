const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../Sql-data/sql-connection'));

const sqlFunctions = require('./util/sqlFunctions/sqlFunctions');

const userList = require('./util/users/userList');

const index = require('./redirect/index');


let setTheUserOnline = function (res, req, user) {
    if (userList.addUser(user.userID)){
        req.session.authenticated = true;
        req.session.user = user.userID;
        index.login.toChat(res, user);
    } else {
        index.login.alreadyLoggedIn(res);
    }
};

router.get('/', function (req, res, next) {
    index.normalIndex(res);
});

router.post('/register', function (req, res, next) {
    let data = req.body;
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
                    index.register.thisCombinationAlreadyExist(res);
                }
            })

    } else {
        index.register.passNotCorrect(res, data)
    }
});

router.post('/login', function (req, res, next) {
    let data = req.body;
    knex('login')
        .where({
            userName: data.user,
            password: data.pass
        })
        .select('*')
        .then(function (sqlData) {
            if (sqlData[0] === undefined){
                index.login.userDontExist(res, data);
            } else {
                if(sqlData[0].password === data.pass){
                    setTheUserOnline(res,req, {
                        userID: sqlData[0].userID,
                        userName: data.user
                    });
                } else {
                    index.login.userDontExist(res,data);
                }
            }

        })
});

module.exports = router;
