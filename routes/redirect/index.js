/**
 Created by svend on 6/06/2018.
 **/

const render = require('./util/render');


const i = 'index';

module.exports = (function () {

    // redirect from /

    let normalIndex = function (res) {
        render.this(i, res)
    };

    // redirect from /register

    let fillInLoginDetails = function (res, data) {
        render.this(i, res, {
            user: {
                user: data.user,
                pass: data.pass
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

    // redirect from /login

    let userDontExist = function (res, data) {
        render.this(i, res, {
            messages: {
                text: "Password/Username is wrong",
                isItSignUp: false
            },
            user: {
                user: data.user
            }
        })
    };

    let alreadyLoggedIn = function (res) {
      render.this(i, res, {
          messages: {
              text: "You are already logged in",
              isItSignUp: false
          }
      })
    };

    let toChat = function (res, data) {
        render.this('chat', res);
    };

    return {
        normalIndex: normalIndex,
        register: {
            fillInLoginDetails: fillInLoginDetails,
            thisCombinationAlreadyExist: thisCombinationAlreadyExist,
            passNotCorrect: passNotCorrect
        },
        login: {
            userDontExist: userDontExist,
            alreadyLoggedIn: alreadyLoggedIn,
            toChat: toChat
        }

    }

})();
