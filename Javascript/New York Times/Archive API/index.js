$(document).ready(function () {
    // AJAX Call
    $.ajax({
        url: url,
        method: 'GET'

    }).done(function (result) {
        // When good things happen.
        console.log(result);

    }).fail(function (err) {
        // When bad things happen.
        console.log(err);

    })
});
