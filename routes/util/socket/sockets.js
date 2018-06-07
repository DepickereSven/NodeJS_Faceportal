/**
 Created by svend on 28/05/2018.
 **/

const express = require('express');
const app = express();
const server = require('http').createServer(app);
const io = require('socket.io');

server.listen(8080, function () {
    console.log("socket is listening on 8080");
    console.log("server is running on 3000")
});

const serverSocket = io(server);

const allSocketIdForUsers = [];

module.exports = (function () {

    serverSocket.on("connection", function (socket) {
        allSocketIdForUsers.push({
            socketID: socket.id,
            userID: socket.request._query.user
        });
        socket.on("disconnect", () => {
            let index = allSocketIdForUsers.findIndex((el => el.socketID === socket.id));
            allSocketIdForUsers.splice(index, 1);
            console.log("disconnect");
        });
    });

    let findUser = function (userID) {
        return allSocketIdForUsers.find((el => el.userID === userID.toString()));
    };

    let sendMessageToSpecifedUser = function (userID, messageInfo) {
        console.log(allSocketIdForUsers);
        console.log('userId', userID);
        let socketID = findUser(userID);
        console.log(socketID);
        if (socketID !== undefined){
            serverSocket.to(socketID.socketID).emit('message', messageInfo);
        }
        // sendToAllSockets(messageInfo);
    };

    function sendToAllSockets(messageInfo) {
        allSocketIdForUsers.forEach(function (el) {
            console.log(el);
            serverSocket.to(el.socketID).emit('message', messageInfo);
        })
    }

    return {
        sendMessageToSpecifedUser: sendMessageToSpecifedUser
    }

})();
