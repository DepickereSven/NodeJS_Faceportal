const $chatHistory = $('.chat-history');
const $button = $('button');
const $textarea = $('#message-to-send');
const $chatHistoryList = $chatHistory.find('ul');

const socket = io.connect('http://localhost:8080', {
    query: {
        user: $('.chat-with').attr('data-owner')
    }
});

socket.on('message', function (msg) {
    console.log('heau');
    addResponds(msg);
});


let addResponds = function (msg) {
    console.log('SendingUserID', msg.SendingUserID);
    console.log('usingUsers',  $('.chat-with').attr('data-id'));
    console.log($('.chat-with').attr('data-id') === msg.SendingUserID.toString());
    if ($('.chat-with').attr('data-id') === msg.SendingUserID.toString()){
        createRespond(msg);
    }
};

let createRespond = function (msg) {
    const templateResponse = Handlebars.compile( $("#message-response-template").html());
    const contextResponse = {
        response: msg.message,
        time: msg.time,
        username: $('.chat-with').attr('data-per')
    };
    // setTimeout(function() {
        $chatHistoryList.append(templateResponse(contextResponse));
        scrollToBottom();
    // }.bind(this), 250);
};

let addMessage = function () {
    const messageToSend = $textarea.val();
    render(messageToSend);
};

let addMessageEnter = function (event) {
    if (event.keyCode === 13) {
        addMessage();
    }
};

let scrollToBottom = function () {
    $chatHistory.scrollTop($chatHistory[0].scrollHeight);
};

let getCurrentTime = function () {
    return new Date().toLocaleTimeString().replace(/([\d]+:[\d]{2})(:[\d]{2})(.*)/, "$1$3");
};

let render = function (messageToSend) {
    scrollToBottom();
    if (messageToSend.trim() !== '') {
        const template = Handlebars.compile($("#message-template").html());
        const data = {
            messageOutput: messageToSend,
            time: getCurrentTime(),
            username: $('.chat-header').attr('data-name')
        };

        $chatHistoryList.append(template(data));
        scrollToBottom();
        $textarea.val('');
        let JsonData = JSON.stringify(data);
        let request = new Request('http://localhost:3000/user/' + $('.chat-with').attr('data-id') + '/message', {
            method: 'PUT',
            headers: {
                'content-type': 'application/json'
            },
            body: JsonData
        });
        fetch(request)
            .then(function (data) {
                console.log(data)
            })
            .catch(error => console.error(error));
    }
};

const searchFilter = {
    options: {valueNames: ['name']},
    init: function () {
        const userList = new List('people-list', this.options);
        const noItems = $('<li id="no-items-found">No items found</li>');

        userList.on('updated', function (list) {
            if (list.matchingItems.length === 0) {
                $(list.list).append(noItems);
            } else {
                noItems.detach();
            }
        });
    }
};


let init = function () {
    searchFilter.init();
    scrollToBottom();
    $button.on('click', addMessage);
    $textarea.on('keyup', addMessageEnter);

};

$(document).ready(init());