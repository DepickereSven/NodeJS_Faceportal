/**
 Created by svend on 27/05/2018.
 **/

// const sockets = require('./sockets');
const userDataList = require('./userDataList');

module.exports = (function () {


    let addUser = function (userID) {
        if (checkIfUserIsOnline(userID)) {
            return false;
        } else {
            let newUser = {
                user: userID,
                activeSince: "Online"
            };
            userDataList.userData.push(newUser);
            let index = userDataList.userData.findIndex((el => el.user === userID));
            return true;
        }
    };

    let changeStatusToOffline = function (userID) {
        let user = userDataList.userData.find((el => el.user === userID));
        user.active = `Last seen since ${new Date().toISOString().replace('T', ' ').replace('Z', '')}`
    };

    let checkIfUserIsOnline = function (userID) {
        let user = userDataList.userData.find((el => el.user === userID));
        if (user === undefined){
            return false;
        } else {
            return user.activeSince === "Online"
        }
    };

    return {
        addUser: addUser,
        changeStatusToOffline: changeStatusToOffline
    }

})();
