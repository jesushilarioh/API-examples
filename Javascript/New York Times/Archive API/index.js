$(document).ready(function () {


    $("#month").keyup(function (e) {
        if (e.keyCode == 13) {
            var year = $("#year").val();
            var month = $("#month").val();

            // AJAX Call
            var url = "https://api.nytimes.com/svc/archive/v1/" + year + "/" + month + ".json";
            url += '?' + $.param({
                'api-key': "<---Your-API-Key--->"
            });
            $.ajax({
                url: url,
                method: 'GET'

            }).done(function (result) {
                // When good things happen.
                for (var i = 0; i < 10; i++) {
                    console.log(result.response.docs[i]);
                }

            }).fail(function (err) {
                // When bad things happen.
                console.log(err);
            })
            console.log(url);

        }

    });

    // $("#month").keyup(function () {
    //     var year = $("#year").val();
    //     var month = $("#month").val();
    //     // AJAX Call
    //     var url = "https://api.nytimes.com/svc/archive/v1/" + year + "/" + month + ".json";
    //     url += '?' + $.param({
    //         'api-key': "937889dd098d40988431171b07ff38e1"
    //     });
    //     console.log(url);
    //
    // });

    // var month = $("#month").keyup(function () {
    //     console.log("Month is " + $("#month").val());
    // });


});
