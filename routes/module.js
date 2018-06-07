const express = require('express');
const router = express.Router();
const knex = require('knex')(require('../Sql-data/sql-connection'));

const sqlFunctions = require('./util/sqlFunctions/sqlFunctions');

const userList = require('./util/users/userList');

const index = require('./redirect/index');


let setTheUserOnline = function (res, req, user) {
    const userID = user.userID;
    if (userList.addUser(user)){
        req.session.authenticated = true;
        req.session.user = userID;
        req.session.name = user.userName;
        sqlFunctions.getChatHistory(
            knex, {
                htmlFunctions: {
                    res: res,
                    renderPage: index.login.toChat
                },
                userID: userID,
                userName: user.userName
            }
        )
    } else {
        index.login.alreadyLoggedIn(res);
    }
};

router.get('/', function (req, res, next) {
    index.normalIndex(res);
});

router.post('/register', function (req, res) {
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

router.post('/login', function (req, res) {
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

router.use('/user', function (req,res,next) {
    if (req.session.authenticated){
        next();
    } else {
        index.normalIndex(res);
    }
});

router.get('/user/:username/logout', function (req,res) {
    userList.changeStatusToOffline(req.session.user);
    req.session.authenticated = false;
    index.normalIndex(res);
});

router.get('/user/:id', function (req,res) {
    sqlFunctions.getTheChatHistoryOfOneSpecifiedPerson(
        knex, {
            htmlFunctions: {
                res: res,
                renderPage: index.login.toChat
            },
            userID: req.session.user,
            userName: req.session.name,
            selectedUser: req.params.id

        }
    )
});

router.put('/user/:id/message', function (req,res) {
    sqlFunctions.saveTheChatInDataBase(knex,{
        SendingUserID: req.session.user,
        ReceivingUserID: req.params.id,
        message: req.body.messageOutput,
        flag: 0
    })
});

module.exports = router;
