/**
 Created by svend on 27/05/2018.
 **/

// const sockets = require('./sockets');
const userDataList = require('./userDataList');

module.exports = (function () {


    let addUser = function (user) {
        if (checkIfUserIsOnline(user.userID)) {
            return false;
        } else {
            let newUser = {
                userID: user.userID,
                username: user.userName,
                activeSince: "Online"
            };
            userDataList.userData.push(newUser);
            let index = userDataList.userData.findIndex((el => el.user === user.userID));
            return true;
        }
    };

    let changeStatusToOffline = function (userID) {
        let user = userDataList.userData.find((el => el.userID === userID));
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
