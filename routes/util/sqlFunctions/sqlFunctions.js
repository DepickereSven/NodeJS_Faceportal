/**
 Created by svend on 6/06/2018.
 **/

const generateRandomNumber = require('../random/number');

module.exports = (function () {

    let removeAndFindTheUserName = function (data) {
        data.selectedUserName = data.userDetails.find((el => el.userID === data.selectedUser)).userName;
        let index = data.userDetails.findIndex((el => el.user === data.userID));
        data.userDetails.splice(index, 1);
        return data;
    };

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

    let getPeople = function (knex, data) {
        let userID = data.userID;
        knex('login')
            .max('UserID')
            .then(function (maxUserID) {
                maxUserID = parseInt(maxUserID[0]['max(`UserID`)']);
                data.selectedUser = generateRandomNumber.thatCanBeACertainNumber(userID, maxUserID);
                getAllUsersDetails(
                    knex,
                    data
                )
            })
    };

    let getAllUsersDetails = function (knex, data) {
        console.log(data);
        knex('login')
            .select('userID', 'userName')
            .then(function (userDetails) {
                data.userDetails = userDetails;
                data = removeAndFindTheUserName(data);
                data.htmlFunctions.index.login.toChat(
                    data.htmlFunctions.res,
                    data
                )
            })
    };

    let getChatHistory = function (knex, data) {
        let user = data.userID;
        knex('messages')
            .distinct('SendingUserID', 'ReceivingUserID')
            .select('')
            .where('SendingUserID', user)
            .orWhere('ReceivingUserID', user)
            .then(function (users) {
                if (users[0] === undefined) {
                    getPeople(knex, data);
                } else {
                    data.selectedUser = generateRandomNumber.thatCanBeACertainNumber(user, Object.keys(users[0]).length);
                    data.messages = '';
                    getAllUsersDetails(knex, data)
                }
            })
    };

    return {
        saveNewUser: saveNewUser,
        getChatHistory: getChatHistory
    }

})();
