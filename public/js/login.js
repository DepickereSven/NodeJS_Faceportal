

const controlSignIn = function () {
    const $signIn = $('.sign-in-htm');
    const $singUp = $('.sign-up-htm');
    if ($signIn.hasClass('dontShow')){
        $signIn.removeClass('dontShow');
        $singUp.removeClass('show');
    }
};

let init = function () {
    $('#signIn').on('click', controlSignIn)
};

$(document).ready(init());