/**
 Created by svend on 6/06/2018.
 **/

module.exports = (function () {

    const renderThis = function (filename, res, data={}) {
        res.render(filename, {data});
    };

    return {
        this: renderThis
    }

})();
