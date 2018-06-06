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

    return {
        normalIndex: normalIndex,
        fillInLoginDetails: fillInLoginDetails
    }

})();
