/**
 Created by svend on 6/06/2018.
 **/

const render = require('./util/render');


const i = 'index';

module.exports = (function () {

    let normalIndex = function (res) {
        render.this(i, res)
    };

    let fillInLoginDetails = function (res, data) {
        render.this(i, res, {
            user: {
                username: data.user,
                password: data.pass
            }
        });
    };

    let thisCombinationAlreadyExist = function (res) {
        render.this(i, res, {
            messages: {
                text: 'You have already used the emailAddress/Username',
                isItSignUp: true
            }
        });
    };

    let passNotCorrect = function (res, data) {
        render.this(i, res, {
            messages: {
                text: "Passwords don't match",
                isItSignUp: true
            },
            user: {
                user: data.user,
                email: data.email
            }
        })
    };

    return {
        normalIndex: normalIndex,
        fillInLoginDetails: fillInLoginDetails,
        thisCombinationAlreadyExist: thisCombinationAlreadyExist,
        passNotCorrect: passNotCorrect
    }

})();
