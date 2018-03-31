$(document).ready(function () {

    $("#userValue").keyup(function () {
        apiCall();
    });
    $("#searchButton").click(function () {
        apiCall();
    });

    function apiCall() {
        var url = "https://api.nytimes.com/svc/search/v2/articlesearch.json";
        url += '?' + $.param({
            'api-key': "937889dd098d40988431171b07ff38e1",
            'q': $("#userValue").val(),
            'begin_date': "17001111",
            'end_date': "20191111",
            'sort': "newest"
        });

        $.ajax({
            url: url,
            method: 'GET',

        }).done(function (result) {
            console.log(result);
            var entire_article = "";

            function loop(x, y) {
                entire_article += "<div class='flex-rows'>"
                for (var i = x; i < y; i++) {

                    entire_article += "<div class='box_" + (i + 1) + " boxes'>"
                    entire_article += "<a href='" + JSON.stringify(result.response.docs[i].web_url).toString().replace(/"/g, "") + "' target='_blank'><div>";
                    entire_article += "<h3>" + JSON.stringify(result.response.docs[i].headline.main).toString().replace(/"/g, "") + "</h3>";
                    entire_article += "<p>" + JSON.stringify(result.response.docs[i].snippet).toString().replace(/"/g, "").replace(/\\/g, "") + "</p>";

                    if (result.response.docs[i].multimedia[0]) {
                        entire_article += "<img src='" + "https://www.nytimes.com/" + JSON.stringify(result.response.docs[i].multimedia[0].url).toString().replace(/"/g, "") + "'></div></a>";
                        entire_article += "</div>";

                    } else {
                        entire_article += "</div></a>";
                        entire_article += "</div>";

                    }
                    // $("#articleSnippet").html(articleSnippet);
                    $("#entire_article").html(entire_article);

                }
                entire_article += "</div>";

            }




            loop(0, 1);

            loop(1, 4);

            loop(4, 5);

            loop(5, 7);

            loop(7, 10);

        }).fail(function (err) {
            // throw err;
            $("#entire_article").html("<h4>Sorry, no response is found for " + $("#userValue").val() + "</h4>");
            console.log(JSON.stringify(err));

        });
    }
});