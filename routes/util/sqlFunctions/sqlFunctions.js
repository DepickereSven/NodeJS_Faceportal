/**
 Created by svend on 6/06/2018.
 **/


module.exports = (function () {

    let saveNewUser = function (knex, data) {
        let index = data.htmlFunctions;
        let userDetails = data.userDetails;
        let res = data.res;
        knex('login')
            .insert(
                [
                    {
                        userName: userDetails.user,
                        emailAddress: userDetails.email,
                        password: userDetails.pass
                    }
                ]
            )
            .then(
                index.register.fillInLoginDetails(res, userDetails)
            );
    };

    return {
        saveNewUser: saveNewUser
    }

})();
